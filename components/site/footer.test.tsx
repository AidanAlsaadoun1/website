import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Footer } from './footer'
import { siteConfig } from '@/config/site'

describe('Footer', () => {
  it('renders as a contentinfo landmark', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('exposes labelled navigation for site links and social links', () => {
    render(<Footer />)
    expect(screen.getByRole('navigation', { name: /footer/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /social/i })).toBeInTheDocument()
  })

  it('links to GitHub and LinkedIn with explicit external-link attributes', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: /social/i })
    expect(within(nav).getByRole('link', { name: /github/i })).toHaveAttribute('rel', 'noreferrer noopener')
    expect(within(nav).getByRole('link', { name: /linkedin/i })).toHaveAttribute('target', '_blank')
  })

  it('does not advertise job-seeking', () => {
    render(<Footer />)
    expect(screen.queryByText(/open to/i)).not.toBeInTheDocument()
  })

  it('only exposes a mail link when an email is configured', () => {
    render(<Footer />)
    const mail = screen.queryByRole('link', { name: /^email$/i })
    if (siteConfig.email) {
      expect(mail).toHaveAttribute('href', `mailto:${siteConfig.email}`)
    } else {
      expect(mail).not.toBeInTheDocument()
    }
  })

  it('only exposes a CV link when a CV is configured', () => {
    render(<Footer />)
    const cv = screen.queryByRole('link', { name: /download cv/i })
    if (siteConfig.cv.url) {
      expect(cv).toHaveAttribute('href', siteConfig.cv.url)
    } else {
      expect(cv).not.toBeInTheDocument()
    }
  })

  it('has no axe violations', async () => {
    const { container } = render(<Footer />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
