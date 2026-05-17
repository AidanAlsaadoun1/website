import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { GlassCard } from '@/components/site/glass-card'
import { SectionHeading } from '@/components/site/section-heading'
import { EmptyState } from '@/components/site/empty-state'
import { Reveal, RevealGroup } from '@/components/site/reveal'
import { Tilt } from '@/components/site/tilt'
import { siteConfig, type Certification } from '@/config/site'
import { formatMonthYear } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'Certifications and verifiable credentials.',
}

export default function CertificationsPage() {
  const certs = siteConfig.certifications

  return (
    <section className="container py-20">
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Certifications' },
        ]}
      />
      <Reveal>
        <SectionHeading
          level={1}
          eyebrow="certifications"
          title="Paper trail"
          description="Certifications, programmes, and credentials I've earned. All verifiable on the issuer's platform."
        />
      </Reveal>

      {certs.length === 0 ? (
        <EmptyState
          title="No certs listed yet"
          description="Edit config/site.ts and drop your certifications into the array. They appear here as soon as you push."
          hint="config/site.ts → certifications: [...]"
        />
      ) : (
        <RevealGroup
          as="ul"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Certifications"
        >
          {certs.map((cert) => (
            <Reveal key={`${cert.name}-${cert.issuedAt}`} as="li">
              <Tilt className="group relative h-full" maxTilt={4}>
                <GlassCard
                  as="article"
                  interactive
                  className="relative flex h-full flex-col gap-5 overflow-hidden p-7"
                  aria-labelledby={`cert-${slugForA11y(cert)}`}
                >
                  <CertBadge cert={cert} />

                  <div className="flex flex-col gap-1">
                    <h2
                      id={`cert-${slugForA11y(cert)}`}
                      className="text-balance text-lg font-semibold leading-snug"
                    >
                      {cert.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>

                  {cert.description && (
                    <p className="pretty-wrap text-sm leading-relaxed text-muted-foreground">
                      {cert.description}
                    </p>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <ul
                      className="flex flex-wrap gap-1.5"
                      aria-label={`Skills covered by ${cert.name}`}
                    >
                      {cert.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-col gap-3 border-t border-white/[0.06] pt-4">
                    <dl className="grid grid-cols-2 gap-y-1 font-mono text-[11px] text-muted-foreground">
                      <dt className="sr-only">Issued</dt>
                      <dd>
                        <span className="text-muted-foreground" aria-hidden="true">
                          Issued{' '}
                        </span>
                        <span className="sr-only">Issued </span>
                        <time className="text-foreground" dateTime={cert.issuedAt}>
                          {formatMonthYear(cert.issuedAt)}
                        </time>
                      </dd>
                      {cert.expiresAt && (
                        <>
                          <dt className="sr-only">Expires</dt>
                          <dd>
                            <span className="text-muted-foreground" aria-hidden="true">
                              Expires{' '}
                            </span>
                            <span className="sr-only">Expires </span>
                            <time className="text-foreground" dateTime={cert.expiresAt}>
                              {formatMonthYear(cert.expiresAt)}
                            </time>
                          </dd>
                        </>
                      )}
                      {cert.credentialId && (
                        <>
                          <dt className="sr-only">Credential ID</dt>
                          <dd className="col-span-2 truncate text-muted-foreground">
                            <span aria-hidden="true">ID </span>
                            <span className="sr-only">Credential ID </span>
                            <span className="text-foreground" title={cert.credentialId}>
                              {cert.credentialId.length > 16
                                ? `${cert.credentialId.slice(0, 14)}…`
                                : cert.credentialId}
                            </span>
                          </dd>
                        </>
                      )}
                    </dl>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-3 py-1 font-mono text-xs text-foreground transition hover:border-white/50 hover:bg-white/10"
                        aria-label={`Verify ${cert.name} (opens in new tab)`}
                      >
                        Verify
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </GlassCard>
              </Tilt>
            </Reveal>
          ))}
        </RevealGroup>
      )}
    </section>
  )
}

function CertBadge({ cert }: { cert: Certification }) {
  if (cert.badgeUrl) {
    return (
      <div className="relative flex h-28 items-center justify-center">
        <div
          className="absolute inset-0 -z-10 rounded-2xl bg-white/[0.04] blur-xl"
          aria-hidden="true"
        />
        <Image
          src={cert.badgeUrl}
          alt=""
          width={112}
          height={112}
          className="h-28 w-28 object-contain"
          unoptimized
        />
      </div>
    )
  }
  // Typographic fallback — monogram tile based on the cert's acronym
  const acronym = getAcronym(cert.name)
  return (
    <div
      aria-hidden="true"
      className="relative flex h-28 w-28 items-center justify-center self-start overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(199,228,255,0.12),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-1">
        <ShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
        <span className="font-mono text-base font-bold tracking-[0.18em] text-foreground">
          {acronym}
        </span>
      </div>
    </div>
  )
}

function getAcronym(certName: string): string {
  const n = certName.toLowerCase()
  if (n.includes('solutions architect')) return 'SAA'
  if (n.includes('developer') && n.includes('aws')) return 'DVA'
  if (n.includes('sysops')) return 'SOA'
  if (n.includes('practitioner')) return 'CCP'
  if (n.includes('devops')) return 'DOP'
  if (n.includes('security') && n.includes('aws')) return 'SCS'
  if (n.includes('pjpt')) return 'PJPT'
  if (n.includes('oscp')) return 'OSCP'
  if (n.includes('ceh')) return 'CEH'
  if (n.includes('comptia') && n.includes('security')) return 'SEC+'
  if (n.includes('mentorship')) return 'MNT'
  // Fallback: first letters of words >= 4 chars
  const words = certName.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w) && w.length >= 4)
  return (
    words
      .slice(0, 3)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'CERT'
  )
}

function slugForA11y(cert: Certification): string {
  return `${cert.name}-${cert.issuedAt}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
