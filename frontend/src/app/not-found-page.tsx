import { DEFAULT_LOCALE, getCopy, localePath } from '@/shared/i18n'
import { RootLayout } from './root-layout'

/** The site-wide 404, in the default locale, inside the regular document shell. */
export function NotFoundPage() {
  const copy = getCopy(DEFAULT_LOCALE)
  return (
    <RootLayout locale={DEFAULT_LOCALE}>
      <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center gap-3 px-5 sm:px-6">
        <h1 className="text-[1.0625rem] font-medium">{copy.notFound.title}</h1>
        <a
          href={localePath(DEFAULT_LOCALE)}
          className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          {copy.notFound.home}
        </a>
      </main>
    </RootLayout>
  )
}
