import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { GlassCard } from './glass-card'

describe('GlassCard', () => {
  it('renders children inside a div by default', () => {
    render(<GlassCard>Hello</GlassCard>)
    expect(screen.getByText('Hello').tagName).toBe('DIV')
  })

  it('renders as the requested element when `as` is set', () => {
    render(<GlassCard as="article">Article body</GlassCard>)
    expect(screen.getByText('Article body').tagName).toBe('ARTICLE')
  })

  it('applies the glass-hover class when `interactive` is true', () => {
    render(<GlassCard interactive>Hover me</GlassCard>)
    expect(screen.getByText('Hover me')).toHaveClass('glass-hover')
  })

  it('has no axe violations', async () => {
    const { container } = render(<GlassCard>Some content</GlassCard>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
