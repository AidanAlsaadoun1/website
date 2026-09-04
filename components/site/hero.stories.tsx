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
          'The landing hero: name, role, one-paragraph positioning, recruiter CTAs and the at-a-glance panel. Server Component with a CSS-only entrance; honours prefers-reduced-motion.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Hero>

export const Default: Story = {}
