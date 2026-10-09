'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/** False during SSR and hydration, true afterwards; no effect-driven re-render. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
