import { useQuery } from "@tanstack/react-query"
import { getLocationsDetailsApi } from "../apis/details"

export default function Details() {
  const { error, isLoading } = useQuery({
    queryKey: [],
    queryFn: getLocationsDetailsApi,
  })
  if (error) {
    console.log(error)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  const currentLocation = await getLocationsDetailsApi(apiWinner)
  try {
    setLatitude(currentLocation.results[0].geometry.location.lat)
  } catch (error) {
    console.error('location is sad :(', error)
    setLatitude(null)
  }
  return (




  )
}
