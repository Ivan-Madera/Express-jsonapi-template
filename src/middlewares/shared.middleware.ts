import { Codes } from '../utils/codeStatus'
import { ErrorSugestions } from '../utils/errorSugestions'
import { JsonApiResponseError } from '../utils/jsonApiResponse'

export const headerNoCache = (req: any, res: any, next: any): void => {
  const url = req.originalUrl
  const status = Codes.errorServer

  try {
    res.setHeader('Cache-Control', 'no-store')
    return next()
  } catch (error) {
    return res
      .status(status)
      .json(JsonApiResponseError(status, url, ErrorSugestions.generic, error))
  }
}
