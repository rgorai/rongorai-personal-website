import express from 'express'
import path from 'path'
import { isValidString } from '../errors.js'

const fileRouter = express.Router()

// send requested file
fileRouter.get('/', async (req, res) => {
  const { filepath } = req.body

  try {
    isValidString({ filepath })
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    res
      .status(200)
      .sendFile(path.resolve('server', 'files', filepath))
  } catch (e) {
    res.status(404).send(String(e))
  }
})

export default fileRouter
