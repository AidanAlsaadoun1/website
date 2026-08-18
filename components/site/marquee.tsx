/**
 * Full-bleed ticker band. Pure CSS animation (pauses for reduced-motion via
 * the global media query, which leaves a static row, still readable).
 */
const DEFAULT_ITEMS = [
  'front end',
  'back end',
  'TypeScript',
  'Java & Go services',
  'APIs',
  'databases',
  'infra as code',
  'design systems',
  'CI/CD',
  'threat models',
  'the occasional 2am deploy',
]

export function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center font-mono text-sm uppercase tracking-[0.16em]"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-5 py-3">{item}</span>
          <span aria-hidden="true" className="text-accent">
            ✦
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className="overflow-hidden border-y-2 border-foreground bg-pop-butter text-foreground"
      aria-label="Things I work on"
    >
      <div className="flex w-max animate-marquee motion-reduce:w-full motion-reduce:animate-none">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
