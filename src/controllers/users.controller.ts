import { type Handler } from 'express'
import {
  createUserService,
  getAccessTokenService,
  getUsersService,
  updateUserService
} from '../services/users.service'
import { Codes } from '../utils/CodeStatus'
import { ErrorObject } from '../utils/JsonResponses'
import { ErrorSugestions } from '../utils/ErrorSugestions'
import { JsonResponseApiError } from '../utils/JsonResponseApi'

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
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = await getUsersService(url)

    status = responseService.status
    res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}

export const createUser: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const {
      body: {
        data: { attributes }
      }
    } = req

    const userService = await createUserService(url, attributes)

    status = userService.status
    return res.status(status).json(userService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}

export const updateUser: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const {
      body: {
        data: { attributes }
      }
    } = req
    const nombres = attributes.nombres
    const usuario = attributes.usuario

    const userService = await updateUserService(url, nombres, usuario)

    status = userService.status
    return res.status(status).json(userService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}
