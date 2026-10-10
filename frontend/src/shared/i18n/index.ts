import { en } from './en'
import { ja } from './ja'
import type { Locale } from './locales'
import type { Dictionary } from './types'
import { zh } from './zh'

const DICTIONARIES: Record<Locale, Dictionary> = { en, ja, zh }

/** Every visible string for a locale. */
export function getCopy(locale: Locale): Dictionary {
  return DICTIONARIES[locale]
}

export { DEFAULT_LOCALE, isLocale, LOCALE_META, LOCALES, localePath, type Locale } from './locales'
export type { Dictionary } from './types'
