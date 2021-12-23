import guestbookRouter from './guestbook.js'
import fileRouter from './files.js'

const configRoutes = (app) => {
  app.use('/api/guestbook', guestbookRouter)
  app.use('/api/files', fileRouter)
}

export default configRoutes
