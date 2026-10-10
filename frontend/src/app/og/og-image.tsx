import { readFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'
import { PALE_BLUE_DOT } from '@/shared/assets'
import { site } from '@/shared/config'
import { copy } from '@/shared/i18n'
import {
  SIGNATURE_FIRST,
  SIGNATURE_HEART,
  SIGNATURE_LAST,
  SIGNATURE_VIEWBOX
} from '@/shared/ui/signature'

export const ogImageSize = { width: 1200, height: 630 } as const
export const ogImageAlt = `${copy.meta.title}: ${copy.signOff.credit}`

const SIGNATURE_WIDTH = 470
const INK = '#f5f7fb'
const HEART = '#f2a1a1'

/**
 * Social card: the signature in white over the Pale Blue Dot, framed so
 * Earth sits right of centre, a little below the signature's heart.
 */
export async function renderOgImage() {
  const { width, height } = ogImageSize
  const { image, earth } = PALE_BLUE_DOT
  const photo = await readFile(new URL('../../shared/assets/pale-blue-dot.jpg', import.meta.url))
  const photoHeight = (width * image.height) / image.width
  // Shift the photo up so Earth lands 58% of the way down the card.
  const photoTop = height * 0.58 - photoHeight * earth.y
  const signatureHeight = (SIGNATURE_WIDTH * SIGNATURE_VIEWBOX.height) / SIGNATURE_VIEWBOX.width

  return new ImageResponse(
    (
      <div style={{ display: 'flex', position: 'relative', width, height, background: '#0b1520' }}>
        <img
          src={`data:image/jpeg;base64,${photo.toString('base64')}`}
          alt=""
          width={width}
          height={photoHeight}
          style={{ position: 'absolute', left: 0, top: photoTop }}
        />
        <svg
          viewBox={`0 0 ${SIGNATURE_VIEWBOX.width} ${SIGNATURE_VIEWBOX.height}`}
          width={SIGNATURE_WIDTH}
          height={signatureHeight}
          style={{ position: 'absolute', left: 96, top: 92 }}
        >
          <path d={SIGNATURE_FIRST} fill={INK} fillRule="evenodd" />
          <path d={SIGNATURE_LAST} fill={INK} fillRule="evenodd" />
          <path d={SIGNATURE_HEART} fill={HEART} />
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 100,
            bottom: 56,
            fontSize: 26,
            letterSpacing: '0.02em',
            color: 'rgba(245, 247, 251, 0.78)'
          }}
        >
          {new URL(site.url).host}
        </div>
      </div>
    ),
    { ...ogImageSize }
  )
}
