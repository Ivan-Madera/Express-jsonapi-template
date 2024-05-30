import env from './../config/callenv'
import { Sequelize } from 'sequelize'

const DB_PORT = parseInt(env.DB_PORT as string)

export const sequelize = new Sequelize(
  `${env.DB_DATABASE as string}`,
  `${env.DB_USERNAME as string}`,
  `${env.DB_PASSWORD as string}`,
  {
    host: `${env.DB_HOST as string}`,
    port: DB_PORT,
    dialect: 'mysql',
    logging: console.log
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexion exitosa')
  })
  .catch((error) => {
    console.log('Conexion fallida:', error)
  })
