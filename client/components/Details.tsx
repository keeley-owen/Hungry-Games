import { useQuery } from '@tanstack/react-query'
import { getLocationsDetailsApi } from '../apis/details'

export default function Details(winner) {
  const {
    data: realWinner,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['apiWinner', winner.winner],
    queryFn: async () => await getLocationsDetailsApi(winner.winner),
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.log(error)
  }

  if (realWinner != null) {
    return (
      <>
        <div className="winnerFighter">
          {realWinner.displayName.text} Rating: {realWinner.rating} <br />
          Address: {realWinner.formattedAddress}
          <br />
          Opening hours: <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[0]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[1]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[2]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[3]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[4]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[5]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[6]}
        </div>
      </>
    )
  }
}
