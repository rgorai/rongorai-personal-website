// const movieRoutes = require('./movies')
import guestbookRouter from './guestbook.js'

const configRoutes = (app) => {
  app.use('/api/guestbook', guestbookRouter)

  // app.use('*', (req, res) => {
  //   res.sendStatus(404)
  // })
}

export default configRoutes
