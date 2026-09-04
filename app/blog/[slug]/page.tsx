import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Markdown } from '@/components/site/markdown'
import { getAllPosts, getPost } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export async function generateStaticParams() {
  const posts = await getAllPosts('blog')
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost('blog', slug)
  if (!post) return {}
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: 'article',
      publishedTime: post.frontmatter.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost('blog', slug)
  if (!post) notFound()

  const { severity, cve, tags } = post.frontmatter
  const isSecurityFlavoured =
    severity !== undefined || cve !== undefined || tags?.includes('security')

  return (
    <article className="container max-w-3xl py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Writing' },
          { label: post.frontmatter.title },
        ]}
      />

      <header className="mb-10">
        <p aria-hidden="true">
          <span className={`tag-sticker ${isSecurityFlavoured ? 'bg-pop-blush' : 'bg-pop-sky'}`}>
            {isSecurityFlavoured ? 'Writeup' : 'Essay'}
          </span>
        </p>
        <h1 className="display mt-3 text-balance text-display-sm sm:text-display-md">
          {post.frontmatter.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time className="font-mono" dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          {severity && (
            <>
              <span aria-hidden="true">·</span>
              <span className="rounded-full border border-foreground/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                <span className="sr-only">Severity: </span>
                {severity}
              </span>
            </>
          )}
          {cve && (
            <>
              <span aria-hidden="true">·</span>
              <a
                href={`https://nvd.nist.gov/vuln/detail/${cve}`}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-xs text-accent hover:bg-accent/20"
                aria-label={`View ${cve} on NVD (opens in new tab)`}
              >
                {cve}
              </a>
            </>
          )}
        </div>
        {tags && tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-foreground/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose max-w-none">
        <Markdown source={post.content} />
      </div>
    </article>
  )
}
