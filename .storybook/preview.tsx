import type { Preview } from '@storybook/react'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { AuroraBackground } from '../components/site/aurora-background'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dev-aidan',
      values: [
        { name: 'dev-aidan', value: '#faf7f0' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    layout: 'centered',
    a11y: {
      // axe-core options
      element: '#storybook-root',
      config: { rules: [] },
      options: {},
      manual: false,
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story, context) => {
      const withAurora = context.parameters.withAurora ?? false
      return (
        <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
          <div className="relative min-h-[40vh] bg-base font-sans text-foreground">
            {withAurora && <AuroraBackground />}
            <div className="relative z-10 p-8">
              <Story />
            </div>
          </div>
        </div>
      )
    },
  ],
}

export default preview
