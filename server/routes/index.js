// const movieRoutes = require('./movies')

const constructorMethod = (app) => {
  // app.use('/api/movies', movieRoutes)
  app.get('/api/test', (req, res) => {
    res.status(200).send('hello')
  })

  

  app.use('*', (req, res) => {
    res.sendStatus(404)
  })
}

module.exports = constructorMethod
