import type { Meta, StoryObj } from '@storybook/react'
import { GlassCard } from './glass-card'

const meta: Meta<typeof GlassCard> = {
  title: 'Surfaces/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Liquid-glass surface primitive. Heavy transparency, subtle inner specular highlight, and an iridescent rim on hover when `interactive`.',
      },
    },
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['div', 'article', 'section', 'li'],
    },
    interactive: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof GlassCard>

export const Default: Story = {
  args: {
    children: 'A frosted glass surface.',
    className: 'max-w-md',
  },
}

export const Interactive: Story = {
  args: {
    children: 'Hover me — the iridescent rim lights up.',
    interactive: true,
    className: 'max-w-md',
  },
}

export const AsArticle: Story = {
  args: {
    as: 'article',
    children: 'Rendered as an <article> element.',
    className: 'max-w-md',
  },
}

export const WithRichContent: Story = {
  args: {
    className: 'max-w-md space-y-3',
    children: (
      <>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          // sample
        </p>
        <h3 className="text-xl font-semibold">A card with content</h3>
        <p className="text-sm text-muted-foreground">
          Use this primitive for any card surface — projects, posts, contact, certs.
        </p>
      </>
    ),
  },
}
