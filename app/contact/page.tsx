import type { Metadata } from 'next'
import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AtAGlance } from '@/components/site/at-a-glance'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { GlassCard } from '@/components/site/glass-card'
import { SectionHeading } from '@/components/site/section-heading'
import { Reveal, RevealGroup } from '@/components/site/reveal'
import { githubUrl, siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me, full-stack software engineer, via LinkedIn or GitHub.',
  alternates: { canonical: '/contact' },
}

type Channel = {
  label: string
  handle: string
  href: string
  Icon: LucideIcon
  blurb: string
  download?: boolean
}

function channels(): Channel[] {
  const list: Channel[] = [
    {
      label: 'LinkedIn',
      handle: 'linkedin.com/in/aidan-a',
      href: siteConfig.socials.linkedin,
      Icon: Linkedin,
      blurb: 'The fastest way to start a conversation, about work, a project or something I have written.',
    },
    {
      label: 'GitHub',
      handle: `github.com/${siteConfig.socials.github}`,
      href: githubUrl,
      Icon: Github,
      blurb: 'Skip the chat and read the code. Issues are open if you find something broken.',
    },
  ]
  if (siteConfig.email) {
    list.push({
      label: 'Email',
      handle: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      Icon: Mail,
      blurb: 'For anything that needs more than a message box.',
    })
  }
  if (siteConfig.cv.url) {
    list.push({
      label: siteConfig.cv.label,
      handle: 'PDF',
      href: siteConfig.cv.url,
      Icon: Download,
      blurb: 'The PDF version of this site: experience, projects and credentials on two pages.',
      download: true,
    })
  }
  return list
}

export default function ContactPage() {
  const list = channels()
  return (
    <section className="container max-w-5xl py-16 sm:py-20">
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
          tone="sky"
          title="Let's talk."
          description="Questions about a project, a write-up, or how something here was built: LinkedIn is the fastest way to reach me, GitHub if you'd rather look at the code first."
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2" aria-label="Where to find me">
          {list.map(({ label, handle, href, Icon, blurb, download }) => {
            const external = /^https?:\/\//.test(href)
            return (
              <Reveal key={label} as="li">
                <GlassCard
                  as="article"
                  interactive
                  className="group relative flex h-full flex-col gap-4 overflow-hidden p-7"
                >
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer noopener' : undefined}
                    download={download || undefined}
                    className="absolute inset-0 rounded-xl"
                    aria-label={external ? `${label} (opens in a new tab)` : label}
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
              </Reveal>
            )
          })}
        </RevealGroup>

        <Reveal>
          <AtAGlance />
        </Reveal>
      </div>
    </section>
  )
}
