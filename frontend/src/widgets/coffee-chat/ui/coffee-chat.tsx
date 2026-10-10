import { ArrowUpRight, Coffee } from 'lucide-react'
import { site } from '@/shared/config'
import { getCopy, type Locale } from '@/shared/i18n'
import { Magnetic } from '@/shared/ui/motion'
import { Section } from '@/shared/ui/section'

/** An open invitation to talk: one line and a button to the booking page. */
export function CoffeeChat({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  return (
    <Section id="coffee-chat" title={copy.coffeeChat.title}>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-1">
        <p className="text-pretty">{copy.coffeeChat.note}</p>
        <Magnetic>
          <a
            href={site.coffeeChat.href}
            target="_blank"
            rel="noopener"
            className="group inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors duration-200"
          >
            <Coffee aria-hidden="true" className="size-4 text-muted-foreground" />
            {copy.coffeeChat.book}
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px"
            />
          </a>
        </Magnetic>
      </div>
    </Section>
  )
}
