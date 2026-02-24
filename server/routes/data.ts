import express from 'express'
import { isValidString } from '../misc/errors.js'
import type { PageData } from '../types/content.js'

const dataRouter = express.Router()

dataRouter.get('/:filename', async (req, res) => {
  const { filename } = req.params

  try {
    isValidString({ filename })
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    const data = (await import(`../data/${filename}.js`)) as {
      default: PageData
    }
    res.status(200).json(data.default)
  } catch (e) {
    res.status(500).send(String(e))
  }
})

export default dataRouter
