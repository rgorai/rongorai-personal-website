import { SseEventType } from './enums.js'

export type ResumeData = {
  roles: string[]
  skills: string[]
  seniority: string
  locations: string[]
  industries: string[]
  keywords: string[]
}

export type JobPreferences = Record<string, unknown>

export type RawJob = {
  title?: string
  company?: string
  location?: string
  employment_type?: string
  url?: string
  source?: string
  summary?: string
}

export type ScoredJob = RawJob & {
  match_score: number
  match_reason: string
}

export type StatusEvent = {
  type: SseEventType.Status
  step: number
  message: string
  queries?: string[]
}

export type CompleteEvent = {
  type: SseEventType.Complete
  jobs: ScoredJob[]
}

export type ErrorEvent = {
  type: SseEventType.Error
  message: string
}

export type SseEvent = StatusEvent | CompleteEvent | ErrorEvent
