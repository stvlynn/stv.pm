import type { Metadata, Viewport } from 'next'
import { site } from '@/shared/config'
import { copy } from '@/shared/i18n'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': site.blogFeedUrl }
  },
  openGraph: {
    type: 'profile',
    url: site.url,
    title: copy.meta.title,
    description: copy.meta.description,
    siteName: copy.meta.title
  },
  twitter: {
    card: 'summary_large_image',
    creator: site.social.x.handle
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'oklch(0.985 0.004 258)' },
    { media: '(prefers-color-scheme: dark)', color: 'oklch(0.172 0.04 265)' }
  ]
}
