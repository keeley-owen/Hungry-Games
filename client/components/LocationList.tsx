import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNearByLocations } from '../apis/maps'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  radius: number
  nearbyLocation: string
}

export default function LocationList({ radius, nearbyLocation }: Props) {
  const navigate = useNavigate()

  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['location', nearbyLocation, radius],
    enabled: nearbyLocation !== '',
    queryFn: async () => {
      const coords = window.encodeURIComponent(nearbyLocation)
      const result = await getNearByLocations({ radius: radius, key: coords })
      console.log(result)
      return result
    },
  })
  interface Location {
    name: string
  }

  const queryClient = useQueryClient()
  const deleteLocationMutation = useMutation({
    mutationFn: getNearByLocations,
    onSuccess: async () => {
      queryClient.invalidateQueries(['location'])
    },
  })
  // const [locations, setLocations] = useState([])

  console.log('click', locations)
  if (error) {
    return <p>This is an Error</p>
  }
  if (!location || isLoading) {
    return <p>Loading Locations.....</p>
  }

  function handleClick(e) {
    e.preventDefault()
    console.log('clicked')
    navigate('/arena', { state: { results: locations } })
  }
  function handleDelete(index) {
    // const newLocations = [...locations]
    // newLocations.splice(index, 1);
    // // Update the state with the new array
    // setLocations(newLocations);
    // console.log("de",locations[index].name)
    deleteLocationMutation.mutate(locations.splice(index, 1))
  
  }
  const nearbyLocations = locations

  const randomValue = Math.floor(Math.random() * nearbyLocations.length)
  const winner = nearbyLocations[randomValue]

  function handleClick(e) {
    e.preventDefault()

    navigate('/arena', {
      state: { results: locations, winner: randomValue },
    })
  }

  return (
    <>

           {locations.length >= 1 ? (
      <div className="nearbyLocationsContainer">
        {locations.map((data, index) => (
          <div key={data.place_id} className="locationContainer">
            {data.name}
            <button onClick={() => handleDelete(index)}>delete</button>
          </div>
        ))}
        {console.log(locations)}
      </div>
          ) : (
        ''
      )}

      <div className="fightButtonContainer">
        {locations.length >= 1 ? (
          <button className="fightButton" onClick={handleClick}>
            Fight
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
