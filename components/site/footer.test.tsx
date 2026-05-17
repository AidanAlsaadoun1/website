import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Footer } from './footer'

describe('Footer', () => {
  it('renders as a contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('exposes a labelled social-links navigation', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: /social/i })
    expect(nav).toBeInTheDocument()
  })

  it('links to GitHub and LinkedIn with explicit external-link labels', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: /social/i })
    expect(within(nav).getByRole('link', { name: /github/i })).toHaveAttribute(
      'rel',
      'noreferrer noopener',
    )
    expect(within(nav).getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'target',
      '_blank',
    )
  })

  it('does NOT expose a mail link (Aidan removed the inbox)', () => {
    render(<Footer />)
    expect(screen.queryByRole('link', { name: /email/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /mailto/i })).not.toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<Footer />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
