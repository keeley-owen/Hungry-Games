import request from 'superagent'



const rootUrl = "/api/v1/maps/:locations"
export async function getNearByLocations(locations){
  const response = await request.get(`${rootUrl}/${locations}`)
  // const response = await request.get('https://pokeapi.co/api/v2/pokemon/ditto')
 console.log("fdsa",response.body)
  return response.body
}