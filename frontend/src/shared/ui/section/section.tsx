import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

/**
 * A titled block of the homepage. The heading is quiet on purpose: content,
 * not labels, carries the page. `action` sits opposite the title.
 */
export function Section({
  id,
  title,
  action,
  className,
  children
}: {
  id: string
  title: string
  action?: ReactNode
  className?: string
  children: ReactNode
}) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-20', className)}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id={headingId} className="text-sm font-medium text-muted-foreground">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
