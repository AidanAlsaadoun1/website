import { cn } from '@/lib/utils'
import type { ElementType, ReactNode } from 'react'

type Tone = 'butter' | 'sky' | 'blush' | 'mint'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
  /** 1 for page-level (one per page), 2 for in-page sections. Defaults to 2. */
  level?: 1 | 2
  /** Sticker colour behind the eyebrow. */
  tone?: Tone
  /** id for the heading element, so sections can aria-labelledby it. */
  id?: string
  /** Optional right-aligned action (e.g. an "All projects →" link). */
  action?: ReactNode
}

const tones: Record<Tone, string> = {
  butter: 'bg-pop-butter',
  sky: 'bg-pop-sky',
  blush: 'bg-pop-blush',
  mint: 'bg-pop-mint',
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
  level = 2,
  tone = 'butter',
  id,
  action,
}: Props) {
  const HeadingTag: ElementType = level === 1 ? 'h1' : 'h2'
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className="mb-5" aria-hidden="true">
            <span className={cn('tag-sticker', tones[tone])}>{eyebrow}</span>
          </p>
        )}
        <HeadingTag
          id={id}
          className={cn(
            'display text-balance',
            level === 1 ? 'text-display-sm sm:text-display-md' : 'text-4xl sm:text-5xl',
          )}
        >
          {title}
        </HeadingTag>
        {description && (
          <p className="pretty-wrap mt-5 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 sm:pb-1">{action}</div>}
    </div>
  )
}
