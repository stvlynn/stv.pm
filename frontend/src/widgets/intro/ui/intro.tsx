import { copy } from '@/shared/i18n'
import { TextReveal } from '@/shared/ui/motion'
import { Signature } from '@/shared/ui/signature'

/** The signature writes itself while the one-line bio settles in beneath it. */
export function Intro() {
  return (
    <div>
      <h1 className="sr-only">{copy.intro.name}</h1>
      <Signature className="-ml-1 w-[min(19rem,78vw)] text-foreground" />
      <TextReveal
        as="p"
        text={copy.intro.bio}
        delay={0.35}
        className="mt-8 text-[1.0625rem] leading-relaxed text-pretty [&>span:last-child]:text-muted-foreground"
      />
    </div>
  )
}
