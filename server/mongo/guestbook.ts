import { ObjectId } from 'mongodb'
import { guestbookCollection } from '../config/mongoCollections.js'
import { isValidString } from '../misc/errors.js'
import type { GuestbookEntry } from '../types/guestbook.js'

const createEntry = async (
  name: string,
  background: string,
  message: string
): Promise<GuestbookEntry> => {
  try {
    isValidString({ name, background })
  } catch (e) {
    throw String(e)
  }

  const guestbook = await guestbookCollection()
  const date = new Date()
  const retval = await guestbook.insertOne({
    name: name.trim(),
    background: background.trim(),
    message: message.trim(),
    date,
  })
  if (!retval.acknowledged) throw 'Error: failed to add guestbook entry'
  return await getEntry(String(retval.insertedId))
}

const getEntry = async (entryId: string): Promise<GuestbookEntry> => {
  let objectId: ObjectId
  try {
    isValidString({ entryId })
    objectId = new ObjectId(entryId)
  } catch (e) {
    throw String(e)
  }

  const guestbook = await guestbookCollection()
  const entry = await guestbook.findOne({ _id: objectId })
  if (!entry) throw 'Error: failed to find entry.'
  return { ...entry, _id: String(entry._id) }
}

const getAllEntries = async (): Promise<GuestbookEntry[]> => {
  const guestbook = await guestbookCollection()
  return await guestbook
    .find({})
    .map((e) => ({ ...e, _id: String(e._id) }))
    .toArray()
}

export { createEntry, getEntry, getAllEntries }
