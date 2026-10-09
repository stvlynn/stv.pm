'use client'
// Adapted from beui.dev/components/motion/theme-toggle (circle variant).
// The matching ::view-transition CSS lives in app/styles/globals.css.

import { useReducedMotion } from 'motion/react'
import { useTheme } from 'next-themes'
import type { MouseEvent } from 'react'
import { useIsClient } from '@/shared/lib'

type ViewTransitionDocument = Document & {
  startViewTransition(update: () => void): { finished: Promise<void> }
}

/**
 * Light/dark switch that repaints the page through the View Transition API:
 * the new theme grows as a circle from the point that was clicked. Falls
 * straight to the new theme when motion is reduced or the API is missing.
 */
export function useViewTransitionTheme() {
  const { setTheme, resolvedTheme } = useTheme()
  const reduce = useReducedMotion() ?? false
  const mounted = useIsClient()
  const isDark = mounted && resolvedTheme === 'dark'

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const next = isDark ? 'light' : 'dark'
    if (reduce || !('startViewTransition' in document)) {
      setTheme(next)
      return
    }

    const root = document.documentElement
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    root.style.setProperty('--vt-origin', `${left + width / 2}px ${top + height / 2}px`)
    root.dataset.vt = 'theme'

    const transition = (document as ViewTransitionDocument).startViewTransition(() =>
      setTheme(next)
    )
    void transition.finished.finally(() => {
      delete root.dataset.vt
    })
  }

  return { isDark, mounted, toggle }
}
