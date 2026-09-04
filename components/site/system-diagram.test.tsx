import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { SystemDiagram } from './system-diagram'

const nodes = [
  { label: 'contract', layer: 'Sepolia', detail: 'Emits an event for every state change.' },
  { label: 'indexer', detail: 'Polls and writes the ledger.' },
  { label: 'reconciler', detail: 'Compares both sides.' },
]

describe('SystemDiagram', () => {
  it('renders an ordered list of nodes with real text', () => {
    render(<SystemDiagram title="Flow" nodes={nodes} footnote="They must agree." />)
    const list = screen.getByRole('list', { name: /data flow/i })
    expect(list.tagName).toBe('OL')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('contract')).toBeInTheDocument()
    expect(screen.getByText('Sepolia')).toBeInTheDocument()
    expect(screen.getByText('They must agree.')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<SystemDiagram title="Flow" nodes={nodes} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
