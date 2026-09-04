import Link from 'next/link'
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react'
import { AtAGlance } from './at-a-glance'
import { PillLink, pillClassName } from '@/components/ui/pill-button'
import { githubUrl, siteConfig } from '@/config/site'

/** Staggered CSS entrance; collapses to instant under prefers-reduced-motion. */
const rise = (ms: number) => ({ style: { animationDelay: `${ms}ms` } })

/**
 * The landing hero. A Server Component: the only motion is a CSS entrance,
 * so no client bundle is paid for the first thing a recruiter sees.
 */
export function Hero() {
  const { headline, cv } = siteConfig
  return (
    <section aria-labelledby="hero-heading" className="container relative pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground" {...rise(0)}>
            {siteConfig.role} @{' '}
            <a
              href={siteConfig.company.url}
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground underline decoration-foreground/30 underline-offset-4 hover:decoration-accent"
            >
              {siteConfig.company.name}
            </a>{' '}
            · {siteConfig.location}
          </p>

          <h1 id="hero-heading" className="animate-rise mt-6" {...rise(80)}>
            <span className="block text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {siteConfig.fullName}
            </span>
            <span className="display mt-3 block text-balance text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
              {headline.lead} <span className="accent-text">{headline.accent}</span>
            </span>
          </h1>

          <p
            className="pretty-wrap animate-rise mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
            {...rise(160)}
          >
            {siteConfig.blurb}
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" {...rise(260)}>
            <PillLink href="/projects" variant="solid">
              View work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </PillLink>
            {cv.url && (
              <a href={cv.url} download className={pillClassName('glass')}>
                <Download className="h-4 w-4" aria-hidden="true" />
                {cv.label}
              </a>
            )}
            <PillLink href={siteConfig.socials.linkedin} variant="glass">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </PillLink>
            <PillLink href={githubUrl} variant="glass">
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </PillLink>
            <Link href="/contact" className="link ml-1 text-sm">
              Contact me
            </Link>
          </div>

          <p
            className="animate-rise mt-9 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
            {...rise(320)}
          >
            {siteConfig.heroStack.join(' · ')}
          </p>
        </div>

        <div className="animate-rise lg:pt-2" {...rise(220)}>
          <AtAGlance />
        </div>
      </div>
    </section>
  )
}
