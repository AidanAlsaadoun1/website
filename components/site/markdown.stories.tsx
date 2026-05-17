import type { Meta, StoryObj } from '@storybook/react'
import { Markdown } from './markdown'

const meta: Meta<typeof Markdown> = {
  title: 'Content/Markdown',
  component: Markdown,
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Markdown>

const sample = `
## Hello, MDX

This is regular **markdown**. Inline \`code\` and code blocks both work:

\`\`\`ts
const x = 1
\`\`\`

> Blockquotes too.

Lists:

- one
- two
- three
`

export const Default: Story = {
  render: () => (
    <div className="prose prose-invert max-w-2xl">
      <Markdown source={sample} />
    </div>
  ),
}
