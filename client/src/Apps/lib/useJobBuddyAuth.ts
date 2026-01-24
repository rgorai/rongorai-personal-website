import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const AUTH_KEY = 'jobbuddy_auth'
const AUTH_EXPIRY_MS = 24 * 60 * 60 * 1000 // 1 day

type AuthState = {
  isAuthenticated: boolean
  expiresAt: number
}

export const useJobBuddyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check stored auth on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const authState: AuthState = JSON.parse(stored)
        if (authState.expiresAt > Date.now()) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem(AUTH_KEY)
        }
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      const response = await axios.post('/api/jobbuddy/auth', { password })
      if (response.data.success) {
        const authState: AuthState = {
          isAuthenticated: true,
          expiresAt: Date.now() + AUTH_EXPIRY_MS,
        }
        localStorage.setItem(AUTH_KEY, JSON.stringify(authState))
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
  }, [])

  const getAuthHeader = useCallback(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const authState: AuthState = JSON.parse(stored)
        if (authState.expiresAt > Date.now()) {
          return { 'X-JobBuddy-Auth': 'authenticated' }
        }
      } catch {
        // Invalid stored data
      }
    }
    return {}
  }, [])

  return { isAuthenticated, isLoading, login, logout, getAuthHeader }
}
