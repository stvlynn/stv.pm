'use client'

import { Moon, Sun } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { getCopy, type Locale } from '@/shared/i18n'
import { cn, SPRING_PRESS } from '@/shared/lib'
import { IconSwap, Magnetic, useViewTransitionTheme } from '@/shared/ui/motion'

/** Switches light/dark; the new theme spreads out from the button. */
export function ThemeToggle({ locale, className }: { locale: Locale; className?: string }) {
  const copy = getCopy(locale)
  const { isDark, mounted, toggle } = useViewTransitionTheme()
  const reduce = useReducedMotion()

  return (
    <Magnetic className={className}>
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={isDark ? copy.theme.toLight : copy.theme.toDark}
        whileTap={reduce ? undefined : { scale: 0.92 }}
        transition={SPRING_PRESS}
        className={cn(
          'grid size-9 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground'
        )}
      >
        {mounted ? (
          <IconSwap value={isDark ? 'dark' : 'light'} className="size-4">
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </IconSwap>
        ) : (
          <span className="size-4" aria-hidden="true" />
        )}
      </motion.button>
    </Magnetic>
  )
}
