import { cn } from '@/lib/utils'

type Props = {
  lines: string[]
  title?: string
  /** Wrap long lines (prose-like output) instead of scrolling horizontally (tables). */
  wrap?: boolean
  className?: string
}

/**
 * Static terminal transcript. Lines starting with "$ " render as prompts; the
 * rest as output. Real text, no typewriter, nothing hidden from screen readers.
 */
export function TerminalBlock({ lines, title, wrap = false, className }: Props) {
  return (
    <div className={cn('terminal min-w-0 max-w-full', className)}>
      {title && (
        <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-pop-rose/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-pop-sun/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-pop-leaf/80" />
          </span>
          <span className="muted text-xs">{title}</span>
        </div>
      )}
      <pre
        className={cn('!m-0 !border-0 !bg-transparent !p-0 !shadow-none', wrap ? 'whitespace-pre-wrap' : 'whitespace-pre')}
        tabIndex={wrap ? undefined : 0}
        aria-label={wrap ? undefined : `${title ?? 'Terminal'} output, scrolls horizontally`}
      >
        <code>
          {lines.map((line, i) => {
            const isPrompt = line.startsWith('$ ')
            return (
              <span key={i} className={isPrompt ? undefined : 'muted'}>
                {isPrompt ? (
                  <>
                    <span className="prompt">$ </span>
                    {line.slice(2)}
                  </>
                ) : (
                  line
                )}
                {'\n'}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
