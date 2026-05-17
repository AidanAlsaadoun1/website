import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const runtime = 'edge'
export const alt = 'Aidan — Founding Engineer'
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
          background:
            'radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.06), transparent 60%), #08090c',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#c7e4ff',
            fontFamily: 'monospace',
            fontSize: 28,
          }}
        >
          <span>$</span>
          <span>whoami</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 110, lineHeight: 1, letterSpacing: '-0.04em', fontWeight: 700 }}>
            {siteConfig.name}.
          </div>
          <div style={{ fontSize: 36, color: '#a1a1aa' }}>
            {siteConfig.role} at {siteConfig.company.name}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#a1a1aa',
            fontSize: 22,
            fontFamily: 'monospace',
          }}
        >
          <span>dev-aidan.com</span>
          <span>full-stack · vulnerability research</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
