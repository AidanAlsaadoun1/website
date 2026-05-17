import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './empty-state'

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'Drop a .mdx file in /content/blog/ to get started.',
    hint: "echo '...post body...' > content/blog/first-post.mdx",
  },
}

export const NoHint: Story = {
  args: {
    title: 'No talks logged yet',
    description:
      "When I give one, it'll show up here. In the meantime, want me on a podcast or at a meetup? Hit the contact page.",
  },
}

export const FilteredEmpty: Story = {
  args: {
    title: 'No "security" posts yet',
    description: 'Try another category, or clear the filter to see everything.',
  },
}
