import type { CompanyId } from '@/shared/config'
import { cn } from '@/shared/lib'

// Marks from @lobehub/icons-static-svg (MIT), drawn on a 24×24 grid.
const MARKS: Record<CompanyId, string[]> = {
  tencent: ['M9.976 1L24 9.8l-10.587.015L10.723 23H5.489L8.18 9.8H3.244L1 5.4h8.077L9.976 1z'],
  dify: [
    'M7.043 6.487c1.635 0 2.241-1.003 2.241-2.243S8.681 2 7.044 2C5.405 2 4.801 3.003 4.801 4.244c0 1.24.604 2.243 2.241 2.243z',
    'M14.883 6.97v1.443h-3.679v3.203h3.68v8.012H8.801V8.41h-8v3.203h4.48v8.012H0v3.203h24v-3.203h-5.6v-8.012H24V8.41h-5.6V5.206H24V2.003h-4.161a4.97 4.97 0 00-4.961 4.967h.005z'
  ]
}

const TILE: Record<CompanyId, string> = {
  tencent: 'bg-tencent',
  dify: 'bg-dify'
}

/**
 * Square company logo: the white mark on the company's brand colour, cut as
 * an app-icon tile with a hairline inner edge so it holds on both themes.
 */
export function CompanyLogo({ id, className }: { id: CompanyId; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-[22%] text-white',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)]',
        TILE[id],
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="size-[55%] fill-current" focusable="false">
        {MARKS[id].map((d) => (
          <path key={d} d={d} fillRule="evenodd" />
        ))}
      </svg>
    </span>
  )
}
