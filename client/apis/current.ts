import request from 'superagent'
import { Location } from '../../models/fruit'
import apiQuery from '../components/Home'

const rootUrl = '/api/v1/current/apiQuery'

export async function getCurrentLocationApi(apiQuery) {
  const response = await request.get(`${rootUrl}/${apiQuery}`)
  return response.body
}
