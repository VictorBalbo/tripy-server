export interface GooglePlace {
	business_status: string
	formatted_address: string
	geometry: {
		location: {
			lat: number
			lng: number
		}
	}
	name: string
	opening_hours: {
		periods: [
			{
				close: {
					day: number
					time: string
				}
				open: {
					day: number
					time: string
				}
			}
		]
		weekday_text: string[]
	}
	photos: [
		{
			height: number
			photo_reference: string
			width: number
		}
	]
	rating: number
	url: string
}
