import { GlassCard } from '@/components/site/glass-card'
import { PillLink } from '@/components/ui/pill-button'

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <GlassCard className="max-w-xl px-10 py-12">
        <p aria-hidden="true">
          <span className="tag-sticker bg-pop-blush">Error 404</span>
        </p>
        <h1 className="display mt-6 text-display-sm">404, nothing at this address.</h1>
        <p className="pretty-wrap mt-4 leading-relaxed text-muted-foreground">
          Either it never existed or it moved without a redirect. The work and writing are one click away.
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
