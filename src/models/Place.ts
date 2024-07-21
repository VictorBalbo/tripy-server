export interface Place {
  _id: string
  placeId: string
  name?: string
  description?: string
  categories?: string[]
  address?: string
  vicinity?: string
  rating?: number
  website?: string
  phoneNumber?: string
  images?: string[]
  businessStatus?: string
  mapsUrl?: string
  openingHours?: OpeningHours
  coordinates?: Coordinates
}

export interface OpeningHours {
  periods: [{
    open: { day: number, time: string}
    close: { day: number, time: string}
  }]
  weekdayText: string[]
}
export interface Coordinates {
  lat: number
  lng: number
}