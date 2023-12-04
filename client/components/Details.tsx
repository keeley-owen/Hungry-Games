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
          {console.log(realWinner)}
          <a href={realWinner.websiteUri}>{realWinner.displayName.text}</a>{' '}
          Rating: {realWinner.rating} <br />
          Address: {realWinner.formattedAddress}
          <br />
          Opening hours: <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[0] ||
            undefined}{' '}
          <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[1] ||
            undefined}{' '}
          <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[2] ||
            undefined}{' '}
          <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[3] ||
            undefined}{' '}
          <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[4] ||
            undefined}{' '}
          <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[5] ||
            undefined}{' '}
          <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[6] || undefined}
        </div>
      </>
    )
  }
}
