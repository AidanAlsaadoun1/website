import Link from 'next/link'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import type { GhRepo } from '@/lib/github'
import { relativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

const CHIP_TONES = ['bg-pop-butter', 'bg-pop-sky', 'bg-pop-blush', 'bg-pop-mint']

/** Sticker card, lifts on hover, topics get their own colours. */
export function ProjectCard({ repo, tilt = 0 }: { repo: GhRepo; tilt?: -1 | 0 | 1 }) {
  return (
    <article
      className={cn(
        'pop-card pop-card-hover group relative flex h-full flex-col gap-4 rounded-2xl p-7',
        tilt === -1 && '-rotate-1 hover:rotate-0',
        tilt === 1 && 'rotate-1 hover:rotate-0',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-mono text-base font-semibold tracking-tight text-foreground">
          <Link
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
            className="after:absolute after:inset-0 group-hover:text-accent"
          >
            {repo.name}
          </Link>
        </h3>
        <span
          aria-hidden="true"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-foreground bg-base transition group-hover:bg-pop-butter"
        >
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      {repo.description && (
        <p className="pretty-wrap text-sm leading-relaxed text-muted-foreground">
          {repo.description}
        </p>
      )}

      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {repo.topics.slice(0, 4).map((t, i) => (
            <span
              key={t}
              className={cn(
                'rounded-full border border-foreground px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground',
                CHIP_TONES[i % CHIP_TONES.length],
              )}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t-2 border-dashed border-foreground/20 pt-4 text-xs text-muted-foreground">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full border border-foreground/40"
              style={{ backgroundColor: repo.language.color }}
            />
            <span>{repo.language.name}</span>
          </span>
        )}
        {repo.stars > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5" aria-hidden="true" /> {repo.stars}
          </span>
        )}
        {repo.forks > 0 && (
          <span className="inline-flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" aria-hidden="true" /> {repo.forks}
          </span>
        )}
        <span className="ml-auto font-mono">updated {relativeTime(repo.updatedAt)}</span>
      </div>
    </article>
  )
}
