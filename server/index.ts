import path from 'path'
import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import configRoutes from './routes/index.js'

dotenv.config()

const PORT =
  Number(process.env.PORT) + (process.env.NODE_ENV === 'production' ? 0 : 1) ||
  5001

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configRoutes(app)

app.use(express.static(path.resolve('client', 'dist')))
app.get('*', (_, res) => {
  res.sendFile(path.resolve('client', 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
