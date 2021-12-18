const express = require('express')
const app = express()
const cors = require('cors')
const configRoutes = require('./routes')
const path = require('path')
require('dotenv').config()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  console.log('serving prod build')
  app.use(express.static(path.resolve('client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  })
} else {
  configRoutes(app)
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
