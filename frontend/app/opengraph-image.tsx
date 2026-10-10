import { ogImageAlt, ogImageSize, renderOgImage } from '@/app'

export const alt = ogImageAlt
export const size = ogImageSize
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return renderOgImage()
}
