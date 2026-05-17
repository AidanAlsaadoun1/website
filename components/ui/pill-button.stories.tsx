import type { Meta, StoryObj } from '@storybook/react'
import { ArrowRight, Send } from 'lucide-react'
import { PillButton, PillLink } from './pill-button'

const meta: Meta<typeof PillButton> = {
  title: 'Controls/PillButton',
  component: PillButton,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: { type: 'inline-radio' }, options: ['solid', 'glass'] },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof PillButton>

export const Solid: Story = {
  args: { variant: 'solid', children: 'Send a note' },
}

export const Glass: Story = {
  args: { variant: 'glass', children: 'Read the blog' },
}

export const WithIcon: Story = {
  args: {
    variant: 'solid',
    children: (
      <>
        <Send className="h-4 w-4" aria-hidden="true" />
        Send message
      </>
    ),
  },
}

export const Disabled: Story = {
  args: { variant: 'solid', children: 'Sending…', disabled: true },
}

export const LinkVariant: StoryObj<typeof PillLink> = {
  render: (args) => <PillLink {...args} />,
  args: {
    variant: 'solid',
    href: '/projects',
    children: (
      <>
        See the work <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </>
    ),
  },
}
