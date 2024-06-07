import express from 'express'
import cors from 'cors'
import { PlaceController } from './controllers/PlaceController'
import { port, environment } from './constants'

export const App = express()

// Middlewares
App.use(express.json())
App.use(cors())

// Routes
App.get('/', (req, res) => {
	res.send(
		'The API is running. Run the API locally and see the docs at <a href="http://localhost:3000/docs">http://localhost:3000/docs</a>'
	)
})

App.use(PlaceController)

// Start Server if not on test env
if (environment !== 'Test') {
	App.listen(port, () => {
		console.log(`[Server]: I am running at http://localhost:${port}`)
	})
}
