import { site } from '@/shared/config'
import { LOCALE_META, type Locale } from '@/shared/i18n'

const formatters = new Map<Locale, Intl.DateTimeFormat>()

/**
 * A post date in the reader's language and the owner's time zone, from an
 * ISO timestamp: "Sep 21, 2026", "2026年9月21日".
 */
export function formatPostDate(iso: string, locale: Locale): string {
  let formatter = formatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(LOCALE_META[locale].intl, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: site.timeZone
    })
    formatters.set(locale, formatter)
  }
  return formatter.format(new Date(iso))
}
