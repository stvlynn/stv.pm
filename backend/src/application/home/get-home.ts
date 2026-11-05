import type { Photo, PhotoRepository } from '../../domain/photo/photo'
import type { HomeDto, PhotoDto } from './dto'

export interface GetHomeOptions {
  photoLimit: number
}

/**
 * Use case: gather everything the homepage shows from Unsplash. A failure
 * fails the whole render, so the last complete page stays cached instead of a
 * silently partial one replacing it.
 */
export async function getHome(
  photos: PhotoRepository,
  { photoLimit }: GetHomeOptions
): Promise<HomeDto> {
  const latestPhotos = await photos.listLatest(photoLimit)
  return { photos: latestPhotos.map(toPhotoDto) }
}

function toPhotoDto(photo: Photo): PhotoDto {
  return {
    id: photo.id,
    description: photo.description,
    width: photo.width,
    height: photo.height,
    color: photo.color,
    imageUrl: photo.imageUrl,
    pageUrl: photo.pageUrl
  }
}
