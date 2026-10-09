import { describe, expect, it } from 'vitest'
import type { Photo, PhotoRepository } from '../../domain/photo/photo'
import type { Post, PostRepository } from '../../domain/post/post'
import { getHome } from './get-home'

const post = (id: string, iso: string): Post => ({
  id,
  title: `Post ${id}`,
  url: `https://blog.stv.pm/${id}`,
  publishedAt: new Date(iso),
  summary: ''
})

const photo = (id: string): Photo => ({
  id,
  description: null,
  width: 4000,
  height: 3000,
  color: '#000000',
  imageUrl: `https://images.unsplash.com/${id}?ixid=x`,
  pageUrl: `https://unsplash.com/photos/${id}`
})

const postsFrom = (posts: Post[]): PostRepository => ({ listPublished: async () => posts })
const photosFrom = (photos: Photo[], seen: number[] = []): PhotoRepository => ({
  listLatest: async (limit) => {
    seen.push(limit)
    return photos.slice(0, limit)
  }
})

describe('getHome', () => {
  it('returns the newest posts first, capped at the post limit', async () => {
    const home = await getHome(
      postsFrom([post('a', '2026-01-01'), post('c', '2026-03-01'), post('b', '2026-02-01')]),
      photosFrom([]),
      { postLimit: 2, photoLimit: 1 }
    )
    expect(home.posts.map((p) => p.id)).toEqual(['c', 'b'])
    expect(home.posts[0]?.publishedAt).toBe('2026-03-01T00:00:00.000Z')
  })

  it('asks the photo source for exactly the photo limit', async () => {
    const seen: number[] = []
    const home = await getHome(postsFrom([]), photosFrom([photo('1'), photo('2')], seen), {
      postLimit: 1,
      photoLimit: 1
    })
    expect(seen).toEqual([1])
    expect(home.photos.map((p) => p.id)).toEqual(['1'])
  })

  it('fails when either source fails', async () => {
    const broken: PostRepository = {
      listPublished: () => Promise.reject(new Error('blog down'))
    }
    await expect(
      getHome(broken, photosFrom([photo('1')]), { postLimit: 1, photoLimit: 1 })
    ).rejects.toThrow('blog down')
  })
})
