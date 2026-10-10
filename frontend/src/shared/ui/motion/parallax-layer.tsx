'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { type ReactNode, useRef } from 'react'
import { cn } from '@/shared/lib'

/**
 * Fills its positioned parent and drifts its content against the scroll,
 * slower than the page, while the parent crosses the viewport. The content is
 * scaled up just enough that the drift never uncovers an edge.
 */
export function ParallaxLayer({
  children,
  className,
  drift = 6
}: {
  children: ReactNode
  className?: string
  /** Total travel in percent of the layer's height. */
  drift?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-drift / 2}%`, `${drift / 2}%`])

  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, scale: 1 + drift / 100 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
