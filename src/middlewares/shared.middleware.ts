import { Codes } from '../utils/codeStatus'
import { JsonApiResponseError } from '../utils/jsonApiResponses'

export const baseRoute = (_req: any, res: any, _next: any): void => {
  return res.send(`
    <h1
      style="
        text-align: center;
        color: #4CAF50;
        font-family: Arial,
        sans-serif; font-size: 36px;
        background-color: #e8f5e9;
        padding: 20px; border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    ">
      ¡El servicio está funcionando correctamente! 🎉
    </h1>`)
}

export const headerNoCache = (req: any, res: any, next: any): void => {
  const url = req.originalUrl
  const status = Codes.errorServer

  try {
    res.setHeader('Cache-Control', 'no-store')
    return next()
  } catch (error) {
    return res.status(status).json(JsonApiResponseError(error, url))
  }
}
