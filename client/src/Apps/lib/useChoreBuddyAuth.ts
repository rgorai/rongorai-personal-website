import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const AUTH_KEY = 'chorebuddy_auth'
const AUTH_EXPIRY_MS = 24 * 60 * 60 * 1000 // 1 day

type AuthState = {
  isAuthenticated: boolean
  userId: number
  userName: string
  expiresAt: number
}

export const useChoreBuddyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check stored auth on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const authState: AuthState = JSON.parse(stored)
        if (authState.expiresAt > Date.now()) {
          setIsAuthenticated(true)
          setUserId(authState.userId)
          setUserName(authState.userName)
        } else {
          localStorage.removeItem(AUTH_KEY)
        }
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(
    async (
      password: string
    ): Promise<{ success: boolean; userId?: number; userName?: string }> => {
      try {
        const response = await axios.post('/api/chorebuddy/auth', { password })
        if (response.data.success) {
          const authState: AuthState = {
            isAuthenticated: true,
            userId: response.data.userId,
            userName: response.data.userName,
            expiresAt: Date.now() + AUTH_EXPIRY_MS,
          }
          localStorage.setItem(AUTH_KEY, JSON.stringify(authState))
          setIsAuthenticated(true)
          setUserId(response.data.userId)
          setUserName(response.data.userName)
          return {
            success: true,
            userId: response.data.userId,
            userName: response.data.userName,
          }
        }
        return { success: false }
      } catch {
        return { success: false }
      }
    },
    []
  )

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
    setUserId(null)
    setUserName(null)
  }, [])

  const getAuthHeader = useCallback(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const authState: AuthState = JSON.parse(stored)
        if (authState.expiresAt > Date.now()) {
          return { 'X-ChoreBuddy-Auth': 'authenticated' }
        }
      } catch {
        // Invalid stored data
      }
    }
    return {}
  }, [])

  return {
    isAuthenticated,
    isLoading,
    userId,
    userName,
    login,
    logout,
    getAuthHeader,
  }
}
