import { Router } from 'express'
import { PlaceDetailService } from '../services/PlaceDetailService'

export const PlaceController = Router()
const getPlaceByIdUri = '/place/:id'
const getPlaceByNameUri = '/places/:name'

PlaceController.get(getPlaceByIdUri, async (req, res, next) => {
	try {
		const place = await PlaceDetailService.getPlaceById(req.params.id)
		res.json(place)
	} catch (e) {
		next(e)
	}
})

PlaceController.get(getPlaceByNameUri, async (req, res, next) => {
	try {
		const place = await PlaceDetailService.getPlaceByName(req.params.name)
		res.json(place)
	} catch (e) {
		next(e)
	}
})
