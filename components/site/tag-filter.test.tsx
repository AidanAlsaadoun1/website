import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { TagFilter } from './tag-filter'

const options = [
  { label: 'All', value: undefined, count: 5 },
  { label: 'Engineering', value: 'engineering', count: 2 },
  { label: 'Security', value: 'security', count: 2 },
  { label: 'Info', value: 'info', count: 1 },
]

describe('TagFilter', () => {
  it('renders a labelled navigation with one link per option', () => {
    render(<TagFilter current={undefined} baseHref="/blog" options={options} />)
    const nav = screen.getByRole('navigation', { name: /filter/i })
    expect(nav).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(options.length)
  })

  it('builds the URL with the configured paramName', () => {
    render(
      <TagFilter current={undefined} baseHref="/blog" paramName="category" options={options} />,
    )
    const sec = screen.getByRole('link', { name: /security/i })
    expect(sec).toHaveAttribute('href', '/blog?category=security')
  })

  it('marks the active chip with aria-current="true"', () => {
    render(
      <TagFilter current="security" baseHref="/blog" paramName="category" options={options} />,
    )
    const sec = screen.getByRole('link', { name: /security/i })
    expect(sec).toHaveAttribute('aria-current', 'true')
  })

  it('"All" chip has no query string', () => {
    render(<TagFilter current={undefined} baseHref="/blog" options={options} />)
    const all = screen.getByRole('link', { name: /all/i })
    expect(all).toHaveAttribute('href', '/blog')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <TagFilter current="security" baseHref="/blog" paramName="category" options={options} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
