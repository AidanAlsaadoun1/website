'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Magnetic } from './magnetic'
import { PixelAvatar } from './pixel-avatar'
import { PillLink } from '@/components/ui/pill-button'

const easeOut = [0.22, 1, 0.36, 1] as const

/** Hand-drawn squiggle that draws itself under the accent phrase. */
function Squiggle() {
  const prefersReduced = useReducedMotion()
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      className="absolute -bottom-2 left-0 h-3 w-full"
    >
      <motion.path
        d="M3 9 Q 20 2, 38 8 T 74 8 T 110 8 T 146 8 T 182 8 T 217 7"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="5"
        strokeLinecap="round"
        initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.7, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function Hero() {
  const prefersReduced = useReducedMotion()

  const rise = (delay: number) =>
    prefersReduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: easeOut, delay },
        }

  return (
    <section className="container relative pb-20 pt-14 sm:pt-20">
      <div className="grid items-center gap-16 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <motion.p {...rise(0)} className="tag-sticker bg-pop-mint">
            {siteConfig.role} @ {siteConfig.company.name}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="display mt-8 text-balance text-[3.4rem] leading-[1.02] sm:text-7xl lg:text-[5.2rem]"
          >
            Hi, I&apos;m Aidan.
            <br />I build{' '}
            <span className="accent-text relative inline-block whitespace-nowrap">
              the whole thing
              <Squiggle />
            </span>
            .
          </motion.h1>

          <motion.p
            {...rise(0.18)}
            className="pretty-wrap mt-8 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            {siteConfig.blurb}
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <PillLink href="/projects" variant="solid">
                See the work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PillLink>
            </Magnetic>
            <Magnetic>
              <PillLink href="/blog" variant="glass">
                Read the blog
              </PillLink>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <Magnetic strength={0.35}>
                <a
                  href={`https://github.com/${siteConfig.socials.github}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="rounded-full p-2 text-foreground/70 transition hover:-rotate-6 hover:text-accent"
                >
                  <Github className="h-6 w-6" />
                </a>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="rounded-full p-2 text-foreground/70 transition hover:rotate-6 hover:text-accent"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Avatar sticker, slightly askew, straightens when you hover */}
        <motion.div
          {...rise(0.15)}
          className="relative mx-auto w-fit lg:mx-0 lg:justify-self-end"
        >
          <div className="pop-card pop-card-hover group rotate-2 rounded-3xl p-7 transition-transform duration-300 hover:rotate-0">
            {/* tape strips */}
            <span
              aria-hidden="true"
              className="absolute -top-3 left-8 h-6 w-16 -rotate-6 rounded-sm bg-pop-butter/90 shadow-sm"
            />
            <span
              aria-hidden="true"
              className="absolute -top-3 right-8 h-6 w-16 rotate-6 rounded-sm bg-pop-sky/90 shadow-sm"
            />
            <PixelAvatar size={210} />
            <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
              me, in 16×16 pixels
            </p>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-end">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop-leaf/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pop-leaf" />
            </span>
            {siteConfig.availability}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
