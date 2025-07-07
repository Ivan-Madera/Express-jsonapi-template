import express, { type Application } from 'express'
import cors from 'cors'
import { Diaries } from '../routes/diaries.routes'
import { Users } from '../routes/users.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger'
import { sequelize } from '../database/config'
import helmet from 'helmet'
import env from './callEnv'
import { LogInfo } from '../utils/logger'
import { baseRoute, headerNoCache } from '../middlewares/shared.middleware'
import { helmetContentSecurityPolicy, helmetTransportSecurity } from './helmet'

class Server {
  public app: Application
  public service: Application
  readonly pathV1 = '/api/v1'

  constructor() {
    // file deepcode ignore UseCsurfForExpress
    this.app = express()
    this.service = this.app
    this.configuration()
    this.middlewares()
    this.swagger()
    this.routes()
  }

  configuration(): void {
    this.app.set('port', env.PORT)
    this.app.use(helmet())
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet.frameguard({ action: 'deny' }))
    this.app.use(helmet.hsts(helmetTransportSecurity))
    this.app.use(helmet.contentSecurityPolicy(helmetContentSecurityPolicy))
  }

  middlewares(): void {
    this.app.use(cors())
    this.app.use(headerNoCache)
    this.app.use(express.json({ type: 'application/vnd.api+json' }))
    this.app.use(express.urlencoded({ extended: true }))
  }

  swagger(): void {
    if (env.ENV !== 'production') {
      this.app.use(
        '/docs',
        swaggerUI.serve,
        swaggerUI.setup(swaggerJSDoc(options))
      )
    }
  }

  routes(): void {
    this.app.use(this.pathV1, Diaries)
    this.app.use(this.pathV1, Users)
  }

  listen(): void {
    this.app.get('/', baseRoute)

    this.app.listen(env.PORT, () => {
      env.ENV === 'production'
        ? LogInfo(`Server running in ${env.ENV} environment`)
        : LogInfo(`Server listening on http://127.0.0.1:${env.PORT}/docs`)
    })
  }

  getService(): Application {
    return this.service
  }

  async close(): Promise<void> {
    await sequelize.close()
  }
}

export const server = new Server()
