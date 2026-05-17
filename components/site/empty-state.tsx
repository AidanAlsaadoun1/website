import { GlassCard } from './glass-card'

type Props = {
  title: string
  description: string
  hint?: string
}

export function EmptyState({ title, description, hint }: Props) {
  return (
    <GlassCard className="mx-auto max-w-2xl text-center">
      <p
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        aria-hidden="true"
      >
        // coming soon
      </p>
      <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
      {hint && (
        <p className="mt-4 inline-block rounded-md border border-white/10 bg-black/30 px-3 py-1 font-mono text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </GlassCard>
  )
}
