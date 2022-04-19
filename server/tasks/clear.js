import { connectToDb, closeConnection } from '../config/mongoConnection.js'

const main = async () => {
  const db = await connectToDb()
  await db.dropDatabase()
  closeConnection()
}

main().catch((e) => {
  console.error(e)
  closeConnection()
})
