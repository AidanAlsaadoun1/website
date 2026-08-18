/**
 * 8-bit pixel avatar, drawn inline as SVG so it scales sharp.
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
  1: 'rgb(74 52 36)',    // hair, warm brown
  2: 'rgb(245 215 184)', // skin
  3: 'rgb(47 92 245)',   // hoodie, cobalt pop
  4: 'rgb(35 68 190)',   // hoodie shadow
  5: 'rgb(28 26 23)',    // glasses, ink
  6: 'rgb(255 255 255)', // glasses glint
  7: 'rgb(28 26 23)',    // outline, ink
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
        aria-label="Pixel-art avatar: brown hair, glasses, cobalt hoodie"
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
