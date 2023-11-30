import request from 'superagent'



const rootUrl = "/api/v1/maps"
export async function getNearByLocations(){
  const response = await request.get(rootUrl)
  // const response = await request.get('https://pokeapi.co/api/v2/pokemon/ditto')
 console.log("fdsa",response.body)
  return response
}