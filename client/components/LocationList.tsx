import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getNearByLocations } from '../apis/maps'

export function LocationList(props) {
  console.log("this is prop",props.nearbyLocation.split(',').join('%2C'))
  // const [coordinates, setCoordinates] = useState('')
  const splitText = props.nearbyLocation.split(',')
  const {

    data: location,
    isLoading,
    error,

  } = useQuery({
    
    queryKey: ['location',splitText.join('%2C')],
    queryFn: getNearByLocations,

  })
  
  if (error) {

    return <p>This is an Error</p>

  }
  if (!location || isLoading) {

    return <p>Loading Locations.....</p>

  }
  // function handleClick(e) {
  //   e.preventDefault()
  //   const inputCoordinates = e.target.elements.coordinates.value
  //   setCoordinates(inputCoordinates)

  // }

  return (
    <>
    {/* <form onSubmit={handleClick}>

      <label htmlFor="text">coordinates</label>
      <input type="text" name="coordinates" />
      <button>search coordinates</button>

    </form> */}
    {/* Container for nearby locations */}
    <div className = "nearbyLocationsContainer">

      {location.body.results.map((data)=><div key = {data.place_id}className = "locationContainer">{data.name}</div>)} 

    </div>
    </>
    
  )
}
