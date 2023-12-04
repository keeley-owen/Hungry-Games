import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNearByLocations } from '../apis/maps'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Details from './Details'

export default function LocationList(props) {
  const navigate = useNavigate()
  const splitText = props.nearbyLocation.split(',')

  const {
    data: locations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['location', splitText.join('%2C')],
    queryFn: getNearByLocations,
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

  return (
    <>
      <div className="nearbyLocationsContainer">
        {locations.map((data, index) => (
          <div key={data.place_id} className="locationContainer">
            {data.name}
            <button onClick={() => handleDelete(index)}>delete</button>
          </div>
        ))}
        {console.log(locations)}
      </div>
      <div className="fightButtonContainer">
        <button className="fightButton" onClick={handleClick}>
          Fight
        </button>
      </div>
      <div className="winnerContainer">
        <Details winner={winner?.place_id} />
      </div>
    </>
  )
}
