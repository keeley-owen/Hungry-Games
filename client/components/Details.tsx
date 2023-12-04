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
    return <p></p>
  }

  if (error) {
    console.log(error)
  }

  const isOpen = () => {
    if (realWinner.delivery == true) {
      return 'Delivery Available'
    } else {
      return ''
    }
  }
  const isDog = () => {
    if (realWinner.allowsDogs == true) {
      return 'Dogs Allowed'
    } else {
      return ''
    }
  }

  const hasDays = () => {
    if (realWinner.regularOpeningHours != null) {
      return (
        <>
          Opening hours: <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[0]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[1]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[2]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[3]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[4]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[5]} <br />
          {realWinner.regularOpeningHours.weekdayDescriptions[6]}
          <br />{' '}
        </>
      )
    } else {
      return ' '
    }
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
          {hasDays()}
          {isOpen()}
          {isDog()}
        </div>
      </>
    )
  }
}
