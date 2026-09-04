import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Palette,
  ShieldCheck,
} from 'lucide-react'
import { Hero } from '@/components/site/hero'
import { SectionHeading } from '@/components/site/section-heading'
import { ProjectCard } from '@/components/site/project-card'
import { PostCard } from '@/components/site/post-card'
import { ExperienceTimeline } from '@/components/site/experience'
import { TerminalBlock } from '@/components/site/terminal-block'
import { PixelAvatar } from '@/components/site/pixel-avatar'
import { Reveal, RevealGroup } from '@/components/site/reveal'
import { PillLink, pillClassName } from '@/components/ui/pill-button'
import { featuredProjects } from '@/config/projects'
import { githubUrl, siteConfig, siteUrl } from '@/config/site'
import { getRepoMetadata } from '@/lib/github'
import { getHomePosts } from '@/lib/posts'
import { formatMonthYear } from '@/lib/utils'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const CAPABILITY_ICONS = [
  { bg: 'bg-pop-butter', Icon: Palette },
  { bg: 'bg-pop-sky', Icon: Database },
  { bg: 'bg-pop-blush', Icon: Cloud },
] as const

function personJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.fullName,
    jobTitle: siteConfig.title,
    description: siteConfig.positioning,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    address: { '@type': 'PostalAddress', addressCountry: 'GB' },
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.company.name,
      url: siteConfig.company.url,
    },
    sameAs: [githubUrl, siteConfig.socials.linkedin],
    knowsAbout: [...siteConfig.heroStack, 'Software architecture', 'Threat modelling', 'Web security'],
  }
  // `<` can't appear literally inside a JSON-LD script
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export default async function HomePage() {
  const [repos, posts] = await Promise.all([getRepoMetadata(), getHomePosts(3)])
  const [lead, ...others] = featuredProjects
  const { cv, email } = siteConfig

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd() }} />

      <Hero />

      {/* Selected work */}
      <section id="work" aria-labelledby="work-heading" className="anchor-target container py-20 sm:py-24">
        <Reveal>
          <SectionHeading
            id="work-heading"
            eyebrow="Selected work"
            tone="mint"
            title="Things I've built, and why they were hard."
            description="Case studies with the engineering decisions behind them. Language, stars and last push are live from GitHub."
            action={
              <Link href="/projects" className="link inline-flex items-center gap-1 text-sm">
                All projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-8">
          {lead && (
            <Reveal>
              <ProjectCard project={lead} repo={repos[lead.slug.toLowerCase()]} variant="featured" />
            </Reveal>
          )}
          <RevealGroup className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {others.map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} repo={repos[project.slug.toLowerCase()]} />
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="anchor-target container py-20 sm:py-24"
      >
        <Reveal>
          <SectionHeading
            id="experience-heading"
            eyebrow="Experience"
            tone="sky"
            title="Seven years of production systems."
            description="Real-money games at Tombola, national-scale services in the Civil Service, payments at Visa, and now the first engineer at sprintworks."
          />
        </Reveal>
        <Reveal>
          <ExperienceTimeline items={siteConfig.experience} />
        </Reveal>

        <Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-10">
            <p className="eyebrow lg:pt-1">Education & credentials</p>
            <div>
              <ul className="grid gap-3 sm:grid-cols-2" aria-label="Education and certifications">
                {siteConfig.education.map((edu) => (
                  <li
                    key={edu.qualification}
                    className="flex items-start justify-between gap-4 rounded-xl border-2 border-foreground bg-elevated px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium leading-snug">{edu.qualification}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                        {edu.institution} · {edu.year}
                      </p>
                    </div>
                    <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  </li>
                ))}
                {siteConfig.certifications.map((cert) => (
                  <li
                    key={cert.name}
                    className="flex items-start justify-between gap-4 rounded-xl border border-foreground/20 bg-elevated px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium leading-snug">{cert.name}</p>
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                        {cert.issuer} · <time dateTime={cert.issuedAt}>{formatMonthYear(cert.issuedAt)}</time>
                      </p>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-0.5 inline-flex shrink-0 items-center gap-1 font-mono text-xs text-foreground/80 hover:text-accent"
                        aria-label={`Verify ${cert.name} (opens in new tab)`}
                      >
                        Verify <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <Link href="/certifications" className="link mt-4 inline-flex items-center gap-1 text-sm">
                All certifications <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What I do + security mindset */}
      <section id="how-i-work" aria-labelledby="how-heading" className="anchor-target container py-20 sm:py-24">
        <Reveal>
          <SectionHeading id="how-heading" eyebrow="What I do" tone="butter" title="Three layers, one engineer." />
        </Reveal>
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {siteConfig.capabilities.map((capability, i) => {
            const look = CAPABILITY_ICONS[i % CAPABILITY_ICONS.length]!
            const Icon = look.Icon
            return (
              <Reveal key={capability.title}>
                <div className="pop-card flex h-full flex-col gap-4 rounded-2xl p-7">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl border-2 border-foreground ${look.bg}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="display text-3xl leading-tight">{capability.title}</h3>
                  <p className="pretty-wrap text-[0.95rem] leading-relaxed text-foreground/80">
                    {capability.summary}
                  </p>
                  <ul className="mt-auto space-y-2 pt-2 font-mono text-xs uppercase tracking-wider text-foreground/80">
                    {capability.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-accent">
                          ✦
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </RevealGroup>

        <Reveal>
          <div className="mt-8 grid gap-8 rounded-2xl border-2 border-foreground bg-elevated p-7 sm:p-9 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <p className="mb-5" aria-hidden="true">
                <span className="tag-sticker bg-pop-blush">{siteConfig.security.eyebrow}</span>
              </p>
              <h3 className="display text-balance text-3xl sm:text-4xl">{siteConfig.security.title}</h3>
              <p className="pretty-wrap mt-4 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
                {siteConfig.security.summary}
              </p>
              <Link
                href={siteConfig.security.link.href}
                className="link mt-6 inline-flex items-center gap-1 text-sm"
              >
                {siteConfig.security.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid gap-3 self-center" aria-label="Security practice">
              {siteConfig.security.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/85">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-heading" className="anchor-target container py-20 sm:py-24">
        <RevealGroup className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <SectionHeading id="about-heading" eyebrow="About" tone="blush" title="The short version." className="mb-6" />
              <p className="pretty-wrap max-w-lg text-lg leading-relaxed text-muted-foreground">
                {siteConfig.longBio}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="link inline-flex items-center gap-1 text-sm">
                  Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/blog" className="link inline-flex items-center gap-1 text-sm">
                  Read the writing <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div>
              <TerminalBlock lines={[...siteConfig.terminal]} title="aidan@dev-aidan.com" wrap />
              <p className="mt-4 flex items-center gap-3 font-mono text-xs text-muted-foreground">
                <PixelAvatar size={36} animate={false} />
                me, in 16×16 pixels. The rest of the site is the higher-resolution version.
              </p>
            </div>
          </Reveal>
        </RevealGroup>
      </section>

      {/* Writing */}
      {posts.length > 0 && (
        <section id="writing" aria-labelledby="writing-heading" className="anchor-target container py-20 sm:py-24">
          <Reveal>
            <SectionHeading
              id="writing-heading"
              eyebrow="Writing"
              tone="butter"
              title="Notes from the build."
              description="Architecture calls, delivery habits and the occasional security writeup, written down while the lesson was fresh."
              action={
                <Link href="/blog" className="link inline-flex items-center gap-1 text-sm">
                  All posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              }
            />
          </Reveal>
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Reveal key={`${post.kind}-${post.slug}`}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Contact CTA */}
      <section id="contact" aria-labelledby="cta-heading" className="anchor-target container pb-24 pt-6">
        <Reveal>
          <div className="pop-card relative overflow-hidden rounded-3xl bg-pop-sky p-10 text-center sm:p-16">
            <h2 id="cta-heading" className="display text-balance text-4xl sm:text-6xl">
              Got a system <span className="accent-text">worth talking about</span>?
            </h2>
            <p className="pretty-wrap mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground/75">
              Questions about a project, a write-up, or how something here was built are always welcome.
              LinkedIn is the fastest way to reach me; GitHub if you&apos;d rather read the code first.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <PillLink href={siteConfig.socials.linkedin} variant="solid">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </PillLink>
              <PillLink href={githubUrl} variant="glass">
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </PillLink>
              {cv.url && (
                <a href={cv.url} download className={pillClassName('glass')}>
                  <Download className="h-4 w-4" aria-hidden="true" /> {cv.label}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className={pillClassName('glass')}>
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
