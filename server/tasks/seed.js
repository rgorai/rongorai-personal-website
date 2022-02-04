import { connectToDb, closeConnection } from '../config/mongoConnection.js'
import { createEntry } from '../data/guestbook.js'

const main = async () => {
  const db = await connectToDb()
  await db.dropDatabase()

  // time seeding
  console.time('Time')

  await createEntry('rong', 'owner', 'hello')

  // seeding complete
  console.log('\nDone seeding database')
  console.timeEnd('Time')
  closeConnection()
}

main().catch((e) => {
  console.error(e)
  closeConnection()
})
