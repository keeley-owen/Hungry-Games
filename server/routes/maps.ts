import { Router } from 'express'
import request from 'superagent'

const router = Router()

// const key = 'AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'
const url =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'
///api/v1/fruits

router.post('/', async (req, res) => {
  try {
    const coordinate = req.body.location

    //sample routes Commonwealth Walkway, Mount Cook, Wellington 6011
    //unstable coordinate -41.297775,174.773435
    //stable coordinates -33.8670522,151.1957362
    const response = await request.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=${coordinate}&radius=1500&type=restaurant&excludedtypes=hotel&key=AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY`,
    )

    res.json(response.body)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})
//jk
export default router
