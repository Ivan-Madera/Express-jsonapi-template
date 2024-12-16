import env from '../config/callEnv'
import {
  commitTransaction,
  manageTransaction,
  rollbackTransaction
} from '../database/transaction'
import { type IJsonApiResponseGeneric } from '../entities/jsonApiResponse.entity'
import { type IUserObj } from '../entities/user.entity'
import { createUser, updateUser } from '../repositories/mutations/user.mutation'
import { findAllUsers } from '../repositories/queries/user.query'
import { Codes } from '../utils/codeStatus'
import { ErrorSugestions } from '../utils/errorSugestions'
import {
  JsonApiResponseData,
  JsonApiResponseError,
  JsonApiResponseGeneric,
  JsonApiResponseMessage
} from '../utils/jsonApiResponse'
import { sign } from 'jsonwebtoken'

export const getAccessTokenService = async (
  url: string
): Promise<IJsonApiResponseGeneric> => {
  let status = Codes.errorServer

  try {
    const secret = env.SECRET_KEY
    const uid = new Date().getTime()

    const token = sign({ uid }, secret, { expiresIn: '1h' })

    const data = { token }
    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseData('user', data, url)
    )
  } catch (error) {
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const getUsersService = async (
  url: string
): Promise<IJsonApiResponseGeneric> => {
  let status = Codes.errorServer

  try {
    const users = await findAllUsers()

    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseData('user', users, url)
    )
  } catch (error) {
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const createUserService = async (
  url: string,
  userObj: IUserObj
): Promise<IJsonApiResponseGeneric> => {
  let status = Codes.errorServer
  const t = await manageTransaction()

  try {
    const findCreate = await createUser(userObj, t)

    await commitTransaction(t)
    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseData('user', findCreate, url)
    )
  } catch (error) {
    await rollbackTransaction(t, 'createUserService')
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const updateUserService = async (
  url: string,
  nombres: string,
  usuario: string
): Promise<IJsonApiResponseGeneric> => {
  let status = Codes.errorServer
  const message = 'Usuario actualizado con exito'
  const t = await manageTransaction()

  try {
    await updateUser(
      { nombres },
      {
        where: {
          usuario
        },
        transaction: t
      }
    )

    await commitTransaction(t)
    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseMessage('user', message, url)
    )
  } catch (error) {
    await rollbackTransaction(t, 'updateUserService')
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseError(status, url, ErrorSugestions.generic, error)
    )
  }
}
