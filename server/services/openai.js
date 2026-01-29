import OpenAI from 'openai'

// Maximum number of web searches to perform
const MAX_SEARCHES = 5

/**
 * Extract structured data from resume text
 */
async function extractResumeData(resumeText) {
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

  return JSON.parse(response.choices[0].message.content)
}

/**
 * Generate search queries based on resume and preferences
 */
async function generateSearchQueries(resumeData, jobPreferences) {
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

  return JSON.parse(response.choices[0].message.content).queries
}

/**
 * Helper to extract text from Responses API output
 */
function extractOutputText(response) {
  // Handle different response formats
  if (response.output_text) {
    return response.output_text
  }
  if (response.output) {
    if (typeof response.output === 'string') {
      return response.output
    }
    if (Array.isArray(response.output)) {
      // Find text content in output array
      for (const item of response.output) {
        if (item.type === 'message' && item.content) {
          for (const content of item.content) {
            if (content.type === 'output_text' || content.type === 'text') {
              return content.text
            }
          }
        }
        if (item.type === 'text') {
          return item.text
        }
      }
    }
  }
  if (response.choices?.[0]?.message?.content) {
    return response.choices[0].message.content
  }
  return ''
}

/**
 * Search for jobs using OpenAI's web search via Responses API
 */
async function searchJobsWithWebSearch(queries) {
  const allJobs = []

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  for (const query of queries.slice(0, MAX_SEARCHES)) {
    try {
      console.log(`Searching for: "${query}"`)

      // Use the Responses API with web search tool
      const response = await openai.responses.create({
        model: 'gpt-4o',
        tools: [{ type: 'web_search' }],
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

      // Parse the response to extract job data
      const content = extractOutputText(response)
      console.log(`Response content length: ${content.length}`)

      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*?\]/g)
      if (jsonMatch) {
        for (const match of jsonMatch) {
          try {
            const jobs = JSON.parse(match)
            if (Array.isArray(jobs) && jobs.length > 0) {
              // Validate job structure
              const validJobs = jobs.filter(
                (j) => j && (j.title || j.company || j.url)
              )
              allJobs.push(...validJobs)
              console.log(`Found ${validJobs.length} jobs from this search`)
              break
            }
          } catch (parseError) {
            // Try next match
          }
        }
      }
    } catch (error) {
      console.error(`Search error for query "${query}":`, error.message)
      // Continue with other queries
    }
  }

  return allJobs
}

/**
 * Deduplicate jobs by company + title
 */
function deduplicateJobs(jobs) {
  const seen = new Set()
  return jobs.filter((job) => {
    const key = `${(job.company || '').toLowerCase()}-${(
      job.title || ''
    ).toLowerCase()}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Score and explain job matches
 */
async function scoreJobs(jobs, resumeData, jobPreferences) {
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
          jobs: jobs.slice(0, 20), // Limit input to save tokens
          resumeData,
          jobPreferences,
        }),
      },
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' },
  })

  const result = JSON.parse(response.choices[0].message.content)
  return result.jobs || result.results || (Array.isArray(result) ? result : [])
}

/**
 * Main job search function - async generator that yields status updates
 */
export async function* searchJobs(resumeText, jobPreferences) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }

  // Step 1: Extract resume data
  yield { type: 'status', step: 1, message: 'Analyzing your resume...' }
  console.log('Step 1: Extracting resume data...')
  const resumeData = await extractResumeData(resumeText)
  console.log('Resume data extracted:', JSON.stringify(resumeData, null, 2))

  // Step 2: Generate search queries
  yield {
    type: 'status',
    step: 2,
    message: 'Generating search queries based on your profile...',
  }
  console.log('Step 2: Generating search queries...')
  const queries = await generateSearchQueries(resumeData, jobPreferences)
  console.log('Generated queries:', queries)

  // Step 3: Search for jobs using web search
  yield {
    type: 'status',
    step: 3,
    message: `Searching the web with ${queries.length} queries...`,
    queries,
  }
  console.log('Step 3: Searching for jobs...')
  const rawJobs = await searchJobsWithWebSearch(queries)
  console.log(`Found ${rawJobs.length} raw jobs`)

  // Step 4: Deduplicate
  yield {
    type: 'status',
    step: 4,
    message: `Found ${rawJobs.length} jobs, removing duplicates...`,
  }
  console.log('Step 4: Deduplicating...')
  const uniqueJobs = deduplicateJobs(rawJobs)
  console.log(`${uniqueJobs.length} unique jobs after deduplication`)

  if (uniqueJobs.length === 0) {
    yield { type: 'complete', jobs: [] }
    return
  }

  // Step 5: Score and rank
  yield {
    type: 'status',
    step: 5,
    message: `Scoring and ranking ${uniqueJobs.length} unique jobs...`,
  }
  console.log('Step 5: Scoring jobs...')
  const scoredJobs = await scoreJobs(uniqueJobs, resumeData, jobPreferences)
  console.log(
    `Returning ${Array.isArray(scoredJobs) ? scoredJobs.length : 0} scored jobs`
  )

  const finalJobs = Array.isArray(scoredJobs) ? scoredJobs : []
  yield { type: 'complete', jobs: finalJobs }
}
