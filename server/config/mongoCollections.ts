import { Collection } from 'mongodb'
import type { GuestbookInsertDoc } from '../types/guestbook.js'
import { connectToDb } from './mongoConnection.js'

const getCollectionFn = <T extends object>(
  collection: string
): (() => Promise<Collection<T>>) => {
  let _col: Collection<T> | undefined
  return async () => {
    if (!_col) {
      const db = await connectToDb()
      _col = db.collection<T>(collection)
    }
    return _col
  }
}

const guestbookCollection = getCollectionFn<GuestbookInsertDoc>('guestbook')
export { guestbookCollection }
