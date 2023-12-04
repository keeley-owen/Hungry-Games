import request from 'superagent'
import type { customLocations } from '../../models/customLocation'

export async function getAllLocations() {
  const response = await request.get('/api/v1/customlocations/')
  return response.body as customLocations[]
}

export async function addLocationByName(locationName: string) {
  const response = await request
    .post('/api/v1/customlocations/')
    .send({ locationName })
  return response.body as customLocations
}

export async function deleteLocationByName(
  locationName: string,
): Promise<void> {
  await request.delete(`/api/v1/customlocations/${locationName}`)
}
