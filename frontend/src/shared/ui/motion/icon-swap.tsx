'use client'
// Adapted from beui.dev/components/motion/action-swap (ActionSwapIcon)

import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

const BLUR_TRANSITION = { duration: 0.2, ease: 'easeInOut' } as const

const VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.25, filter: 'blur(8px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: BLUR_TRANSITION },
  exit: { opacity: 0, scale: 0.25, filter: 'blur(8px)', transition: BLUR_TRANSITION }
}

/** Swaps one icon for another with a blur-scale crossfade keyed by `value`. */
export function IconSwap({
  value,
  children,
  className
}: {
  value: string
  children: ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <span className={cn('relative inline-grid shrink-0 place-items-center', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          aria-hidden
          variants={VARIANTS}
          initial={reduce ? false : 'initial'}
          animate={reduce ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : 'animate'}
          exit={reduce ? undefined : 'exit'}
          className="col-start-1 row-start-1 inline-flex items-center justify-center"
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
