import RedisDB from 'ioredis'
import { redis_url } from '../constants'
import { DistanceBetweenPlaces, Place } from '../models'

export class Redis {
	private static client?: RedisDB
	private static ttl: number = 60 * 60 * 24 // 1 day
	private static placePrefix: string = 'place'
	private static transportationPrefix: string = 'transport'

	public static getConnectionAsync = () => {
		if (!this.client) {
			this.client = new RedisDB(redis_url!)
			console.log('Connecting Redis')
		}
		return this.client
	}

	public static findPlaceByIdAsync = async (placeId: string) => {
		const key = `${this.placePrefix}:${placeId}`
		const place = await this.getByKeyAsync<Place>(key)
		return place
	}

	public static savePlaceAsync = async (place: Place, temp: boolean) => {
		const key = `${this.placePrefix}:${place.id}`
		const isSuccess = await this.setByKeyAsync(key, place, temp)
		return isSuccess
	}

	public static findDistanceAsync = async (
		placeId1: string,
		placeId2: string
	) => {
		const key = `${this.transportationPrefix}:${placeId1}-${placeId2}`
		const place = await this.getByKeyAsync<DistanceBetweenPlaces>(key)
		return place
	}

	public static saveDistanceAsync = async (
		distance: DistanceBetweenPlaces,
		temp: boolean
	) => {
		const key = `${this.transportationPrefix}:${distance.fromPlaceId}-${distance.toPlaceId}`
		const isSuccess = await this.setByKeyAsync(key, distance, temp)
		return isSuccess
	}

	private static getByKeyAsync = async <T>(key: string) => {
		let placeStr
		try {
			const redis = Redis.getConnectionAsync()
			placeStr = await redis.get(key)
			if (placeStr) {
				return JSON.parse(placeStr) as T
			}
		} catch (e) {
			console.log('Error on Find:', e)
		}
		return
	}

	private static setByKeyAsync = async <T>(
		key: string,
		value: T,
		temp: boolean
	) => {
		try {
			const redis = await Redis.getConnectionAsync()
			const valueStr = JSON.stringify(value)
			if (temp) {
				await redis.set(key, valueStr, 'EX', Redis.ttl)
			} else {
				await redis.set(key, valueStr)
			}
			return true
		} catch (e) {
			console.log('Error on Set:', e)
			return false
		}
	}
}
