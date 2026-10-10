import type { HomeDto } from '../../application/home/dto'
import { getHome } from '../../application/home/get-home'
import { JsonFeedPostRepository } from '../../infrastructure/blog/json-feed-post-repository'
import { readContentSourceConfig } from '../../infrastructure/config/env'
import { UnsplashPhotoRepository } from '../../infrastructure/unsplash/unsplash-photo-repository'

/** How much of each source the homepage shows. */
const HOME_LIMITS = { postLimit: 6, photoLimit: 12 } as const

/**
 * Composition root for the homepage, called from the Next.js route. Wires the
 * production adapters into the use case and returns serialisable DTOs.
 */
export function loadHome(): Promise<HomeDto> {
  const config = readContentSourceConfig()
  return getHome(
    new JsonFeedPostRepository(config.blogFeedUrl),
    new UnsplashPhotoRepository(config.unsplash),
    HOME_LIMITS
  )
}
