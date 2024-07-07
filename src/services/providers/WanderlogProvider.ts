import { Place } from '../../models/Place'
import { GetWanderlogPlaceDetailsResponse } from '../../models/Wanderlog/'
import { GetWanderlogPlaceMetadataResponse } from '../../models/Wanderlog/'

export class WanderlogProvider {
	static getPlaceById = async (placeId: string) => {
		const URL_PLACE_DETAILS = `https://wanderlog.com/api/placesAPI/getPlaceDetails/v2?placeId=${placeId}&language=en-US`
		const URL_PLACE_METADATA = `https://wanderlog.com/api/places/metadata?placeIds=${placeId}&getDetails=true`

		const detailsPromise = fetch(URL_PLACE_DETAILS).then(
			(data) => data.json() as Promise<GetWanderlogPlaceDetailsResponse>
		)
		const metadataPromise = fetch(URL_PLACE_METADATA).then(
			(data) => data.json() as Promise<GetWanderlogPlaceMetadataResponse>
		)

		const [placeDetailsResponse, placeMetadataResponse] = await Promise.all([
			detailsPromise,
			metadataPromise,
		])

		const placeDetails = placeDetailsResponse?.data
		const placeMetadata = placeMetadataResponse?.data?.find(p => p)

		const place: Place = {
			_id: placeId,
			placeId: placeId,
			name: placeMetadata?.name ?? placeDetails?.name,
			description:
				placeMetadata?.generatedDescription ?? placeMetadata?.description,
			categories: placeMetadata?.categories,
			address: placeMetadata?.address ?? placeDetails?.formatted_address,
			rating: placeMetadata?.rating,
			website: placeMetadata?.website ?? placeDetails?.website,
			phoneNumber:
				placeMetadata?.internationalPhoneNumber ??
				placeDetails?.international_phone_number,
			images: placeMetadata?.imageKeys,
			businessStatus: placeDetails?.business_status,
			openingHours: placeDetails?.opening_hours,
			mapsUrl: placeDetails?.url,
		}
		return place
	}
}
