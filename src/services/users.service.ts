import env from './../config/callenv'
import {
  commitTrasaction,
  manageTransaction,
  rollbackTrasaction
} from '../database/transactions'
import {
  type IErrorObject,
  type ISuccessObject
} from '../interfaces/jsonResponses.dtos'
import { type IUserObj } from '../interfaces/user.dtos'
import {
  createUser,
  updateUser
} from '../repositories/mutations/user.mutations'
import { findAllUsers } from '../repositories/queries/user.queries'
import { Codes } from '../utils/CodeStatus'
import { ErrorObject, SuccessObject } from '../utils/JsonResponses'
import { sign } from 'jsonwebtoken'
import { type IJsonResponseApiGeneric } from '../interfaces/jsonResponseApi.dtos'
import {
  JsonResponseApiData,
  JsonResponseApiError,
  JsonResponseApiGeneric,
  JsonResponseApiMessage
} from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'

export const getAccessTokenService = async (): Promise<
  ISuccessObject | IErrorObject
> => {
  let status = Codes.errorServer

  try {
    const secret = env.SECRET_KEY as string
    const uid = new Date().getTime()

    const token = sign({ uid }, secret, { expiresIn: '1h' })

    const data = { token }
    status = Codes.success
    return SuccessObject(data, status)
  } catch (error) {
    return ErrorObject(error, status)
  }
}

export const getUsersService = async (
  url: string
): Promise<IJsonResponseApiGeneric> => {
  let status = Codes.errorServer

  try {
    const findAll = await findAllUsers()
    status = Codes.success
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiData('users', findAll, url)
    )
  } catch (error) {
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const createUserService = async (
  url: string,
  userObj: IUserObj
): Promise<IJsonResponseApiGeneric> => {
  let status = Codes.errorServer
  const t = await manageTransaction()

  try {
    const findCreate = await createUser(userObj, t)

    await commitTrasaction(t)
    status = Codes.success
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiData('users', findCreate, url)
    )
  } catch (error) {
    await rollbackTrasaction(t, 'createUserService')
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiError(status, url, ErrorSugestions.generic, error)
    )
  }
}

export const updateUserService = async (
  url: string,
  nombres: string,
  usuario: string
): Promise<IJsonResponseApiGeneric> => {
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

    await commitTrasaction(t)
    status = Codes.success
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiMessage('users', message, url)
    )
  } catch (error) {
    await rollbackTrasaction(t, 'updateUserService')
    return JsonResponseApiGeneric(
      status,
      JsonResponseApiError(status, url, ErrorSugestions.generic, error)
    )
  }
}
