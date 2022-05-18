import express from 'express'
import nodemailer from 'nodemailer'
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

    // send email
    nodemailer
      .createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GUESTBOOK_EMAIL,
          pass: process.env.GUESTBOOK_EMAIL_PW,
        },
      })
      .sendMail(
        {
          from: process.env.GUESTBOOK_EMAIL,
          to: process.env.GUESTBOOK_EMAIL,
          subject: `GUESTBOOK ENTRY - ${name}`,
          html: `<b>Background:</b>
<br/>
${background}
<br/>
<br/>
<b>Message:</b>
<br/>
${message}`,
        },
        (err) => {
          if (err) console.error('smtp error:', err)
        }
      )
  } catch (e) {
    res.status(500).send(String(e))
  }
})

export default guestbookRouter
