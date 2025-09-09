import { type Handler } from 'express'
import {
  createUserService,
  getAccessTokenService,
  getUsersService,
  updateUserService
} from '../services/users.service'
import { Codes } from '../utils/codeStatus'
import { JsonApiResponseError, addUrlToResponse } from '../utils/jsonApiResponses'

export const getAccessToken: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = await getAccessTokenService()
    const responseWithUrl = addUrlToResponse(responseService.response, url)

    status = responseService.status
    return res.status(status).json(responseWithUrl)
  } catch (error) {
    const errorResponse = addUrlToResponse(JsonApiResponseError(error), url)
    return res.status(status).json(errorResponse)
  }
}

export const getUsers: Handler = async (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = await getUsersService()
    const responseWithUrl = addUrlToResponse(responseService.response, url)

    status = responseService.status
    return res.status(status).json(responseWithUrl)
  } catch (error) {
    const errorResponse = addUrlToResponse(JsonApiResponseError(error), url)
    return res.status(status).json(errorResponse)
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

    const responseService = await createUserService(attributes)
    const responseWithUrl = addUrlToResponse(responseService.response, url)

    status = responseService.status
    return res.status(status).json(responseWithUrl)
  } catch (error) {
    const errorResponse = addUrlToResponse(JsonApiResponseError(error), url)
    return res.status(status).json(errorResponse)
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

    const responseService = await updateUserService(nombres, usuario)
    const responseWithUrl = addUrlToResponse(responseService.response, url)

    status = responseService.status
    return res.status(status).json(responseWithUrl)
  } catch (error) {
    const errorResponse = addUrlToResponse(JsonApiResponseError(error), url)
    return res.status(status).json(errorResponse)
  }
}
