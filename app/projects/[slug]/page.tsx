import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Markdown } from '@/components/site/markdown'
import { getAllPosts, getPost } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const posts = await getAllPosts('projects')
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost('projects', slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost('projects', slug)
  if (!post) notFound()

  return (
    <article className="container max-w-3xl py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Projects' },
          { label: post.frontmatter.title },
        ]}
      />

      <header className="mb-10">
        <p aria-hidden="true">
          <span className="tag-sticker bg-pop-mint">Case study</span>
        </p>
        <h1 className="display mt-3 text-balance text-display-sm sm:text-display-md">
          {post.frontmatter.title}
        </h1>
        <p className="pretty-wrap mt-3 text-lg text-muted-foreground">
          {post.frontmatter.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <time className="font-mono" dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          {post.frontmatter.repoUrl && (
            <a
              href={post.frontmatter.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent hover:underline"
              aria-label="View source code on GitHub (opens in new tab)"
            >
              source ↗
            </a>
          )}
          {post.frontmatter.liveUrl && (
            <a
              href={post.frontmatter.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent hover:underline"
              aria-label="View live site (opens in new tab)"
            >
              live ↗
            </a>
          )}
        </div>
        {post.frontmatter.stack && post.frontmatter.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.frontmatter.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-foreground/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose max-w-none">
        <Markdown source={post.content} />
      </div>
    </article>
  )
}
