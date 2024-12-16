import { type Handler } from 'express'
import { createDiaries, getDiaries } from '../services/diary.service'
import { Codes } from '../utils/codeStatus'
import { JsonApiResponseError } from '../utils/jsonApiResponse'
import { ErrorSugestions } from '../utils/errorSugestions'

export const diaries: Handler = (req, res) => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const responseService = getDiaries(url)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
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

    const responseService = createDiaries(url, attributes)

    status = responseService.status
    return res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
  }
}
