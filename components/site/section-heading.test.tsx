import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { SectionHeading } from './section-heading'

describe('SectionHeading', () => {
  it('renders an h2 by default', () => {
    render(<SectionHeading title="Hello" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Hello' })).toBeInTheDocument()
  })

  it('renders an h1 when level=1', () => {
    render(<SectionHeading title="Page" level={1} />)
    expect(screen.getByRole('heading', { level: 1, name: 'Page' })).toBeInTheDocument()
  })

  it('renders the description when provided', () => {
    render(<SectionHeading title="X" description="Some description text." />)
    expect(screen.getByText('Some description text.')).toBeInTheDocument()
  })

  it('marks the eyebrow as decorative for assistive tech', () => {
    const { container } = render(<SectionHeading title="X" eyebrow="meta" />)
    const eyebrow = container.querySelector('[aria-hidden="true"]')
    expect(eyebrow).not.toBeNull()
    expect(eyebrow?.textContent).toContain('meta')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <SectionHeading level={1} eyebrow="section" title="Heading" description="Some body." />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
