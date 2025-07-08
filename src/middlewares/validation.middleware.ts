import { validationResult } from 'express-validator'
import { Codes } from '../utils/codeStatus'
import { JsonApiResponseValidator } from '../utils/jsonApiResponse'

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
    res.status(status).json(JsonApiResponseValidator(url, msg))
  }
}
