import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Hero } from './hero'

describe('Hero', () => {
  it('renders the page-level h1 with the name', () => {
    render(<Hero />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.textContent).toContain('Aidan')
  })

  it('renders the primary CTAs', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /see the work/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /read the blog/i })).toBeInTheDocument()
  })

  it('exposes GitHub and LinkedIn icon links with accessible names', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Hero />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
