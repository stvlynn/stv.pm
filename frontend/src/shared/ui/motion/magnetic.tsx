'use client'
// Adapted from beui.dev/components/motion/button (Magnetic). Changes: the
// cursor hides while the pointer is inside and a highlight takes its place,
// leaning toward the pointer further than the content does.

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { type PointerEvent, type ReactNode, useRef, useState } from 'react'
import { cn, SPRING_MOUSE, SPRING_PRESS } from '@/shared/lib'

/** How far content and highlight lean toward the pointer, per pixel of offset. */
const CONTENT_PULL = 0.18
const HIGHLIGHT_PULL = 0.42
/** Largest lean, as a share of the control's size, so nothing drifts away. */
const MAX_LEAN = 0.35

/**
 * Wraps a small control (an icon button, a pill link) so it attracts the
 * pointer: on hover the cursor disappears into a heart-pink highlight behind
 * the control, the highlight and content lean toward the pointer, and both
 * spring back on leave. Mouse and trackpad only; touch is untouched.
 */
export function Magnetic({
  children,
  className,
  disabled = false
}: {
  children: ReactNode
  className?: string
  disabled?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const glowX = useMotionValue(0)
  const glowY = useMotionValue(0)
  const contentX = useSpring(offsetX, SPRING_MOUSE)
  const contentY = useSpring(offsetY, SPRING_MOUSE)
  const highlightX = useSpring(glowX, SPRING_MOUSE)
  const highlightY = useSpring(glowY, SPRING_MOUSE)
  const engaged = active && !disabled

  const lean = (event: PointerEvent<HTMLSpanElement>) => {
    const element = ref.current
    if (!element || event.pointerType !== 'mouse' || disabled) return
    const rect = element.getBoundingClientRect()
    const dx = event.clientX - rect.left - rect.width / 2
    const dy = event.clientY - rect.top - rect.height / 2
    const clamp = (value: number, size: number) =>
      Math.max(-size * MAX_LEAN, Math.min(size * MAX_LEAN, value))
    if (!reduce) {
      offsetX.set(clamp(dx * CONTENT_PULL, rect.width))
      offsetY.set(clamp(dy * CONTENT_PULL, rect.height))
      glowX.set(clamp(dx * HIGHLIGHT_PULL, rect.width))
      glowY.set(clamp(dy * HIGHLIGHT_PULL, rect.height))
    }
  }

  const release = () => {
    setActive(false)
    offsetX.set(0)
    offsetY.set(0)
    glowX.set(0)
    glowY.set(0)
  }

  return (
    <span
      ref={ref}
      // Hides the cursor over the control (see globals.css).
      data-magnetic={engaged ? '' : undefined}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'mouse' || disabled) return
        setActive(true)
        lean(event)
      }}
      onPointerMove={lean}
      onPointerLeave={release}
      className={cn('relative inline-flex', className)}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-heart-glow"
        style={{ x: highlightX, y: highlightY }}
        initial={false}
        animate={engaged ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.55 }}
        transition={reduce ? { duration: 0.12 } : SPRING_PRESS}
      />
      <motion.span className="relative inline-flex" style={{ x: contentX, y: contentY }}>
        {children}
      </motion.span>
    </span>
  )
}
