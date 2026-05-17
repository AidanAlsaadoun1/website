import type { Meta, StoryObj } from '@storybook/react'
import { TerminalPrompt } from './terminal-prompt'

const meta: Meta<typeof TerminalPrompt> = {
  title: 'Display/TerminalPrompt',
  component: TerminalPrompt,
  parameters: { layout: 'centered' },
  argTypes: {
    speed: { control: { type: 'range', min: 8, max: 80, step: 4 } },
    linePause: { control: { type: 'range', min: 0, max: 800, step: 40 } },
  },
}
export default meta

type Story = StoryObj<typeof TerminalPrompt>

export const Default: Story = {
  args: {
    speed: 28,
    linePause: 280,
    lines: [
      '$ whoami',
      'aidan — founding engineer @ sprintworks',
      '$ cat interests.txt',
      'full-stack engineering · vulnerability research · the occasional CTF',
    ],
    className: 'w-[480px]',
  },
}

export const Fast: Story = {
  args: {
    ...Default.args,
    speed: 12,
    linePause: 100,
  },
}
