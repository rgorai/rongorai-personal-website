import { chorebuddyCollection } from '../config/mongoCollections.js'
import { getChoreById } from '../data/chores.js'

// Log a completed chore
const logChore = async (userId, choreId) => {
  // Validate chore exists
  const chore = getChoreById(choreId)
  if (!chore) {
    throw new Error(`Invalid chore ID: ${choreId}`)
  }

  // Validate userId
  if (userId !== 1 && userId !== 2) {
    throw new Error(`Invalid user ID: ${userId}`)
  }

  const collection = await chorebuddyCollection()
  const entry = {
    userId,
    choreId,
    choreName: chore.name,
    weight: chore.weight,
    timestamp: new Date(),
  }

  const result = await collection.insertOne(entry)
  if (!result.insertedId) {
    throw new Error('Failed to log chore')
  }

  return { ...entry, _id: String(result.insertedId) }
}

// Get all chore logs
const getAllLogs = async () => {
  const collection = await chorebuddyCollection()
  return await collection
    .find({})
    .sort({ timestamp: -1 })
    .map((e) => ({ ...e, _id: String(e._id) }))
    .toArray()
}

// Get chore logs for a specific user
const getLogsByUser = async (userId) => {
  const collection = await chorebuddyCollection()
  return await collection
    .find({ userId })
    .sort({ timestamp: -1 })
    .map((e) => ({ ...e, _id: String(e._id) }))
    .toArray()
}

// Get total points for each user (all time)
const getTotalPoints = async () => {
  const collection = await chorebuddyCollection()
  const result = await collection
    .aggregate([
      {
        $group: {
          _id: '$userId',
          totalPoints: { $sum: '$weight' },
          choreCount: { $sum: 1 },
        },
      },
    ])
    .toArray()

  // Format as { 1: { totalPoints, choreCount }, 2: { totalPoints, choreCount } }
  const points = {
    1: { totalPoints: 0, choreCount: 0 },
    2: { totalPoints: 0, choreCount: 0 },
  }
  result.forEach((r) => {
    points[r._id] = { totalPoints: r.totalPoints, choreCount: r.choreCount }
  })
  return points
}

// Get weekly points (for current week, starting Monday)
const getWeeklyPoints = async () => {
  const now = new Date()
  // Get start of current week (Monday)
  const dayOfWeek = now.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)
  monday.setHours(0, 0, 0, 0)

  const collection = await chorebuddyCollection()
  const result = await collection
    .aggregate([
      {
        $match: {
          timestamp: { $gte: monday },
        },
      },
      {
        $group: {
          _id: '$userId',
          totalPoints: { $sum: '$weight' },
          choreCount: { $sum: 1 },
        },
      },
    ])
    .toArray()

  // Format as { 1: { totalPoints, choreCount }, 2: { totalPoints, choreCount } }
  const points = {
    1: { totalPoints: 0, choreCount: 0 },
    2: { totalPoints: 0, choreCount: 0 },
  }
  result.forEach((r) => {
    points[r._id] = { totalPoints: r.totalPoints, choreCount: r.choreCount }
  })
  return points
}

// Get recent history (last N entries)
const getRecentHistory = async (limit = 50) => {
  const collection = await chorebuddyCollection()
  return await collection
    .find({})
    .sort({ timestamp: -1 })
    .limit(limit)
    .map((e) => ({ ...e, _id: String(e._id) }))
    .toArray()
}

export {
  logChore,
  getAllLogs,
  getLogsByUser,
  getTotalPoints,
  getWeeklyPoints,
  getRecentHistory,
}
