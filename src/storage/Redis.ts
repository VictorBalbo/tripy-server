import RedisDB from 'ioredis'
import { redis_connection_string } from '../constants'
import { Place } from '../models/Place'

export class Redis {
	private static client?: RedisDB

	public static connectAsync = async () => {
		if (Redis.client) {
			return
		}
		Redis.client = new RedisDB(redis_connection_string!)
	}
	public static findPlaceByIdAsync = async (placeId: string) => {
		await Redis.connectAsync()
		const placeStr = await Redis.client?.get(placeId)
		if (placeStr) {
			return JSON.parse(placeStr) as Place
		} else {
			return undefined
		}
	}

	public static savePlaceAsync = async (place: Place) => {
		await Redis.connectAsync()
		const placeStr = JSON.stringify(place)
		await Redis.client?.set(place.placeId, placeStr)
	}
}
