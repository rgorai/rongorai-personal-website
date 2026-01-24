import express from 'express'
import {
  logChore,
  getTotalPoints,
  getWeeklyPoints,
  getRecentHistory,
} from '../mongo/chorebuddy.js'
import { CHORES, USERS } from '../data/chores.js'

const chorebuddyRouter = express.Router()

// Authentication - supports two users with different passwords
chorebuddyRouter.post('/auth', (req, res) => {
  const { password } = req.body
  const password1 = process.env.CHOREBUDDY_PW_1
  const password2 = process.env.CHOREBUDDY_PW_2

  if (!password1 || !password2) {
    return res.status(500).json({ error: 'Server not configured properly' })
  }

  if (password === password1) {
    return res.status(200).json({ success: true, userId: 1, userName: 'Ron' })
  }

  if (password === password2) {
    return res.status(200).json({ success: true, userId: 2, userName: 'Lauren' })
  }

  return res.status(401).json({ success: false, error: 'Invalid password' })
})

// Middleware to check auth header
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['x-chorebuddy-auth']
  if (authHeader === 'authenticated') {
    next()
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// Get chore definitions
chorebuddyRouter.get('/chores', authMiddleware, (req, res) => {
  res.status(200).json({ chores: CHORES, users: USERS })
})

// Log a chore
chorebuddyRouter.post('/log', authMiddleware, async (req, res) => {
  const { userId, choreId } = req.body

  if (!userId || !choreId) {
    return res.status(400).json({ error: 'userId and choreId are required' })
  }

  try {
    const entry = await logChore(userId, choreId)
    res.status(200).json({ success: true, entry })
  } catch (error) {
    console.error('Error logging chore:', error)
    res.status(500).json({ error: error.message || 'Failed to log chore' })
  }
})

// Get leaderboard data (total and weekly points)
chorebuddyRouter.get('/leaderboard', authMiddleware, async (req, res) => {
  try {
    const [totalPoints, weeklyPoints] = await Promise.all([
      getTotalPoints(),
      getWeeklyPoints(),
    ])
    res.status(200).json({ totalPoints, weeklyPoints })
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    res.status(500).json({ error: error.message || 'Failed to get leaderboard' })
  }
})

// Get recent history
chorebuddyRouter.get('/history', authMiddleware, async (req, res) => {
  const limit = parseInt(req.query.limit) || 50

  try {
    const history = await getRecentHistory(limit)
    res.status(200).json({ history })
  } catch (error) {
    console.error('Error getting history:', error)
    res.status(500).json({ error: error.message || 'Failed to get history' })
  }
})

export default chorebuddyRouter
