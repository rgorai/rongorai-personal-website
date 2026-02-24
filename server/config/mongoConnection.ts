import { MongoClient, Db } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const mongoConfig = {
  serverUrl: process.env.MONGO_URI as string,
  database:
    process.env.NODE_ENV === 'production'
      ? 'rongorai-personal-website-db'
      : 'rongorai-personal-website-db-DEV',
}

let _connection: MongoClient | undefined
let _db: Db | undefined

const connectToDb = async (): Promise<Db> => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl)
    _db = _connection.db(mongoConfig.database)
  }
  return _db as Db
}

const closeConnection = (): void => {
  _connection?.close()
}

export { connectToDb, closeConnection }
