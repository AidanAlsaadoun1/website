/**
 * 8-bit pixel avatar — drawn inline as SVG so it scales sharp.
 * Neutral palette: charcoal hoodie, ice-blue hair pop, no clashing colors.
 *
 * Swap with your own art later: same 16x16 grid, or replace with <Image />.
 */
type Props = {
  size?: number
  className?: string
  animate?: boolean
}

// 16x16. Legend: 0=transparent, 1=hair, 2=skin, 3=hoodie, 4=hoodie-shadow,
// 5=glasses, 6=eye-glow, 7=outline.
// prettier-ignore
const PIXELS: number[][] = [
  [0,0,0,0,0,7,7,7,7,7,7,0,0,0,0,0],
  [0,0,0,0,7,1,1,1,1,1,1,7,0,0,0,0],
  [0,0,0,7,1,1,1,1,1,1,1,1,7,0,0,0],
  [0,0,7,1,1,1,1,1,1,1,1,1,1,7,0,0],
  [0,0,7,2,2,2,2,2,2,2,2,2,2,7,0,0],
  [0,0,7,2,5,5,2,2,2,2,5,5,2,7,0,0],
  [0,0,7,2,5,5,2,2,2,2,5,5,2,7,0,0],
  [0,0,7,2,2,2,2,6,6,2,2,2,2,7,0,0],
  [0,0,0,7,2,2,2,2,2,2,2,2,7,0,0,0],
  [0,0,7,3,3,3,3,3,3,3,3,3,3,7,0,0],
  [0,7,3,3,3,3,3,3,3,3,3,3,3,3,7,0],
  [7,3,3,4,3,3,3,3,3,3,3,3,4,3,3,7],
  [7,3,3,4,3,3,3,3,3,3,3,3,4,3,3,7],
  [7,3,3,4,3,3,3,3,3,3,3,3,4,3,3,7],
  [7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7],
  [0,7,7,7,0,0,0,0,0,0,0,0,7,7,7,0],
]

const PALETTE: Record<number, string> = {
  1: 'rgb(199 228 255)', // hair — ice (matches accent)
  2: 'rgb(245 215 184)', // skin
  3: 'rgb(58 62 74)',    // hoodie — neutral charcoal
  4: 'rgb(42 46 56)',    // hoodie shadow
  5: 'rgb(20 20 26)',    // glasses
  6: 'rgb(199 228 255)', // eye glow — same icy accent
  7: 'rgb(8 9 12)',      // outline matches bg
}

export function PixelAvatar({ size = 192, className, animate = true }: Props) {
  return (
    <div
      className={className}
      style={{ width: size, height: size, imageRendering: 'pixelated' }}
    >
      <svg
        viewBox="0 0 16 16"
        width={size}
        height={size}
        shapeRendering="crispEdges"
        className={animate ? 'animate-bob' : undefined}
        role="img"
        aria-label="Pixel-art avatar: ice-blue hair, glasses, charcoal hoodie"
        style={{
          filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.5))',
        }}
      >
        {PIXELS.map((row, y) =>
          row.map((c, x) =>
            c === 0 ? null : (
              <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[c]} />
            ),
          ),
        )}
      </svg>
      <span className="sr-only">Pixel-art avatar</span>
    </div>
  )
}
