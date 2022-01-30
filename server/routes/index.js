import guestbookRouter from './guestbook.js'
import fileRouter from './files.js'
import dataRouter from './data.js'

const configRoutes = (app) => {
  app.use('/api/guestbook', guestbookRouter)
  app.use('/api/files', fileRouter)
  app.use('/api/data', dataRouter)
}

export default configRoutes
