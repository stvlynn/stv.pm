import { type CompanyId, site } from '@/shared/config'
import { copy } from '@/shared/i18n'
import { CompanyLogo } from '@/shared/ui/brand'
import { SharedLayoutBg } from '@/shared/ui/motion'
import { Section } from '@/shared/ui/section'

/** Current role first, then where I came from. */
const ORDER: readonly CompanyId[] = ['tencent', 'dify']

export function Work() {
  return (
    <Section id="work" title={copy.work.title}>
      <SharedLayoutBg as="ul">
        {ORDER.map((id) => {
          const company = copy.work.companies[id]
          return (
            <li key={id}>
              <a
                href={site.work[id].href}
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 rounded-xl py-2.5 outline-offset-4"
              >
                <CompanyLogo
                  id={id}
                  className="transition-transform duration-300 ease-out group-hover:-rotate-6"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{company.name}</span>
                  <span className="block text-sm text-muted-foreground">{company.role}</span>
                </span>
                <span className="text-sm text-subtle-foreground">{company.period}</span>
              </a>
            </li>
          )
        })}
      </SharedLayoutBg>
    </Section>
  )
}
