import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type AllowedTag = 'div' | 'article' | 'section' | 'li'

type GlassCardProps<T extends AllowedTag = 'div'> = {
  as?: T
  interactive?: boolean
} & Omit<ComponentPropsWithoutRef<T>, 'as'>

export function GlassCard<T extends AllowedTag = 'div'>({
  className,
  interactive = false,
  as,
  ...props
}: GlassCardProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn('glass rounded-2xl p-6', interactive && 'glass-hover cursor-pointer', className)}
      {...props}
    />
  )
}
