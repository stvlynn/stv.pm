import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { ReactNode } from 'react'
import { LOCALE_META, type Locale } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { ThemeProvider } from './providers/theme-provider'
import './styles/globals.css'

/**
 * Document shell: fonts, theme provider and global styles. `lang` follows the
 * page's locale so browsers pick Japanese or Chinese glyphs and fonts.
 */
export function RootLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      // next-themes writes the theme class before hydration.
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
