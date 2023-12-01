import request from 'superagent'

const rootUrl = '/api/v1/details'

export async function getLocationsDetailsApi(apiWinner: string) {
  try {
    apiWinner.obj = {
      apiWinner:apiWinner
    }
    const response = (await request.post(rootUrl).send(apiWinner))
    return response.body
  } catch (error) {
    console.error('details.ts (client) is sad uWu', error)
    throw error
  }
}
