import OpenAI from 'openai'
import { SseEventType } from '../types/enums.js'
import type {
  ResumeData,
  JobPreferences,
  RawJob,
  ScoredJob,
  SseEvent,
  StatusEvent,
  CompleteEvent,
} from '../types/openai.js'

// Maximum number of web searches to perform
const MAX_SEARCHES = 5

const extractResumeData = async (resumeText: string): Promise<ResumeData> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [
      {
        role: 'system',
        content: `You are a resume parser. Extract structured information from the resume and return it as JSON.
Extract:
- roles: array of job titles/roles the person has held or is qualified for
- skills: array of technical and soft skills
- seniority: one of "entry", "mid", "senior", "staff", "principal", "executive"
- locations: array of locations mentioned or implied (cities, states, "remote", etc.)
- industries: array of industries the person has experience in
- keywords: array of key terms suitable for job search queries

Return ONLY valid JSON, no markdown formatting.`,
      },
      {
        role: 'user',
        content: resumeText,
      },
    ],
    temperature: 0.1,
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content ?? '{}') as ResumeData
}

const generateSearchQueries = async (
  resumeData: ResumeData,
  jobPreferences: JobPreferences
): Promise<string[]> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a job search query generator. Based on the resume data and job preferences, generate ${MAX_SEARCHES} search queries that would find relevant job listings on job sites like LinkedIn, Indeed, Glassdoor, and company career pages.

Each query should be a natural search engine query like:
- "Senior frontend engineer React remote jobs"
- "Staff backend engineer Node.js fintech San Francisco"

Focus on:
1. Role/title + key skills
2. Seniority level
3. Location preferences
4. Industry if relevant

Return JSON with a "queries" array of strings. No markdown formatting.`,
      },
      {
        role: 'user',
        content: JSON.stringify({ resumeData, jobPreferences }),
      },
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' },
  })

  const parsed = JSON.parse(response.choices[0].message.content ?? '{}') as {
    queries: string[]
  }
  return parsed.queries
}

type ResponsesApiOutput =
  | { output_text?: string; output?: string | ResponsesApiOutputItem[] }
  | { choices?: { message?: { content?: string | null } }[] }

type ResponsesApiOutputItem = {
  type: string
  content?: ResponsesApiContentItem[]
  text?: string
}

type ResponsesApiContentItem = {
  type: string
  text?: string
}

const extractOutputText = (response: ResponsesApiOutput): string => {
  if ('output_text' in response && response.output_text) {
    return response.output_text
  }
  if ('output' in response && response.output) {
    if (typeof response.output === 'string') {
      return response.output
    }
    if (Array.isArray(response.output)) {
      for (const item of response.output) {
        if (item.type === 'message' && item.content) {
          for (const content of item.content) {
            if (content.type === 'output_text' || content.type === 'text') {
              return content.text ?? ''
            }
          }
        }
        if (item.type === 'text') {
          return item.text ?? ''
        }
      }
    }
  }
  if (
    'choices' in response &&
    response.choices?.[0]?.message?.content != null
  ) {
    return response.choices[0].message.content
  }
  return ''
}

const searchJobsWithWebSearch = async (
  queries: string[]
): Promise<RawJob[]> => {
  const allJobs: RawJob[] = []

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  for (const query of queries.slice(0, MAX_SEARCHES)) {
    try {
      console.log(`Searching for: "${query}"`)

      const response = await openai.responses.create({
        model: 'gpt-4o',
        tools: [{ type: 'web_search' as const }],
        input: `Search for current job openings: "${query}"

Find real job listings from job sites like LinkedIn Jobs, Indeed, Glassdoor, or company career pages.

For each job you find, extract:
- Job title
- Company name
- Location
- Employment type (full-time, part-time, contract, remote)
- Direct URL to the job posting
- Source website
- Brief description/summary

Only include actual job postings, not blog posts, career advice articles, or job aggregator landing pages.

Return the results as a JSON array with this structure:
[{
  "title": "",
  "company": "",
  "location": "",
  "employment_type": "",
  "url": "",
  "source": "",
  "summary": ""
}]

