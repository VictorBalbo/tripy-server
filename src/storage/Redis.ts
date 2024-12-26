import RedisDB from 'ioredis'
import { redis_url } from '../constants'
import { Place } from '../models/Place'

export class Redis {
	private static client?: RedisDB
	private static ttl: number = 60*60*24 // 1 day

	public static getConnectionAsync = async () => {
		if (Redis.client && Redis.client.status === 'ready') {
			return Redis.client
		}

		if(Redis.client) {
			Redis.client.disconnect()
		}

		Redis.client = new RedisDB(redis_url!, {
			lazyConnect: true,
		})
		Redis.client.on('error', (error) => {
			if(error.message.includes('getaddrinfo ENOTFOUND')) {
				Redis.client?.disconnect()
			}
		})

		await Redis.client.connect()
		return Redis.client
	}
	public static findPlaceByIdAsync = async (placeId: string) => {
		let placeStr
		try {
			const redis = await Redis.getConnectionAsync()
			console.log()
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
			if(temp){
				await redis.set(place.placeId, placeStr, 'EX', Redis.ttl)
			} else {
				await redis.set(place.placeId, placeStr)
			}
			return true
		} catch (e) {
			console.log('Error on Set:', e)
			return false
		}
	}
}
