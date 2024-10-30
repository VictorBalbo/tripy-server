import RedisDB from 'ioredis'
import { redis_url } from '../constants'
import { Place } from '../models/Place'

export class Redis {
	private static client?: RedisDB
	private static ttl: number = 60*60*24 // 1 day

	public static connectAsync = async () => {
		if (Redis.client) {
			return
		}
		Redis.client = new RedisDB(redis_url!)
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

	public static savePlaceAsync = async (place: Place, temp: boolean) => {
		await Redis.connectAsync()
		const placeStr = JSON.stringify(place)
		if(temp){
			await Redis.client?.set(place.placeId, placeStr, 'EX', Redis.ttl)
		} else {
			await Redis.client?.set(place.placeId, placeStr)
		}
	}
}
