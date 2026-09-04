import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Star } from 'lucide-react'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Markdown } from '@/components/site/markdown'
import { SystemDiagram } from '@/components/site/system-diagram'
import { TerminalBlock } from '@/components/site/terminal-block'
import { getProject, projects } from '@/config/projects'
import { getRepoMetadata } from '@/lib/github'
import { getPost } from '@/lib/posts'
import { relativeTime } from '@/lib/utils'

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} · case study`,
      description: project.tagline,
      type: 'article',
    },
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-4 border-t border-foreground/15 py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
      <h2 className="eyebrow md:pt-1">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-[0.95rem] leading-relaxed text-foreground/85">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span className="pretty-wrap">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const [repos, post] = await Promise.all([getRepoMetadata(), getPost('projects', project.slug)])
  const repo = repos[project.slug.toLowerCase()]
  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="container max-w-4xl py-16 sm:py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/projects', label: 'Work' },
          { label: project.name },
        ]}
      />

      <header className="mb-4">
        <div className="flex flex-wrap items-center gap-3" aria-hidden="true">
          <span className="tag-sticker bg-pop-mint">Case study</span>
          {project.context && (
            <span className="font-mono text-[11px] tracking-wide text-muted-foreground">{project.context}</span>
          )}
        </div>
        <h1 className="display mt-5 text-balance text-display-sm sm:text-display-md">{project.name}</h1>
        <p className="pretty-wrap mt-4 max-w-2xl text-xl leading-relaxed text-muted-foreground">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-accent"
            aria-label="Source on GitHub (opens in new tab)"
          >
            <Github className="h-4 w-4" aria-hidden="true" /> Source on GitHub
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 font-medium text-foreground hover:text-accent"
              aria-label={`${project.liveLabel ?? 'Live site'} (opens in new tab)`}
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
              className="inline-flex items-center gap-1 font-medium text-foreground hover:text-accent"
            >
              {l.label} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
          {repo && (
            <span className="inline-flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted-foreground">
              {repo.language && <span>{repo.language}</span>}
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">Stars: </span>
                  {repo.stars}
                </span>
              )}
              <span>last push {relativeTime(repo.updatedAt)}</span>
            </span>
          )}
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s} className="chip-strong">
              {s}
            </li>
          ))}
        </ul>
      </header>

      <div className="mt-8">
        <Section title="What it is">
          <p className="pretty-wrap text-[1.05rem] leading-relaxed text-foreground/90">{project.summary}</p>
        </Section>

        <Section title="Why it's interesting">
          <p className="pretty-wrap text-[1.05rem] leading-relaxed text-foreground/90">{project.why}</p>
        </Section>

        {project.diagram && (
          <Section title="Architecture">
            <SystemDiagram
              title={project.diagram.title}
              nodes={project.diagram.nodes}
              footnote={project.diagram.footnote}
            />
          </Section>
        )}

        <Section title="What I built">
          <Bullets items={project.built} />
        </Section>

        {project.terminal && (
          <Section title="In use">
            <TerminalBlock title={project.terminal.title} lines={project.terminal.lines} />
          </Section>
        )}

        <Section title="Engineering concepts">
          <ul className="flex flex-wrap gap-2" aria-label="Engineering concepts">
            {project.concepts.map((c) => (
              <li key={c} className="chip text-xs">
                {c}
              </li>
            ))}
          </ul>
        </Section>

        {project.limitations && project.limitations.length > 0 && (
          <Section title="Known limitations, on purpose">
            <Bullets items={project.limitations} />
          </Section>
        )}

        {project.process && (
          <Section title="How it was built">
            <p className="pretty-wrap text-[0.95rem] leading-relaxed text-foreground/85">{project.process}</p>
          </Section>
        )}

        {post && (
          <section className="border-t border-foreground/15 py-8">
            <div className="prose max-w-none">
              <Markdown source={post.content} />
            </div>
          </section>
        )}
      </div>

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground pt-8">
        <Link href="/projects" className="link inline-flex items-center gap-1 text-sm">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All projects
        </Link>
        {next && next.slug !== project.slug && (
          <Link href={`/projects/${next.slug}`} className="link inline-flex items-center gap-1 text-sm">
            Next: {next.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </footer>
    </article>
  )
}
