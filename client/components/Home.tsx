import { useState } from 'react'
import { getCurrentLocationApi } from '../apis/current'
import { useQuery } from '@tanstack/react-query'
import LocationList from './LocationList'
const initialFormData = {
  address: '',
}

export default function Home() {
  const { error, isLoading } = useQuery({
    queryKey: [],
    queryFn: getCurrentLocationApi,
  })

  const [formData, setFormData] = useState(initialFormData)
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [place, setPlace] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    console.log('from handleChange', formData)
  }

  if (error) {
    console.log(error)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  // const coordinates = `${latitude},${longitude}`
  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('from handleSubmiot', formData)
    const searchInput = formData.address.split(' ')
    const apiQuery = searchInput.join('%20')
    const currentLocation = await getCurrentLocationApi(apiQuery)
    try {
      // setLatitude(currentLocation.results[0].geometry.location.lat)
      // setLongitude(currentLocation.results[0].geometry.location.lng)
      const lat = currentLocation.results[0].geometry.location.lat
      const long = currentLocation.results[0].geometry.location.lng
      const coordinates = `${lat},${long}`
      console.log(
        'currentLocation',
        currentLocation.results[0].geometry.location.lat,
      )
      setPlace(coordinates)
      console.log('coordinates', coordinates)
      console.log('apiQuery', apiQuery)
      console.log('latitude', latitude)
      // console.log("adsf",coordinates)
    } catch (error) {
      console.error('location is sad :(', error)
      setLatitude(null)
      setLongitude(null)
    }
  }

  return (
    <>
      <div id="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <button className="sumbitButton" type="submit">
            SUBMIT LOCATION
          </button>
        </form>
        {/* {latitude != null && longitude != null ? (
        <>
          <p>Current Location:</p>
          <p>
            {' '}
            {latitude} {longitude}{' '}
          </p>
        </>
      ) : (
        <p>Location is sad {':('} </p>
      )} */}
        <LocationList nearbyLocation={place} />
      </div>
    </>
  )
}
