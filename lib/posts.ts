import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export type PostKind = 'blog' | 'security' | 'projects'

/**
 * The blog has three fixed top-level categories.
 * - engineering: stack/infra/deployment-type posts
 * - security:    pentesting, CTF writeups, vuln research
 * - info:        meta posts, opinion, "what I'm up to" updates
 *
 * Tags can still be anything, they're just SEO/visual metadata. Categories
 * drive the filter chips on /blog.
 */
export const POST_CATEGORIES = ['engineering', 'security', 'info'] as const
export type PostCategory = (typeof POST_CATEGORIES)[number]

export const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  engineering: 'Engineering',
  security: 'Security',
  info: 'Info',
}

export type PostFrontmatter = {
  title: string
  date: string // ISO
  summary: string
  category?: PostCategory
  tags?: string[]
  draft?: boolean
  /** Pinned to the home page "Writing" section (engineering-depth posts first). */
  featured?: boolean
  // security-specific
  severity?: 'info' | 'low' | 'medium' | 'high' | 'critical'
  cve?: string
  // projects-specific
  repoUrl?: string
  liveUrl?: string
  stack?: string[]
}

export type Post = {
  slug: string
  kind: PostKind
  content: string
  readingTime: string
  frontmatter: PostFrontmatter
}

const CONTENT_ROOT = path.join(process.cwd(), 'content')

async function readMdxFiles(kind: PostKind): Promise<string[]> {
  const dir = path.join(CONTENT_ROOT, kind)
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    return entries
      .filter((e) => e.isFile() && e.name.endsWith('.mdx'))
      .map((e) => path.join(dir, e.name))
  } catch {
    return []
  }
}

export async function getAllPosts(kind: PostKind): Promise<Post[]> {
  const files = await readMdxFiles(kind)
  const posts: Post[] = []
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8')
    const { data, content } = matter(raw)
    const slug = path.basename(file, '.mdx')
    const fm = data as PostFrontmatter
    if (fm.draft && process.env.NODE_ENV === 'production') continue
    posts.push({
      slug,
      kind,
      content,
      readingTime: readingTime(content).text,
      frontmatter: fm,
    })
  }
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  )
}

export async function getPost(kind: PostKind, slug: string): Promise<Post | null> {
  const all = await getAllPosts(kind)
  return all.find((p) => p.slug === slug) ?? null
}

export async function getAllTags(kind: PostKind): Promise<string[]> {
  const posts = await getAllPosts(kind)
  const set = new Set<string>()
  posts.forEach((p) => p.frontmatter.tags?.forEach((t) => set.add(t)))
  return [...set].sort()
}

/**
 * Posts for the home page: `featured: true` posts first (newest first), then
 * the newest of the rest, up to `limit`.
 */
export async function getHomePosts(limit = 3): Promise<Post[]> {
  const posts = await getAllPosts('blog')
  const featured = posts.filter((p) => p.frontmatter.featured)
  const rest = posts.filter((p) => !p.frontmatter.featured)
  return [...featured, ...rest].slice(0, limit)
}
