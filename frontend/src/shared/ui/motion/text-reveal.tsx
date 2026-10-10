'use client'
// Adapted from beui.dev/components/motion/text-animation (TextReveal)

import { motion, type Transition, useReducedMotion } from 'motion/react'
import type { ElementType } from 'react'
import { cn, EASE_OUT, splitTextUnits } from '@/shared/lib'

export interface TextRevealProps {
  text: string | readonly string[]
  as?: ElementType
  className?: string
  /** Seconds between consecutive words. */
  stagger?: number
  delay?: number
  blur?: number
  yOffset?: string | number
}

const SPRING = { stiffness: 140, damping: 26, mass: 1.2 }
/** Longest time, in seconds, between the first and the last unit starting. */
const MAX_SPREAD = 0.7

/**
 * Words (or CJK characters) rise into place with a spring while their blur
 * clears.
 */
export function TextReveal({
  text,
  as: Comp = 'span',
  className,
  stagger = 0.05,
  delay = 0,
  blur = 8,
  yOffset = '30%'
}: TextRevealProps) {
  const reduce = useReducedMotion()
  const lines = typeof text === 'string' ? [text] : text
  const words = lines.map(splitTextUnits)
  // Index of each line's first unit across all lines, so the stagger runs on.
  const firstIndex = words.map((_, i) => words.slice(0, i).reduce((n, line) => n + line.length, 0))
  // Character-by-character CJK lines have many units; keep the whole reveal
  // within the same time a short English line takes.
  const total = words.reduce((n, line) => n + line.length, 0)
  const step = Math.min(stagger, MAX_SPREAD / Math.max(total, 1))

  return (
    <Comp className={cn('block', className)}>
      {lines.map((line, lineIndex) => (
        <span key={`${lineIndex}-${line}`} className="block">
          {(words[lineIndex] ?? []).map((word, wordIndex) => {
            const d = delay + ((firstIndex[lineIndex] ?? 0) + wordIndex) * step
            const transition: Transition = reduce
              ? { opacity: { duration: 0.25, ease: EASE_OUT, delay: d * 0.3 } }
              : {
                  y: { type: 'spring', ...SPRING, delay: d },
                  opacity: { duration: 0.6, ease: EASE_OUT, delay: d },
                  filter: { duration: 0.8, ease: EASE_OUT, delay: d }
                }
            return (
              <motion.span
                key={`${wordIndex}-${word}`}
                initial={
                  reduce ? { opacity: 0 } : { y: yOffset, opacity: 0, filter: `blur(${blur}px)` }
                }
                animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={transition}
                // `whitespace-pre` keeps each unit's trailing space inside its
                // inline-block, otherwise the words run together.
                className="inline-block whitespace-pre will-change-transform"
              >
                {word}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Comp>
  )
}
