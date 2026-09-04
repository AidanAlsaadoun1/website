import Link from 'next/link'
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'glass'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center gap-2 rounded-full border-2 border-foreground font-semibold transition-all duration-200 ease-out'

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  sm: 'px-4 py-2 text-xs',
}

// WCAG AA notes:
// - solid: cream text (#faf7f0) on ink (#1c1a17) → ~15:1 ✓
// - glass: ink text on white → ~16:1 ✓
// - both variants carry a 2px ink border → 1.4.11 Non-text Contrast easily met.
const variants: Record<Variant, string> = {
  solid:
    'bg-foreground text-base shadow-[4px_4px_0_0_rgb(var(--accent))] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_rgb(var(--accent))] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_rgb(var(--accent))]',
  glass:
    'glass text-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_rgb(var(--foreground))] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_rgb(var(--foreground))]',
}

/** The pill classes on their own, for the rare anchor that needs `download` etc. */
export function pillClassName(variant: Variant = 'solid', size: Size = 'md', className?: string) {
  return cn(base, sizes[size], variants[variant], className)
}

type AnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string
  variant?: Variant
  size?: Size
  children: ReactNode
}

export const PillLink = forwardRef<HTMLAnchorElement, AnchorProps>(function PillLink(
  { className, variant = 'solid', size = 'md', children, href, ...rest },
  ref,
) {
  const external = /^https?:\/\//.test(href)
  const finalClassName = pillClassName(variant, size, className)
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
  size?: Size
}

export const PillButton = forwardRef<HTMLButtonElement, ButtonProps>(function PillButton(
  { className, variant = 'solid', size = 'md', children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={pillClassName(variant, size, className)} {...props}>
      {children}
    </button>
  )
})
