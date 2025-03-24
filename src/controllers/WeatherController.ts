import { Router } from 'express'
import { TripService } from '../services/TripService'
import { WeatherService } from '../services/WeatherService'

export const WeatherController = Router()

const getTripByIdUri = '/weather/:destinationId'
WeatherController.get(getTripByIdUri, async (req, res, next) => {
	try {
		const destination = await TripService.getDestination(
			req.params.destinationId
		)
		const weather = await WeatherService.getWeather(destination)
		res.json(weather)
	} catch (e) {
		next(e)
	}
})
