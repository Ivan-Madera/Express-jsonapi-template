import { type IUserObj } from '../../entities/users.entities'
import { type IJsonApiResponseGeneric } from '../../entities/jsonApiResponses.entities'
import {
  type UserRepositoryPort,
  type AuthServicePort,
  type JsonApiServicePort,
  type TransactionServicePort
} from '../ports/user.ports'

// Caso de uso: Generar token de acceso
export const createGetAccessTokenUseCase = (
  authService: AuthServicePort,
  jsonApiService: JsonApiServicePort
) => async (url: string): Promise<IJsonApiResponseGeneric> => {
  try {
    const uid = new Date().getTime().toString()
    const token = authService.generateToken(uid)
    const data = { token }

    return jsonApiService.createSuccessResponse(data, url)
  } catch (error) {
    return jsonApiService.createErrorResponse(error, url)
  }
}

// Caso de uso: Obtener todos los usuarios
export const createGetUsersUseCase = (
  userRepository: UserRepositoryPort,
  jsonApiService: JsonApiServicePort
) => async (url: string): Promise<IJsonApiResponseGeneric> => {
  try {
    const users = await userRepository.findAll()
    return jsonApiService.createSuccessResponse(users, url)
  } catch (error) {
    return jsonApiService.createErrorResponse(error, url)
  }
}

// Caso de uso: Crear usuario
export const createCreateUserUseCase = (
  userRepository: UserRepositoryPort,
  jsonApiService: JsonApiServicePort,
  transactionService: TransactionServicePort
) => async (url: string, userData: IUserObj): Promise<IJsonApiResponseGeneric> => {
  const transaction = await transactionService.begin()

  try {
    const newUser = await userRepository.create(userData, transaction)
    await transactionService.commit(transaction)

    return jsonApiService.createSuccessResponse(newUser, url)
  } catch (error) {
    await transactionService.rollback(transaction, 'createUser')
    return jsonApiService.createErrorResponse(error, url)
  }
}

// Caso de uso: Actualizar usuario
export const createUpdateUserUseCase = (
  userRepository: UserRepositoryPort,
  jsonApiService: JsonApiServicePort,
  transactionService: TransactionServicePort
) => async (url: string, nombres: string, usuario: string): Promise<IJsonApiResponseGeneric> => {
  const transaction = await transactionService.begin()

  try {
    await userRepository.update(
      { nombres },
      {
        where: { usuario },
        transaction
      }
    )

    await transactionService.commit(transaction)
    const message = 'Usuario actualizado con exito'

    return jsonApiService.createMessageResponse(message, url)
  } catch (error) {
    await transactionService.rollback(transaction, 'updateUser')
    return jsonApiService.createErrorResponse(error, url)
  }
}
