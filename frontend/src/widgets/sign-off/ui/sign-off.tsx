import { copy } from '@/shared/i18n'
import { Signature, WriteOnView } from '@/shared/ui/signature'

/** Closes the page where a call to action would sit: signed by hand. */
export function SignOff() {
  return (
    <WriteOnView>
      <p className="sr-only">{copy.signOff.label}</p>
      <Signature className="-ml-1 w-[min(17rem,72vw)] text-foreground" />
    </WriteOnView>
  )
}
