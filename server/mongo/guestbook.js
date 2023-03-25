import { ObjectId } from 'mongodb'
import { guestbookCollection } from '../config/mongoCollections.js'
import { isValidString } from '../misc/errors.js'

const createEntry = async (name, background, message) => {
  // error check
  try {
    isValidString({ name, background })
  } catch (e) {
    throw String(e)
  }

  // add new entry to db
  const guestbook = await guestbookCollection()
  const date = new Date()
  const retval = await guestbook.insertOne({
    name: name.trim(),
    background: background.trim(),
    message: message.trim(),
    date: date,
  })
  if (retval.insertedCount === 0) throw 'Error: failed to add guestbook entry'
  return await getEntry(String(retval.insertedId))
}

const getEntry = async (entryId) => {
  // error check
  try {
    isValidString({ entryId })
    entryId = new ObjectId(entryId)
  } catch (e) {
    throw String(e)
  }

  // find and return entry
  const guestbook = await guestbookCollection()
  const entry = await guestbook.findOne({ _id: entryId })
  if (!entry) throw 'Error: failed to find entry.'
  return { ...entry, _id: String(entry._id) }
}

const getAllEntries = async () => {
  const guestbook = await guestbookCollection()
  return await guestbook
    .find({})
    .map((e) => ({ ...e, _id: String(e._id) }))
    .toArray()
}

export { createEntry, getEntry, getAllEntries }
