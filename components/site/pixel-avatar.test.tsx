import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { PixelAvatar } from './pixel-avatar'

describe('PixelAvatar', () => {
  it('renders an accessible image role with descriptive label', () => {
    render(<PixelAvatar />)
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAccessibleName(/pixel-art avatar/i)
  })

  it('respects the size prop', () => {
    render(<PixelAvatar size={64} />)
    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('width', '64')
    expect(svg).toHaveAttribute('height', '64')
  })

  it('has no axe violations', async () => {
    const { container } = render(<PixelAvatar />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
