'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Gentle fade-up reveal when the element scrolls into view.
 *
 * Deliberately NO blur filter and NO negative viewport margin: blur left the
 * page looking out of focus while hydration/entrance was in flight, and the
 * -80px margin meant sections near the fold never un-hid until a deep scroll.
 * Any visible pixel now triggers the (quick) animation, once.
 */
const baseVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.001 } },
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'p' | 'span'
}) {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? reducedVariants : baseVariants
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Stagger container: wrap a parent in this, give each child <Reveal>,
 * and they cascade in.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  stagger?: number
  as?: 'div' | 'section' | 'ul' | 'ol'
}) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: prefersReduced
            ? { staggerChildren: 0 }
            : { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}
