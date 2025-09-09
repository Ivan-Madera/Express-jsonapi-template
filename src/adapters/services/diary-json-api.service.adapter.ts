import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'
import {
  JsonApiResponseData,
  JsonApiResponseError
} from '../../utils/jsonApiResponses'
import { Codes } from '../../utils/codeStatus'

export const createDiaryJsonApiServiceAdapter = () => ({
  createSuccessResponse: (data: any, url: string): IJsonApiResponseGeneric => {
    return {
      status: Codes.success,
      response: JsonApiResponseData('diaries', data, url)
    }
  },

  createErrorResponse: (error: any, url: string): IJsonApiResponseGeneric => {
    return {
      status: Codes.errorServer,
      response: JsonApiResponseError(error, url)
    }
  }
})
