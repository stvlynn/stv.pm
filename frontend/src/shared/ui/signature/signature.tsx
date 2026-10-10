import { cn } from '@/shared/lib'
import {
  SIGNATURE_FIRST,
  SIGNATURE_HEART,
  SIGNATURE_LAST,
  SIGNATURE_LINES,
  SIGNATURE_VIEWBOX
} from './paths'
import styles from './signature.module.css'

const { width, height } = SIGNATURE_VIEWBOX
/** Each mask is wider than its line so the feathered edge fully clears it. */
const FEATHER_SPAN = 1.25

function maskRect(line: keyof typeof SIGNATURE_LINES) {
  const { x, width: lineWidth } = SIGNATURE_LINES[line]
  return { x, y: 0, width: lineWidth * FEATHER_SPAN, height }
}

/**
 * The handwritten "Steven Lynn" signature. Ink follows `currentColor`; the
 * heart keeps its own colour. Decorative: pair it with a text heading.
 */
export function Signature({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={cn(styles.root, 'block h-auto overflow-visible', className)}
    >
      <defs>
        <linearGradient id="signature-feather" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0.8" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="signature-mask-first" maskUnits="userSpaceOnUse">
          <rect
            className={cn(styles.wipe, styles.first)}
            {...maskRect('first')}
            fill="url(#signature-feather)"
          />
        </mask>
        <mask id="signature-mask-last" maskUnits="userSpaceOnUse">
          <rect
            className={cn(styles.wipe, styles.last)}
            {...maskRect('last')}
            fill="url(#signature-feather)"
          />
        </mask>
      </defs>
      <path
        d={SIGNATURE_FIRST}
        fill="currentColor"
        fillRule="evenodd"
        mask="url(#signature-mask-first)"
      />
      <path
        d={SIGNATURE_LAST}
        fill="currentColor"
        fillRule="evenodd"
        mask="url(#signature-mask-last)"
      />
      <path d={SIGNATURE_HEART} className={cn(styles.heart, 'fill-heart')} />
    </svg>
  )
}
