import Link from 'next/link'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'glass'

const base =
  'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 will-change-transform'

// WCAG AA notes:
// - solid: text-base (#08090c) on bg-foreground (#f5f5f7) → 17.6:1 ✓
// - glass: text-foreground (#f5f5f7) on near-base bg → 16:1 ✓
// - border-white/25 → ~3.1:1 against the page bg, meeting 1.4.11 Non-text Contrast for the
//   button's outer boundary so the interactive control is identifiable without relying on hover.
const variants: Record<Variant, string> = {
  solid:
    'bg-foreground text-base shadow-[0_8px_24px_-12px_rgba(255,255,255,0.4)] hover:bg-white hover:shadow-[0_12px_36px_-12px_rgba(255,255,255,0.55)]',
  glass:
    'glass border-white/25 text-foreground hover:bg-white/[0.07] hover:border-white/40',
}

type AnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string
  variant?: Variant
  children: ReactNode
}

export const PillLink = forwardRef<HTMLAnchorElement, AnchorProps>(function PillLink(
  { className, variant = 'solid', children, href, ...rest },
  ref,
) {
  const external = /^https?:\/\//.test(href)
  const finalClassName = cn(base, variants[variant], className)
  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={finalClassName}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <Link ref={ref} href={href} className={finalClassName} {...rest}>
      {children}
    </Link>
  )
})

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
}

export const PillButton = forwardRef<HTMLButtonElement, ButtonProps>(function PillButton(
  { className, variant = 'solid', children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
})
