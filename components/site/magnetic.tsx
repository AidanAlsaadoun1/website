'use client'

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * "Magnetic" button wrapper, the child leans subtly toward the cursor while hovered.
 * Range of motion is small (max ~10px). Disabled under reduced motion.
 */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode
  /** 0..1, how strongly the element follows the cursor */
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18 })
  const sy = useSpring(y, { stiffness: 200, damping: 18 })

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }
  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={prefersReduced ? undefined : { x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
