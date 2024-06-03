import { validationResult } from 'express-validator'
import { Codes } from '../utils/CodeStatus'
import { JsonResponseApiValidator } from '../utils/JsonResponseApi'
import { ErrorSugestions } from '../utils/ErrorSugestions'

export const validateResult = (req: any, res: any, next: any): any => {
  const url = req.originalUrl
  const status = Codes.unprocessableContent

  try {
    validationResult(req).throw()
    return next()
  } catch (error: any) {
    const err = error.array().shift()
    const msg = `Valor invalido en ${err.path as string} dentro del ${
      err.location as string
    }`
    console.log()
    res
      .status(status)
      .json(JsonResponseApiValidator(status, url, ErrorSugestions.generic, msg))
  }
}
