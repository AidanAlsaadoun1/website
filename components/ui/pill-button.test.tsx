import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { PillButton, PillLink } from './pill-button'

describe('PillButton', () => {
  it('renders a button element', () => {
    render(<PillButton>Click me</PillButton>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies the solid variant by default', () => {
    render(<PillButton>Solid</PillButton>)
    expect(screen.getByRole('button')).toHaveClass('bg-foreground')
  })

  it('applies the glass variant when requested', () => {
    render(<PillButton variant="glass">Ghost</PillButton>)
    expect(screen.getByRole('button')).toHaveClass('glass')
  })

  it('passes through disabled state', () => {
    render(<PillButton disabled>Off</PillButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('has no axe violations', async () => {
    const { container } = render(<PillButton>Accessible</PillButton>)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('PillLink', () => {
  it('renders an internal next/link for relative paths', () => {
    render(<PillLink href="/projects">Projects</PillLink>)
    const link = screen.getByRole('link', { name: 'Projects' })
    expect(link).toHaveAttribute('href', '/projects')
    // Internal links do NOT have target="_blank"
    expect(link).not.toHaveAttribute('target')
  })

  it('renders an external link with safe rel + target', () => {
    render(<PillLink href="https://example.com">External</PillLink>)
    const link = screen.getByRole('link', { name: 'External' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer noopener')
  })

  it('has no axe violations', async () => {
    const { container } = render(<PillLink href="/x">Link</PillLink>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
