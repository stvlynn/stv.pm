import { copy } from '@/shared/i18n'
import { TextReveal } from '@/shared/ui/motion'

/** Name and a one-line bio; the handwritten signature closes the page instead. */
export function Intro() {
  return (
    <div className="text-[1.0625rem] leading-relaxed">
      <TextReveal as="h1" text={copy.intro.name} className="font-medium" />
      <TextReveal
        as="p"
        text={copy.intro.bio}
        delay={0.15}
        className="mt-3 text-pretty text-muted-foreground [&>span:first-child]:text-foreground"
      />
    </div>
  )
}
