import { describe, expect, it } from 'vitest'
import type { Photo, PhotoRepository } from '../../domain/photo/photo'
import { getHome } from './get-home'

const photo = (id: string): Photo => ({
  id,
  description: null,
  width: 4000,
  height: 3000,
  color: '#000000',
  imageUrl: `https://images.unsplash.com/${id}?ixid=x`,
  pageUrl: `https://unsplash.com/photos/${id}`
})

const photosFrom = (photos: Photo[], seen: number[] = []): PhotoRepository => ({
  listLatest: async (limit) => {
    seen.push(limit)
    return photos.slice(0, limit)
  }
})

describe('getHome', () => {
  it('asks the photo source for exactly the photo limit', async () => {
    const seen: number[] = []
    const home = await getHome(photosFrom([photo('1'), photo('2')], seen), { photoLimit: 1 })
    expect(seen).toEqual([1])
    expect(home.photos.map((p) => p.id)).toEqual(['1'])
  })

  it('fails when the photo source fails', async () => {
    const broken: PhotoRepository = { listLatest: () => Promise.reject(new Error('unsplash down')) }
    await expect(getHome(broken, { photoLimit: 1 })).rejects.toThrow('unsplash down')
  })
})
