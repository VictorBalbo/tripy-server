import { Place } from '../../models'
import { Redis } from '../../storage/Redis'

export class TripyProvider {
	static getPlaceById = async (placeId: string) => {
		const place = await Redis.findPlaceByIdAsync(placeId)

		return place
	}

	static setPlaceById = async (place: Place, temp: boolean) => {
		return await Redis.savePlaceAsync(place, temp)
	}
}
