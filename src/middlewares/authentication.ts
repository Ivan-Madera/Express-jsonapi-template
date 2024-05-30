import { Codes } from '../utils/CodeStatus'
import env from '../config/callenv'
import { ErrorObject, ResponseMessage } from '../utils/JsonResponses'
import { verify } from 'jsonwebtoken'

export const checkAuth = (req: any, res: any, next: any): any => {
  let status = Codes.errorServer
  const message = 'No autorizado'

  try {
    const token = req.get('token')

    if (token === env.TOKEN) {
      return next()
    }

    status = Codes.unauthorized
    return res.status(status).json(ResponseMessage(message, status))
  } catch (error) {
    return res.status(status).json(ErrorObject(error, status))
  }
}

export const checkBearer = (req: any, res: any, next: any): any => {
  let status = Codes.unauthorized
  const message = 'No autorizado'

  try {
    const auth = req.get('Authorization')
    const secret = env.SECRET_KEY as string

    if (!auth || !secret || !auth.startsWith('Bearer ')) {
      status = Codes.unauthorized
      throw new Error('No autorizado')
    }

    const token = auth.slice(7)

    verify(token, secret, (error: any) => {
      if (error) {
        status = Codes.unauthorized
        throw new Error('No autorizado')
      }
    })

    return next()
  } catch (error) {
    return res.status(status).json(ResponseMessage(message, status))
  }
}
