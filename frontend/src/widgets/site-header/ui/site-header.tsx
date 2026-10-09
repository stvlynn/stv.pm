import { ThemeToggle } from '@/features/toggle-theme'

export function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-2xl items-center justify-end px-5 sm:px-6">
      <ThemeToggle className="-mr-2" />
    </header>
  )
}
