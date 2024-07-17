import dotenv from 'dotenv'
dotenv.config()

export const env = {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  TOKEN: process.env.TOKEN,
  SECRET_KEY: process.env.SECRET_KEY
}
