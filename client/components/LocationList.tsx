import { useQuery } from '@tanstack/react-query'
import { getNearByLocations } from '../apis/maps'
import { useNavigate } from 'react-router-dom'
import Details from './Details'

export default function LocationList(props) {
  const navigate = useNavigate()
  const splitText = props.nearbyLocation.split(',')

  const {
    data: location,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['location', splitText.join('%2C')],
    queryFn: getNearByLocations,
  })

  if (error) {
    return <p>This is an Error</p>
  }
  if (!location || isLoading) {
    return <p>Loading Locations.....</p>
  }

  function handleClick(e) {
    e.preventDefault()
    console.log('clicked')
    navigate('/arena', { state: { results: location.body.results } })
  }

  const nearbyLocations = location.body.results
  const randomValue = Math.floor(Math.random() * nearbyLocations.length)
  const winner = nearbyLocations[randomValue]

  return (
    <>
      <div className="nearbyLocationsContainer">
        {location.body.results.map((data) => (
          <div key={data.place_id} className="locationContainer">
            {data.name}
          </div>
        ))}
        {console.log(location.body.results)}
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
