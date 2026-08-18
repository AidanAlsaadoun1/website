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
        'sticky top-0 z-40 transition-all duration-300',
        scrolled ? 'glass-bar' : 'bg-transparent',
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${siteConfig.fullName}, home`}
        >
          <span
            aria-hidden="true"
            className="h-3 w-3 rounded-full border-2 border-foreground bg-pop-sun transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
          />
          <span className="display text-xl text-foreground transition-colors group-hover:text-accent">
            {siteConfig.fullName}
          </span>
        </Link>

        <nav aria-label="Primary" className="relative hidden items-center gap-8 md:flex">
          {siteConfig.navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative py-1 text-sm transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
                {active ? (
                  <motion.span
                    aria-hidden="true"
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 rounded-full bg-pop-sun transition-transform duration-300 group-hover:scale-x-100"
                  />
                )}
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
          className="-mr-2 rounded-md p-2 text-muted-foreground transition hover:text-foreground md:hidden"
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
            className="overflow-hidden border-t-2 border-foreground bg-base/95 backdrop-blur-md md:hidden"
          >
            <div className="container flex flex-col divide-hairline py-2">
              {siteConfig.navLinks.map((link) => {
                const active = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex items-center justify-between py-3 text-sm transition',
                      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                    {active && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />}
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
