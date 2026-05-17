import type { Meta, StoryObj } from '@storybook/react'
import type { GhRepo } from '@/lib/github'
import { ProjectCard } from './project-card'

const meta: Meta<typeof ProjectCard> = {
  title: 'Cards/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'centered' },
}
export default meta

const repo: GhRepo = {
  name: 'dev-aidan',
  description: 'Personal site — Next.js 15, Liquid Glass UI, MDX content.',
  url: 'https://github.com/AidanAlsaadoun1/dev-aidan',
  stars: 8,
  forks: 1,
  language: { name: 'TypeScript', color: '#3178c6' },
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  topics: ['nextjs', 'mdx', 'typescript', 'tailwind'],
}

const popular: GhRepo = {
  ...repo,
  name: 'popular-tool',
  description: 'Something that picked up steam.',
  stars: 1247,
  forks: 89,
  language: { name: 'Rust', color: '#dea584' },
  topics: ['rust', 'cli'],
}

type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: { repo },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
}

export const Popular: Story = {
  args: { repo: popular },
  decorators: [(Story) => <div className="w-[360px]"><Story /></div>],
}
