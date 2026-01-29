import { useState } from 'react'
import axios from 'axios'
import { Briefcase, Search, ExternalLink, Loader2, LogOut } from 'lucide-react'
import { useJobBuddyAuth } from '../lib/useJobBuddyAuth'
import PasswordOverlay from './PasswordOverlay'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card'
import { Badge } from './ui/badge'
import { Alert, AlertTitle, AlertDescription } from './ui/alert'

type JobResult = {
  title: string
  company: string
  location: string
  employment_type: string
  url: string
  source: string
  summary: string
  match_score: number
  match_reason: string
}

type SearchStatus = 'idle' | 'loading' | 'success' | 'error'

const JobBuddyPage = () => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    login,
    logout,
    getAuthHeader,
  } = useJobBuddyAuth()
  const [resume, setResume] = useState('')
  const [jobPreferences, setJobPreferences] = useState('')
  const [jobs, setJobs] = useState<JobResult[]>([])
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSearch = async () => {
    if (!resume.trim() || !jobPreferences.trim()) {
      setError('Please provide both your resume and job preferences.')
      return
    }

    setStatus('loading')
    setError('')
    setJobs([])
    setStatusMessage('Analyzing your resume...')

    try {
      const response = await axios.post(
        '/api/jobbuddy/search',
        { resume, jobPreferences },
        { headers: getAuthHeader() }
      )

      if (response.data.jobs) {
        setJobs(response.data.jobs)
        setStatus('success')
        setStatusMessage('')
      } else {
        throw new Error('No jobs returned from search')
      }
    } catch (err: any) {
      setStatus('error')
      setError(
        err.response?.data?.error ||
          err.message ||
          'An error occurred during the search.'
      )
      setStatusMessage('')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success'
    if (score >= 70) return 'default'
    return 'secondary'
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <PasswordOverlay onLogin={login} />
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">JobBuddy</h1>
            <p className="text-sm text-muted-foreground">
              AI-powered job search assistant
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Find Your Next Job</CardTitle>
          <CardDescription>
            {`Paste your resume and describe what kind of jobs you're looking for.
            We'll search the web to find the best matches.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Your Resume</Label>
            <Textarea
              id="resume"
              placeholder="Paste your resume text here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              disabled={status === 'loading'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferences">Job Preferences</Label>
            <Textarea
              id="preferences"
              placeholder="Describe what kind of jobs you're looking for...&#10;&#10;Example: I'm looking for senior frontend engineer roles at tech companies, preferably remote or in the San Francisco Bay Area. Interested in React, TypeScript, and building user-facing products."
              value={jobPreferences}
              onChange={(e) => setJobPreferences(e.target.value)}
              className="min-h-[120px]"
              disabled={status === 'loading'}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSearch}
            disabled={
              status === 'loading' || !resume.trim() || !jobPreferences.trim()
            }
            className="w-full"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {statusMessage || 'Searching...'}
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Find Jobs
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {jobs.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            Found {jobs.length} matching job{jobs.length !== 1 ? 's' : ''}
          </h2>
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="text-base">
                        {job.company} • {job.location}
                        {job.employment_type && ` • ${job.employment_type}`}
                      </CardDescription>
                    </div>
                    <Badge variant={getScoreColor(job.match_score)}>
                      {job.match_score}% match
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground">{job.summary}</p>
                  <p className="text-sm text-muted-foreground italic">
                    {job.match_reason}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Source: {job.source}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Job Posting
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state after search */}
      {status === 'success' && jobs.length === 0 && (
        <Alert>
          <AlertTitle>No matching jobs found</AlertTitle>
          <AlertDescription>
            Try adjusting your job preferences or updating your resume to find
            more matches.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export default JobBuddyPage
