import { MongoClient } from 'mongodb'

const settings = {
  mongoConfig: {
    serverUrl: process.env.MONGO_URI,
    database: 'rongorai-personal-website-db',
  },
}
const { mongoConfig } = settings

let _connection = undefined
let _db = undefined

export async function connectToDb() {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl)
    _db = await _connection.db(mongoConfig.database)
  }

  return _db
}
export function closeConnection() {
  _connection.close()
}
