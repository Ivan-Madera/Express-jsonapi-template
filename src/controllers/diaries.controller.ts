import { type Handler } from 'express'
import { createDiaries, getDiaries } from '../services/diaries.service'
import { Codes } from '../utils/CodeStatus'
import { JsonResponseApiError } from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'

export const diaries: Handler = (req, res) => {
  return res.send(getDiaries())
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
    res.status(status).json(responseService.response)
  } catch (error) {
    res
      .status(status)
      .json(JsonResponseApiError(status, url, ErrorSugestions.generic, error))
  }
}
