import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'

/** Small muted text link with an arrow that nudges toward its destination. */
export function QuietLink({
  href,
  children,
  newTab = false,
  className
}: {
  href: string
  children: ReactNode
  /** Open in a new tab, for pages people return from. */
  newTab?: boolean
  className?: string
}) {
  return (
    <a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener' : undefined}
      className={cn(
        'group inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground',
        className
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px"
      />
    </a>
  )
}
