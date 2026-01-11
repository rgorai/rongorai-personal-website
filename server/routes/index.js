import guestbookRouter from './guestbook.js'
import dataRouter from './data.js'
import s3Router from './localS3.js'
import jobbuddyRouter from './jobbuddy.js'

const configRoutes = (app) => {
  app.use('/api/guestbook', guestbookRouter)
  app.use('/api/data', dataRouter)
  app.use('/api/localS3', s3Router)
  app.use('/api/jobbuddy', jobbuddyRouter)
}

export default configRoutes
