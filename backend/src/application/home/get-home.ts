import type { Photo, PhotoRepository } from '../../domain/photo/photo'
import { byNewest, type Post, type PostRepository } from '../../domain/post/post'
import type { HomeDto, PhotoDto, PostDto } from './dto'

export interface GetHomeOptions {
  postLimit: number
  photoLimit: number
}

/**
 * Use case: gather everything the homepage shows from the blog and Unsplash.
 * Both sources load in parallel. Either failing fails the whole render, so the
 * last complete page stays cached instead of a silently partial one replacing it.
 */
export async function getHome(
  posts: PostRepository,
  photos: PhotoRepository,
  { postLimit, photoLimit }: GetHomeOptions
): Promise<HomeDto> {
  const [published, latestPhotos] = await Promise.all([
    posts.listPublished(),
    photos.listLatest(photoLimit)
  ])

  return {
    posts: [...published].sort(byNewest).slice(0, postLimit).map(toPostDto),
    photos: latestPhotos.map(toPhotoDto)
  }
}

function toPostDto(post: Post): PostDto {
  return {
    id: post.id,
    title: post.title,
    url: post.url,
    publishedAt: post.publishedAt.toISOString(),
    summary: post.summary
  }
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
