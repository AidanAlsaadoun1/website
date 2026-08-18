import Link from 'next/link'
import { ArrowRight, Cloud, Database, Palette } from 'lucide-react'
import { Hero } from '@/components/site/hero'
import { Marquee } from '@/components/site/marquee'
import { SectionHeading } from '@/components/site/section-heading'
import { ProjectCard } from '@/components/site/project-card'
import { PostCard } from '@/components/site/post-card'
import { Reveal, RevealGroup } from '@/components/site/reveal'
import { PillLink } from '@/components/ui/pill-button'
import { siteConfig } from '@/config/site'
import { getPinnedRepos } from '@/lib/github'
import { getAllPosts } from '@/lib/posts'
import { cn } from '@/lib/utils'

const CAPABILITY_LOOKS = [
  { bg: 'bg-pop-butter', rotate: '-rotate-1', Icon: Palette },
  { bg: 'bg-pop-sky', rotate: 'rotate-1', Icon: Database },
  { bg: 'bg-pop-blush', rotate: '-rotate-1', Icon: Cloud },
] as const

const NOTE_LOOKS = [
  { bg: 'bg-pop-butter', rotate: '-rotate-2' },
  { bg: 'bg-pop-sky', rotate: 'rotate-1' },
  { bg: 'bg-pop-mint', rotate: 'rotate-2' },
  { bg: 'bg-pop-blush', rotate: '-rotate-1' },
] as const

const TILTS = [-1, 0, 1] as const

export default async function HomePage() {
  const [repos, blogPosts] = await Promise.all([getPinnedRepos(), getAllPosts('blog')])
  const featuredRepos = repos.slice(0, 3)
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <>
      <Hero />

      <Marquee />

      {/* What I do, three tilted colour cards */}
      <section className="container py-24 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            tone="sky"
            title="Three layers, one engineer"
          />
        </Reveal>
        <RevealGroup className="grid gap-8 md:grid-cols-3">
          {siteConfig.capabilities.map((capability, i) => {
            const look = CAPABILITY_LOOKS[i % CAPABILITY_LOOKS.length]!
            const Icon = look.Icon
            return (
              <Reveal key={capability.title}>
                <div
                  className={cn(
                    'pop-card pop-card-hover flex h-full flex-col gap-4 rounded-2xl p-8 transition-transform duration-300 hover:rotate-0',
                    look.bg,
                    look.rotate,
                  )}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl border-2 border-foreground bg-elevated">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="display text-3xl leading-tight">{capability.title}</h3>
                  <p className="pretty-wrap text-[0.95rem] leading-relaxed text-foreground/80">
                    {capability.summary}
                  </p>
                  <ul className="mt-auto space-y-2 pt-2 font-mono text-xs uppercase tracking-wider text-foreground/80">
                    {capability.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-accent">✦</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </RevealGroup>
      </section>

      {/* Selected work */}
      <section className="container py-24 sm:py-28">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected work"
              tone="mint"
              title="Things I've shipped"
              description="Straight from my pinned GitHub repos, as current as my last push."
              className="mb-0"
            />
            <Link
              href="/projects"
              className="link hidden shrink-0 items-center gap-1 text-sm sm:inline-flex"
            >
              All projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredRepos.map((repo, i) => (
            <Reveal key={repo.name}>
              <ProjectCard repo={repo} tilt={TILTS[i % TILTS.length]!} />
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {/* About + bench notes */}
      <section className="container py-24 sm:py-28">
        <RevealGroup className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <SectionHeading eyebrow="About" tone="blush" title="The short version" />
              <p className="pretty-wrap -mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
                {siteConfig.longBio}
              </p>
              <Link href="/contact" className="link mt-8 inline-flex items-center gap-2 text-sm">
                Come say hi <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <p className="mb-6" aria-hidden="true">
                <span className="tag-sticker bg-pop-butter">On the bench right now</span>
              </p>
              <ul className="grid gap-5 sm:grid-cols-2">
                {siteConfig.currentlyBuilding.map((item, i) => {
                  const look = NOTE_LOOKS[i % NOTE_LOOKS.length]!
                  return (
                    <li
                      key={item.title}
                      className={cn(
                        'pop-card pop-card-hover rounded-xl p-5 transition-transform duration-300 hover:rotate-0',
                        look.bg,
                        look.rotate,
                      )}
                    >
                      <p className="font-semibold leading-snug">{item.title}</p>
                      <p className="mt-2 font-mono text-xs leading-relaxed text-foreground/70">
                        {item.description}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </RevealGroup>
      </section>

      {/* Latest writing */}
      {latestPosts.length > 0 && (
        <section className="container py-24 sm:py-28">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Writing"
                tone="butter"
                title="Notes from the build"
                description="Things I learned the hard way, written down while the bruise was fresh."
                className="mb-0"
              />
              <Link
                href="/blog"
                className="link hidden shrink-0 items-center gap-1 text-sm sm:inline-flex"
              >
                All posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, i) => (
              <Reveal key={`${post.kind}-${post.slug}`}>
                <PostCard post={post} tilt={TILTS[(i + 1) % TILTS.length]!} />
              </Reveal>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* CTA */}
      <section className="container pb-24 pt-8">
        <Reveal>
          <div className="pop-card relative overflow-hidden rounded-3xl bg-pop-sky p-10 text-center sm:p-16">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-2 rounded-sm bg-pop-butter/90 shadow-sm"
            />
            <h2 className="display text-balance text-4xl sm:text-6xl">
              Got something <span className="accent-text">worth building</span>?
            </h2>
            <p className="pretty-wrap mx-auto mt-5 max-w-md text-lg leading-relaxed text-foreground/75">
              No public inbox, but LinkedIn and GitHub are always open.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <PillLink href={siteConfig.socials.linkedin} variant="solid">
                LinkedIn <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PillLink>
              <PillLink href={`https://github.com/${siteConfig.socials.github}`} variant="glass">
                GitHub <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PillLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
