import { Router } from 'express'
import { TripService } from '../services/TripService'

export const TripController = Router()

const setTripUri = '/trip'
TripController.post(setTripUri, async (req, res, next) => {
	try {
		const place = await TripService.setTrip(req.body)
		res.json(place)
	} catch (e) {
		next(e)
	}
})

const getTripByIdUri = '/trip/:id'
TripController.get(getTripByIdUri, async (req, res, next) => {
	try {
		const place = await TripService.getTrip(req.params.id)
		res.json(place)
	} catch (e) {
		next(e)
	}
})
