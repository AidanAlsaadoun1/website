import '@testing-library/jest-dom/vitest'
import { afterEach, expect, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Native Vitest-shaped axe matcher. (jest-axe's matcher relies on
// `expectAssertion.call`, which Vitest 2.x doesn't ship.)
type AxeResults = { violations: Array<{ id: string; help: string; helpUrl?: string }> }
expect.extend({
  toHaveNoViolations(received: AxeResults) {
    const violations = received?.violations ?? []
    const pass = violations.length === 0
    return {
      pass,
      message: () =>
        pass
          ? 'expected axe violations, but none were found'
          : `expected no axe violations, got ${violations.length}:\n` +
            violations
              .map((v) => `  - ${v.id}: ${v.help}${v.helpUrl ? ` (${v.helpUrl})` : ''}`)
              .join('\n'),
    }
  },
})

afterEach(() => {
  cleanup()
})

// ---------------------------------------------------------------------------
// jsdom doesn't ship these; some components touch them on mount.
// ---------------------------------------------------------------------------
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver =
  ResizeObserverMock as unknown as typeof ResizeObserver

class IntersectionObserverMock {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
;(globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver =
  IntersectionObserverMock as unknown as typeof IntersectionObserver

// matchMedia — default to "prefers-reduced-motion: reduce" so motion is disabled
// in unit tests. Individual tests can override via vi.stubGlobal.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// ---------------------------------------------------------------------------
// Next.js navigation mocks
// ---------------------------------------------------------------------------
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  notFound: vi.fn(),
}))
