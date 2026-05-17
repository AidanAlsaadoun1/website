import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeading } from './section-heading'

const meta: Meta<typeof SectionHeading> = {
  title: 'Typography/SectionHeading',
  component: SectionHeading,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    level: { control: { type: 'inline-radio' }, options: [1, 2] },
    align: { control: { type: 'inline-radio' }, options: ['left', 'center'] },
  },
}
export default meta

type Story = StoryObj<typeof SectionHeading>

export const Page: Story = {
  args: {
    level: 1,
    eyebrow: 'blog',
    title: "Notes from the field",
    description:
      "Engineering, security writeups, debugging stories, and the occasional rant. Updated whenever I have something worth saying.",
  },
}

export const Section: Story = {
  args: {
    level: 2,
    eyebrow: 'projects',
    title: "Things I've built",
    description: 'Pulled live from my pinned GitHub repos.',
  },
}

export const Centered: Story = {
  args: {
    level: 2,
    align: 'center',
    title: 'Centered section heading',
    description: 'Same component, different alignment.',
  },
}

export const TitleOnly: Story = {
  args: {
    level: 2,
    title: 'Just a title',
  },
}
