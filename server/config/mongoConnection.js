import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const mongoConfig = {
  serverUrl: process.env.MONGO_URI,
  database: 'rongorai-personal-website-db',
}

let _connection = undefined
let _db = undefined

const connectToDb = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl)
    _db = _connection.db(mongoConfig.database)
  }
  return _db
}
const closeConnection = () => {
  _connection.close()
}

export { connectToDb, closeConnection }
