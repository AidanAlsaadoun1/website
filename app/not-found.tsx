import { GlassCard } from '@/components/site/glass-card'
import { PillLink } from '@/components/ui/pill-button'

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <GlassCard className="max-w-xl px-10 py-12">
        <p className="font-mono text-sm text-accent">404 // route_not_found</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight">Page went 404.</h1>
        <p className="mt-4 text-muted-foreground">
          Either it never existed or it was patched out. Either way, this URL doesn&apos;t resolve.
        </p>
        <div className="mt-6 inline-block">
          <PillLink href="/" variant="solid">
            ← Back home
          </PillLink>
        </div>
      </GlassCard>
    </section>
  )
}
