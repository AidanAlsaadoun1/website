/**
 * Page backdrop: cream paper with soft pastel washes and a faint dotted
 * texture, like good notebook paper.
 *
 * Deliberately NO filter: blur() here. The washes are plain radial gradients
 * that fade out on their own; CSS blur filters on huge elements are a known
 * memory/crash hazard on iOS Safari. Pure CSS, zero JS, zero filters.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft pastel washes (plain gradients, no filters) */}
      <div
        className="absolute -left-[20%] -top-[15%] h-[65vh] w-[70vw] rounded-full opacity-70"
        style={{ background: 'radial-gradient(closest-side, rgba(255,233,163,0.5), transparent)' }}
      />
      <div
        className="absolute -right-[18%] top-[20%] h-[60vh] w-[60vw] rounded-full opacity-60"
        style={{ background: 'radial-gradient(closest-side, rgba(214,228,255,0.45), transparent)' }}
      />
      <div
        className="absolute bottom-[-20%] left-[20%] h-[60vh] w-[65vw] rounded-full opacity-50"
        style={{ background: 'radial-gradient(closest-side, rgba(255,217,232,0.4), transparent)' }}
      />

      {/* Faint dot grid, fading toward the bottom */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(rgba(28,26,23,0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
        }}
      />
    </div>
  )
}
