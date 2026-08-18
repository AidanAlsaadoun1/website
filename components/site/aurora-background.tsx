/**
 * Page backdrop, cream paper with a few very soft pastel washes and a faint
 * dotted texture, like good notebook paper. Pure CSS, zero JS.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft pastel washes */}
      <div
        className="absolute -left-[15%] -top-[10%] h-[55vh] w-[55vw] rounded-full opacity-60 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(255,233,163,0.55), transparent 65%)' }}
      />
      <div
        className="absolute -right-[12%] top-[25%] h-[50vh] w-[45vw] rounded-full opacity-50 blur-[110px]"
        style={{ background: 'radial-gradient(circle, rgba(214,228,255,0.5), transparent 65%)' }}
      />
      <div
        className="absolute bottom-[-15%] left-[25%] h-[50vh] w-[50vw] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(255,217,232,0.45), transparent 65%)' }}
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
