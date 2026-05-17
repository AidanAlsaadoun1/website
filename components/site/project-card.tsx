import Link from 'next/link'
import { ExternalLink, GitFork, Star } from 'lucide-react'
import type { GhRepo } from '@/lib/github'
import { GlassCard } from './glass-card'
import { Tilt } from './tilt'
import { relativeTime } from '@/lib/utils'

export function ProjectCard({ repo }: { repo: GhRepo }) {
  return (
    <Tilt className="group relative h-full">
      <GlassCard
        as="article"
        interactive
        className="relative flex h-full flex-col justify-between gap-4 overflow-hidden"
      >
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-base font-medium text-foreground">
              <Link
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-accent"
              >
                {repo.name}
              </Link>
            </h3>
            <Link
              href={repo.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${repo.name} on GitHub`}
              className="text-muted-foreground transition hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
          {repo.description && (
            <p className="pretty-wrap mt-2 text-sm text-muted-foreground">{repo.description}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: repo.language.color }}
              />
              <span>{repo.language.name}</span>
            </span>
          )}
          {repo.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="inline-flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" /> {repo.forks}
            </span>
          )}
          <span className="ml-auto">updated {relativeTime(repo.updatedAt)}</span>
        </div>

        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </GlassCard>
    </Tilt>
  )
}
