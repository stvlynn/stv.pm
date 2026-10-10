import Image from 'next/image'
import type { CSSProperties } from 'react'
import { PALE_BLUE_DOT } from '@/shared/assets'
import { copy } from '@/shared/i18n'
import { cn } from '@/shared/lib'
import { ParallaxLayer } from '@/shared/ui/motion'
import { Signature, WriteOnView } from '@/shared/ui/signature'
import styles from './sign-off.module.css'

const { image, earth } = PALE_BLUE_DOT

const photoVars = {
  '--photo-ratio': image.width / image.height,
  '--earth-x': earth.x,
  '--earth-y': earth.y
} as CSSProperties

/**
 * Closes the page where a call to action would sit: the handwritten
 * signature over Voyager 1's Pale Blue Dot, Earth a single point in a beam
 * of sunlight. The scene fades in from the page and back out into the footer.
 */
export function SignOff() {
  return (
    <figure
      className={cn(
        styles.scene,
        'relative isolate h-[min(100svh,58rem)] min-h-[34rem] w-full overflow-hidden'
      )}
      style={photoVars}
    >
      <ParallaxLayer>
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
      </ParallaxLayer>
      <div aria-hidden="true" className={cn(styles.veil, 'pointer-events-none absolute inset-0')} />

      <div className="relative mx-auto w-full max-w-2xl px-5 pt-[24cqh] sm:px-6">
        <WriteOnView>
          <p className="sr-only">{copy.signOff.label}</p>
          <Signature className="-ml-1 w-[min(17rem,72vw)] text-white" />
        </WriteOnView>
      </div>

      <figcaption className="absolute inset-x-0 bottom-5 mx-auto w-full max-w-2xl px-5 text-xs text-subtle-foreground sm:px-6">
        {copy.signOff.credit}
      </figcaption>
    </figure>
  )
}
