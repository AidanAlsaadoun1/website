import type { Meta, StoryObj } from '@storybook/react'
import { siteConfig } from '@/config/site'
import { ExperienceTimeline } from './experience'

const meta: Meta<typeof ExperienceTimeline> = {
  title: 'Sections/ExperienceTimeline',
  component: ExperienceTimeline,
  parameters: { layout: 'padded' },
}
export default meta

export const Default: StoryObj<typeof ExperienceTimeline> = {
  args: { items: siteConfig.experience },
}
