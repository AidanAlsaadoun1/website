import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Github, Star } from 'lucide-react'
import { SystemDiagram } from './system-diagram'
import { TerminalBlock } from './terminal-block'
import type { Project } from '@/config/projects'
import type { GhRepo } from '@/lib/github'
import { cn, relativeTime } from '@/lib/utils'

type Props = {
  project: Project
  /** Live GitHub metadata, when available. Cards render fine without it. */
  repo?: GhRepo
  /** `featured` spans the grid and shows the diagram / terminal sample. */
  variant?: 'default' | 'featured'
  /** h3 under a section h2 (home); h2 directly under a page h1 (/projects). */
  headingLevel?: 2 | 3
  className?: string
}

/**
 * Case-study card. Says what it is, why it's hard, what I built and what it's
 * made of, then links out. Straight card, no tilt: the content is the flourish.
 */
export function ProjectCard({ project, repo, variant = 'default', headingLevel = 3, className }: Props) {
  const featured = variant === 'featured'
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  const caseStudyHref = `/projects/${project.slug}`
  const visual = project.diagram ? 'diagram' : project.terminal ? 'terminal' : 'none'

  return (
    <article
      className={cn('pop-card flex h-full min-w-0 flex-col rounded-2xl p-6 sm:p-8', className)}
      aria-labelledby={`project-${project.slug}`}
    >
      <div className={cn('min-w-0', featured && 'grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12')}>
        <div className="flex min-w-0 flex-col gap-5">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {project.slug}
              </p>
              {project.context && (
                <>
                  <span aria-hidden="true" className="text-muted-foreground/60">·</span>
                  <p className="font-mono text-[11px] tracking-wide text-muted-foreground">{project.context}</p>
                </>
              )}
            </div>
            <Heading
              id={`project-${project.slug}`}
              className={cn('display mt-2 leading-tight', featured ? 'text-4xl sm:text-5xl' : 'text-[1.85rem]')}
            >
              <Link href={caseStudyHref} className="transition-colors hover:text-accent">
                {project.name}
              </Link>
            </Heading>
            <p className="pretty-wrap mt-3 text-[0.95rem] font-medium leading-snug text-foreground">
              {project.tagline}
            </p>
          </header>

          <p className="pretty-wrap text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

          <div>
            <p className="eyebrow mb-2">Why it&apos;s interesting</p>
            <p className="pretty-wrap text-sm leading-relaxed text-foreground/85">{project.why}</p>
          </div>

          {visual !== 'terminal' && (
            <div>
              <p className="eyebrow mb-2">What I built</p>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
                {project.built.slice(0, featured ? 3 : 2).map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="pretty-wrap">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ul className="flex flex-wrap gap-1.5" aria-label="Engineering concepts">
            {project.concepts.slice(0, featured ? 8 : 4).map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {featured && visual === 'diagram' && project.diagram && (
          <SystemDiagram
            title={project.diagram.title}
            nodes={project.diagram.nodes}
            footnote={project.diagram.footnote}
            className="self-start"
          />
        )}
        {featured && visual === 'terminal' && project.terminal && (
          <div className="flex min-w-0 flex-col gap-5 self-start">
            <TerminalBlock title={project.terminal.title} lines={project.terminal.lines} />
            <div>
              <p className="eyebrow mb-2">What I built</p>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
                {project.built.slice(0, 3).map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="pretty-wrap">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-6 flex flex-col gap-4 border-t-2 border-dashed border-foreground/15 pt-5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {project.stack.join(' · ')}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link href={caseStudyHref} className="link inline-flex items-center gap-1 font-medium">
            Case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-foreground/85 hover:text-accent"
            aria-label={`${project.name} on GitHub (opens in new tab)`}
          >
            <Github className="h-4 w-4" aria-hidden="true" /> GitHub
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-foreground/85 hover:text-accent"
              aria-label={`${project.name} live site (opens in new tab)`}
            >
              {project.liveLabel ?? 'Live'} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
          {project.extraLinks?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-foreground/85 hover:text-accent"
            >
              {l.label} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
          {repo && (
            <span className="ml-auto inline-flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted-foreground">
              {repo.language && <span>{repo.language}</span>}
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">Stars: </span>
                  {repo.stars}
                </span>
              )}
              <span>updated {relativeTime(repo.updatedAt)}</span>
            </span>
          )}
        </div>
      </footer>
    </article>
  )
}
