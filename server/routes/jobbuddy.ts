import express, { Request, Response, NextFunction } from 'express'
import { searchJobs } from '../services/openai.js'
import { SseEventType } from '../types/enums.js'
import type { JobPreferences, SseEvent } from '../types/openai.js'

const jobbuddyRouter = express.Router()

// Simple password authentication
jobbuddyRouter.post('/auth', (req, res) => {
  const { password } = req.body as { password: string }
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
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['x-jobbuddy-auth']
  if (authHeader === 'authenticated') {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// Job search endpoint with SSE streaming
jobbuddyRouter.post('/search', authMiddleware, async (req, res) => {
  // Temporarily block all access
  return res.status(403)

  const { resume, jobPreferences } = req.body as {
    resume: string
    jobPreferences: JobPreferences
  }

  if (!resume || !jobPreferences) {
    return res
      .status(400)
      .json({ error: 'Resume and job preferences are required' })
  }

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  const sendEvent = (data: SseEvent) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  try {
    const jobSearchGenerator = searchJobs(resume, jobPreferences)

    for await (const event of jobSearchGenerator) {
      sendEvent(event)
    }
  } catch (error) {
    console.error('Job search error:', error)
    sendEvent({
      type: SseEventType.Error,
      message:
        (error as Error).message || 'An error occurred during job search',
    })
  } finally {
    res.end()
  }
})

export default jobbuddyRouter
