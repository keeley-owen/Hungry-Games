import request from 'superagent'

const rootUrl = '/api/v1/maps/'
export async function getNearByLocations(locations: any) {
  console.log(locations)
  try {
    const locationsObj = {
      location: locations.key,
      radius: locations.radius,
    }
    const response = await request.post(rootUrl).send(locationsObj)
    return response
  } catch (error) {
    console.error('Error fetching nearby locations:', error)
    throw error
  }
}