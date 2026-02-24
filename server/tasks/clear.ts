import { connectToDb, closeConnection } from '../config/mongoConnection.js'

const main = async (): Promise<void> => {
  const db = await connectToDb()
  await db.dropDatabase()
  closeConnection()
}

main().catch((e) => {
  console.error(e)
  closeConnection()
})
