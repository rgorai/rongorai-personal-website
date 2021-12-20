import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import configRoutes from './routes/index.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// configRoutes(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('client', 'build')))
  configRoutes(app)
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
