import { Coordinates } from '../models/Place'
import { GoogleProvider } from './providers/GoogleProvider'
import { TripyProvider } from './providers/TripyProvider'
import { WanderlogProvider } from './providers/WanderlogProvider'

export class PlaceDetailService {
	static getPlaceById = async (placeId: string, temp = false) => {
		let place = await TripyProvider.getPlaceById(placeId)

		if (!place) {
			place = await WanderlogProvider.getPlaceById(placeId)
			if (place) {
				await TripyProvider.setPlaceById(place, temp)
				console.log('Added to cache from Wanderlog', placeId)
			}
		}
		return place
	}

	static getPlaceByName = async (name: string) => {
		const placesId = await GoogleProvider.getPlaceByName(name)
		const placesPromise = placesId.map(p => this.getPlaceById(p, true))
		const places = await Promise.all(placesPromise)
		return places
	}

	static getLocationAutocomplete = async (name: string, coordinates: Coordinates, radius: number, token?: string) => {
		let places = await WanderlogProvider.getLocationAutocomplete(name, coordinates, radius, token)
		// if(!places?.length) {
		// 	const placesId = await GoogleProvider.getPlaceByName(name)
		// 	const placesPromise = placesId.map(p => this.getPlaceById(p, true))
		// 	places = await Promise.all(placesPromise)
		// }
		return places
	}
}
