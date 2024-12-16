import env from '../config/callEnv'
import { Codes } from '../utils/codeStatus'
import { ErrorSugestions } from '../utils/errorSugestions'
import { JsonApiResponseError } from '../utils/jsonApiResponse'
import { verify } from 'jsonwebtoken'

export const jsonApiValidator = (req: any, res: any, next: any): any => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const content = req.get('Content-Type')

    if (content === 'application/vnd.api+json') {
      return next()
    }

    status = Codes.unsupportedMedia
    throw new Error('El header Content-type es incorrecto')
  } catch (error) {
    return res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
  }
}

export const checkAuth = (req: any, res: any, next: any): any => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const token = req.get('token')

    if (token === env.TOKEN) {
      return next()
    }

    status = Codes.unauthorized
    throw new Error('Usuario no autorizado')
  } catch (error) {
    return res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
  }
}

export const checkBearer = (req: any, res: any, next: any): any => {
  const url = req.originalUrl
  let status = Codes.errorServer

  try {
    const auth = req.get('Authorization')
    const secret = env.SECRET_KEY

    if (!auth || !secret || !auth.startsWith('Bearer ')) {
      status = Codes.unauthorized
      throw new Error('Usuario no autorizado')
    }

    const token = auth.slice(7)

    verify(token, secret, (error: any) => {
      if (error) {
        status = Codes.unauthorized
        throw new Error('Usuario no autorizado')
      }
    })

    return next()
  } catch (error) {
    return res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
  }
}
