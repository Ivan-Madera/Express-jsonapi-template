import { type IUserObj } from '../../entities/users.entities'
import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'
import {
  createGetAccessTokenUseCase,
  createGetUsersUseCase,
  createCreateUserUseCase,
  createUpdateUserUseCase
} from '../../domain/use-cases/user.use-cases'
import { createUserRepositoryAdapter } from '../../adapters/repositories/user.repository.adapter'
import { createAuthServiceAdapter } from '../../adapters/services/auth.service.adapter'
import { createJsonApiServiceAdapter } from '../../adapters/services/json-api.service.adapter'
import { createTransactionServiceAdapter } from '../../adapters/services/transaction.service.adapter'

// Crear instancias de los adaptadores
const userRepository = createUserRepositoryAdapter()
const authService = createAuthServiceAdapter()
const jsonApiService = createJsonApiServiceAdapter()
const transactionService = createTransactionServiceAdapter()

// Crear casos de uso con sus dependencias inyectadas
const getAccessTokenUseCase = createGetAccessTokenUseCase(authService, jsonApiService)
const getUsersUseCase = createGetUsersUseCase(userRepository, jsonApiService)
const createUserUseCase = createCreateUserUseCase(userRepository, jsonApiService, transactionService)
const updateUserUseCase = createUpdateUserUseCase(userRepository, jsonApiService, transactionService)

// Servicios de aplicación que exponen la funcionalidad
export const getAccessTokenService = async (url: string): Promise<IJsonApiResponseGeneric> => {
  return await getAccessTokenUseCase(url)
}

export const getUsersService = async (url: string): Promise<IJsonApiResponseGeneric> => {
  return await getUsersUseCase(url)
}

export const createUserService = async (url: string, userData: IUserObj): Promise<IJsonApiResponseGeneric> => {
  return await createUserUseCase(url, userData)
}

export const updateUserService = async (url: string, nombres: string, usuario: string): Promise<IJsonApiResponseGeneric> => {
  return await updateUserUseCase(url, nombres, usuario)
}
