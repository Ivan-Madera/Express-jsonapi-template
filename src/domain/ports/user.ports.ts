import { type IUserObj } from '../../entities/users.entities'
import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'

// Port para el repositorio de usuarios
export interface UserRepositoryPort {
  findAll: () => Promise<any[]>
  findOne: (usuario: string, attributes?: string[]) => Promise<any | null>
  create: (userData: IUserObj, transaction?: any) => Promise<any>
  update: (values: Partial<IUserObj>, options: any) => Promise<number>
}

// Port para el servicio de autenticación
export interface AuthServicePort {
  generateToken: (uid: string) => string
}

// Port para el servicio de respuesta JSON API
export interface JsonApiServicePort {
  createSuccessResponse: (data: any, url: string) => IJsonApiResponseGeneric
  createErrorResponse: (error: any, url: string) => IJsonApiResponseGeneric
  createMessageResponse: (message: string, url: string) => IJsonApiResponseGeneric
}

// Port para el servicio de transacciones
export interface TransactionServicePort {
  begin: () => Promise<any>
  commit: (transaction: any) => Promise<void>
  rollback: (transaction: any, operation: string) => Promise<void>
}
