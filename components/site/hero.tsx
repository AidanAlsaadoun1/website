'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { Magnetic } from './magnetic'
import { PillLink } from '@/components/ui/pill-button'
import { PixelAvatar } from './pixel-avatar'
import { TerminalPrompt } from './terminal-prompt'

const easeOut = [0.22, 1, 0.36, 1] as const

const wordContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}
const wordItem: Variants = {
  hidden: { opacity: 0, y: '0.4em', filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: easeOut },
  },
}

const reducedWords: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0 } },
}

function Words({ text, className }: { text: string; className?: string }) {
  const prefersReduced = useReducedMotion()
  const parts = text.split(' ')
  return (
    <motion.span
      className={className}
      variants={prefersReduced ? reducedWords : wordContainer}
      initial="hidden"
      animate="show"
    >
      {parts.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={prefersReduced ? reducedWords : wordItem}
          className="inline-block whitespace-pre"
        >
          {word}
          {i < parts.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function Hero() {
  const prefersReduced = useReducedMotion()
  const fade = prefersReduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: easeOut },
      }

  return (
    <section className="container relative pt-20 pb-28 sm:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.p
            {...fade}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            // hello.world
          </motion.p>

          <h1 className="mt-3 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <Words text={`Hi, I'm`} className="text-foreground" />{' '}
            <Words text={siteConfig.name + '.'} className="iri-text" />
            <br />
            <Words text="I build things," className="text-foreground" />
            <br />
            <Words text="sometimes I break them on purpose." className="text-foreground/60" />
          </h1>

          <motion.p
            {...fade}
            transition={{ ...(fade.transition ?? {}), delay: 0.5 }}
            className="pretty-wrap mt-6 max-w-xl text-lg text-muted-foreground"
          >
            {siteConfig.blurb}
          </motion.p>

          <motion.div
            {...fade}
            transition={{ ...(fade.transition ?? {}), delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <PillLink href="/projects" variant="solid">
                See the work
                <ArrowRight className="h-4 w-4" />
              </PillLink>
            </Magnetic>
            <Magnetic>
              <PillLink href="/blog" variant="glass">
                Read the blog
              </PillLink>
            </Magnetic>
            <div className="ml-2 flex items-center gap-2">
              <Magnetic strength={0.35}>
                <a
                  href={`https://github.com/${siteConfig.socials.github}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="rounded-full p-2 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="rounded-full p-2 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div
            {...fade}
            transition={{ ...(fade.transition ?? {}), delay: 0.75 }}
            className="mt-10 max-w-md"
          >
            <TerminalPrompt
              lines={[
                '$ whoami',
                `${siteConfig.name.toLowerCase()} — ${siteConfig.role.toLowerCase()} @ ${siteConfig.company.name}`,
                '$ cat interests.txt',
                'full-stack engineering · vulnerability research · the occasional CTF',
              ]}
            />
          </motion.div>
        </div>

        <motion.div
          {...fade}
          transition={{ ...(fade.transition ?? {}), delay: 0.2 }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-3xl bg-white/[0.04] blur-3xl" />
            <div className="glass rounded-3xl p-6">
              <PixelAvatar size={220} />
            </div>
            <div className="mt-3 text-center font-mono text-xs text-muted-foreground">
              <span className="text-accent">●</span> online · accepting interesting problems
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
