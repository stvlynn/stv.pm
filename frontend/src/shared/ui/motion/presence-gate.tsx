'use client'
// From beui.dev (lib/presence-gate)

import { useIsPresent } from 'motion/react'
import type { ReactNode } from 'react'

export interface PresenceGateRenderProps {
  /** False from the render that starts the exit animation onward. */
  isPresent: boolean
  /**
   * Spread onto every layer that takes pointer events while the overlay is
   * open, so an exiting overlay stops catching pointers and focus at once.
   */
  gate: {
    inert: boolean
    style: { pointerEvents: 'auto' | 'none' }
  }
}

/** Reads presence one component below `AnimatePresence` and hands it down. */
export function PresenceGate({
  children
}: {
  children: (props: PresenceGateRenderProps) => ReactNode
}) {
  const isPresent = useIsPresent()
  return children({
    isPresent,
    gate: { inert: !isPresent, style: { pointerEvents: isPresent ? 'auto' : 'none' } }
  })
}
