import { Router } from 'express'
import request from 'superagent'

const router = Router()

// const key = 'AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'
const url =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyCLCHcoB2bknGHj_NVD0Q4bKERJ2t1GwvY'
///api/v1/fruits
router.get('/', async (req, res) => {
  // try{
    console.log(url)
  const response = await request.get(url)

  res.json(response.body)
  // }catch(e){
  //   res.status(500).json({ message: 'Something went wrong' })
  // }

})

export default router
