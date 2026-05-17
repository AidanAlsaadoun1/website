import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Breadcrumbs>

export const OneLevelDeep: Story = {
  args: {
    items: [
      { href: '/', label: 'Home' },
      { label: 'Certifications' },
    ],
  },
}

export const TwoLevelsDeep: Story = {
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/blog', label: 'Blog' },
      { label: 'Masking Shellcode with IPv4' },
    ],
  },
}

export const NoBackAffordance: Story = {
  args: {
    items: [{ label: 'Top level' }],
  },
}
