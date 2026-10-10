/** Locales the site is published in. English is the default, served at `/`. */
export const LOCALES = ['en', 'ja', 'zh'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

/**
 * Per-locale settings. `htmlLang` picks the right CJK glyphs and fonts,
 * `label` is the short switcher text and `name` its accessible name, both in
 * the locale's own language so a reader can always find theirs.
 */
export const LOCALE_META = {
  en: { htmlLang: 'en', label: 'EN', name: 'English', intl: 'en-US', og: 'en_US' },
  ja: { htmlLang: 'ja', label: 'JA', name: '日本語', intl: 'ja-JP', og: 'ja_JP' },
  zh: { htmlLang: 'zh-CN', label: 'ZH', name: '简体中文', intl: 'zh-CN', og: 'zh_CN' }
} as const satisfies Record<
  Locale,
  { htmlLang: string; label: string; name: string; intl: string; og: string }
>

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** Path of the homepage in a locale: `/` for the default, `/ja`, `/zh`. */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}`
}
