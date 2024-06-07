export interface GetPlaceByNameResponse {
	candidates: [
		{
			place_id: string
		}
	]
	status: string
}
