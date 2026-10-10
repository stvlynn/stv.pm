import type { Post, PostRepository } from '../../domain/post/post'
import { UpstreamError } from '../../domain/shared/errors'
import { getJson, isRecord, optionalString, requireString } from '../http'

const SOURCE = 'blog'

/**
 * Reads published posts from the NotionNext blog's JSON Feed 1.1 endpoint
 * (`/rss/feed.json`). The blog is the source of truth for which posts are
 * published; this adapter only maps feed items to `Post`.
 */
export class JsonFeedPostRepository implements PostRepository {
  constructor(private readonly feedUrl: string) {}

  async listPublished(): Promise<Post[]> {
    const feed = await getJson(SOURCE, this.feedUrl)
    if (!isRecord(feed) || !Array.isArray(feed.items)) {
      throw new UpstreamError(SOURCE, `${this.feedUrl} is not a JSON Feed (missing "items")`)
    }
    return feed.items.map((item, index) => toPost(item, index))
  }
}

export function toPost(item: unknown, index: number): Post {
  if (!isRecord(item)) {
    throw new UpstreamError(SOURCE, `feed item ${index} is not an object`)
  }
  const publishedAt = new Date(requireString(SOURCE, item, 'date_published'))
  if (Number.isNaN(publishedAt.getTime())) {
    throw new UpstreamError(SOURCE, `feed item ${index} has an invalid "date_published"`)
  }
  return {
    id: requireString(SOURCE, item, 'id'),
    title: requireString(SOURCE, item, 'title'),
    url: requireString(SOURCE, item, 'url'),
    publishedAt,
    // JSON Feed omits `summary` when a post has none.
    summary: optionalString(item, 'summary') ?? ''
  }
}
