import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './hero'

const meta: Meta<typeof Hero> = {
  title: 'Sections/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    withAurora: true,
    docs: {
      description: {
        component:
          'The landing hero — word-by-word reveal of the H1, magnetic CTAs, pixel avatar with idle bob, and the $ whoami terminal flourish. Honors prefers-reduced-motion.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Hero>

export const Default: Story = {}
