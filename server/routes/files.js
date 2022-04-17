import express from 'express'
import { isValidString } from '../misc/errors.js'

const fileRouter = express.Router()

fileRouter.get('/:encodedFilepath', async (req, res) => {
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
        process.env.AWS_DISTRIBUTION_URL + decodeURIComponent(encodedFilepath)
      )
  } catch (e) {
    res.status(404).send(String(e))
  }
})

export default fileRouter
