import type { Meta, StoryObj } from '@storybook/react'
import { mdxComponents } from './mdx-components'

const meta: Meta = {
  title: 'Content/MDX components',
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj

export const VulnCalloutAll: Story = {
  render: () => {
    const VulnCallout = mdxComponents.VulnCallout
    return (
      <div className="max-w-2xl space-y-4">
        {(['info', 'low', 'medium', 'high', 'critical'] as const).map((severity) => (
          <VulnCallout key={severity} severity={severity} title={`${severity} severity`}>
            <p>Sample body for the {severity} callout.</p>
          </VulnCallout>
        ))}
      </div>
    )
  },
}

export const CVELinks: Story = {
  render: () => {
    const CVELink = mdxComponents.CVELink
    return (
      <p className="max-w-2xl">
        Posts can cite a CVE inline like <CVELink id="CVE-2024-12345" />, which links out to NVD.
      </p>
    )
  },
}

export const AnchorBehaviour: Story = {
  render: () => {
    const A = mdxComponents.a
    return (
      <div className="space-y-2">
        <p>
          Internal link: <A href="/blog">go to blog</A>
        </p>
        <p>
          External link: <A href="https://nvd.nist.gov/">NVD</A>
        </p>
      </div>
    )
  },
}
