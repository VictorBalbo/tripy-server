import express from 'express'
import cors from 'cors'
import { PlaceController, TripController } from './controllers'
import { port, environment } from './constants'
import { getDatabaseConnection } from './storage'
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

// Start Server if not on test env
if (environment !== 'Test') {
	App.listen(port, () => {
		console.log(`[Server]: I am running at http://localhost:${port}`)
	})
}
