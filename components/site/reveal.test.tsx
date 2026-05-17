import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Reveal, RevealGroup } from './reveal'

describe('Reveal', () => {
  it('renders its children', () => {
    render(<Reveal>Hello</Reveal>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as the requested element', () => {
    render(
      <Reveal as="section">
        <p>Body</p>
      </Reveal>,
    )
    expect(screen.getByText('Body').parentElement?.tagName).toBe('SECTION')
  })

  it('has no axe violations', async () => {
    const { container } = render(<Reveal>Content</Reveal>)
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('RevealGroup', () => {
  it('renders its children', () => {
    render(
      <RevealGroup>
        <Reveal>A</Reveal>
        <Reveal>B</Reveal>
      </RevealGroup>,
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <RevealGroup as="ul">
        <Reveal as="li">A</Reveal>
        <Reveal as="li">B</Reveal>
      </RevealGroup>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
