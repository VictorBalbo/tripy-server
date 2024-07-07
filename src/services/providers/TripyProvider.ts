import { Place } from '../../models/Place'
import { MongoDb } from '../../repositories/MongoDb'
import { createCache, memoryStore } from 'cache-manager'

export class TripyProvider {
	private static memoryCache = createCache(
		memoryStore({
			max: 100,
			ttl: 60 * 60 * 24 * 1000,
		})
	)

	static getPlaceById = async (placeId: string) => {
		let place = await TripyProvider.memoryCache.get<Place>(placeId)
		if (!place) {
			place = await MongoDb.findPlaceByIdAsync(placeId)
			if (place) {
				TripyProvider.memoryCache.set(placeId, place)
				console.log('Added to cache from Tripy', placeId)
			}
		}

		return place as Place
	}

	static setPlaceById = async (place: Place) => {
		await TripyProvider.memoryCache.set(place.placeId, place)
		await MongoDb.savePlaceAsync(place)
	}
}
