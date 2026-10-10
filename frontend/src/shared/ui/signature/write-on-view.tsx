'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'

/**
 * Holds the signature's CSS animation until most of it is on screen, so it
 * writes itself where the reader is looking rather than off-screen at load.
 */
export function WriteOnView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'waiting' | 'writing'>('waiting')

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setState('writing')
        observer.disconnect()
      },
      { threshold: 0.6 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-writing={state} className={className}>
      {/* Without JavaScript nothing would release the hold; write at once. */}
      <noscript>
        <style>{`[data-writing='waiting'] * { animation-play-state: running !important; }`}</style>
      </noscript>
      {children}
    </div>
  )
}
