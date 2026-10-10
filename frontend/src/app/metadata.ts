import type { Metadata, Viewport } from 'next'
import { ogImageAlt, ogImageSize } from './og/og-image'
import { site } from '@/shared/config'
import {
  DEFAULT_LOCALE,
  getCopy,
  LOCALE_META,
  LOCALES,
  type Locale,
  localePath
} from '@/shared/i18n'

/**
 * The social card is one image for every locale, served by
 * `app/opengraph-image.tsx`. Each locale sets its own `openGraph`, which would
 * otherwise drop the image inherited from the app root, so it is named here.
 */
const SOCIAL_IMAGE = { url: '/opengraph-image', ...ogImageSize, alt: ogImageAlt, type: 'image/png' }

/** Title, description and links for the homepage in one locale. */
export function buildMetadata(locale: Locale): Metadata {
  const copy = getCopy(locale)
  const path = localePath(locale)
  return {
    metadataBase: new URL(site.url),
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((option) => [LOCALE_META[option].htmlLang, localePath(option)])
        ),
        'x-default': localePath('en')
      },
      types: { 'application/rss+xml': site.blogFeedUrl }
    },
    openGraph: {
      type: 'profile',
      url: new URL(path, site.url).toString(),
      locale: LOCALE_META[locale].og,
      alternateLocale: LOCALES.filter((option) => option !== locale).map(
        (option) => LOCALE_META[option].og
      ),
      title: copy.meta.title,
      description: copy.meta.description,
      siteName: copy.meta.title,
      images: [SOCIAL_IMAGE]
    },
    twitter: {
      card: 'summary_large_image',
      creator: site.social.x.handle,
      images: [SOCIAL_IMAGE]
    }
  }
}

/** The 404 page: titled in the default locale and kept out of search results. */
export function buildNotFoundMetadata(): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: `${getCopy(DEFAULT_LOCALE).notFound.title} · ${getCopy(DEFAULT_LOCALE).meta.title}`,
    robots: { index: false }
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'oklch(0.985 0.004 258)' },
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.172 0.04 265)' }
  ]
}
