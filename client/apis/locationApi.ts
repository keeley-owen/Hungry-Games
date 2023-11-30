import request from 'superagent'
import { Location } from '../../models/fruit'
import apiQuery from '../components/Home'

const rootUrl = '/api/v1'

export function getFruits(): Promise<string[]> {
  return request.get(rootUrl + '/fruits').then((res) => {
    return res.body.fruits
  })
}

export async function getCurrentLocationApi(): Promise<Location[]> {
  const response = await request.get(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?address=${apiQuery}`,
  )
  return response.body.results.geometry.location
}
