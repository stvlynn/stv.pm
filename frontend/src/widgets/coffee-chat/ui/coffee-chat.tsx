import Script from 'next/script'
import { site } from '@/shared/config'
import { getCopy, type Locale } from '@/shared/i18n'
import { QuietLink, Section } from '@/shared/ui/section'

/** Height Feishu's inline embed is designed for. */
const EMBED_HEIGHT = 626

/**
 * An open invitation to talk with the booking calendar right on the page:
 * Feishu's (Lark) Scheduler inline embed. Its script finds the
 * `scheduler-inline-widget` element and fills it with the scheduler iframe.
 * The script loads after hydration, so React never sees the injected iframe.
 */
export function CoffeeChat({ locale }: { locale: Locale }) {
  const copy = getCopy(locale)
  const { href, embedUrl, widgetScript } = site.coffeeChat
  return (
    <Section
      id="coffee-chat"
      title={copy.coffeeChat.title}
      action={
        <QuietLink href={href} newTab>
          {copy.coffeeChat.openInNewTab}
        </QuietLink>
      }
    >
      <p className="mb-4 text-pretty">{copy.coffeeChat.note}</p>
      <div className="overflow-hidden rounded-xl border border-border bg-embed-surface">
        <div
          className="scheduler-inline-widget"
          data-url={embedUrl}
          style={{ width: '100%', height: EMBED_HEIGHT }}
        />
      </div>
      <Script src={widgetScript} strategy="lazyOnload" />
    </Section>
  )
}
