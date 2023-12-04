import { connect } from 'superagent'
import { customLocations } from '../../models/customLocation'
import connection from './connection'
import db from '../db/connection.ts'

export async function addCustomLocation(locationName: string) {
  await db('custom_location').insert([{ locationName }])
  return db('custom_location').select('*')
}

export async function deleteCustomLocationById(id: number) {
  await connection('custom_location').where({ id }).delete
}
