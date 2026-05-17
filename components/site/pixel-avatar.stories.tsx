import type { Meta, StoryObj } from '@storybook/react'
import { PixelAvatar } from './pixel-avatar'

const meta: Meta<typeof PixelAvatar> = {
  title: 'Brand/PixelAvatar',
  component: PixelAvatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'range', min: 32, max: 320, step: 8 } },
    animate: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof PixelAvatar>

export const Default: Story = {
  args: { size: 192, animate: true },
}

export const Small: Story = {
  args: { size: 64, animate: false },
}

export const Large: Story = {
  args: { size: 256, animate: true },
}

export const Static: Story = {
  args: { size: 192, animate: false },
}
