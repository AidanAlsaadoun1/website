import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Hero } from '@/components/site/hero'
import { GlassCard } from '@/components/site/glass-card'
import { SectionHeading } from '@/components/site/section-heading'
import { ProjectCard } from '@/components/site/project-card'
import { PostCard } from '@/components/site/post-card'
import { Reveal, RevealGroup } from '@/components/site/reveal'
import { PillLink } from '@/components/ui/pill-button'
import { siteConfig } from '@/config/site'
import { getPinnedRepos } from '@/lib/github'
import { getAllPosts } from '@/lib/posts'

export default async function HomePage() {
  const [repos, blogPosts] = await Promise.all([getPinnedRepos(), getAllPosts('blog')])
  const featuredRepos = repos.slice(0, 3)
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <>
      <Hero />

      {/* About / Currently exploring */}
      <section className="container py-20">
        <RevealGroup className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="relative h-full overflow-hidden">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                // about
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">The short version</h2>
              <p className="pretty-wrap mt-4 text-muted-foreground">{siteConfig.longBio}</p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </GlassCard>
          </Reveal>

          <Reveal>
            <GlassCard className="h-full">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                // currently_exploring
              </p>
              <h2 className="mt-2 flex items-center gap-2 text-3xl font-bold tracking-tight">
                <Sparkles className="h-6 w-6 text-accent" /> What I&apos;m into
              </h2>
              <ul className="mt-5 space-y-4">
                {siteConfig.currentlyExploring.map((item) => (
                  <li key={item.title} className="border-l border-white/10 pl-4">
                    <p className="font-mono text-sm text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </RevealGroup>
      </section>

      {/* Featured projects */}
      <section className="container py-20">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="projects"
              title="Things I've built"
              description="Pulled live from my pinned GitHub repos. Click through for the source."
              className="mb-0"
            />
            <Link
              href="/projects"
              className="hidden shrink-0 text-sm text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredRepos.map((repo) => (
            <Reveal key={repo.name}>
              <ProjectCard repo={repo} />
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      {/* Latest writing */}
      {latestPosts.length > 0 && (
        <section className="container py-20">
          <Reveal>
            <div className="mb-10 flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="writing"
                title="Latest thinking"
                description="Long-form notes — engineering, security, and the occasional rant."
                className="mb-0"
              />
              <Link
                href="/blog"
                className="hidden shrink-0 text-sm text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1"
              >
                All posts <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Reveal key={`${post.kind}-${post.slug}`}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* CTA */}
      <section className="container py-24">
        <Reveal>
          <GlassCard className="relative overflow-hidden p-10 text-center sm:p-14">
            <p
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
              aria-hidden="true"
            >
              // /elsewhere
            </p>
            <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Find me elsewhere.
            </h2>
            <p className="pretty-wrap mx-auto mt-3 max-w-xl text-muted-foreground">
              I don&apos;t run a public inbox — but LinkedIn and GitHub are both open. Pick the one that
              fits the conversation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <PillLink href={siteConfig.socials.linkedin} variant="solid">
                LinkedIn <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PillLink>
              <PillLink href={`https://github.com/${siteConfig.socials.github}`} variant="glass">
                GitHub <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PillLink>
            </div>
          </GlassCard>
        </Reveal>
      </section>
    </>
  )
}
