import { Coordinates } from '../models'
import { GoogleProvider, TripyProvider, WanderlogProvider } from './providers'

export class PlaceDetailService {
	static getPlaceById = async (placeId: string, temp = false) => {
		// Try get from Cache
		let place = await TripyProvider.getPlaceById(placeId)
		if (place) {
			return place
		}

		// Get from Wanderlog
		place = await WanderlogProvider.getPlaceById(placeId)
		if (place) {
			const addedToCache = await TripyProvider.setPlaceById(place, temp)
			if (addedToCache) {
				console.log('Added to cache from Wanderlog', placeId)
			}
		}

		return place
	}

	static getPlaceByName = async (name: string) => {
		const placesId = await GoogleProvider.getPlaceByName(name)
		const placesPromise = placesId.map((p) => this.getPlaceById(p, true))
		const places = await Promise.all(placesPromise)
		return places
	}

	static getLocationAutocomplete = async (
		name: string,
		coordinates: Coordinates,
		radius: number,
		token?: string
	) => {
		const places = await WanderlogProvider.getLocationAutocomplete(
			name,
			coordinates,
			radius,
			token
		)
		// if(!places?.length) {
		// 	const placesId = await GoogleProvider.getPlaceByName(name)
		// 	const placesPromise = placesId.map(p => this.getPlaceById(p, true))
		// 	places = await Promise.all(placesPromise)
		// }
		return places
	}
}
