import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { mdxComponents } from './mdx-components'

describe('mdxComponents.a', () => {
  const Anchor = mdxComponents.a

  it('renders external links with target=_blank and safe rel', () => {
    render(<Anchor href="https://example.com">External</Anchor>)
    const link = screen.getByRole('link', { name: 'External' })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
  })

  it('renders internal links without target=_blank', () => {
    render(<Anchor href="/about">Internal</Anchor>)
    const link = screen.getByRole('link', { name: 'Internal' })
    expect(link).not.toHaveAttribute('target')
  })
})

describe('mdxComponents.VulnCallout', () => {
  const VulnCallout = mdxComponents.VulnCallout

  it('renders an aside with the severity label', () => {
    render(
      <VulnCallout severity="high" title="Heads up">
        <p>Body text</p>
      </VulnCallout>,
    )
    expect(screen.getByText(/high/i)).toBeInTheDocument()
    expect(screen.getByText(/heads up/i)).toBeInTheDocument()
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <VulnCallout severity="info" title="Note">
        <p>Educational only.</p>
      </VulnCallout>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('mdxComponents.CVELink', () => {
  const CVELink = mdxComponents.CVELink

  it('links to NVD with the given CVE id', () => {
    render(<CVELink id="CVE-2024-12345" />)
    const link = screen.getByRole('link', { name: 'CVE-2024-12345' })
    expect(link).toHaveAttribute('href', 'https://nvd.nist.gov/vuln/detail/CVE-2024-12345')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
