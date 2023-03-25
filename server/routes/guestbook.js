import express from 'express'
import nodemailer from 'nodemailer'
import { createEntry, getAllEntries } from '../mongo/guestbook.js'
import { isValidString } from '../misc/errors.js'

const guestbookRouter = express.Router()

// send all guestbook entries
guestbookRouter.get('/', async (_, res) => {
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
          subject: `GUESTBOOK ENTRY ${
            process.env.NODE_ENV !== 'production' ? '(DEV)' : ''
          } - ${name}`,
          html: `<b>Name:</b>
${name}
<br/>
<br/>
<b>Background:</b>
<br/>
${background}
<br/>
<br/>
<b>Message:</b>
<br/>
${message.length === 0 ? '<i>None</i>' : message}`,
        },
        (err) => {
          if (err) console.error('SMTP error:', err)
        }
      )
  } catch (e) {
    res.status(500).send(String(e))
  }
})

export default guestbookRouter
