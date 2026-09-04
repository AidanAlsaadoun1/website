import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Hero } from './hero'

describe('Hero', () => {
  it('renders the page-level h1 with the name and the role', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('Aidan')
    expect(h1.textContent?.toLowerCase()).toContain('full-stack software engineer')
  })

  it('does not advertise job-seeking', () => {
    render(<Hero />)
    expect(screen.queryByText(/open to/i)).not.toBeInTheDocument()
  })

  it('renders the recruiter CTAs', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /view work/i })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: /contact me/i })).toHaveAttribute('href', '/contact')
    // GitHub and LinkedIn appear both as CTAs and in the at-a-glance panel
    expect(screen.getAllByRole('link', { name: /github/i }).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('link', { name: /linkedin/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('opens external profile links in a new tab with a safe rel', () => {
    render(<Hero />)
    for (const link of screen.getAllByRole('link', { name: /linkedin/i })) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer noopener')
    }
  })

  it('includes the at-a-glance panel', () => {
    render(<Hero />)
    expect(screen.getByRole('region', { name: /at a glance/i })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Hero />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
