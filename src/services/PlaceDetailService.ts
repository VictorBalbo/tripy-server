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
		const placesId = await GoogleProvider.getPlaceByName(name)
		const placesPromise = placesId.map(p => this.getPlaceById(p))
		const places = await Promise.all(placesPromise)
		return places
	}
}
