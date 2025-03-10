import { Coordinates, Place } from '../../models'
import {
	GetWanderlogAutocompleteResponse,
	GetWanderlogPlaceDetailsResponse,
	GetWanderlogPlaceMetadataResponse,
	WanderlogPlaceDetails,
	WanderlogPlaceMetadata,
} from '../../models/Wanderlog/'

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

		let placeDetails: WanderlogPlaceDetails | undefined
		let placeMetadata: WanderlogPlaceMetadata | undefined
		try {
			const [placeDetailsResponse, placeMetadataResponse] = await Promise.all([
				detailsPromise,
				metadataPromise,
			])
			placeDetails = placeDetailsResponse?.data
			placeMetadata = placeMetadataResponse?.data?.find((p) => p)
		} catch (e) {
			console.error(e)
		}

		const place: Place = {
			id: placeId,
			name: placeMetadata?.name ?? placeDetails?.name,
			description:
				placeMetadata?.generatedDescription ?? placeMetadata?.description,
			categories:
				placeDetails?.types ??
				placeDetails?.address_components.find(
					(a) => a.long_name === placeDetails.name
				)?.types ??
				placeMetadata?.categories,
			address: placeMetadata?.address ?? placeDetails?.formatted_address,
			vicinity: placeDetails?.vicinity,
			rating: placeMetadata?.rating,
			website: placeMetadata?.website ?? placeDetails?.website,
			phoneNumber:
				placeMetadata?.internationalPhoneNumber ??
				placeDetails?.international_phone_number,
			images: placeMetadata?.imageKeys,
			businessStatus: placeDetails?.business_status,
			openingHours: placeDetails?.opening_hours,
			mapsUrl: placeDetails?.url,
			coordinates: placeDetails?.geometry.location,
		}
		place.categories = place.categories?.map(this.snakeToPascalCase)
		if (!place.name || !place.coordinates) {
			return
		}
		return place
	}

	static getLocationAutocomplete = async (
		name: string,
		coordinates: Coordinates,
		radius: number,
		token?: string
	) => {
		const URL = `https://wanderlog.com/api/placesAPI/autocomplete/v2?request={"input":"${name}","sessiontoken":"${token}","location":{"longitude":${coordinates.lng},"latitude":${coordinates.lat} },"radius":${radius},"language":"en"}`
		const responsePromise = await fetch(URL).then(
			(data) => data.json() as Promise<GetWanderlogAutocompleteResponse>
		)

		const autocomplete = responsePromise.data

		return autocomplete
			?.filter((a) => a.place_id)
			?.map((a) => {
				const place: Place = {
					id: a.place_id ?? '',
					name: a.structured_formatting?.main_text,
					address: a.structured_formatting?.secondary_text,
					description: a.description,
				}
				return place
			})
	}

	private static snakeToPascalCase(snake: string) {
		return snake
			.split('_') // Split by underscores
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
			.join(' ') // Join without spaces
	}
}
