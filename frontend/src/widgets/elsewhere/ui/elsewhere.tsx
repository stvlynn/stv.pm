import { ArrowUpRight } from 'lucide-react'
import { site, type SocialId } from '@/shared/config'
import { copy } from '@/shared/i18n'
import { SocialIcon } from '@/shared/ui/brand'
import { SharedLayoutBg } from '@/shared/ui/motion'
import { Section } from '@/shared/ui/section'

const ORDER: readonly SocialId[] = ['x', 'telegram', 'github', 'unsplash']

export function Elsewhere() {
  return (
    <Section id="elsewhere" title={copy.elsewhere.title}>
      <SharedLayoutBg as="ul">
        {ORDER.map((id) => (
          <li key={id}>
            <a
              href={site.social[id].href}
              rel="me noopener"
              target="_blank"
              className="group flex items-center gap-3 rounded-xl py-2.5 outline-offset-4"
            >
              <SocialIcon
                id={id}
                className="text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
              />
              <span className="w-24 shrink-0">{copy.elsewhere.links[id]}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                {site.social[id].handle}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-subtle-foreground opacity-0 transition duration-200 ease-out group-hover:translate-x-px group-hover:-translate-y-px group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            </a>
          </li>
        ))}
      </SharedLayoutBg>
    </Section>
  )
}
