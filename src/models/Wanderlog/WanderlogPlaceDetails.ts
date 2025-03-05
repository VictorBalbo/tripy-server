export interface WanderlogPlaceDetails {
	place_id: string
	business_status: string
	formatted_address: string
	vicinity: string
	international_phone_number: string
	address_components: AddressComponent[]
	name: string
	opening_hours: OpeningHours
	url: string
	website: string
	geometry: {
		location: {
			lat: number,
			lng: number,
		}
	}
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface OpeningHours {
  periods: [{
    open: { day: number, time: string}
    close: { day: number, time: string}
  }]
  weekdayText: string[]
}