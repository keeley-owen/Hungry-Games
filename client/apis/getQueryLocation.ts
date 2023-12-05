import request from 'superagent'

const rootUrl = 'api/v1/queryLocation'

export async function getQueryLocationApi(apiQuery: string) {
  const response = await request.get(`${rootUrl}/${apiQuery}`)
  return response.body
}
