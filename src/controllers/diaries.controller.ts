import { type Handler } from 'express'
import { createDiariesService, getDiariesService } from '../application/services/diary.application.service'
import { Codes } from '../utils/codeStatus'
import { JsonApiResponseError } from '../utils/jsonApiResponses'

export const diaries: Handler = (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = getDiariesService(url)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    return res.status(status).json(JsonApiResponseError(error, url))
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

    const responseService = createDiariesService(url, attributes)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    return res.status(status).json(JsonApiResponseError(error, url))
  }
}
