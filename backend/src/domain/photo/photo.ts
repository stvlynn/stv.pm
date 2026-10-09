/** A photograph published on Unsplash by the site owner. */
export interface Photo {
  readonly id: string
  /** Human description used as alternative text; Unsplash may have none. */
  readonly description: string | null
  /** Intrinsic pixel size; both are positive integers. */
  readonly width: number
  readonly height: number
  /** Dominant colour, used as the placeholder while the image loads. */
  readonly color: string
  /** Base image URL that accepts imgix sizing parameters (`w`, `q`, `fm`). */
  readonly imageUrl: string
  /** Page of the photo on Unsplash, for attribution. */
  readonly pageUrl: string
}

/** Port: where the owner's photos come from, newest first. */
export interface PhotoRepository {
  listLatest(limit: number): Promise<Photo[]>
}
