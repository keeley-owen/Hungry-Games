import express from 'express'
import * as db from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const custom_locations = await db.getAllCustomLocations()
    res.json(custom_locations)
  } catch (err) {
    console.log(err)
    res.status(500).send('could not get custom locations')
  }
})

export default router
