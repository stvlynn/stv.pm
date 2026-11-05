/**
 * Serialisable shapes that cross from the backend into React Server
 * Components. Dates travel as ISO strings.
 */
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
  photos: PhotoDto[]
}
