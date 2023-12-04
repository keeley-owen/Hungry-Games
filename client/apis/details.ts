import request from 'superagent'

const rootUrl = '/api/v1/details'

export async function getLocationsDetailsApi(apiWinner: string) {
  console.log('client api', apiWinner)
  const response = await request.get(`${rootUrl}/${apiWinner}`)
  return response.body
}
