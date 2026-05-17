import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { GlassCard } from '@/components/site/glass-card'
import { SectionHeading } from '@/components/site/section-heading'
import { EmptyState } from '@/components/site/empty-state'
import { siteConfig } from '@/config/site'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Talks',
  description: 'Conference talks, podcast appearances, and meetup sessions.',
}

export default function TalksPage() {
  const talks = siteConfig.talks
  return (
    <section className="container py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Talks' },
        ]}
      />
      <SectionHeading
        level={1}
        eyebrow="talks"
        title="Speaking, in public, on purpose"
        description="Conferences, meetups, and podcasts I've taken part in."
      />
      {talks.length === 0 ? (
        <EmptyState
          title="No talks logged yet"
          description="When I give one, it'll show up here. In the meantime, want me on a podcast or at a meetup? Hit the contact page."
          hint="config/site.ts → talks: [...]"
        />
      ) : (
        <ul className="space-y-4">
          {talks.map((talk) => (
            <li key={`${talk.title}-${talk.date}`}>
              <GlassCard interactive className="flex items-center justify-between gap-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {talk.type}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{talk.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {talk.event} · {formatDate(talk.date)}
                  </p>
                </div>
                {talk.url && (
                  <a
                    href={talk.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="shrink-0 text-muted-foreground transition hover:text-accent"
                    aria-label={`Open ${talk.title}`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </GlassCard>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
