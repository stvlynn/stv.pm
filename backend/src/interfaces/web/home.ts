import type { HomeDto } from '../../application/home/dto'
import { getHome } from '../../application/home/get-home'
import { readContentSourceConfig } from '../../infrastructure/config/env'
import { UnsplashPhotoRepository } from '../../infrastructure/unsplash/unsplash-photo-repository'

/** How many photos the homepage shows. */
const HOME_LIMITS = { photoLimit: 12 } as const

/**
 * Composition root for the homepage, called from the Next.js route. Wires the
 * production adapters into the use case and returns serialisable DTOs.
 */
export function loadHome(): Promise<HomeDto> {
  const config = readContentSourceConfig()
  return getHome(new UnsplashPhotoRepository(config.unsplash), HOME_LIMITS)
}
