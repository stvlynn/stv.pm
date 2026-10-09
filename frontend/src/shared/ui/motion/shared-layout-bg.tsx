'use client'
// Adapted from beui.dev/components/motion/shared-layout-bg

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
  type Variants
} from 'motion/react'
import {
  Children,
  cloneElement,
  type FocusEvent,
  type HTMLAttributes,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useId,
  useState
} from 'react'
import { cn, SPRING_LAYOUT } from '@/shared/lib'

export interface SharedLayoutBgProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: ReactNode
  /** Semantic container used for the children. */
  as?: 'div' | 'ul'
  /** Class applied to the moving pill. Defaults to a subtle foreground tint. */
  pillClassName?: string
  /** Horizontal bleed of the pill beyond each row (px). */
  inset?: number
}

const variants: Variants = {
  initial: { opacity: 0, filter: 'blur(6px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: (isActive: boolean) => (!isActive ? { opacity: 0, filter: 'blur(6px)' } : {})
}

const reducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: (isActive: boolean) => (!isActive ? { opacity: 0 } : {})
}

/**
 * A pill that glides between hovered (or focused) rows via shared layout,
 * blurring in when the pointer enters the list and out when it leaves.
 */
export function SharedLayoutBg({
  children,
  as = 'div',
  className,
  onMouseLeave,
  onBlur,
  pillClassName,
  inset = 12,
  ...props
}: SharedLayoutBgProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const uid = useId()
  const reduce = useReducedMotion()

  const renderedChildren = Children.toArray(children)
    .filter(isValidElement)
    .map((child, index) => {
      const el = child as ReactElement<{
        className?: string
        onMouseEnter?: () => void
        onFocus?: () => void
        children?: ReactNode
      }>
      const childKey = el.key ? String(el.key) : `item-${index}`
      const activate = () => setActiveId(childKey)
      return cloneElement(
        el,
        {
          key: childKey,
          className: cn('relative', el.props.className),
          onMouseEnter: () => {
            el.props.onMouseEnter?.()
            activate()
          },
          onFocus: () => {
            el.props.onFocus?.()
            activate()
          }
        },
        <>
          <AnimatePresence custom={activeId !== null}>
            {activeId !== null ? (
              <motion.div
                variants={reduce ? reducedVariants : variants}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={activeId !== null}
                className="pointer-events-none absolute inset-y-0"
                style={{ left: -inset, right: -inset }}
              >
                {activeId === childKey ? (
                  <motion.div
                    layoutId={`shared-bg-${uid}`}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                    className={cn(
                      'pointer-events-none h-full w-full rounded-xl bg-accent',
                      pillClassName
                    )}
                  />
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div className="relative z-10">{el.props.children}</div>
        </>
      )
    })

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    setActiveId(null)
    onMouseLeave?.(event)
  }

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveId(null)
    onBlur?.(event)
  }

  // layoutRoot scopes the pill's layout projection to this list, so scrolled
  // ancestors can't smear scroll offsets into its movement.
  return as === 'ul' ? (
    <motion.ul
      {...(props as HTMLMotionProps<'ul'>)}
      layoutRoot
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      className={cn('flex w-full flex-col', className)}
    >
      {renderedChildren}
    </motion.ul>
  ) : (
    <motion.div
      {...(props as HTMLMotionProps<'div'>)}
      layoutRoot
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      className={cn('flex w-full flex-col', className)}
    >
      {renderedChildren}
    </motion.div>
  )
}
