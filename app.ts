import serverless from 'serverless-http'
import { server } from './src/config/server'
server.listen()
export const handler = serverless(server.app)
