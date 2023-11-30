import request from 'superagent'
import { Location } from '../../models/fruit'


const rootUrl = '/api/v1/current'

export async function getCurrentLocationApi(apiQuery: string) {
  const response = await request.get(`${rootUrl}/${apiQuery}`)
  return response.body
}
