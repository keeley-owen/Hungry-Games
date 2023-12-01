import request from 'superagent'

const rootUrl = "/api/v1/maps/"
export async function getNearByLocations(locations){
  try {
   
    const locationsObj = {
      location:locations.queryKey[1]
    }
   
    const response = await request.post(rootUrl).send(locationsObj);
    return response;
  } catch (error) {
    console.error('Error fetching nearby locations:', error);
    throw error; 
  }

}