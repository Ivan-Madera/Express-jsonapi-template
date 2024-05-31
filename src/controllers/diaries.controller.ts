import { type Handler } from 'express'
import { createDiaries, getDiaries } from '../services/diaries.service'
import { Codes } from '../utils/CodeStatus'
import {
  JsonResponseApiData,
  JsonResponseApiError
} from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'
import { ErrorTitles } from '../utils/ErrorTitles'

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

    const responseService = createDiaries(attributes)

    status = Codes.success
    res
      .status(status)
      .json(JsonResponseApiData('diaries', responseService, url))
  } catch (error) {
    res
      .status(status)
      .json(
        JsonResponseApiError(
          status,
          url,
          ErrorSugestions.generic,
          ErrorTitles[status],
          error
        )
      )
  }
}
