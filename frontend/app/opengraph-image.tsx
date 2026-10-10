import { ogImageAlt, ogImageSize, renderOgImage } from '@/app'

export const dynamic = 'force-static'
export const alt = ogImageAlt
export const size = ogImageSize
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return renderOgImage()
}
