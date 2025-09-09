import { type DiaryRepositoryPort } from '../../domain/ports/diary.ports'
import { type IDiaryObject, type INewDiaryEntry, type Weather, type Visibility } from '../../entities/diaries.entities'
import diariesData from '../../json/diaries.json'

export const createDiaryRepositoryAdapter = (): DiaryRepositoryPort => ({
  findAll: (): IDiaryObject[] => {
    return diariesData.map(diary => ({
      ...diary,
      weather: diary.weather as Weather,
      visibility: diary.visibility as Visibility
    }))
  },

  create: (diaryData: INewDiaryEntry): IDiaryObject => {
    const newDiary = {
      id: diariesData.length + 1,
      ...diaryData
    }

    diariesData.push(newDiary)
    return newDiary
  }
})
