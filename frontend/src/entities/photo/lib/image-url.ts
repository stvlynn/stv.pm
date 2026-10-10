import type { Photo } from '../model/types'

/** Widths requested for gallery tiles; the browser picks one via `srcset`. */
const TILE_WIDTHS = [400, 640, 960] as const
const VIEWER_WIDTH = 2400

/** Sized, format-negotiated URL from Unsplash's imgix-backed `raw` image. */
export function photoUrl(photo: Pick<Photo, 'imageUrl'>, width: number): string {
  const url = new URL(photo.imageUrl)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', '80')
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'max')
  return url.toString()
}

export function photoTileSrcSet(photo: Pick<Photo, 'imageUrl'>): string {
  return TILE_WIDTHS.map((width) => `${photoUrl(photo, width)} ${width}w`).join(', ')
}

export function photoTileSrc(photo: Pick<Photo, 'imageUrl'>): string {
  return photoUrl(photo, TILE_WIDTHS[1])
}

export function photoViewerSrc(photo: Pick<Photo, 'imageUrl'>): string {
  return photoUrl(photo, VIEWER_WIDTH)
}
