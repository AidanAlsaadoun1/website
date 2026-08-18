import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { ProjectCard } from '@/components/site/project-card'
import { SectionHeading } from '@/components/site/section-heading'
import { getPinnedRepos } from '@/lib/github'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Full-stack projects (apps, services and tooling) pulled live from my pinned GitHub repos.',
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
        eyebrow="Projects"
        title="Things I've built"
        description="Apps, services and tooling, front end through to infrastructure. Pinned straight from GitHub, so this list is as current as my last push."
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
