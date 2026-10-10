import { LanguageSwitch } from '@/features/switch-language'
import { ThemeToggle } from '@/features/toggle-theme'
import type { Locale } from '@/shared/i18n'

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="mx-auto flex h-16 w-full max-w-2xl items-center justify-end gap-1 px-5 sm:px-6">
      <LanguageSwitch locale={locale} />
      <ThemeToggle locale={locale} className="-mr-2" />
    </header>
  )
}
