import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from '@/shared/i18n'

/**
 * The homepage route is `[[...locale]]`: no segment is the default locale at
 * `/`, one segment is another locale (`/ja`, `/zh`). Every page is prerendered.
 */
export type LocaleParams = { locale?: string[] }

export function localeStaticParams(): LocaleParams[] {
  return LOCALES.map((locale) => ({ locale: locale === DEFAULT_LOCALE ? [] : [locale] }))
}

/** Only called for prerendered params (`dynamicParams = false`). */
export function localeFromParams({ locale }: LocaleParams): Locale {
  const [segment, ...rest] = locale ?? []
  if (segment === undefined) return DEFAULT_LOCALE
  if (rest.length > 0 || !isLocale(segment) || segment === DEFAULT_LOCALE) {
    throw new Error(`Unknown locale path: /${(locale ?? []).join('/')}`)
  }
  return segment
}
