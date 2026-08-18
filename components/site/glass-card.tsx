import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type AllowedTag = 'div' | 'article' | 'section' | 'li'

type GlassCardProps<T extends AllowedTag = 'div'> = {
  as?: T
  interactive?: boolean
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

/**
 * The site's panel primitive: hairline border, a whisper of fill, square-ish
 * corners. (Historically "glass", kept as the name so every page and story
 * keeps working; the styling now lives in `.glass` / `.surface` in globals.css.)
 */
export function GlassCard<T extends AllowedTag = 'div'>({
  className,
  interactive = false,
  as,
  ...props
}: GlassCardProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn('glass rounded-xl p-6', interactive && 'glass-hover', className)}
      {...props}
    />
  )
}
