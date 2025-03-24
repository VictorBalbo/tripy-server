import express from 'express'
import cors from 'cors'
import {
	PlaceController,
	TripController,
	WeatherController,
} from './controllers'
import { port, environment } from './constants'
import { getDatabaseConnection } from './storage'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
process.env.TZ = 'UTC'

export const App = express()

// Middlewares
App.use(express.json())
App.use(cors())

// Database connection
getDatabaseConnection()

// Routes
App.get('/', (req, res) => {
	res.send(
		'The API is running. Run the API locally and see the docs at <a href="http://localhost:3000/docs">http://localhost:3000/docs</a>'
	)
})

App.use(PlaceController)
App.use(TripController)
App.use(WeatherController)

// Start Server if not on test env
if (environment !== 'Test') {
	App.listen(port, () => {
		console.log(`[Server]: I am running at http://localhost:${port}`)
	})
}
