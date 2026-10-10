import { siGithub, siTelegram, siUnsplash, siX, type SimpleIcon } from 'simple-icons'
import type { SocialId } from '@/shared/config'
import { cn } from '@/shared/lib'

const ICONS: Record<SocialId, SimpleIcon> = {
  x: siX,
  telegram: siTelegram,
  github: siGithub,
  unsplash: siUnsplash
}

/** Monochrome brand glyph (Simple Icons, CC0) drawn in `currentColor`. */
export function SocialIcon({ id, className }: { id: SocialId; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn('size-4 shrink-0 fill-current', className)}
    >
      <path d={ICONS[id].path} />
    </svg>
  )
}
