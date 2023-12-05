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
      return '𓃦'
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

  const priceLevel = () => {
    if (realWinner.price_level != null) {
      return <p>Price Level: {realWinner.priceLevel}</p>
    } else {
      return ''
    }
  }

  const phoneNumber = () => {
    if (realWinner.nationalPhoneNumber != null) {
      return <p> Phone Number: {realWinner.nationalPhoneNumber} </p>
    } else {
      return ''
    }
  }

  function getStars(rating) {
    const output = []
    for (let i = rating; i >= 1; i--) output.push('☆')
    for (let i = 5 - rating; i >= 1; i--) output.push(' ')
    return output.join('')
  }

  if (realWinner != null) {
    return (
      <>
        <div className="winnerFighter">
          <a href={realWinner.websiteUri}>{realWinner.displayName.text}</a>{' '}
          Rating: <b id="star">{getStars(realWinner.rating)}</b> <br />
          Address: {realWinner.formattedAddress}
          <br />
          {phoneNumber()}
          {priceLevel()}
          {hasDays()}
          {isOpen()}
          {isDog()}
        </div>
      </>
    )
  }
}
