import { describe, it, expect, vi } from 'vitest'
import { Markdown } from './markdown'

// next-mdx-remote/rsc renders via a server component and uses ESM-only deps. We
// don't need to exercise the renderer in unit tests — verify the wrapper exists.
describe('Markdown', () => {
  it('is exported as a function', () => {
    expect(typeof Markdown).toBe('function')
  })

  it('accepts a `source` prop without throwing during construction', () => {
    // Calling MDXRemote-RSC synchronously in jsdom isn't supported, but the
    // wrapper itself should be callable without side effects.
    expect(() => Markdown({ source: '# Hello' })).not.toThrow()
    // shut up unused-import warnings
    void vi.fn
  })
})
