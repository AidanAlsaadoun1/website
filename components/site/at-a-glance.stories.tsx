import type { Meta, StoryObj } from '@storybook/react'
import { AtAGlance } from './at-a-glance'

const meta: Meta<typeof AtAGlance> = {
  title: 'Sections/AtAGlance',
  component: AtAGlance,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
}
export default meta

export const Default: StoryObj<typeof AtAGlance> = {}
