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
  const starArr = []


  for (let x = 0; x < Math.floor(realWinner.rating); x++) {
    starArr.push('★')
  }
  const decimalPart = realWinner.rating % 1
  console.log('decimal', decimalPart)
  // if (decimalPart >= 0.5) {
  //  <img src = "https://image.emojisky.com/127/511127-small.png">
  // }

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


  if (realWinner != null) {
    return (
      <>
        <div className="winnerFighter">
          <a href={realWinner.websiteUri}>{realWinner.displayName.text}</a>{' '}

          Rating:
          <div className="ratingContainer">
            {starArr}
            {decimalPart >= 0.5 ? <span className="star">⯨</span> : undefined}
          </div>
          <br />

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
