import { site } from '@/shared/config'

const formatter = new Intl.DateTimeFormat(site.locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: site.timeZone
})

/** "Sep 21, 2026" in the owner's time zone, from an ISO timestamp. */
export function formatPostDate(iso: string): string {
  return formatter.format(new Date(iso))
}
