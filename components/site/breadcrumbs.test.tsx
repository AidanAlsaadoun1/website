import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Breadcrumbs } from './breadcrumbs'

describe('Breadcrumbs', () => {
  it('renders inside a labelled navigation landmark', () => {
    render(
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { label: 'Current page' },
        ]}
      />,
    )
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument()
  })

  it('marks the last item with aria-current="page"', () => {
    render(
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { label: 'A post title' },
        ]}
      />,
    )
    // The visible trail uses a <span> with aria-current; find via attribute
    const current = document.querySelector('[aria-current="page"]')
    expect(current).not.toBeNull()
    expect(current?.textContent).toContain('A post title')
  })

  it('shows a "Back to" affordance pointing at the previous linkable item', () => {
    render(
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { label: 'A post' },
        ]}
      />,
    )
    const back = screen.getByRole('link', { name: /back to blog/i })
    expect(back).toHaveAttribute('href', '/blog')
  })

  it('renders nothing for empty items', () => {
    const { container } = render(<Breadcrumbs items={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { label: 'This page' },
        ]}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('exposes Home with a sr-only label rather than relying on the icon', () => {
    render(<Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Now' }]} />)
    const nav = screen.getByRole('navigation', { name: /breadcrumb/i })
    const homeLink = within(nav).getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
