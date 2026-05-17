import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { AuroraBackground } from './aurora-background'

describe('AuroraBackground', () => {
  it('renders an aria-hidden decorative layer', () => {
    const { container } = render(<AuroraBackground />)
    const root = container.firstElementChild
    expect(root).not.toBeNull()
    expect(root).toHaveAttribute('aria-hidden', 'true')
  })

  it('does NOT receive pointer events (so it never blocks UI)', () => {
    const { container } = render(<AuroraBackground />)
    expect(container.firstElementChild).toHaveClass('pointer-events-none')
  })

  it('has no axe violations', async () => {
    const { container } = render(<AuroraBackground />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
