import type { Meta, StoryObj } from '@storybook/react'
import { projects } from '@/config/projects'
import { SystemDiagram } from './system-diagram'

const meta: Meta<typeof SystemDiagram> = {
  title: 'Sections/SystemDiagram',
  component: SystemDiagram,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
}
export default meta

const diagram = projects[0]!.diagram!

export const SettlementEngine: StoryObj<typeof SystemDiagram> = {
  args: { title: diagram.title, nodes: diagram.nodes, footnote: diagram.footnote },
}
