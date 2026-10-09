/**
 * Serialisable shapes that cross from the backend into React Server
 * Components. Dates travel as ISO strings.
 */
export interface PostDto {
  id: string
  title: string
  url: string
  publishedAt: string
  summary: string
}

export interface PhotoDto {
  id: string
  description: string | null
  width: number
  height: number
  color: string
  imageUrl: string
  pageUrl: string
}

export interface HomeDto {
  posts: PostDto[]
  photos: PhotoDto[]
}
