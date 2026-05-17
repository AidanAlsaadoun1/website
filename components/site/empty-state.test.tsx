import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { EmptyState } from './empty-state'

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="Empty" description="Nothing here yet." />)
    expect(screen.getByRole('heading', { level: 2, name: 'Empty' })).toBeInTheDocument()
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument()
  })

  it('renders the hint when provided', () => {
    render(<EmptyState title="X" description="Y" hint="echo hello" />)
    expect(screen.getByText('echo hello')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <EmptyState title="Nothing" description="Try again later." hint="pnpm run something" />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
