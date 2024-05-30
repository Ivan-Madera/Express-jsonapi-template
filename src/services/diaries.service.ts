import {
  type INewDiaryEntry,
  type IDiaryObject
} from '../interfaces/diaries.dtos'
import diariesData from './../json/diaries.json'

export const getDiaries = (): IDiaryObject[] => diariesData as IDiaryObject[]

export const createDiaries = (newDiaryEntry: INewDiaryEntry): IDiaryObject => {
  const newDiary = {
    id: diariesData.length + 1,
    ...newDiaryEntry
  }

  diariesData.push(newDiary)
  return newDiary
}
