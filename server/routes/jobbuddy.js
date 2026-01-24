import express from 'express'
import { searchJobs } from '../services/openai.js'

const jobbuddyRouter = express.Router()

// Simple password authentication
jobbuddyRouter.post('/auth', (req, res) => {
  const { password } = req.body
  const correctPassword = process.env.JOBBUDDY_PW

  if (!correctPassword) {
    return res.status(500).json({ error: 'Server not configured properly' })
  }

  if (password === correctPassword) {
    return res.status(200).json({ success: true })
  }

  return res.status(401).json({ success: false, error: 'Invalid password' })
})

// Middleware to check auth header
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['x-jobbuddy-auth']
  if (authHeader === 'authenticated') {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// Job search endpoint
jobbuddyRouter.post('/search', authMiddleware, async (req, res) => {
  const { resume, jobPreferences } = req.body

  if (!resume || !jobPreferences) {
    return res
      .status(400)
      .json({ error: 'Resume and job preferences are required' })
  }

  try {
    const jobs = await searchJobs(resume, jobPreferences)
    res.status(200).json({ jobs })
  } catch (error) {
    console.error('Job search error:', error)
    res.status(500).json({
      error: error.message || 'An error occurred during job search',
    })
  }
})

export default jobbuddyRouter
