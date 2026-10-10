import { site } from '@/shared/config'
import { getCopy, type Locale } from '@/shared/i18n'
import { cn } from '@/shared/lib'

const TONE = {
  /** On the page background. */
  page: 'text-subtle-foreground [&_a:hover]:text-foreground',
  /** On the pale band of light at the bottom of the Pale Blue Dot. */
  photo: 'text-on-photo-glow [&_a:hover]:text-on-photo-glow-strong'
} as const

export function SiteFooter({
  year,
  locale,
  tone = 'page'
}: {
  year: number
  locale: Locale
  tone?: keyof typeof TONE
}) {
  const copy = getCopy(locale)
  return (
    <footer
      className={cn(
        'mx-auto flex w-full max-w-2xl items-center justify-between px-5 pt-3 pb-8 text-sm sm:px-6',
        TONE[tone]
      )}
    >
      <p>{copy.footer.copyright(year)}</p>
      <a href={site.blogFeedUrl} className="transition-colors duration-200">
        {copy.footer.rss}
      </a>
    </footer>
  )
}
