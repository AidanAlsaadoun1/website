import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ProjectCard } from './project-card'
import type { Project } from '@/config/projects'
import type { GhRepo } from '@/lib/github'

const project: Project = {
  slug: 'sample-engine',
  name: 'Sample Engine',
  tagline: 'Ingests events and reconciles two systems of record.',
  summary: 'A Go service that writes chain events into an append-only ledger.',
  why: 'Idempotency and recovery are the whole problem.',
  built: ['Idempotent inserts keyed on (tx_hash, log_index).', 'Checkpointed backfill.', 'A reconciler.'],
  concepts: ['Idempotency', 'Checkpointing', 'Reconciliation'],
  stack: ['Go', 'PostgreSQL'],
  repoUrl: 'https://github.com/AidanAlsaadoun1/sample-engine',
  liveUrl: 'https://example.com',
  liveLabel: 'example.com',
  diagram: {
    title: 'Flow',
    nodes: [
      { label: 'contract', detail: 'emits events' },
      { label: 'indexer', detail: 'writes the ledger' },
    ],
  },
}

const repo: GhRepo = {
  name: 'sample-engine',
  description: null,
  url: project.repoUrl,
  stars: 12,
  forks: 3,
  language: 'Go',
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  topics: [],
}

describe('ProjectCard', () => {
  it('links the project name to its case study', () => {
    render(<ProjectCard project={project} />)
    expect(screen.getByRole('link', { name: 'Sample Engine' })).toHaveAttribute(
      'href',
      '/projects/sample-engine',
    )
  })

  it('links out to GitHub and the live site in a new tab', () => {
    render(<ProjectCard project={project} />)
    const gh = screen.getByRole('link', { name: /sample engine on github/i })
    expect(gh).toHaveAttribute('href', project.repoUrl)
    expect(gh).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: /live site/i })).toHaveAttribute('href', 'https://example.com')
  })

  it('shows what it is, why it matters and what was built', () => {
    render(<ProjectCard project={project} />)
    expect(screen.getByText(project.summary)).toBeInTheDocument()
    expect(screen.getByText(project.why)).toBeInTheDocument()
    expect(screen.getByText(/idempotent inserts/i)).toBeInTheDocument()
  })

  it('renders concept chips and the stack line', () => {
    render(<ProjectCard project={project} />)
    expect(screen.getByRole('list', { name: /engineering concepts/i })).toBeInTheDocument()
    expect(screen.getByText('Go · PostgreSQL')).toBeInTheDocument()
  })

  it('shows live GitHub metadata when provided', () => {
    render(<ProjectCard project={project} repo={repo} />)
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Go')).toBeInTheDocument()
    expect(screen.getByText(/updated/i)).toBeInTheDocument()
  })

  it('renders the diagram in the featured variant', () => {
    render(<ProjectCard project={project} variant="featured" />)
    expect(screen.getByRole('list', { name: /data flow/i })).toBeInTheDocument()
  })

  it('has no axe violations (default and featured)', async () => {
    const a = render(<ProjectCard project={project} repo={repo} />)
    expect(await axe(a.container)).toHaveNoViolations()
    a.unmount()
    const b = render(<ProjectCard project={project} repo={repo} variant="featured" />)
    expect(await axe(b.container)).toHaveNoViolations()
  })
})
