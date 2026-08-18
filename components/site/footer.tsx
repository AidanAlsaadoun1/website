import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t-2 border-foreground bg-pop-butter/40 py-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display text-3xl">{siteConfig.fullName}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Built with Next.js, tea, and an unreasonable number of browser tabs.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Social links">
            <ul className="flex items-center gap-3">
              <li>
                <Link
                  href={`https://github.com/${siteConfig.socials.github}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile (opens in new tab)"
                  className="pop-card pop-card-hover inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span aria-hidden="true">GitHub</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile (opens in new tab)"
                  className="pop-card pop-card-hover inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span aria-hidden="true">LinkedIn</span>
                </Link>
              </li>
            </ul>
          </nav>
          <p className="font-mono text-xs text-muted-foreground">
            <span aria-hidden="true">© </span>
            <span className="sr-only">Copyright </span>
            {new Date().getFullYear()} {siteConfig.fullName}
          </p>
        </div>
      </div>
    </footer>
  )
}
