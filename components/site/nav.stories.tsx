import type { Meta, StoryObj } from '@storybook/react'
import { Nav } from './nav'

const meta: Meta<typeof Nav> = {
  title: 'Layout/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true, navigation: { pathname: '/' } },
  },
}
export default meta

type Story = StoryObj<typeof Nav>

export const HomeActive: Story = {
  parameters: { nextjs: { navigation: { pathname: '/' } } },
}

export const BlogActive: Story = {
  parameters: { nextjs: { navigation: { pathname: '/blog' } } },
}

export const ContactActive: Story = {
  parameters: { nextjs: { navigation: { pathname: '/contact' } } },
}
