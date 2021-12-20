import express from 'express'
import cors from 'cors'
import { resolve } from 'path'
import dotenv from 'dotenv'
import configRoutes from './routes/index.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve('client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  configRoutes(app)
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
