import type { Meta, StoryObj } from '@storybook/react'
import { Magnetic } from './magnetic'
import { PillButton } from '@/components/ui/pill-button'

const meta: Meta<typeof Magnetic> = {
  title: 'Motion/Magnetic',
  component: Magnetic,
  parameters: { layout: 'centered' },
  argTypes: {
    strength: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
}
export default meta

type Story = StoryObj<typeof Magnetic>

export const Default: Story = {
  args: {
    strength: 0.25,
    children: <PillButton variant="solid">Move your mouse near me</PillButton>,
  },
}

export const Strong: Story = {
  args: {
    strength: 0.6,
    children: <PillButton variant="glass">More leaning</PillButton>,
  },
}

export const Subtle: Story = {
  args: {
    strength: 0.1,
    children: <PillButton variant="solid">Barely magnetic</PillButton>,
  },
}
