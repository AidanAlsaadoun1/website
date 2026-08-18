'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  lines: string[]
  /** ms per character */
  speed?: number
  /** ms between lines */
  linePause?: number
  className?: string
}

/**
 * Tiny typewriter, used for the `$ whoami` flourish under the hero.
 * Honors `prefers-reduced-motion`: instant render with no animation.
 */
export function TerminalPrompt({ lines, speed = 28, linePause = 280, className }: Props) {
  const [output, setOutput] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(lines)
      setDone(true)
      return
    }

    let lineIdx = 0
    let charIdx = 0
    let mounted = true

    function tick() {
      if (!mounted) return
      const currentLine = lines[lineIdx]
      if (currentLine === undefined) {
        setDone(true)
        return
      }
      charIdx += 1
      setOutput((prev) => {
        const next = [...prev]
        next[lineIdx] = currentLine.slice(0, charIdx)
        return next
      })
      if (charIdx >= currentLine.length) {
        lineIdx += 1
        charIdx = 0
        setTimeout(tick, linePause)
      } else {
        setTimeout(tick, speed)
      }
    }
    setTimeout(tick, 400)
    return () => {
      mounted = false
    }
  }, [lines, speed, linePause])

  return (
    <>
      {/* Screen-reader equivalent, clean, static, announced once. */}
      <p className="sr-only">{lines.join('. ')}</p>

      <pre
        aria-hidden="true"
        className={cn(
          'glass relative overflow-hidden rounded-xl border-white/10 p-5 font-mono text-sm leading-relaxed',
          className,
        )}
      >
        {output.map((l, i) => {
          const isPrompt = l?.startsWith('$ ')
          return (
            <div key={i} className="whitespace-pre-wrap">
              {isPrompt ? (
                <>
                  <span className="text-accent">$ </span>
                  <span className="text-foreground">{l.slice(2)}</span>
                </>
              ) : (
                <span className="text-muted-foreground">{l}</span>
              )}
              {i === output.length - 1 && !done && <span className="terminal-cursor" />}
            </div>
          )
        })}
      </pre>
    </>
  )
}
