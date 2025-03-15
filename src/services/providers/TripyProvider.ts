import { DistanceBetweenPlaces, Place } from '../../models'
import { Redis } from '../../storage/Redis'

export class TripyProvider {
	static getPlaceById = async (placeId: string) => {
		const place = await Redis.findPlaceByIdAsync(placeId)

		return place
	}

	static setPlaceById = async (place: Place, temp: boolean) => {
		return await Redis.savePlaceAsync(place, temp)
	}

	static getDistanceAsync = async (placeId1: string, placeId2: string) => {
		const place = await Redis.findDistanceAsync(placeId1, placeId2)

		return place
	}

	static setDistanceAsync = async (distance: DistanceBetweenPlaces, temp: boolean) => {
		return await Redis.saveDistanceAsync(distance, temp)
	}
}
