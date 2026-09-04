import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const alt = `${siteConfig.fullName} · ${siteConfig.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#faf7f0',
          backgroundImage:
            'radial-gradient(60% 80% at 15% 0%, rgba(255,233,163,0.7), transparent 60%), radial-gradient(60% 80% at 90% 100%, rgba(214,228,255,0.7), transparent 60%)',
          color: '#1c1a17',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#6e685e',
            fontFamily: 'monospace',
            fontSize: 24,
            letterSpacing: 3,
            textTransform: 'uppercase',
            borderBottom: '2px solid #1c1a17',
            paddingBottom: 28,
          }}
        >
          <span>
            {siteConfig.role} · {siteConfig.company.name}
          </span>
          <span>{siteConfig.location}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 40, fontFamily: 'sans-serif', fontWeight: 600, letterSpacing: '-0.01em' }}>
            {siteConfig.fullName}
          </div>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: '-0.03em', display: 'flex', flexWrap: 'wrap' }}>
            <span>{siteConfig.headline.lead}&nbsp;</span>
            <span style={{ color: '#c2410c', fontStyle: 'italic' }}>{siteConfig.headline.accent}</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#6e685e',
            fontSize: 22,
            fontFamily: 'monospace',
            borderTop: '2px solid #1c1a17',
            paddingTop: 28,
          }}
        >
          <span>dev-aidan.com</span>
          <span>{siteConfig.heroStack.join(' · ')}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
