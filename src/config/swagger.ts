import { env } from './callenv'

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API TEMPLATE',
      version: '1.0.0',
      description: 'API DOCUMENTACIÓN'
    },
    servers: [
      {
        url:
          env.ENV === 'production'
            ? ''
            : `http://127.0.0.1:${env.PORT as string}`
      }
    ]
  },
  apis: ['./src/routes/**/*.*']
}
