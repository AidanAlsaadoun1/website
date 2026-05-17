import type { Meta, StoryObj } from '@storybook/react'
import { TagFilter } from './tag-filter'

const meta: Meta<typeof TagFilter> = {
  title: 'Navigation/TagFilter',
  component: TagFilter,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof TagFilter>

const blogCategories = [
  { label: 'All', value: undefined as string | undefined, count: 5 },
  { label: 'Engineering', value: 'engineering', count: 2 },
  { label: 'Security', value: 'security', count: 2 },
  { label: 'Info', value: 'info', count: 1 },
]

export const Default: Story = {
  args: {
    current: undefined,
    baseHref: '/blog',
    paramName: 'category',
    options: blogCategories,
  },
}

export const ActiveSecurity: Story = {
  args: {
    current: 'security',
    baseHref: '/blog',
    paramName: 'category',
    options: blogCategories,
  },
}

export const ActiveEngineering: Story = {
  args: {
    current: 'engineering',
    baseHref: '/blog',
    paramName: 'category',
    options: blogCategories,
  },
}
