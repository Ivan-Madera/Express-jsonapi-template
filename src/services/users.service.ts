import env from '../config/callEnv'
import {
  commitTransaction,
  manageTransaction,
  rollbackTransaction
} from '../database/transaction'
import { type IJsonApiResponseGeneric } from '../entities/jsonApiResponses.entities'
import { type IUserObj } from '../entities/users.entities'
import {
  createUser,
  updateUser
} from '../repositories/mutations/user.mutations'
import { findAllUsers } from '../repositories/queries/user.queries'
import { Codes } from '../utils/codeStatus'
import {
  JsonApiResponseData,
  JsonApiResponseError,
  JsonApiResponseGeneric,
  JsonApiResponseMessage
} from '../utils/jsonApiResponses'
import { sign } from 'jsonwebtoken'

export const getAccessTokenService = async (): Promise<IJsonApiResponseGeneric> => {
  let status = Codes.errorServer

  try {
    const secret = env.SECRET_KEY
    const uid = new Date().getTime()

    const token = sign({ uid }, secret, { expiresIn: '1h' })

    const data = { token }
    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseData('user', data)
    )
  } catch (error) {
    return JsonApiResponseGeneric(status, JsonApiResponseError(error))
  }
}

export const getUsersService = async (): Promise<IJsonApiResponseGeneric> => {
  let status = Codes.errorServer

  try {
    const users = await findAllUsers()

    status = Codes.success
    return JsonApiResponseGeneric(
      status,
      JsonApiResponseData('user', users)
    )
  } catch (error) {
    return JsonApiResponseGeneric(status, JsonApiResponseError(error))
  }
}

export const createUserService = async (
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
      JsonApiResponseData('user', findCreate)
    )
  } catch (error) {
    await rollbackTransaction(t, 'createUserService')
    return JsonApiResponseGeneric(status, JsonApiResponseError(error))
  }
}

export const updateUserService = async (
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
      JsonApiResponseMessage('user', message)
    )
  } catch (error) {
    await rollbackTransaction(t, 'updateUserService')
    return JsonApiResponseGeneric(status, JsonApiResponseError(error))
  }
}
