import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ExperienceTimeline } from './experience'
import type { Experience } from '@/config/site'

const items: Experience[] = [
  {
    role: 'Founding Engineer',
    company: 'sprintworks',
    companyUrl: 'https://sprintworks.dev',
    current: true,
    summary: 'First engineer.',
    highlights: ['Own features end-to-end.', 'Ship daily.'],
    stack: ['TypeScript', 'AWS'],
  },
  {
    role: 'Software Engineer',
    company: 'Consultancy',
    period: 'Before sprintworks',
    summary: 'Production systems.',
  },
]

describe('ExperienceTimeline', () => {
  it('renders one heading per role', () => {
    render(<ExperienceTimeline items={items} />)
    expect(screen.getByRole('heading', { level: 3, name: 'Founding Engineer' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Software Engineer' })).toBeInTheDocument()
  })

  it('links the company when a URL is given, and marks the current role', () => {
    render(<ExperienceTimeline items={items} />)
    expect(screen.getByRole('link', { name: 'sprintworks' })).toHaveAttribute('href', 'https://sprintworks.dev')
    expect(screen.getByText('Current')).toBeInTheDocument()
    expect(screen.getByText('Before sprintworks')).toBeInTheDocument()
  })

  it('renders the summary and stack line, and highlights only when given', () => {
    render(<ExperienceTimeline items={items} />)
    expect(screen.getByText('Production systems.')).toBeInTheDocument()
    expect(screen.getByText('TypeScript · AWS')).toBeInTheDocument()
    expect(screen.getByText('Own features end-to-end.')).toBeInTheDocument()
    // the second role has no highlights, so exactly one list of them renders
    expect(screen.getAllByRole('list')).toHaveLength(2) // the timeline <ol> + one highlights <ul>
  })

  it('has no axe violations', async () => {
    const { container } = render(<ExperienceTimeline items={items} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
