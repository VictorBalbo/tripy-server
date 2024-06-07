import { GoogleProvider } from './providers/GoogleProvider'
import { WanderlogProvider } from './providers/WanderlogProvider'

export class PlaceDetailService {
	static getPlaceById = async (placeId: string) => {
		return await WanderlogProvider.getPlaceById(placeId)
	}

	static getPlaceByName = async (name: string) => {
		const placeId = await GoogleProvider.getPlaceByName(name)
		if (placeId) {
			return this.getPlaceById(placeId)
		}
	}
}
