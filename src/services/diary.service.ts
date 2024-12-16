import { type INewDiaryEntry } from '../entities/diary.entity'
import { type IJsonApiResponseGeneric } from '../entities/jsonApiResponse.entity'
import diariesData from '../json/diary.json'
import { Codes } from '../utils/codeStatus'
import { ErrorSugestions } from '../utils/errorSugestions'
import {
  JsonApiResponseData,
  JsonApiResponseError,
  JsonApiResponseGeneric
} from '../utils/jsonApiResponse'

export const getDiaries = (url: string): IJsonApiResponseGeneric => {
  let status = Codes.errorServer

  try {
    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseData('diaries', diariesData, url)
    )
  } catch (error) {
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const createDiaries = (
  url: string,
  newDiaryEntry: INewDiaryEntry
): IJsonApiResponseGeneric => {
  let status = Codes.errorServer

  try {
    const newDiary = {
      id: diariesData.length + 1,
      ...newDiaryEntry
    }

    diariesData.push(newDiary)

    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseData('diaries', newDiary, url)
    )
  } catch (error) {
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseError(status, url, ErrorSugestions.generic, error)
    )
  }
}
