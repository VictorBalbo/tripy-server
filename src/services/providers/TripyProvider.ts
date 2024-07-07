import { Place } from '../../models/Place'
import { Redis } from '../../storage/Redis'

export class TripyProvider {
	static getPlaceById = async (placeId: string) => {
		const place = await Redis.findPlaceByIdAsync(placeId)

		return place
	}

	static setPlaceById = async (place: Place) => {
		await Redis.savePlaceAsync(place)
	}
}
