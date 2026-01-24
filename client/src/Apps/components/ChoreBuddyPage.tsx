import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import {
  ClipboardList,
  Trophy,
  History,
  LogOut,
  Lock,
  AlertCircle,
  Check,
  Loader2,
} from 'lucide-react'
import { useChoreBuddyAuth } from '../lib/useChoreBuddyAuth'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { cn } from '../lib/utils'

type Chore = {
  id: string
  name: string
  weight: number
}

type User = {
  id: number
  name: string
}

type PointData = {
  totalPoints: number
  choreCount: number
}

type LeaderboardData = {
  totalPoints: { [key: number]: PointData }
  weeklyPoints: { [key: number]: PointData }
}

type HistoryEntry = {
  _id: string
  userId: number
  choreId: string
  choreName: string
  weight: number
  timestamp: string
}

const ChoreBuddyPage = () => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    userId,
    userName,
    login,
    logout,
    getAuthHeader,
  } = useChoreBuddyAuth()

  // Password form state
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  // App state
  const [chores, setChores] = useState<Chore[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardData | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [loggingChoreId, setLoggingChoreId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fetchData = useCallback(async () => {
    setIsLoadingData(true)
    setError('')
    try {
      const headers = getAuthHeader()
      const [choresRes, leaderboardRes, historyRes] = await Promise.all([
        axios.get('/api/chorebuddy/chores', { headers }),
        axios.get('/api/chorebuddy/leaderboard', { headers }),
        axios.get('/api/chorebuddy/history?limit=20', { headers }),
      ])
      setChores(choresRes.data.chores)
      setUsers(choresRes.data.users)
      setLeaderboard(leaderboardRes.data)
      setHistory(historyRes.data.history)
    } catch (err) {
      setError('Failed to load data. Please try again.')
      console.error(err)
    } finally {
      setIsLoadingData(false)
    }
  }, [getAuthHeader])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated, fetchData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setIsLoggingIn(true)

    const result = await login(password)

    if (!result.success) {
      setLoginError('Invalid password. Please try again.')
      setPassword('')
    }

    setIsLoggingIn(false)
  }

  const handleLogChore = async (choreId: string) => {
    if (!userId) return

    setLoggingChoreId(choreId)
    setError('')
    setSuccessMessage('')

    try {
      const headers = getAuthHeader()
      await axios.post('/api/chorebuddy/log', { userId, choreId }, { headers })

      // Refresh data
      const [leaderboardRes, historyRes] = await Promise.all([
        axios.get('/api/chorebuddy/leaderboard', { headers }),
        axios.get('/api/chorebuddy/history?limit=20', { headers }),
      ])
      setLeaderboard(leaderboardRes.data)
      setHistory(historyRes.data.history)

      const chore = chores.find((c) => c.id === choreId)
      setSuccessMessage(`Logged "${chore?.name}" (+${chore?.weight} pts)`)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Failed to log chore. Please try again.')
      console.error(err)
    } finally {
      setLoggingChoreId(null)
    }
  }

  const getUserName = (id: number) => {
    const user = users.find((u) => u.id === id)
    return user?.name ?? `User ${id}`
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Password overlay
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>ChoreBuddy Access</CardTitle>
            <CardDescription>
              Enter your password to access ChoreBuddy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoggingIn}
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoggingIn || !password}
              >
                {isLoggingIn ? 'Verifying...' : 'Access ChoreBuddy'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main app
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ChoreBuddy</h1>
          <p className="text-muted-foreground">
            Welcome back, <span className="font-medium">{userName}</span>
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <Alert className="border-green-500 bg-green-500/10">
          <Check className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoadingData ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weekly */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  This Week
                </h3>
                <div className="space-y-2">
                  {users
                    .sort(
                      (a, b) =>
                        (leaderboard?.weeklyPoints[b.id]?.totalPoints ?? 0) -
                        (leaderboard?.weeklyPoints[a.id]?.totalPoints ?? 0)
                    )
                    .map((user, index) => {
                      const points = leaderboard?.weeklyPoints[user.id]
                      const isLeading =
                        index === 0 && (points?.totalPoints ?? 0) > 0
                      return (
                        <div
                          key={user.id}
                          className={cn(
                            'flex items-center justify-between p-3 rounded-lg',
                            isLeading
                              ? 'bg-yellow-500/10 border border-yellow-500/30'
                              : 'bg-muted/50'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {isLeading && (
                              <Trophy className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="font-medium">{user.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              {points?.totalPoints ?? 0} pts
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {points?.choreCount ?? 0} chores
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>

              {/* All Time */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  All Time
                </h3>
                <div className="space-y-2">
                  {users
                    .sort(
                      (a, b) =>
                        (leaderboard?.totalPoints[b.id]?.totalPoints ?? 0) -
                        (leaderboard?.totalPoints[a.id]?.totalPoints ?? 0)
                    )
                    .map((user) => {
                      const points = leaderboard?.totalPoints[user.id]
                      return (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <span className="font-medium">{user.name}</span>
                          <div className="text-right">
                            <div className="font-bold">
                              {points?.totalPoints ?? 0} pts
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {points?.choreCount ?? 0} chores
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chore Selection */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Log a Chore
              </CardTitle>
              <CardDescription>
                Tap a chore to log it as completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {chores.map((chore) => (
                  <Button
                    key={chore.id}
                    variant="outline"
                    className="h-auto py-3 px-4 flex flex-col items-start gap-1 text-left"
                    onClick={() => handleLogChore(chore.id)}
                    disabled={loggingChoreId === chore.id}
                  >
                    {loggingChoreId === chore.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <span className="font-medium text-sm">
                          {chore.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          +{chore.weight} pts
                        </Badge>
                      </>
                    )}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent History */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No chores logged yet. Get started by logging your first chore!
                </p>
              ) : (
                <div className="space-y-2">
                  {history.map((entry) => (
                    <div
                      key={entry._id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            entry.userId === 1 ? 'default' : 'secondary'
                          }
                        >
                          {getUserName(entry.userId)}
                        </Badge>
                        <span>{entry.choreName}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">+{entry.weight} pts</Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default ChoreBuddyPage
