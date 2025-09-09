import { type INewDiaryEntry, type IDiaryObject } from '../../entities/diaries.entities'
import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'

// Port para el repositorio de diarios
export interface DiaryRepositoryPort {
  findAll: () => IDiaryObject[]
  create: (diaryData: INewDiaryEntry) => IDiaryObject
}

// Port para el servicio de respuesta JSON API (reutilizado)
export interface JsonApiServicePort {
  createSuccessResponse: (data: any, url: string) => IJsonApiResponseGeneric
  createErrorResponse: (error: any, url: string) => IJsonApiResponseGeneric
}
