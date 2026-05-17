import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Post } from '@/lib/posts'
import { GlassCard } from './glass-card'
import { Tilt } from './tilt'
import { formatDate } from '@/lib/utils'

export function PostCard({ post }: { post: Post }) {
  const href = `/${post.kind}/${post.slug}`
  return (
    <Tilt className="group relative h-full">
      <GlassCard
        as="article"
        interactive
        className="relative flex h-full flex-col gap-4 overflow-hidden"
      >
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.frontmatter.date} className="font-mono">
            {formatDate(post.frontmatter.date)}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
          {post.frontmatter.severity && (
            <>
              <span aria-hidden>·</span>
              <SeverityChip severity={post.frontmatter.severity} />
            </>
          )}
        </div>
        <h3 className="text-balance text-xl font-semibold leading-snug">
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-accent">
            {post.frontmatter.title}
          </Link>
        </h3>
        <p className="pretty-wrap text-sm text-muted-foreground">{post.frontmatter.summary}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.frontmatter.tags?.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>
      </GlassCard>
    </Tilt>
  )
}

function SeverityChip({ severity }: { severity: NonNullable<Post['frontmatter']['severity']> }) {
  const styles: Record<typeof severity, string> = {
    info: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    low: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    medium: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    high: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
    critical: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  }
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${styles[severity]}`}
    >
      {severity}
    </span>
  )
}
