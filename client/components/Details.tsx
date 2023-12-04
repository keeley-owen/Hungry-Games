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

  console.log('realWinner: ', realWinner)
  console.log('winnerwinner: ', winner.winner)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.log(error)
  }
  console.log(realWinner)

  return (
    <>
      <div>{realWinner.displayName.text}</div>
    </>
  )
}
