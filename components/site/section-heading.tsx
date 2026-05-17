import { cn } from '@/lib/utils'
import type { ElementType } from 'react'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
  /** 1 for page-level (one per page), 2 for in-page sections. Defaults to 2. */
  level?: 1 | 2
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  level = 2,
}: Props) {
  const HeadingTag: ElementType = level === 1 ? 'h1' : 'h2'
  return (
    <div
      className={cn(
        'mb-10 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          aria-hidden="true"
        >
          // {eyebrow}
        </p>
      )}
      <HeadingTag
        className={cn(
          'text-balance font-bold tracking-tight',
          level === 1 ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl',
        )}
      >
        {title}
      </HeadingTag>
      {description && (
        <p className="pretty-wrap mt-3 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
