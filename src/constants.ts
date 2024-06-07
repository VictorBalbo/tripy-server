import { config } from 'dotenv'

config()
export const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY
export const port = process.env.PORT ?? 3000
export const environment = process.env.ENV ?? 'Development'
