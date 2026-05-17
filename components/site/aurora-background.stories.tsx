import type { Meta, StoryObj } from '@storybook/react'
import { AuroraBackground } from './aurora-background'

const meta: Meta<typeof AuroraBackground> = {
  title: 'Background/AuroraBackground',
  component: AuroraBackground,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof AuroraBackground>

export const Default: Story = {
  render: () => (
    <div className="relative min-h-[60vh]">
      <AuroraBackground />
      <div className="relative z-10 p-12">
        <h2 className="text-3xl font-bold">Glass over aurora</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          The background is decorative and aria-hidden. Surfaces sit above it via{' '}
          <code>z-10</code>.
        </p>
      </div>
    </div>
  ),
}
