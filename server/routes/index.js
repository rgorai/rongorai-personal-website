import guestbookRouter from './guestbook.js'

const configRoutes = (app) => {
  app.use('/api/guestbook', guestbookRouter)
}

export default configRoutes
