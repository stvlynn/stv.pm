import { getCopy, LOCALE_META, LOCALES, type Locale, localePath } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { Magnetic } from '@/shared/ui/motion'

/**
 * EN · JA · ZH. Each option links to that locale's page and is named in its
 * own language, so a reader can always find theirs. Every locale has its own
 * prerendered document (its own `<html lang>`), so switching is a plain page
 * load rather than a client-side transition.
 */
export function LanguageSwitch({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <nav aria-label={getCopy(locale).language.label} className={cn('flex items-center', className)}>
      <ul className="flex items-center">
        {LOCALES.map((option) => {
          const meta = LOCALE_META[option]
          const active = option === locale
          return (
            <li key={option}>
              <Magnetic>
                <a
                  href={localePath(option)}
                  hrefLang={meta.htmlLang}
                  lang={meta.htmlLang}
                  aria-label={meta.name}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'grid h-8 min-w-9 place-items-center rounded-full px-2 text-xs font-medium tracking-wide transition-colors duration-200',
                    active
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {meta.label}
                </a>
              </Magnetic>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
