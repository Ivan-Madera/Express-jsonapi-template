import env from './callEnv'

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API TEMPLATE JSONAPI',
      version: '1.0.0',
      description: 'API DOCUMENTACIÓN'
    },
    servers: [
      {
        url: env.ENV === 'production' ? '' : `http://127.0.0.1:${env.PORT}`
      }
    ]
  },
  apis: ['./src/routes/**/*.*']
}
