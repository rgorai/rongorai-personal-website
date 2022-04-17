import express from 'express'
import { createEntry, getAllEntries } from '../mongo/guestbook.js'
import { isValidString } from '../misc/errors.js'

const guestbookRouter = express.Router()

// send all guestbook entries
guestbookRouter.get('/', async (req, res) => {
  try {
    res.status(200).json(await getAllEntries())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

// create guestbook entry
guestbookRouter.post('/', async (req, res) => {
  const { name, background, message } = req.body

  try {
    isValidString({ name })
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    res.status(201).json(await createEntry(name, background, message))
  } catch (e) {
    res.status(500).send(String(e))
  }
})

export default guestbookRouter
