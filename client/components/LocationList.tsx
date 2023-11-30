import { useQuery } from '@tanstack/react-query'
import { getNearByLocations } from '../apis/maps'


export function LocationList(){
  const {data:location , isLoading,error} = useQuery({
    queryKey:['location'],
    queryFn:getNearByLocations
  })
  // if (error) {
  //   return <p>This is an Error</p>
  // }
  // if (!location|| isLoading) {
  //   return <p>Loading ...</p>
  
  // }
  console.log("component",location)
  return(
    <>
    <ul>
    {location.results.map((data)=><li>{data.place_id}</li>)}
    </ul>
    
    </>
  )
  
  
}
