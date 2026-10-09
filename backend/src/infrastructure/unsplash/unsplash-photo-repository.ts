import type { Photo, PhotoRepository } from '../../domain/photo/photo'
import { UpstreamError } from '../../domain/shared/errors'
import { getJson, isRecord, optionalString, requirePositiveInt, requireString } from '../http'

const SOURCE = 'unsplash'
/** Unsplash caps `per_page` at 30. */
const MAX_PER_PAGE = 30
/** Unsplash API guidelines require these on every link back to unsplash.com. */
const REFERRAL = { utm_source: 'stv.pm', utm_medium: 'referral' } as const

export interface UnsplashSettings {
  apiUrl: string
  accessKey: string
  username: string
}

/** Lists a user's public photos through the official Unsplash API. */
export class UnsplashPhotoRepository implements PhotoRepository {
  constructor(private readonly settings: UnsplashSettings) {}

  async listLatest(limit: number): Promise<Photo[]> {
    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_PER_PAGE) {
      throw new RangeError(`limit must be an integer between 1 and ${MAX_PER_PAGE}`)
    }
    const { apiUrl, accessKey, username } = this.settings
    const url = new URL(`users/${encodeURIComponent(username)}/photos`, withTrailingSlash(apiUrl))
    url.searchParams.set('per_page', String(limit))
    url.searchParams.set('order_by', 'latest')

    const body = await getJson(SOURCE, url.toString(), {
      Authorization: `Client-ID ${accessKey}`,
      'Accept-Version': 'v1'
    })
    if (!Array.isArray(body)) {
      throw new UpstreamError(SOURCE, `${url.pathname} did not return a list of photos`)
    }
    return body.map((item, index) => toPhoto(item, index))
  }
}

export function toPhoto(item: unknown, index: number): Photo {
  if (!isRecord(item) || !isRecord(item.urls) || !isRecord(item.links)) {
    throw new UpstreamError(SOURCE, `photo ${index} is missing "urls" or "links"`)
  }
  return {
    id: requireString(SOURCE, item, 'id'),
    description: optionalString(item, 'alt_description') ?? optionalString(item, 'description'),
    width: requirePositiveInt(SOURCE, item, 'width'),
    height: requirePositiveInt(SOURCE, item, 'height'),
    color: requireString(SOURCE, item, 'color'),
    imageUrl: requireString(SOURCE, item.urls, 'raw'),
    pageUrl: withReferral(requireString(SOURCE, item.links, 'html'))
  }
}

function withReferral(href: string): string {
  const url = new URL(href)
  for (const [key, value] of Object.entries(REFERRAL)) url.searchParams.set(key, value)
  return url.toString()
}

function withTrailingSlash(base: string): string {
  return base.endsWith('/') ? base : `${base}/`
}
