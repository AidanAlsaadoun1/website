import Link from 'next/link'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export type BreadcrumbItem = {
  href?: string
  label: string
}

type Props = {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Accessible breadcrumb navigation.
 *
 * Renders as <nav aria-label="Breadcrumb"> wrapping an <ol> per W3C ARIA APG.
 * The last item (no href, or the final entry) gets aria-current="page".
 *
 * Visual: leading "Back" affordance on the left (jumps to the *previous* level
 * if there is one), then the full trail. Mobile shows just the back affordance
 * to save space.
 */
export function Breadcrumbs({ items, className }: Props) {
  if (items.length === 0) return null

  // The "back one level" target is the second-to-last linkable item.
  const backTarget = [...items].reverse().find((it) => it.href !== undefined)
  const showBack = backTarget !== undefined && items.length > 1

  return (
    <nav aria-label="Breadcrumb" className={cn('mb-8', className)}>
      <div className="flex items-center gap-3">
        {showBack && backTarget?.href && (
          <Link
            href={backTarget.href}
            className="glass glass-hover inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-mono">
              Back to <span className="text-foreground">{backTarget.label}</span>
            </span>
          </Link>
        )}

        <ol className="hidden flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    className="h-3 w-3 text-muted-foreground"
                    aria-hidden="true"
                  />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded px-1 font-mono transition hover:text-foreground"
                  >
                    {idx === 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <Home className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">{item.label}</span>
                      </span>
                    ) : (
                      item.label
                    )}
                  </Link>
                ) : (
                  <span
                    className="rounded px-1 font-mono text-foreground"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {idx === 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <Home className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">{item.label}</span>
                      </span>
                    ) : (
                      item.label
                    )}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
