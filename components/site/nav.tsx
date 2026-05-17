'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-500',
        scrolled ? 'glass-bar' : 'bg-transparent',
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm tracking-wider"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="text-accent" aria-hidden="true">$</span>
          <span className="text-foreground">
            {siteConfig.name.toLowerCase()}
            <span className="text-accent terminal-cursor" aria-hidden="true"></span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="relative hidden items-center gap-0.5 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {siteConfig.navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
            const showPill = hovered === link.href || (hovered === null && active)
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                aria-current={active ? 'page' : undefined}
                className="relative rounded-full px-4 py-1.5 text-sm transition-colors"
              >
                {showPill && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    'relative transition-colors',
                    active || hovered === link.href ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-muted-foreground hover:bg-white/5 md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            key="mobile-nav"
            aria-label="Primary mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 bg-base/80 backdrop-blur-md md:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {siteConfig.navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm transition hover:bg-white/5 hover:text-foreground',
                      active ? 'text-foreground bg-white/[0.04]' : 'text-muted-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
