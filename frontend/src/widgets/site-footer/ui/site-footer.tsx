import { site } from '@/shared/config'
import { copy } from '@/shared/i18n'

export function SiteFooter({ year }: { year: number }) {
  return (
    <footer className="mx-auto flex w-full max-w-2xl items-center justify-between px-5 pt-24 pb-10 text-sm text-subtle-foreground sm:px-6">
      <p>{copy.footer.copyright(year)}</p>
      <a href={site.blogFeedUrl} className="transition-colors duration-200 hover:text-foreground">
        {copy.footer.rss}
      </a>
    </footer>
  )
}
