import { GOOGLE_MAPS_KEY } from '../../constants'
import { GetPlaceByIdResponse } from '../../models/GoogleResponses/GetPlaceByIdResponse'
import { GetPlaceByNameResponse } from '../../models/GoogleResponses/GetPlaceByNameResponse'

export class GoogleProvider {
	static fieldsToGet =
		'formatted_address,name,geometry,photo,business_status,url,opening_hours,rating'

	static getPlaceById = async (placeId: string) => {
		const URL_FIND_PLACE = `https://maps.googleapis.com/maps/api/place/details/json?fields=${encodeURI(
			this.fieldsToGet
		)}&place_id=${placeId}&key=${GOOGLE_MAPS_KEY}`
		const response = await fetch(URL_FIND_PLACE)
		const data = await response.json() as GetPlaceByIdResponse
		return data.result
	}

	static getPlaceByName = async (name: string) => {
		const URL_FIND_PLACE = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=${name}&key=${GOOGLE_MAPS_KEY}`
		const response = await fetch(URL_FIND_PLACE)
		const data = await response.json() as GetPlaceByNameResponse
		if (data.candidates.length) {
			return data.candidates
				.filter(c => !c.place_id)
				.map(c => c.place_id)
		}
		return []
	}
}
