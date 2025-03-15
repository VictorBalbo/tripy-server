import { Coordinates, Place } from '../models'
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
				console.log('Added place to cache from Wanderlog', placeId)
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

	static getDistanceBetweenPlaces = async (
		origin: Place,
		destination: Place
	) => {
		// Try get from Cache
		let distance = await TripyProvider.getDistanceAsync(
			origin.id,
			destination.id
		)
		if (distance) {
			return distance
		}

		// Get from Wanderlog
		distance = await WanderlogProvider.getDistanceBetweenPlaces(
			origin,
			destination
		)
		const addedToCache = await TripyProvider.setDistanceAsync(distance, false)
		if (addedToCache) {
			console.log(
				'Added distance to cache from Wanderlog',
				origin.id,
				destination.id
			)
		}
		return distance
	}
}
