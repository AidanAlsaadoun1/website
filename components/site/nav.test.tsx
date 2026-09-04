import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Nav } from './nav'

describe('Nav', () => {
  it('renders a banner landmark containing the primary nav', () => {
    render(<Nav />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /^primary$/i })).toBeInTheDocument()
  })

  it('renders the hiring-oriented links from siteConfig', () => {
    render(<Nav />)
    const nav = screen.getByRole('navigation', { name: /^primary$/i })
    expect(within(nav).getByRole('link', { name: /^work$/i })).toHaveAttribute('href', '/projects')
    expect(within(nav).getByRole('link', { name: /experience/i })).toHaveAttribute('href', '/#experience')
    expect(within(nav).getByRole('link', { name: /about/i })).toHaveAttribute('href', '/#about')
    expect(within(nav).getByRole('link', { name: /writing/i })).toHaveAttribute('href', '/blog')
    expect(within(nav).getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact')
  })

  it('does not link to empty sections (talks) from the primary nav', () => {
    render(<Nav />)
    expect(screen.queryByRole('link', { name: /talks/i })).not.toBeInTheDocument()
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
