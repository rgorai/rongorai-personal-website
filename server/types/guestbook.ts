export type GuestbookEntry = {
  _id: string
  name: string
  background: string
  message: string
  date: Date
}

export type GuestbookInsertDoc = Omit<GuestbookEntry, '_id'>
