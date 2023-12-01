export interface Result {
  formattedAddress: string
  geometry: Geometry
  placeID: string
  types: string[]
}
export interface Geometry {
  location: Location
  locationType: string
}

export interface Location {
  lat: number
  lng: number
}

export interface Details {
  name: string
  id: string
  types: string[]
  nationalPhoneNumber: string
  internationalPhoneNumber: string
  formattedAddress: string
  addressComponents: AddressComponent[]
  location: Location
  rating: number
  googleMapsURI: string
  websiteURI: string
  regularOpeningHours: OpeningHours
  businessStatus: string
  iconMaskBaseURI: string
  iconBackgroundColor: string
  displayName: DisplayName
  currentOpeningHours: OpeningHours
  shortFormattedAddress: string
}

export interface AddressComponent {
  longText: string
  shortText: string
  types: string[]
  languageCode: string
}

export interface OpeningHours {
  openNow: boolean
  periods: Period[]
  weekdayDescriptions: string[]
}

export interface Period {
  open: Close
  close: Close
}

export interface Close {
  day: number
  hour: number
  minute: number
  date?: DateClass
}

export interface DateClass {
  year: number
  month: number
  day: number
}

export interface DisplayName {
  text: string
  languageCode: LanguageCode
}

export enum LanguageCode {
  En = 'en',
}
