import { type INewDiaryEntry } from '../../entities/diaries.entities'
import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'
import {
  createGetDiariesUseCase,
  createCreateDiaryUseCase
} from '../../domain/use-cases/diary.use-cases'
import { createDiaryRepositoryAdapter } from '../../adapters/repositories/diary.repository.adapter'
import { createDiaryJsonApiServiceAdapter } from '../../adapters/services/diary-json-api.service.adapter'

// Crear instancias de los adaptadores
const diaryRepository = createDiaryRepositoryAdapter()
const jsonApiService = createDiaryJsonApiServiceAdapter()

// Crear casos de uso con sus dependencias inyectadas
const getDiariesUseCase = createGetDiariesUseCase(diaryRepository, jsonApiService)
const createDiaryUseCase = createCreateDiaryUseCase(diaryRepository, jsonApiService)

// Servicios de aplicación que exponen la funcionalidad
export const getDiariesService = (url: string): IJsonApiResponseGeneric => {
  return getDiariesUseCase(url)
}

export const createDiariesService = (url: string, diaryData: INewDiaryEntry): IJsonApiResponseGeneric => {
  return createDiaryUseCase(url, diaryData)
}
