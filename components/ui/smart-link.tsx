import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string
  children: ReactNode
}

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:')
}

/**
 * Renders a Next <Link> for internal paths and a plain anchor (new tab, safe
 * rel) for anything external. Lets callers stop caring which is which.
 */
export function SmartLink({ href, children, ...rest }: Props) {
  if (isExternalHref(href)) {
    const isMail = href.startsWith('mailto:')
    return (
      <a
        href={href}
        target={isMail ? undefined : '_blank'}
        rel={isMail ? undefined : 'noreferrer noopener'}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}
