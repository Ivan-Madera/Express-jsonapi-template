import { type Handler } from 'express'
import { createDiaries, getDiaries } from '../services/diaries.service'
import { Codes } from '../utils/codeStatus'
import { JsonApiResponseError, addUrlToResponse } from '../utils/jsonApiResponses'

export const diaries: Handler = (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = getDiaries()
    const responseWithUrl = addUrlToResponse(responseService.response, url)

    status = responseService.status
    return res.status(status).json(responseWithUrl)
  } catch (error) {
    const errorResponse = addUrlToResponse(JsonApiResponseError(error), url)
    return res.status(status).json(errorResponse)
  }
}

export const diariesCreate: Handler = (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const {
      body: {
        data: { attributes }
      }
    } = req

    const responseService = createDiaries(attributes)
    const responseWithUrl = addUrlToResponse(responseService.response, url)

    status = responseService.status
    return res.status(status).json(responseWithUrl)
  } catch (error) {
    const errorResponse = addUrlToResponse(JsonApiResponseError(error), url)
    return res.status(status).json(errorResponse)
  }
}
