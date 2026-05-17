'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.001 } },
}

/**
 * Fade-up + slight blur reveal triggered when the element scrolls into view.
 * Single-shot (doesn't re-trigger on scroll-out/in).
 */
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
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Stagger container — wrap a parent in this, give each child <Reveal>,
 * and they cascade in.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
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
      viewport={{ once: true, margin: '-80px' }}
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
