import type { Metadata } from 'next'
import { ArrowUpRight, Github } from 'lucide-react'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ProjectCard } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { projects } from '@/config/projects'
import { githubUrl } from '@/config/site'
import { getRepoMetadata } from '@/lib/github'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies: a Go/Solidity settlement engine with idempotent ingestion and reconciliation, a zero-dependency Python job-search CLI with an MCP server, and full-stack products in production.',
  alternates: { canonical: '/projects' },
}

export default async function ProjectsPage() {
  const repos = await getRepoMetadata()
  const featured = projects.filter((p) => p.featured && (p.diagram || p.terminal))
  const rest = projects.filter((p) => !featured.includes(p))

  return (
    <section className="container py-16 sm:py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Work' },
        ]}
      />
      <SectionHeading
        level={1}
        eyebrow="Work"
        tone="mint"
        title="Things I've built, and why they were hard."
        description="Each project as a short case study: what it is, why it was technically interesting, what I built and what it's made of. Language, stars and last push are live from GitHub."
        action={
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="link inline-flex items-center gap-1.5 text-sm"
          >
            <Github className="h-4 w-4" aria-hidden="true" /> All repositories
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        }
      />

      <div className="grid grid-cols-1 gap-8" aria-label="Projects">
        {featured.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            repo={repos[project.slug.toLowerCase()]}
            variant="featured"
            headingLevel={2}
          />
        ))}
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {rest.map((project) => (
            <li key={project.slug} className="min-w-0">
              <ProjectCard project={project} repo={repos[project.slug.toLowerCase()]} headingLevel={2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
