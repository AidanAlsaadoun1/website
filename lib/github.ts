import { siteConfig } from '@/config/site'

export type GhRepo = {
  name: string
  description: string | null
  url: string
  stars: number
  forks: number
  language: { name: string; color: string } | null
  updatedAt: string
  topics: string[]
  homepageUrl?: string | null
}

const PINNED_QUERY = /* GraphQL */ `
  query Pinned($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            updatedAt
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 6) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`

/**
 * Fetch pinned repos from GitHub. Cached for 1h by Next.
 * Gracefully degrades if no GITHUB_TOKEN is configured.
 */
export async function getPinnedRepos(): Promise<GhRepo[]> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return getFallbackRepos()
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: PINNED_QUERY,
        variables: { login: siteConfig.socials.github },
      }),
      next: { revalidate: 3600, tags: ['github-pinned'] },
    })

    if (!res.ok) {
      console.warn(`[github] non-200 from GraphQL: ${res.status}`)
      return getFallbackRepos()
    }

    const json = (await res.json()) as {
      data?: {
        user?: {
          pinnedItems?: {
            nodes?: Array<{
              name: string
              description: string | null
              url: string
              homepageUrl?: string | null
              stargazerCount: number
              forkCount: number
              updatedAt: string
              primaryLanguage: { name: string; color: string } | null
              repositoryTopics: { nodes: Array<{ topic: { name: string } }> }
            }>
          }
        }
      }
      errors?: unknown
    }

    const nodes = json.data?.user?.pinnedItems?.nodes ?? []
    if (nodes.length === 0) return getFallbackRepos()

    return nodes
      .map((n) => ({
        name: n.name,
        description: n.description,
        url: n.url,
        homepageUrl: n.homepageUrl,
        stars: n.stargazerCount,
        forks: n.forkCount,
        language: n.primaryLanguage,
        updatedAt: n.updatedAt,
        topics: n.repositoryTopics.nodes.map((t) => t.topic.name),
      }))
      // Most-starred first (GitHub returns pinned order otherwise)
      .sort((a, b) => b.stars - a.stars)
  } catch (err) {
    console.warn('[github] fetch failed', err)
    return getFallbackRepos()
  }
}

/**
 * Static fallback so the site never renders an empty grid.
 * Replace with hand-curated entries if you want, or just let GitHub fill it in.
 */
function getFallbackRepos(): GhRepo[] {
  return [
    {
      name: 'add-a-GITHUB_TOKEN',
      description:
        'Drop a fine-grained PAT with `public_repo` read scope into your Vercel env to populate this section automatically.',
      url: `https://github.com/${siteConfig.socials.github}`,
      stars: 0,
      forks: 0,
      language: { name: 'Setup', color: '#8b5cf6' },
      updatedAt: new Date().toISOString(),
      topics: ['setup', 'todo'],
    },
  ]
}
