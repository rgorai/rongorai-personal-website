export enum SearchStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export type JobResult = {
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

export type StreamEvent =
  | { type: 'status'; step: number; message: string; queries?: string[] }
  | { type: 'complete'; jobs: JobResult[] }
  | { type: 'error'; message: string }

export const TOTAL_STEPS = 5

type SearchJobsCallbacks = {
  onStatus: (message: string, step: number, queries?: string[]) => void
  onComplete: (jobs: JobResult[]) => void
  onError: (error: string) => void
}

export const searchJobs = async (
  resume: string,
  jobPreferences: string,
  authHeader: { 'X-JobBuddy-Auth'?: string },
  signal: AbortSignal,
  callbacks: SearchJobsCallbacks
): Promise<void> => {
  const response = await fetch('/api/jobbuddy/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    } as HeadersInit,
    body: JSON.stringify({ resume, jobPreferences }),
    signal,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Search request failed')
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('Stream not available')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    // Process complete SSE messages
    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // Keep incomplete line in buffer

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const event: StreamEvent = JSON.parse(line.slice(6))

          if (event.type === 'status') {
            callbacks.onStatus(event.message, event.step, event.queries)
          } else if (event.type === 'complete') {
            callbacks.onComplete(event.jobs)
          } else if (event.type === 'error') {
            throw new Error(event.message)
          }
        } catch (parseErr) {
          // Re-throw if it's our own error
          if (parseErr instanceof Error && parseErr.message) {
            throw parseErr
          }
          // Skip malformed JSON
          console.error('Failed to parse SSE event:', parseErr)
        }
      }
    }
  }
}
