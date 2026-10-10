import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { PALE_BLUE_DOT } from '@/shared/assets'
import { copy } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { ScrollDrawer } from '@/shared/ui/motion'
import { Signature } from '@/shared/ui/signature'
import styles from './sign-off.module.css'

const { image, earth } = PALE_BLUE_DOT

const photoVars = {
  '--photo-ratio': image.width / image.height,
  '--earth-x': earth.x,
  '--earth-y': earth.y
} as CSSProperties

/**
 * Closes the page where a call to action would sit: a drawer that opens with
 * the scroll onto Voyager 1's Pale Blue Dot, signed by hand. Earth is a
 * single point in the sunbeam below the signature; `footer` sits on the pale
 * band of light at the bottom.
 */
export function SignOff({ footer }: { footer: ReactNode }) {
  return (
    <figure>
      <ScrollDrawer
        background={
          <div className={cn(styles.scene, 'absolute inset-0')} style={photoVars}>
            <div className={styles.frame}>
              <Image
                src={image}
                alt={copy.signOff.photoAlt}
                fill
                sizes="(min-aspect-ratio: 1/1) 100vw, 100vh"
                placeholder="blur"
                className="select-none"
              />
              <span aria-hidden="true" className={styles.earth} />
            </div>
          </div>
        }
      >
        <div className="flex h-full flex-col">
          <div className="mx-auto w-full max-w-2xl px-5 pt-[22svh] sm:px-6">
            <p className="sr-only">{copy.signOff.label}</p>
            <Signature variant="solid" className="-ml-1 w-[min(21rem,78vw)] text-on-photo-sky" />
          </div>
          <div className="mt-auto">
            <figcaption className="mx-auto w-full max-w-2xl px-5 text-xs text-on-photo-glow sm:px-6">
              {copy.signOff.credit}
            </figcaption>
            {footer}
          </div>
        </div>
      </ScrollDrawer>
    </figure>
  )
}
