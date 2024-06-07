export interface WanderlogPlaceMetadata {
  id: number
  name: string
  placeId: string
  description: string
  generatedDescription: string
  categories: string[]
  hasDetails: boolean
  address: string
  rating: number
  tripadvisorRating: number
  website: string
  internationalPhoneNumber: string
  imageKeys: string[]
  permanentlyClosed: boolean
}