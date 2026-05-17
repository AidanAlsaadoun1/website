import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ProjectCard } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { getPinnedRepos } from '@/lib/github'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I have built — pulled live from my pinned GitHub repos.',
}

export default async function ProjectsPage() {
  const repos = await getPinnedRepos()
  return (
    <section className="container py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Projects' },
        ]}
      />
      <SectionHeading
        level={1}
        eyebrow="projects"
        title="Things I've shipped, broken, or kept tinkering with"
        description="Repos I've pinned on GitHub plus the occasional curated case study. Fresh on every build."
      />
      <ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Pinned GitHub repositories"
      >
        {repos.map((repo) => (
          <li key={repo.name}>
            <ProjectCard repo={repo} />
          </li>
        ))}
      </ul>
    </section>
  )
}
