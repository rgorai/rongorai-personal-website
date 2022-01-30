import express from 'express'
import path from 'path'
import { isValidString } from '../errors.js'

const dataRouter = express.Router()

dataRouter.get('/:encodedFilepath', async (req, res) => {
  const { encodedFilepath } = req.params

  try {
    isValidString({ encodedFilepath })
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    res
      .status(200)
      .json(
        (await import(`../files/${decodeURIComponent(encodedFilepath)}`))
          .default
      )
  } catch (e) {
    res.status(404).send(String(e))
  }
})

export default dataRouter
