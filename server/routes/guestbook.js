import express from 'express'
import { createEntry, getAllEntries } from '../data/guestbook.js'
import { isValidString } from '../errors.js'

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
  const { name, description, message } = req.body

  try {
    isValidString({ name })
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    res
      .status(201)
      .json(await createEntry(name, description, message))
  } catch (e) {
    res.status(500).send(String(e))
  }
})

export default guestbookRouter
