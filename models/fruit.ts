export interface Fruit {
  id: number
  name: string
}

export interface FruitData {
  name: string
}

export interface Result {
  formattedAddress: string
  geometry: Geometry
  placeID: string
  types: string[]
}
export interface Geometry {
  location: Location
  locationType: string
  viewport: Viewport
}

export interface Location {
  lat: number
  lng: number
}
