import { config } from 'dotenv'

config()
export const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY
export const port = process.env.PORT ?? 3000
export const environment = process.env.ENV ?? 'Development'
export const db_host = process.env.DB_HOST
export const db_name = process.env.DB_NAME
export const db_username = process.env.DB_USERNAME
export const db_password = process.env.DB_PASSWORD

export const redis_connection_string = process.env.REDIS_CONNECTION_STRING
