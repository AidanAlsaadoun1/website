import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { TerminalBlock } from './terminal-block'

describe('TerminalBlock', () => {
  const lines = ['$ whoami', 'aidan', '$ cat now.txt', 'shipping']

  it('renders prompts and output as real, visible text', () => {
    render(<TerminalBlock lines={lines} title="shell" />)
    expect(screen.getByText('whoami')).toBeInTheDocument()
    expect(screen.getByText('aidan')).toBeInTheDocument()
    expect(screen.getByText('shell')).toBeInTheDocument()
  })

  it('does not hide the transcript from assistive tech', () => {
    const { container } = render(<TerminalBlock lines={lines} />)
    expect(container.querySelector('pre')).not.toHaveAttribute('aria-hidden')
  })

  it('has no axe violations', async () => {
    const { container } = render(<TerminalBlock lines={lines} title="shell" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
