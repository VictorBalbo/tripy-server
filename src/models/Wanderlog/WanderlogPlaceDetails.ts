export interface WanderlogPlaceDetails {
	place_id: string
	business_status: string
	formatted_address: string
	vicinity: string
	international_phone_number: string
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

export interface OpeningHours {
  periods: [{
    open: { day: number, time: string}
    close: { day: number, time: string}
  }]
  weekdayText: string[]
}