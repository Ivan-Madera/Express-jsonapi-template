import env from './../config/callenv'
import {
  commitTrasaction,
  manageTransaction,
  rollbackTrasaction
} from '../database/transactions'
import {
  type IResponseMessage,
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
import {
  ErrorObject,
  ResponseMessage,
  SuccessObject
} from '../utils/JsonResponses'
import { sign } from 'jsonwebtoken'

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

export const getUsersService = async (): Promise<
  ISuccessObject | IErrorObject
> => {
  let status = Codes.errorServer

  try {
    const findUser = await findAllUsers()

    status = Codes.success
    return SuccessObject(findUser, status)
  } catch (error) {
    return ErrorObject(error, status)
  }
}

export const createUserService = async (
  userObj: IUserObj
): Promise<ISuccessObject | IErrorObject> => {
  let status = Codes.errorServer
  const t = await manageTransaction()

  try {
    const findCreate = await createUser(userObj, t)

    await commitTrasaction(t)
    status = Codes.success
    return SuccessObject(findCreate, status)
  } catch (error) {
    await rollbackTrasaction(t, 'createUserService')
    return ErrorObject(error, status)
  }
}

export const updateUserService = async (
  nombres: string,
  usuario: string
): Promise<IResponseMessage | IErrorObject> => {
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
    return ResponseMessage(message, status)
  } catch (error) {
    await rollbackTrasaction(t, 'updateUserService')
    return ErrorObject(error, status)
  }
}
