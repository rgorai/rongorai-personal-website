import { connectToDb, closeConnection } from '../config/mongoConnection.js'
import { createEntry } from '../mongo/guestbook.js'

const main = async () => {
  const db = await connectToDb()
  await db.dropDatabase()

  // time seeding
  console.time('Time')

  // seed entries
  await createEntry('rong', 'owner', 'hello')
  await createEntry(
    'dark',
    'i fell off a building',
    'cool site. i fell off a building'
  )
  await createEntry(
    'toshan',
    'really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. ',
    'pretty short message'
  )
  for (const i of Array(5).keys()) await createEntry('rong', 'owner', 'hello')
  await createEntry(
    'uday',
    'uday has no background',
    'this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. '
  )
  for (const i of Array(5).keys()) await createEntry('rong', 'owner', 'hello')
  await createEntry(
    'abhi',
    'really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. really long background. ',
    'this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. this is a very long message. '
  )

  // seeding complete
  console.log('\nDone seeding database')
  console.timeEnd('Time')
  closeConnection()
}

main().catch((e) => {
  console.error(e)
  closeConnection()
})
