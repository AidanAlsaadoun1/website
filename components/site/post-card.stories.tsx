import type { Meta, StoryObj } from '@storybook/react'
import type { Post } from '@/lib/posts'
import { PostCard } from './post-card'

const meta: Meta<typeof PostCard> = {
  title: 'Cards/PostCard',
  component: PostCard,
  parameters: { layout: 'centered' },
}
export default meta

const samplePost: Post = {
  slug: 'hello-from-the-new-site',
  kind: 'blog',
  content: '',
  readingTime: '3 min read',
  frontmatter: {
    title: 'Hello from the new site',
    date: '2026-05-11',
    summary: "A short note on rebuilding dev-aidan.com from scratch — what changed, what didn't.",
    category: 'info',
    tags: ['meta', 'nextjs', 'vercel'],
  },
}

const securityPost: Post = {
  slug: 'masking-shellcode-with-ipv4',
  kind: 'blog',
  content: '',
  readingTime: '7 min read',
  frontmatter: {
    title: 'Masking Shellcode with IPv4',
    date: '2025-06-28',
    summary: 'Encoding shellcode bytes as IPv4 strings to slip past Windows Defender.',
    category: 'security',
    tags: ['security', 'shellcode', 'obfuscation'],
    severity: 'info',
  },
}

const criticalPost: Post = {
  ...securityPost,
  slug: 'critical-finding',
  frontmatter: {
    ...securityPost.frontmatter,
    title: 'Hypothetical critical disclosure',
    severity: 'critical',
  },
}

type Story = StoryObj<typeof PostCard>

export const Default: Story = {
  args: { post: samplePost },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
}

export const SecurityFlavoured: Story = {
  args: { post: securityPost },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
}

export const CriticalSeverity: Story = {
  args: { post: criticalPost },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
}
