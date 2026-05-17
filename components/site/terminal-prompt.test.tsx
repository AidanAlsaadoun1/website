import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { TerminalPrompt } from './terminal-prompt'

describe('TerminalPrompt', () => {
  const lines = ['$ whoami', 'aidan', '$ cat interests.txt', 'security, full-stack']

  it('provides a screen-reader-only static transcript', () => {
    const { container } = render(<TerminalPrompt lines={lines} />)
    const srOnly = container.querySelector('.sr-only')
    expect(srOnly?.textContent).toContain('whoami')
    expect(srOnly?.textContent).toContain('aidan')
  })

  it('marks the animated <pre> as aria-hidden', () => {
    const { container } = render(<TerminalPrompt lines={lines} />)
    expect(container.querySelector('pre')).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders all lines when reduced motion is preferred (the default in tests)', () => {
    render(<TerminalPrompt lines={lines} />)
    // sr-only paragraph contains the full transcript
    expect(screen.getByText(/whoami\. aidan\. \$ cat interests/i)).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<TerminalPrompt lines={lines} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
