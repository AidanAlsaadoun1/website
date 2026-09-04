import type { Meta, StoryObj } from '@storybook/react'
import { projects } from '@/config/projects'
import { siteConfig } from '@/config/site'
import { TerminalBlock } from './terminal-block'

const meta: Meta<typeof TerminalBlock> = {
  title: 'Sections/TerminalBlock',
  component: TerminalBlock,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
}
export default meta

export const Whoami: StoryObj<typeof TerminalBlock> = {
  args: { lines: [...siteConfig.terminal], title: 'aidan@dev-aidan.com', wrap: true },
}

export const TableOutput: StoryObj<typeof TerminalBlock> = {
  args: { lines: projects[1]!.terminal!.lines, title: 'ukdevjobs' },
}
