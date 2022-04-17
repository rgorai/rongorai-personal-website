import express from 'express'
import { isValidString } from '../misc/errors.js'

const dataRouter = express.Router()

dataRouter.get('/:filename', async (req, res) => {
  const { filename } = req.params

  try {
    isValidString({ filename })
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    res.status(200).json((await import(`../data/${filename}.js`)).default)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

export default dataRouter
