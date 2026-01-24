import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import configRoutes from './routes/index.js'

dotenv.config()

const PORT = Number(process.env.PORT) + 1 || 5001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

configRoutes(app)

app.use(express.static(path.resolve('client', 'build')))
app.get('*', (_, res) => {
  res.sendFile(path.resolve('client', 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
