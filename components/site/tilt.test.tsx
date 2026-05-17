import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Tilt } from './tilt'

describe('Tilt', () => {
  it('renders its children', () => {
    render(
      <Tilt>
        <div>Tilt content</div>
      </Tilt>,
    )
    expect(screen.getByText('Tilt content')).toBeInTheDocument()
  })

  it('does not render the glare layer when glare={false}', () => {
    const { container } = render(
      <Tilt glare={false}>
        <div>x</div>
      </Tilt>,
    )
    // The glare layer is the inner div with pointer-events-none. With glare off it shouldn't exist.
    const glare = container.querySelector('.pointer-events-none')
    expect(glare).toBeNull()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Tilt>
        <article>Card content</article>
      </Tilt>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
