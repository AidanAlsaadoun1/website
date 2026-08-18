import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { GlassCard } from '@/components/site/glass-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal, RevealGroup } from '@/components/site/reveal'
import { Tilt } from '@/components/site/tilt'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Find Aidan on LinkedIn or GitHub.',
}

const channels = [
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/aidan-a',
    href: siteConfig.socials.linkedin,
    Icon: Linkedin,
    blurb: 'The fastest place to start a conversation about work, hiring, or collaboration.',
  },
  {
    label: 'GitHub',
    handle: `github.com/${siteConfig.socials.github}`,
    href: `https://github.com/${siteConfig.socials.github}`,
    Icon: Github,
    blurb: 'Skip the chat and just look at the code. Drop an issue if you find something broken.',
  },
] as const

export default function ContactPage() {
  return (
    <section className="container max-w-3xl py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Contact' },
        ]}
      />
      <Reveal>
        <SectionHeading
          level={1}
          eyebrow="Contact"
          title="Find me elsewhere"
          description="I don't run a public inbox. The best places to talk about work, hiring or collaboration are LinkedIn and GitHub."
        />
      </Reveal>

      <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2" aria-label="Where to find me">
        {channels.map(({ label, handle, href, Icon, blurb }) => (
          <Reveal key={label} as="li">
            <Tilt className="group relative h-full" maxTilt={5}>
              <GlassCard
                as="article"
                interactive
                className="relative flex h-full flex-col gap-4 overflow-hidden p-7"
              >
                <Link
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="absolute inset-0"
                  aria-label={`${label} (opens in a new tab)`}
                />
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7 text-foreground" aria-hidden="true" />
                  <ArrowUpRight
                    className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h2 className="display text-2xl">{label}</h2>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">{handle}</p>
                </div>
                <p className="pretty-wrap text-sm leading-relaxed text-muted-foreground">{blurb}</p>
              </GlassCard>
            </Tilt>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  )
}
