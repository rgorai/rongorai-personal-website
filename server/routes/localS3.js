import express from 'express'
import path from 'path'
import { isValidString } from '../misc/errors.js'

const s3Router = express.Router()

s3Router.get('/:encodedFilepath', async (req, res) => {
  const { encodedFilepath } = req.params

  try {
    isValidString({ encodedFilepath })
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    res
      .status(200)
      .sendFile(
        path.resolve(
          '.local',
          's3-bucket',
          decodeURIComponent(encodedFilepath).slice(1)
        )
      )
  } catch (e) {
    res.status(404).send(String(e))
  }
})

export default s3Router