Return ONLY the JSON array, no other text.`,
      })

      const content = extractOutputText(
        response as unknown as ResponsesApiOutput
      )
      console.log(`Response content length: ${content.length}`)

      const jsonMatch = content.match(/\[[\s\S]*?\]/g)
      if (jsonMatch) {
        for (const match of jsonMatch) {
          try {
            const jobs = JSON.parse(match) as unknown[]
            if (Array.isArray(jobs) && jobs.length > 0) {
              const validJobs = (jobs as RawJob[]).filter(
                (j) => j && (j.title || j.company || j.url)
              )
              allJobs.push(...validJobs)
              console.log(`Found ${validJobs.length} jobs from this search`)
              break
            }
          } catch {
            // Try next match
          }
        }
      }
    } catch (error) {
      console.error(
        `Search error for query "${query}":`,
        (error as Error).message
      )
    }
  }

  return allJobs
}

const deduplicateJobs = (jobs: RawJob[]): RawJob[] => {
  const seen = new Set<string>()
  return jobs.filter((job) => {
    const key = `${(job.company ?? '').toLowerCase()}-${(
      job.title ?? ''
    ).toLowerCase()}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const scoreJobs = async (
  jobs: RawJob[],
  resumeData: ResumeData,
  jobPreferences: JobPreferences
): Promise<ScoredJob[]> => {
  if (jobs.length === 0) return []

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a job matching expert. Score each job against the candidate's resume and preferences.

For each job, provide:
1. A match score from 0-100 based on:
   - Skill overlap (40%)
   - Seniority match (20%)
   - Role relevance (25%)
   - Location preference (15%)

2. A brief 1-2 sentence explanation of why this job matches (or doesn't match well)

Only include jobs with a score of 60 or higher.

Return a JSON object with a "jobs" key containing an array with structure:
{
  "jobs": [{
    "title": "original title",
    "company": "original company",
    "location": "original location",
    "employment_type": "original type",
    "url": "original url",
    "source": "original source",
    "summary": "original summary",
    "match_score": number,
    "match_reason": "explanation string"
  }]
}

Sort by match_score descending. Return top 10 results maximum.
No markdown formatting, just valid JSON.`,
      },
      {
        role: 'user',
        content: JSON.stringify({
          jobs: jobs.slice(0, 20),
          resumeData,
          jobPreferences,
        }),
      },
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' },
  })

  const result = JSON.parse(response.choices[0].message.content ?? '{}') as
    | { jobs?: ScoredJob[]; results?: ScoredJob[] }
    | ScoredJob[]
  if (Array.isArray(result)) return result
  return result.jobs ?? result.results ?? []
}

export async function* searchJobs(
  resumeText: string,
  jobPreferences: JobPreferences
): AsyncGenerator<SseEvent> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }

  const step1: StatusEvent = {
    type: SseEventType.Status,
    step: 1,
    message: 'Analyzing your resume...',
  }
  yield step1
  console.log('Step 1: Extracting resume data...')
  const resumeData = await extractResumeData(resumeText)
  console.log('Resume data extracted:', JSON.stringify(resumeData, null, 2))

  const step2: StatusEvent = {
    type: SseEventType.Status,
    step: 2,
    message: 'Generating search queries based on your profile...',
  }
  yield step2
  console.log('Step 2: Generating search queries...')
  const queries = await generateSearchQueries(resumeData, jobPreferences)
  console.log('Generated queries:', queries)

  const step3: StatusEvent = {
    type: SseEventType.Status,
    step: 3,
    message: `Searching the web with ${queries.length} queries...`,
    queries,
  }
  yield step3
  console.log('Step 3: Searching for jobs...')
  const rawJobs = await searchJobsWithWebSearch(queries)
  console.log(`Found ${rawJobs.length} raw jobs`)

  const step4: StatusEvent = {
    type: SseEventType.Status,
    step: 4,
    message: `Found ${rawJobs.length} jobs, removing duplicates...`,
  }
  yield step4
  console.log('Step 4: Deduplicating...')
  const uniqueJobs = deduplicateJobs(rawJobs)
  console.log(`${uniqueJobs.length} unique jobs after deduplication`)

  if (uniqueJobs.length === 0) {
    const done: CompleteEvent = { type: SseEventType.Complete, jobs: [] }
    yield done
    return
  }

  const step5: StatusEvent = {
    type: SseEventType.Status,
    step: 5,
    message: `Scoring and ranking ${uniqueJobs.length} unique jobs...`,
  }
  yield step5
  console.log('Step 5: Scoring jobs...')
  const scoredJobs = await scoreJobs(uniqueJobs, resumeData, jobPreferences)
  console.log(
    `Returning ${Array.isArray(scoredJobs) ? scoredJobs.length : 0} scored jobs`
  )

  const finalJobs = Array.isArray(scoredJobs) ? scoredJobs : []
  const complete: CompleteEvent = {
    type: SseEventType.Complete,
    jobs: finalJobs,
  }
  yield complete
}
