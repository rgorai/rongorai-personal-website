import { connectToDb } from './mongoConnection.js'

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined
  return async () => {
    if (!_col) {
      const db = await connectToDb()
      _col = await db.collection(collection)
    }
    return _col
  }
}

/* Now, you can list your collections here: */
const guestbookCollection = getCollectionFn('guestbook')
export { guestbookCollection }
