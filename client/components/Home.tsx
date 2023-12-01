import { useState } from 'react'
import { getCurrentLocationApi } from '../apis/current'
import { useQuery } from '@tanstack/react-query'

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  if (error) {
    console.log(error)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const searchInput = formData.address.split(' ')
    const apiQuery = searchInput.join('%20')
    const currentLocation = await getCurrentLocationApi(apiQuery)
    try {
      setLatitude(currentLocation.results[0].geometry.location.lat)
      setLongitude(currentLocation.results[0].geometry.location.lng)
    } catch (error) {
      console.error('location is sad :(', error)
      setLatitude(null)
      setLongitude(null)
    }
  }

  return (
    <>
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
      {latitude != null && longitude != null ? (
        <>
          <p>Current Location:</p>
          <p>
            {' '}
            {latitude} {longitude}{' '}
          </p>
        </>
      ) : (
        <p>Location is sad {':('} </p>
      )}
    </>
  )
}
