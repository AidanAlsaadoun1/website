import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Nav } from './nav'

describe('Nav', () => {
  it('renders a banner landmark containing the primary nav', () => {
    render(<Nav />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
  })

  it('renders all nav links from siteConfig', () => {
    render(<Nav />)
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^blog$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /talks/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /certs/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('mobile menu button is collapsed by default', () => {
    render(<Nav />)
    const btn = screen.getByRole('button', { name: /open menu/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Nav />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
