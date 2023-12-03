import { useQuery } from '@tanstack/react-query'
import { getLocationsDetailsApi } from '../apis/details'
import { useEffect, useState } from 'react'

interface Location {
  name: string
}

export default async function Details(listProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const { data, error, isLoading } = useQuery({
    queryKey: [],
    queryFn: getLocationsDetailsApi,
  })

  useEffect(() => {
    if (data) {
      const selectedLocations = listProps
      const randomValue = Math.floor(Math.random() * selectedLocations.length)
      const winner = selectedLocations[randomValue]
      const apiWinner = winner.place_id

      getLocationsDetailsApi(apiWinner)
        .then((location) => {
          setCurrentLocation(location)
        })
        .catch((error) => {
          console.error('Error fetching location details', error)
        })
    }
  }, [data, listProps])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.log(error)
  }

  return (
    <>
      <div>{currentLocation && <div>{currentLocation.name}</div>}</div>
    </>
  )
}
