import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import Header from './Header'
import {
  getAllCustomLocations,
  addLocationByName,
} from '../apis/customLocation'
import React, { useState } from 'react'
// import { customLocations } from '../../models/customLocations'

export default function CustomLocations() {
  // const splitText = props.customLocations.split(',')

  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(name)

  const queryClient = useQueryClient()
  const customAddMutation = useMutation({
    mutationFn: addLocationByName,
    onSuccess: () => {
      queryClient.invalidateQueries([''])
    },
  })

  const {
    data: locationName,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['customLocations'],
    queryFn: getAllCustomLocations,
  })

  if (isError) {
    return <p>Oops, something broke!</p>
  }
  if (isLoading) {
    return <p>Loading...</p>
  }

  // const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()

  // }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Header />
      <div id="form-container">
        <h1>Custom Locations</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="address" />
          <button className="sumbitButton" type="submit">
            SUBMIT CUSTOM LOCATION
          </button>
        </form>
      </div>
      <div className="nearbyLocationsContainer"></div>
    </>
  )
}
