/// <reference types="vitest/globals" />
import 'vitest'

// Augment Vitest's matcher types with the jest-axe matcher so `toHaveNoViolations`
// type-checks in tests. The runtime hookup is in vitest.setup.ts.
declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): unknown
  }
}
