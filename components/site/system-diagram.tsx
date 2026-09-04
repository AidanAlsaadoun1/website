import type { DiagramNode } from '@/config/projects'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  nodes: DiagramNode[]
  footnote?: string
  className?: string
}

/**
 * A data-flow diagram drawn with HTML, not an image: real text (searchable,
 * translatable, readable by screen readers), a vertical rail so it reads the
 * same on a phone and a desktop, and no client JS.
 */
export function SystemDiagram({ title, nodes, footnote, className }: Props) {
  return (
    <figure className={cn('rounded-2xl border-2 border-foreground bg-base p-5 sm:p-6', className)}>
      <figcaption className="eyebrow mb-5">{title}</figcaption>
      <ol className="relative flex flex-col gap-3" aria-label="Data flow, in order">
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[13px] top-4 w-0.5 bg-foreground/20"
        />
        {nodes.map((node, i) => (
          <li key={node.label} className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-4">
            <span
              aria-hidden="true"
              className="relative z-10 grid h-7 w-7 place-items-center rounded-full border-2 border-foreground bg-elevated font-mono text-[11px] font-semibold"
            >
              {i + 1}
            </span>
            <div className="rounded-xl border border-foreground/20 bg-elevated px-4 py-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[13px] font-semibold text-foreground">{node.label}</span>
                {node.layer && (
                  <span className="font-mono text-[11px] text-muted-foreground">{node.layer}</span>
                )}
              </div>
              <p className="pretty-wrap mt-1.5 text-sm leading-relaxed text-foreground/80">{node.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      {footnote && (
        <p className="pretty-wrap mt-5 border-t border-foreground/15 pt-4 text-sm italic leading-relaxed text-muted-foreground">
          {footnote}
        </p>
      )}
    </figure>
  )
}
