import { connect } from 'superagent'
import { customLocations } from '../../models/customLocations'
import connection from './connection'
import db from '../db/connection.ts'

export async function getAllCustomLocations(): Promise<customLocations[]> {
  return db('custom_location').select('*')
}

export async function getCustomLocationsById(
  id: number,
): Promise<customLocations | undefined> {
  return db('custom_location').where({ id }).first()
}

export async function addCustomLocation(
  locationName: string,
): Promise<customLocations> {
  return db('custom_location')
    .insert({ locationName })
    .returning(['id', 'locationName'])
}
