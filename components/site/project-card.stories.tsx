import type { Meta, StoryObj } from '@storybook/react'
import { projects } from '@/config/projects'
import type { GhRepo } from '@/lib/github'
import { ProjectCard } from './project-card'

const meta: Meta<typeof ProjectCard> = {
  title: 'Cards/ProjectCard',
  component: ProjectCard,
  parameters: { layout: 'padded' },
}
export default meta

const settlement = projects[0]!
const cli = projects[1]!

const repo: GhRepo = {
  name: settlement.slug,
  description: null,
  url: settlement.repoUrl,
  stars: 2,
  forks: 0,
  language: 'Go',
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString(),
  topics: ['go', 'solidity'],
}

type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: { project: cli, repo: { ...repo, name: cli.slug, language: 'Python', stars: 1 } },
  decorators: [(Story) => <div className="w-[440px]"><Story /></div>],
}

export const FeaturedWithDiagram: Story = {
  args: { project: settlement, repo, variant: 'featured' },
  decorators: [(Story) => <div className="w-[1100px]"><Story /></div>],
}

export const FeaturedWithTerminal: Story = {
  args: { project: cli, repo: { ...repo, name: cli.slug, language: 'Python', stars: 1 }, variant: 'featured' },
  decorators: [(Story) => <div className="w-[1100px]"><Story /></div>],
}
