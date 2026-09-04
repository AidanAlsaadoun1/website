import { SmartLink } from '@/components/ui/smart-link'
import type { Experience } from '@/config/site'

/**
 * Experience timeline. Left column carries the period (or "Current"), right
 * column the role, a one-line summary and the stack. Highlights are optional
 * and unused on the live site: the detail belongs on LinkedIn, not here.
 */
export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="divide-y-2 divide-foreground/10 border-y-2 border-foreground/10">
      {items.map((item) => (
        <li
          key={`${item.role}-${item.company}`}
          className="grid grid-cols-1 gap-4 py-9 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
        >
          <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-start md:gap-2">
            {item.current && <span className="tag-sticker bg-pop-mint">Current</span>}
            {item.period && (
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {item.period}
              </p>
            )}
          </div>

          <div>
            <h3 className="display text-[1.75rem] leading-tight sm:text-3xl">{item.role}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {item.companyUrl ? (
                <SmartLink href={item.companyUrl} className="link font-medium text-foreground">
                  {item.company}
                </SmartLink>
              ) : (
                <span className="font-medium text-foreground">{item.company}</span>
              )}
              {item.location && <span> · {item.location}</span>}
            </p>
            <p className="pretty-wrap mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-foreground/85">
              {item.summary}
            </p>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-4 max-w-2xl space-y-2.5 text-sm leading-relaxed text-foreground/80">
                {item.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="pretty-wrap">{h}</span>
                  </li>
                ))}
              </ul>
            )}
            {item.stack && item.stack.length > 0 && (
              <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {item.stack.join(' · ')}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
