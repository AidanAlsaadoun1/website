import Link from 'next/link'
import { cn } from '@/lib/utils'

type FilterOption = {
  label: string
  /** undefined → represents "All" (clears the filter) */
  value?: string
  count: number
}

type Props = {
  /** Currently selected value, undefined means "All". */
  current: string | undefined
  /** Base path the chips link to (without query). */
  baseHref: string
  /** Available filter options (rendered in the order given). */
  options: FilterOption[]
  /** Query-string key used in the URL. Defaults to `tag`. */
  paramName?: string
  /** aria-label on the wrapping nav. */
  ariaLabel?: string
}

/**
 * URL-driven filter chip row. No client JS, each chip is a server-rendered link.
 * The active chip carries aria-pressed="true" so screen readers announce the state.
 */
export function TagFilter({
  current,
  baseHref,
  options,
  paramName = 'tag',
  ariaLabel = 'Filter posts',
}: Props) {
  return (
    <nav aria-label={ariaLabel} className="mb-10">
      <ul className="flex flex-wrap items-center gap-2">
        {options.map((opt) => {
          const isActive = current === opt.value
          const href = opt.value
            ? `${baseHref}?${paramName}=${encodeURIComponent(opt.value)}`
            : baseHref
          return (
            <li key={opt.label}>
              <Link
                href={href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border-2 border-foreground px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all duration-200',
                  isActive
                    ? 'bg-foreground text-base shadow-[3px_3px_0_0_rgb(var(--accent))]'
                    : 'bg-elevated text-foreground hover:-translate-y-0.5 hover:bg-pop-butter',
                )}
              >
                {opt.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-[10px]',
                    isActive ? 'bg-base/20 text-base' : 'bg-foreground/10 text-foreground/70',
                  )}
                  aria-label={`${opt.count} posts`}
                >
                  {opt.count}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
