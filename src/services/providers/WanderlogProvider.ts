import { Coordinates, Place } from '../../models/Place'
import { GetWanderlogAutocompleteResponse, GetWanderlogPlaceDetailsResponse, GetWanderlogPlaceMetadataResponse } from '../../models/Wanderlog/'

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
			coordinates: placeDetails?.geometry.location
		}
		return place
	}

	static getLocationAutocomplete = async (name: string, coordinates: Coordinates, radius: number, token?: string) => {
		const URL = `https://wanderlog.com/api/placesAPI/autocomplete/v2?request={"input":"${name}","sessiontoken":"${token}","location":{"longitude":${coordinates.lng},"latitude":${coordinates.lat} },"radius":${radius},"language":"en"}`
		const responsePromise = await fetch(URL).then(data => data.json() as Promise<GetWanderlogAutocompleteResponse>)

		const autocomplete = responsePromise.data

		return autocomplete?.filter(a => a.place_id)?.map(a => {
			const place: Place = {
				_id: a.place_id ?? '',
				placeId: a.place_id ?? '',
				name: a.structured_formatting?.main_text,
				address: a.structured_formatting?.secondary_text,
				description: a.description,
			}
			return place
		})
	}
}
