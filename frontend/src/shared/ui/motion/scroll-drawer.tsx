'use client'

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { type ReactNode, useRef } from 'react'
import { cn } from '@/shared/lib'

/** Scroll progress over which the drawer goes from closed to fully open. */
const OPENING = [0.15, 0.75]

/**
 * A full-screen panel that opens with the scroll, like a drawer pulled up
 * from the bottom of the page: it rises as a rounded, inset sheet, widens to
 * the edges and pins while its background settles from a slight zoom. The
 * page then holds it open for a moment before the document ends.
 */
export function ScrollDrawer({
  background,
  children,
  className
}: {
  /** Fills the panel behind the content and settles from a 1.12× zoom. */
  background: ReactNode
  children: ReactNode
  className?: string
}) {
  const track = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: track, offset: ['start end', 'end end'] })

  const inset = useTransform(scrollYProgress, OPENING, [22, 0])
  const side = useTransform(scrollYProgress, OPENING, [4, 0])
  const radius = useTransform(scrollYProgress, OPENING, [28, 0])
  const scale = useTransform(scrollYProgress, OPENING, [1.12, 1])
  const clipPath = useMotionTemplate`inset(${inset}% ${side}% 0% ${side}% round ${radius}px ${radius}px 0px 0px)`

  return (
    <div ref={track} className={cn('relative h-[175svh] motion-reduce:h-svh', className)}>
      {/* Without JavaScript nothing drives the drawer; show it open. */}
      <noscript>
        <style>{`[data-drawer-panel] { clip-path: none !important; }`}</style>
      </noscript>
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div
          data-drawer-panel=""
          className="absolute inset-0 overflow-hidden bg-photo-night"
          style={reduce ? undefined : { clipPath }}
        >
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
            {background}
          </motion.div>
          <div className="relative h-full">{children}</div>
        </motion.div>
      </div>
    </div>
  )
}
