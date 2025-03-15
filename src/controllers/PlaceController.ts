import { Router } from 'express'
import { PlaceDetailService } from '../services/PlaceDetailService'
import { Coordinates } from '../models'

export const PlaceController = Router()

const getPlaceByIdUri = '/place/:id'
PlaceController.get(getPlaceByIdUri, async (req, res, next) => {
	try {
		const t0 = performance.now()
		console.log('Request', req.params.id)
		const place = await PlaceDetailService.getPlaceById(req.params.id, true)
		res.json(place)
		const t1 = performance.now()
		console.log('Response', t1 - t0)
	} catch (e) {
		next(e)
	}
})

const getPlaceAutocompleteUri = '/places/autocomplete/:name'
PlaceController.get(getPlaceAutocompleteUri, async (req, res, next) => {
	try {
		const name = req.params.name
		const coordinates: Coordinates = {
			lat: parseFloat(req.query.lat as string),
			lng: parseFloat(req.query.lng as string),
		}
		const radius = parseFloat(req.query.radius as string)
		const token = (req.query.token as string) ?? self.crypto.randomUUID()

		const place = await PlaceDetailService.getLocationAutocomplete(
			name,
			coordinates,
			radius,
			token
		)
		res.json(place)
	} catch (e) {
		next(e)
	}
})

const getPlaceByNameUri = '/places/:name'
PlaceController.get(getPlaceByNameUri, async (req, res, next) => {
	try {
		const place = await PlaceDetailService.getPlaceByName(req.params.name)
		res.json(place)
	} catch (e) {
		next(e)
	}
})

const getDistanceBetweenPlacesUri = '/distance/:originId/:destinationId'
PlaceController.get(getDistanceBetweenPlacesUri, async (req, res, next) => {
	try {
		const origin = await PlaceDetailService.getPlaceById(req.params.originId, true)
		const destination = await PlaceDetailService.getPlaceById(req.params.destinationId, true)
		const distance = await PlaceDetailService.getDistanceBetweenPlaces(origin, destination)
		console.log(distance)
		res.json(distance)
	} catch (e) {
		next(e)
	}
})
