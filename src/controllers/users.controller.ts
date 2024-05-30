import { type Handler } from 'express'
import {
  createUserService,
  getAccessTokenService,
  getUsersService,
  updateUserService
} from '../services/users.service'
import { Codes } from '../utils/CodeStatus'
import { ErrorObject } from '../utils/JsonResponses'

export const getAccessToken: Handler = async (req, res) => {
  let status = Codes.errorServer

  try {
    const userService = await getAccessTokenService()

    status = userService.code
    return res.status(status).json(userService)
  } catch (error) {
    return res.status(status).json(ErrorObject(error, status))
  }
}

export const getUsers: Handler = async (req, res) => {
  const userService: any = await getUsersService()

  const status = userService.code
  res.status(status).json(userService)
}

export const createUser: Handler = async (req, res) => {
  let status = Codes.errorServer

  try {
    const { body } = req

    const userService = await createUserService(body)

    status = userService.code
    return res.status(status).json(userService)
  } catch (error) {
    return res.status(status).json(ErrorObject(error, status))
  }
}

export const updateUser: Handler = async (req, res) => {
  let status = Codes.errorServer

  try {
    const { body } = req
    const nombres = body.nombres
    const usuario = body.usuario

    const userService = await updateUserService(nombres, usuario)

    status = userService.code
    return res.status(status).json(userService)
  } catch (error) {
    return res.status(status).json(ErrorObject(error, status))
  }
}
