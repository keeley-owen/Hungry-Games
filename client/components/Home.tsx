import React, { useState } from 'react'
import { getCurrentLocationApi } from '../apis/locationApi'
import { useQuery } from '@tanstack/react-query'
import { Location } from '../../models/fruit'

const initialFormData = {
  address: '',
}

export default function Home() {
  const {
    data: currentLocation,
    error,
    isLoading,
  } = useQuery({ queryKey: [], queryFn: getCurrentLocationApi })

  const [formData, setFormData] = useState(initialFormData)

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

  const latitude = currentLocation.lat
  const longitude = currentLocation.lng

  //dispalys coordinates onscreen for testing purposes
  function displayLocation() {
    //checks that coordinates are being returned from api
    if (latitude != null && longitude != null) {
      return (
        <>
          <p>Current Location: </p>
          <p>
            {' '}
            {latitude} {longitude}{' '}
          </p>
        </>
      )
    } else {
      return <p>Location is sad {':('} </p>
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const startCharacter = '${'
    const endCharacter = '}'
    const searchInput = formData.address.split(' ')
    const apiQuery = startCharacter + searchInput.join('}%20${') + endCharacter
    return apiQuery
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
      </form>

      <button className="sumbitButton" type="submit">
        SUBMIT LOCATION
      </button>
      {/* {displayLocation()} */}
    </>
  )
}
