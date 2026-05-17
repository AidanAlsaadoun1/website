import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ProjectCard } from './project-card'
import type { GhRepo } from '@/lib/github'

const repo: GhRepo = {
  name: 'sample-repo',
  description: 'An example repository.',
  url: 'https://github.com/AidanAlsaadoun1/sample-repo',
  stars: 12,
  forks: 3,
  language: { name: 'TypeScript', color: '#3178c6' },
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  topics: ['nextjs', 'typescript'],
}

describe('ProjectCard', () => {
  it('renders the repo name as a link to GitHub', () => {
    render(<ProjectCard repo={repo} />)
    const link = screen.getByRole('link', { name: 'sample-repo' })
    expect(link).toHaveAttribute('href', repo.url)
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('shows star and fork counts when > 0', () => {
    render(<ProjectCard repo={repo} />)
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('shows the primary language name', () => {
    render(<ProjectCard repo={repo} />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders topic chips', () => {
    render(<ProjectCard repo={repo} />)
    expect(screen.getByText('nextjs')).toBeInTheDocument()
    expect(screen.getByText('typescript')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<ProjectCard repo={repo} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
