import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer
      className="relative z-10 mt-32 border-t border-white/5 py-10"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container flex flex-col items-center justify-between gap-6 text-sm text-muted-foreground md:flex-row">
        <p className="font-mono">
          <span className="text-accent" aria-hidden="true">$</span> echo &quot;built with caffeine and Next.js&quot;
        </p>
        <nav aria-label="Social links">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href={`https://github.com/${siteConfig.socials.github}`}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile (opens in new tab)"
                className="block rounded-full p-1 transition hover:text-foreground"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile (opens in new tab)"
                className="block rounded-full p-1 transition hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>
        <p className="font-mono text-xs">
          <span aria-hidden="true">© </span>
          <span className="sr-only">Copyright </span>
          {new Date().getFullYear()} {siteConfig.fullName}
        </p>
      </div>
    </footer>
  )
}
