export interface Place {
  _id: string
  placeId: string
  name?: string
  description?: string
  categories?: string[]
  address?: string
  rating?: number
  website?: string
  phoneNumber?: string
  images?: string[]
  businessStatus?: string
  mapsUrl?: string
  openingHours?: OpeningHours
}

export interface OpeningHours {
  periods: [{
    open: { day: number, time: string}
    close: { day: number, time: string}
  }]
  weekdayText: string[]
}