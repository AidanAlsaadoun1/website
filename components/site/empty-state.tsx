import { GlassCard } from './glass-card'

type Props = {
  title: string
  description: string
  hint?: string
}

export function EmptyState({ title, description, hint }: Props) {
  return (
    <GlassCard className="mx-auto max-w-2xl p-10 text-center">
      <p className="eyebrow" aria-hidden="true">
        Nothing here yet
      </p>
      <h2 className="display mt-3 text-3xl">{title}</h2>
      <p className="pretty-wrap mt-3 text-muted-foreground">{description}</p>
      {hint && (
        <p className="mt-5 inline-block rounded-md border border-foreground/15 bg-foreground/[0.04] px-3 py-1 font-mono text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </GlassCard>
  )
}
