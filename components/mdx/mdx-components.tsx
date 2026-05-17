import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Components available inside any .mdx file under /content/**
 * Add custom ones here — they become "free imports" inside posts.
 */
export const mdxComponents = {
  a: ({ href = '#', className, children, ...props }: ComponentProps<'a'>) => {
    const external = /^https?:\/\//.test(href)
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={cn('text-accent underline-offset-4 hover:underline', className)}
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cn('text-accent underline-offset-4 hover:underline', className)}>
        {children}
      </Link>
    )
  },
  VulnCallout: ({
    severity = 'medium',
    title,
    children,
  }: {
    severity?: 'info' | 'low' | 'medium' | 'high' | 'critical'
    title?: string
    children: React.ReactNode
  }) => {
    const styles: Record<string, string> = {
      info: 'border-sky-500/30 bg-sky-500/5 text-sky-200',
      low: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-200',
      medium: 'border-amber-500/30 bg-amber-500/5 text-amber-200',
      high: 'border-orange-500/30 bg-orange-500/5 text-orange-200',
      critical: 'border-rose-500/30 bg-rose-500/5 text-rose-200',
    }
    return (
      <aside
        className={cn(
          'my-6 rounded-xl border p-4 font-mono text-sm not-prose',
          styles[severity],
        )}
      >
        <div className="mb-1 text-[10px] uppercase tracking-[0.2em] opacity-80">
          {severity} {title ? `· ${title}` : ''}
        </div>
        <div className="prose prose-invert max-w-none text-current">{children}</div>
      </aside>
    )
  },
  CVELink: ({ id }: { id: string }) => (
    <a
      href={`https://nvd.nist.gov/vuln/detail/${id}`}
      target="_blank"
      rel="noreferrer noopener"
      className="rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-xs text-accent hover:bg-accent/20"
    >
      {id}
    </a>
  ),
}
