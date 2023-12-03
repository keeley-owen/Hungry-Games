import { Router } from 'express'
import request from 'superagent'

const router = Router()

// const key = 'AIzaSyAkvAo_kfC8euKVSSYrkm0vgze_UvNZmgw'
const url =
  'https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw?fields=id,displayName&key=AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'

router.post('/', async (req, res) => {
  try {
    const winner = req.body.apiWinner
    const response = await request.get(
      `https://places.googleapis.com/v1/places/${winner}?fields=id,displayName,regularOpeningHours,rating,formattedAddress,businessStatus&key=AIzaSyAkvAo_kfC8euKVSSYrkm0vgze_UvNZmgw`,
    )
    res.json(response.body)
  } catch (e) {
    res.status(500).json({ message: 'winner is sad ://' })
  }
})

export default router
