/**
 * Background: very subtle floating glass orbs over a near-black charcoal canvas.
 * Apple-ish vibe — surfaces feel like real glass because there's *something*
 * behind them to refract, but the something is neutral, not loud.
 *
 * Pure CSS, GPU-composited, zero JS.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft neutral orbs — keep them desaturated; they only exist to give glass something to pick up */}
      <div
        className="absolute -left-[20%] top-[10%] h-[55vh] w-[55vw] rounded-full opacity-60 blur-[120px] animate-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)',
        }}
      />
      <div
        className="absolute right-[-15%] top-[40%] h-[60vh] w-[55vw] rounded-full opacity-50 blur-[120px] animate-float-2"
        style={{
          background:
            'radial-gradient(circle, rgba(199,228,255,0.05) 0%, rgba(199,228,255,0) 60%)',
        }}
      />
      <div
        className="absolute bottom-[-20%] left-[30%] h-[60vh] w-[60vw] rounded-full opacity-40 blur-[140px] animate-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(244,200,220,0.04) 0%, rgba(244,200,220,0) 60%)',
          animationDelay: '-8s',
        }}
      />

      {/* Faint dot grid, like an iPad lock screen */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)',
        }}
      />

      {/* Film grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035]">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1, 0 0 0 0 1, 0 0 0 0 1, 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
