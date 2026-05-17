import type { Meta, StoryObj } from '@storybook/react'
import { Reveal, RevealGroup } from './reveal'
import { GlassCard } from './glass-card'

const meta: Meta<typeof Reveal> = {
  title: 'Motion/Reveal',
  component: Reveal,
  parameters: { layout: 'padded' },
  argTypes: {
    delay: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
}
export default meta

type Story = StoryObj<typeof Reveal>

export const SingleReveal: Story = {
  args: { delay: 0 },
  render: (args) => (
    <Reveal {...args}>
      <GlassCard className="max-w-md p-6">
        <p>Scrolls into view with a blur-up fade.</p>
      </GlassCard>
    </Reveal>
  ),
}

export const Stagger: Story = {
  render: () => (
    <RevealGroup className="grid gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((n) => (
        <Reveal key={n}>
          <GlassCard className="p-6">
            <p className="font-mono text-sm">Card {n}</p>
            <p className="mt-2 text-xs text-muted-foreground">Staggered reveal under a group.</p>
          </GlassCard>
        </Reveal>
      ))}
    </RevealGroup>
  ),
}
