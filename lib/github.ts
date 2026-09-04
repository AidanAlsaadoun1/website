import { siteConfig } from '@/config/site'

/** Live metadata for one public repository. */
export type GhRepo = {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: string | null
  /** ISO timestamp of the last push. */
  updatedAt: string
  topics: string[]
  homepageUrl?: string | null
}

type RestRepo = {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  pushed_at: string
  topics?: string[]
  fork: boolean
}

/**
 * Fetch public repo metadata for the GitHub account, keyed by lower-cased repo
 * name. Cached for an hour by Next. Works unauthenticated (60 req/h is plenty
 * for one cached call); a GITHUB_TOKEN raises the limit but is not required.
 * Any failure returns an empty map so the curated cards still render.
 */
export async function getRepoMetadata(): Promise<Record<string, GhRepo>> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'dev-aidan.com',
  }
  const token = process.env.GITHUB_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.socials.github}/repos?per_page=100&type=owner&sort=pushed`,
      { headers, next: { revalidate: 3600, tags: ['github-repos'] } },
    )
    if (!res.ok) {
      console.warn(`[github] non-200 from REST: ${res.status}`)
      return {}
    }
    const repos = (await res.json()) as RestRepo[]
    const map: Record<string, GhRepo> = {}
    for (const r of repos) {
      if (r.fork) continue
      map[r.name.toLowerCase()] = {
        name: r.name,
        description: r.description,
        url: r.html_url,
        homepageUrl: r.homepage,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.pushed_at,
        topics: r.topics ?? [],
      }
    }
    return map
  } catch (err) {
    console.warn('[github] fetch failed', err)
    return {}
  }
}
