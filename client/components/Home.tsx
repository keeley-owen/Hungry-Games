import { useState } from 'react'
import { getCurrentLocationApi } from '../apis/current'
import { useQuery } from '@tanstack/react-query'
import LocationList from './LocationList'
const initialFormData = {
  address: '',
  radius: 3000,
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
  const [oldVal, setOldVal] = useState<boolean>(false)

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
      const lat = currentLocation.results[0].geometry.location.lat
      const long = currentLocation.results[0].geometry.location.lng
      const coordinates = `${lat},${long}`
      setPlace(coordinates)
      setOldVal(!oldVal)
    } catch (error) {
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
          <input
            type="text"
            name="radius"
            value={formData.radius}
            onChange={handleInputChange}
          />
          <button className="sumbitButton" type="submit">
            SUBMIT LOCATION
          </button>
        </form>

        <LocationList
          changed={oldVal}
          nearbyLocation={place}
          radius={formData.radius}
        />
      </div>
    </>
  )
}
