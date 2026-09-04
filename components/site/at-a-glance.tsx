import { ArrowUpRight, Download, Github, Linkedin } from 'lucide-react'
import { SmartLink } from '@/components/ui/smart-link'
import { githubUrl, siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

/**
 * The recruiter panel: six facts a hiring manager wants in five seconds, plus
 * the three destinations they'll want next. Straight card, no tilt. A labelled
 * <section> (region), not an <aside>, so it can sit inside other landmarks.
 */
export function AtAGlance({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="glance-heading"
      className={cn('pop-card rounded-2xl p-6 sm:p-7', className)}
    >
      <div className="flex items-center justify-between gap-4 border-b-2 border-foreground pb-4">
        <h2
          id="glance-heading"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          At a glance
        </h2>
        <span aria-hidden="true" className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-foreground bg-pop-blush" />
          <span className="h-2.5 w-2.5 rounded-full border-2 border-foreground bg-pop-butter" />
          <span className="h-2.5 w-2.5 rounded-full border-2 border-foreground bg-pop-mint" />
        </span>
      </div>

      <dl className="mt-5 grid gap-y-3.5">
        {siteConfig.facts.map((fact) => (
          <div key={fact.label} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-4">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="text-sm leading-snug text-foreground">
              {fact.href ? (
                <SmartLink href={fact.href} className="link">
                  {fact.value}
                </SmartLink>
              ) : (
                fact.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 flex flex-wrap gap-2 border-t border-foreground/10 pt-5" aria-label="Quick links">
        <li>
          <SmartLink href={githubUrl} className="chip-strong gap-1.5 py-1 hover:bg-pop-butter">
            <Github className="h-3.5 w-3.5" aria-hidden="true" /> GitHub
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </SmartLink>
        </li>
        <li>
          <SmartLink
            href={siteConfig.socials.linkedin}
            className="chip-strong gap-1.5 py-1 hover:bg-pop-sky"
          >
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" /> LinkedIn
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </SmartLink>
        </li>
        {siteConfig.cv.url && (
          <li>
            <a href={siteConfig.cv.url} download className="chip-strong gap-1.5 py-1 hover:bg-pop-mint">
              <Download className="h-3.5 w-3.5" aria-hidden="true" /> CV (PDF)
            </a>
          </li>
        )}
      </ul>
    </section>
  )
}
