import request from 'superagent'
import type { customLocations } from '../../models/customLocations'

// const rootUrl = '/api/v1/custom/'
export async function getAllCustomLocations() {
  const response = await request.get('/api/v1/custom')
  return response.body as customLocations[]
}

export async function addLocationByName(locationName: string) {
  const response = await request.post('/api/v1/custom').send({ locationName })
  return response.body as customLocations
}

export async function deleteLocationByName(
  locationName: string,
): Promise<void> {
  await request.delete(`/api/v1/custom/${locationName}`)
}
