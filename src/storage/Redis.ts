import RedisDB from 'ioredis'
import { redis_url } from '../constants'
import { Place } from '../models'

export class Redis {
	private static client?: RedisDB
	private static ttl: number = 60 * 60 * 24 // 1 day

	public static getConnectionAsync = () => {
		if (!this.client) {
			this.client = new RedisDB(redis_url!)
			console.log('Connecting Redis')
		}
		return this.client
	}

	public static findPlaceByIdAsync = async (placeId: string) => {
		let placeStr
		try {
			const redis = Redis.getConnectionAsync()
			placeStr = await redis.get(placeId)
		} catch (e) {
			console.log('Error on Find:', e)
			return undefined
		}
		if (placeStr) {
			return JSON.parse(placeStr) as Place
		} else {
			return undefined
		}
	}

	public static savePlaceAsync = async (place: Place, temp: boolean) => {
		try {
			const redis = await Redis.getConnectionAsync()
			const placeStr = JSON.stringify(place)
			if (temp) {
				await redis.set(place.id, placeStr, 'EX', Redis.ttl)
			} else {
				await redis.set(place.id, placeStr)
			}
			return true
		} catch (e) {
			console.log('Error on Set:', e)
			return false
		}
	}
}
