'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionStyle,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * 3D mouse-tracked tilt wrapper. Light, ~6° max tilt, Apple-style "soft" parallax,
 * not the dramatic glass-card-trick we've all seen. Adds a moving specular highlight
 * (the `<div>` after children) that follows the pointer.
 *
 * Disabled when `prefers-reduced-motion: reduce`.
 */
export function Tilt({
  children,
  className,
  maxTilt = 6,
  glare = true,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 250, damping: 25, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 250, damping: 25, mass: 0.6 })

  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt])
  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]: string[]) =>
      `radial-gradient(180px circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 65%)`,
  )

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  const style: MotionStyle = prefersReduced
    ? {}
    : { rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }

  const showGlare = glare && !prefersReduced

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
      {showGlare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  )
}
