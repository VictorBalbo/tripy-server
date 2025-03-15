export interface WanderlogDistaceBetweenPlaces {
  driving: Distance
  transit: Distance
  walking: Distance
}

interface Distance {
  fromPlaceId: string
  toPlaceId: string
  travelMode: string
  route: Route
}

interface Route {
  distance: RouteDistance
  duration: RouteDistance
  polyline: string
}

interface RouteDistance {
  value: number
  text: string
}