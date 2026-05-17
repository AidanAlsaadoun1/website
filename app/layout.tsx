import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { AuroraBackground } from '@/components/site/aurora-background'
import { Nav } from '@/components/site/nav'
import { Footer } from '@/components/site/footer'
import { siteConfig, siteUrl } from '@/config/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.seo.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.fullName, url: siteUrl }],
  creator: siteConfig.fullName,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0d1a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable, 'dark')}
      suppressHydrationWarning
    >
      <body className="relative overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-elevated focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <AuroraBackground />
        <Nav />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
