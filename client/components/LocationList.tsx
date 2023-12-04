import { useQuery } from '@tanstack/react-query'
import { getNearByLocations } from '../apis/maps'
import { useNavigate } from 'react-router-dom'
import Details from './Details'
import { useState } from 'react'

interface Props {
  radius: number
  nearbyLocation: string
}

export default function LocationList({ radius, nearbyLocation }: Props) {
  const navigate = useNavigate()

  const {
    data: location,
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

  if (error) {
    return <p>This is an Error</p>
  }
  if (!location || isLoading) {
    return <p>Loading Locations.....</p>
  }

  const nearbyLocations = location.body.results
  const randomValue = Math.floor(Math.random() * nearbyLocations.length)
  const winner = nearbyLocations[randomValue]

  function handleClick(e) {
    e.preventDefault()

    navigate('/arena', { state: { results: location.body.results } })

  }

  return (
    <>

      {location.body.results.length >= 1 ? (
        <div className="nearbyLocationsContainer">
          {location.body.results.map((data) => (
            <div key={data.place_id} className="locationContainer">
              {data.name}
            </div>
          ))}
          {console.log(location.body.results)}
        </div>
      ) : (
        ''
      )}

      <div className="fightButtonContainer">
        {location.body.results.length >= 1 ? (
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
