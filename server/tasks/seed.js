import { connectToDb, closeConnection } from '../config/mongoConnection'

const main = async () => {
  const db = await connectToDb()
  await db.dropDatabase()

  // time seeding
  console.time('Time')

  

  // seeding complete
  console.log('\nDone seeding database')
  console.timeEnd('Time')
  closeConnection()
}

main().catch((e) => {
  console.error(e)
  closeConnection()
})