import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Magnetic } from './magnetic'

describe('Magnetic', () => {
  it('renders its children', () => {
    render(
      <Magnetic>
        <button>Click</button>
      </Magnetic>,
    )
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument()
  })

  it('passes className through to the wrapper', () => {
    render(
      <Magnetic className="custom-class">
        <span>x</span>
      </Magnetic>,
    )
    const span = screen.getByText('x')
    expect(span.parentElement).toHaveClass('custom-class')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Magnetic>
        <button>Accessible</button>
      </Magnetic>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
