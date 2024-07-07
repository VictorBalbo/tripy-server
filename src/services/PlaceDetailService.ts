import { GoogleProvider } from './providers/GoogleProvider'
import { TripyProvider } from './providers/TripyProvider'
import { WanderlogProvider } from './providers/WanderlogProvider'

export class PlaceDetailService {
	static getPlaceById = async (placeId: string) => {
		let place = await TripyProvider.getPlaceById(placeId)

		if (!place) {
			place = await WanderlogProvider.getPlaceById(placeId)
			if (place) {
				await TripyProvider.setPlaceById(place)
				console.log('Added to cache from Wanderlog', placeId)
			}
		}
		return place
	}

	static getPlaceByName = async (name: string) => {
		const placeId = await GoogleProvider.getPlaceByName(name)
		if (placeId) {
			return this.getPlaceById(placeId)
		}
	}
}
