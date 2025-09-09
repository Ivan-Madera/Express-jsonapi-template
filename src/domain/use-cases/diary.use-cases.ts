import { type INewDiaryEntry } from '../../entities/diaries.entities'
import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'
import { type DiaryRepositoryPort, type JsonApiServicePort } from '../ports/diary.ports'

// Caso de uso: Obtener todos los diarios
export const createGetDiariesUseCase = (
  diaryRepository: DiaryRepositoryPort,
  jsonApiService: JsonApiServicePort
) => (url: string): IJsonApiResponseGeneric => {
  try {
    const diaries = diaryRepository.findAll()
    return jsonApiService.createSuccessResponse(diaries, url)
  } catch (error) {
    return jsonApiService.createErrorResponse(error, url)
  }
}

// Caso de uso: Crear diario
export const createCreateDiaryUseCase = (
  diaryRepository: DiaryRepositoryPort,
  jsonApiService: JsonApiServicePort
) => (url: string, diaryData: INewDiaryEntry): IJsonApiResponseGeneric => {
  try {
    const newDiary = diaryRepository.create(diaryData)
    return jsonApiService.createSuccessResponse(newDiary, url)
  } catch (error) {
    return jsonApiService.createErrorResponse(error, url)
  }
}
