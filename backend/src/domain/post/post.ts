/** A published article on the blog (blog.stv.pm). */
export interface Post {
  readonly id: string
  readonly title: string
  /** Absolute URL of the article on the blog. */
  readonly url: string
  readonly publishedAt: Date
  readonly summary: string
}

/** Port: where published posts come from. */
export interface PostRepository {
  listPublished(): Promise<Post[]>
}

/** Newest first; ties keep a stable order by title so renders are deterministic. */
export function byNewest(a: Post, b: Post): number {
  const diff = b.publishedAt.getTime() - a.publishedAt.getTime()
  return diff !== 0 ? diff : a.title.localeCompare(b.title)
}
