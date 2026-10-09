import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { ReactNode } from 'react'
import { site } from '@/shared/config'
import { cn } from '@/shared/lib'
import { ThemeProvider } from './providers/theme-provider'
import './styles/globals.css'

/** Document shell: fonts, theme provider and global styles. */
export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={site.locale}
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
