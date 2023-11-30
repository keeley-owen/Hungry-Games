import { Router } from 'express'
import request from 'superagent'

const router = Router()

// const key = 'AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'
const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?address=24%20Sussex%20Drive%20Ottawa%20ON&inputtype=textquery
&key=AIzaSyC1cT-42Of0KFtbaYlwA3lPjtki0E9xFzM`

//  Copy for Current
router.get('/:apiQuery', async (req, res) => {
  try {
    const coordinate = req.params.apiQuery
    console.log(url)
    const response = await request.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?address=${coordinate}&inputtype=textquery
      &key=AIzaSyC1cT-42Of0KFtbaYlwA3lPjtki0E9xFzM`,
    )
    res.json(response.body.results.geometry.location)
  } catch (e) {
    res.status(500).json({ message: 'apiQuery is sad {":-("}' })
  }
})

export default router
