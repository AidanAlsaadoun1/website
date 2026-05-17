import type { Meta, StoryObj } from '@storybook/react'
import { GlassCard } from './glass-card'
import { Tilt } from './tilt'

const meta: Meta<typeof Tilt> = {
  title: 'Motion/Tilt',
  component: Tilt,
  parameters: { layout: 'centered' },
  argTypes: {
    maxTilt: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    glare: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Tilt>

export const Default: Story = {
  args: { maxTilt: 6, glare: true },
  render: (args) => (
    <Tilt {...args} className="group relative">
      <GlassCard className="w-80 p-6">
        <h3 className="text-lg font-semibold">Hover me</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          The card tilts toward the cursor and a soft specular highlight follows.
        </p>
      </GlassCard>
    </Tilt>
  ),
}

export const NoGlare: Story = {
  ...Default,
  args: { maxTilt: 6, glare: false },
}

export const Dramatic: Story = {
  ...Default,
  args: { maxTilt: 14, glare: true },
}
