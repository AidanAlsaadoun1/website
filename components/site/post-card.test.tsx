import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { PostCard } from './post-card'
import type { Post } from '@/lib/posts'

const samplePost: Post = {
  slug: 'hello',
  kind: 'blog',
  content: '',
  readingTime: '5 min read',
  frontmatter: {
    title: 'Hello from the blog',
    date: '2026-05-11',
    summary: 'A test post summary.',
    tags: ['meta'],
  },
}

const securityPost: Post = {
  slug: 'shellcode',
  kind: 'blog',
  content: '',
  readingTime: '7 min read',
  frontmatter: {
    title: 'Masking Shellcode',
    date: '2025-06-28',
    summary: 'Encoding shellcode bytes as IPv4 strings.',
    tags: ['security', 'shellcode'],
    severity: 'info',
  },
}

describe('PostCard', () => {
  it('renders the post title as a link to /<kind>/<slug>', () => {
    render(<PostCard post={samplePost} />)
    const link = screen.getByRole('link', { name: /hello from the blog/i })
    expect(link).toHaveAttribute('href', '/blog/hello')
  })

  it('renders date in formatted form and reading time', () => {
    render(<PostCard post={samplePost} />)
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText(/may 2026|2026/i)).toBeInTheDocument()
  })

  it('renders the severity chip when present', () => {
    render(<PostCard post={securityPost} />)
    expect(screen.getByText('info')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(<PostCard post={samplePost} />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no axe violations on a security-flavoured post', async () => {
    const { container } = render(<PostCard post={securityPost} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
