import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

/** Card for writing, the serif title does the talking. */
export function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const href = `/${post.kind}/${post.slug}`
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="pop-card pop-card-hover group relative flex h-full flex-col gap-4 rounded-2xl p-7">
      <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
        {post.frontmatter.severity && (
          <>
            <span aria-hidden="true">·</span>
            <SeverityChip severity={post.frontmatter.severity} />
          </>
        )}
      </div>

      <Heading className="display text-balance text-[1.7rem] leading-tight">
        <Link href={href} className="after:absolute after:inset-0 group-hover:text-accent">
          {post.frontmatter.title}
        </Link>
      </Heading>

      <p className="pretty-wrap text-sm leading-relaxed text-muted-foreground">
        {post.frontmatter.summary}
      </p>

      <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-foreground/20 pt-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {post.frontmatter.tags?.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-foreground bg-base transition group-hover:bg-pop-blush"
        >
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  )
}

function SeverityChip({ severity }: { severity: NonNullable<Post['frontmatter']['severity']> }) {
  const styles: Record<typeof severity, string> = {
    info: 'text-sky-700',
    low: 'text-emerald-700',
    medium: 'text-amber-700',
    high: 'text-orange-700',
    critical: 'text-rose-700',
  }
  return <span className={styles[severity]}>{severity}</span>
}
