import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AtAGlance } from './at-a-glance'
import { siteConfig } from '@/config/site'

describe('AtAGlance', () => {
  it('is a labelled region landmark', () => {
    render(<AtAGlance />)
    expect(screen.getByRole('region', { name: /at a glance/i })).toBeInTheDocument()
  })

  it('renders every fact as a definition pair', () => {
    render(<AtAGlance />)
    for (const fact of siteConfig.facts) {
      expect(screen.getByText(fact.label)).toBeInTheDocument()
      expect(screen.getByText(fact.value)).toBeInTheDocument()
    }
  })

  it('exposes GitHub and LinkedIn quick links', () => {
    render(<AtAGlance />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('rel', 'noreferrer noopener')
  })

  it('has no axe violations', async () => {
    const { container } = render(<AtAGlance />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
