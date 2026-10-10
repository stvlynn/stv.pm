import { readFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'
import { PALE_BLUE_DOT, SIGNATURE_HEART, SIGNATURE_SOLID, SIGNATURE_VIEWBOX } from '@/shared/assets'
import { copy } from '@/shared/i18n'

export const ogImageSize = { width: 1200, height: 630 } as const
export const ogImageAlt = `${copy.meta.title}: ${copy.signOff.credit}`

const SIGNATURE_WIDTH = 470
const INK = '#f5f7fb'
const HEART = '#f2a1a1'

/**
 * Social card: the solid white signature over the Pale Blue Dot, framed so
 * the signature is centred vertically on the left and Earth sits right of
 * centre, level with the signature's heart.
 */
export async function renderOgImage() {
  const { width, height } = ogImageSize
  const { image, earth } = PALE_BLUE_DOT
  const photo = await readFile(new URL('../../shared/assets/pale-blue-dot.jpg', import.meta.url))
  const photoHeight = (width * image.height) / image.width
  // Shift the photo up so Earth lands 62% of the way down the card.
  const photoTop = height * 0.62 - photoHeight * earth.y
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
          style={{ position: 'absolute', left: 104, top: (height - signatureHeight) / 2 }}
        >
          <path d={SIGNATURE_SOLID} fill={INK} fillRule="evenodd" />
          <path d={SIGNATURE_HEART} fill={HEART} />
        </svg>
      </div>
    ),
    { ...ogImageSize }
  )
}
