import { type Handler } from 'express'
import {
  createUserService,
  getAccessTokenService,
  getUsersService,
  updateUserService
} from '../services/users.service'
import { Codes } from '../utils/codeStatus'
import { JsonApiResponseError } from '../utils/jsonApiResponse'
import { ErrorSugestions } from '../utils/errorSugestions'

export const getAccessToken: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = await getAccessTokenService(url)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
  }
}

export const getUsers: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = await getUsersService(url)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
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

    const responseService = await createUserService(url, attributes)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
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

    const responseService = await updateUserService(url, nombres, usuario)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
  }
}
