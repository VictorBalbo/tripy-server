import { Coordinates } from './Coordinates'
export class Place {
	id: string

	name: string

	coordinates?: Coordinates

	address?: string

	description?: string

	categories?: string[]

	vicinity?: string

	rating?: number

	website?: string

	phoneNumber?: string

	images?: string[]

	businessStatus?: string

	mapsUrl?: string

	openingHours?: OpeningHours
}

export interface OpeningHours {
	periods: [
		{
			open: { day: number; time: string }
			close: { day: number; time: string }
		}
	]
	weekdayText: string[]
}
