import Link from 'next/link'
import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import { githubUrl, siteConfig } from '@/config/site'

const SITE_REPO = `${githubUrl}/website`

export function Footer() {
  const { cv, email } = siteConfig
  return (
    <footer
      className="relative z-10 mt-20 border-t-2 border-foreground bg-pop-butter/40 py-14"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-3xl">{siteConfig.fullName}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.title}, {siteConfig.location}. {siteConfig.role} at {siteConfig.company.name}.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {siteConfig.heroStack.join(' · ')}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-3">Navigate</p>
          <ul className="space-y-2 text-sm">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-foreground/85 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/certifications" className="text-foreground/85 hover:text-accent">
                Certifications
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Social links">
          <p className="eyebrow mb-3">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-foreground/85 hover:text-accent"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-foreground/85 hover:text-accent"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 text-foreground/85 hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email
                </a>
              </li>
            )}
            {cv.url && (
              <li>
                <a
                  href={cv.url}
                  download
                  className="inline-flex items-center gap-2 text-foreground/85 hover:text-accent"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {cv.label}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="container mt-12 flex flex-col gap-2 border-t border-foreground/15 pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span aria-hidden="true">© </span>
          <span className="sr-only">Copyright </span>
          {new Date().getFullYear()} {siteConfig.fullName}
        </p>
        <p>
          Built with Next.js on Vercel.{' '}
          <a
            href={SITE_REPO}
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-foreground/30 underline-offset-4 hover:text-accent"
          >
            Source on GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
