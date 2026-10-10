import { afterEach, describe, expect, it, vi } from 'vitest'
import { UpstreamError } from '../../domain/shared/errors'
import { toPhoto, UnsplashPhotoRepository } from './unsplash-photo-repository'

const apiPhoto = {
  id: 'abc',
  width: 4000,
  height: 6000,
  color: '#262626',
  description: 'Long description',
  alt_description: 'a quiet street',
  urls: { raw: 'https://images.unsplash.com/photo-1?ixid=x' },
  links: { html: 'https://unsplash.com/photos/abc' }
}

describe('toPhoto', () => {
  it('maps an API photo and adds referral parameters to its page link', () => {
    const photo = toPhoto(apiPhoto, 0)
    expect(photo).toMatchObject({
      id: 'abc',
      description: 'a quiet street',
      width: 4000,
      height: 6000,
      imageUrl: 'https://images.unsplash.com/photo-1?ixid=x'
    })
    const page = new URL(photo.pageUrl)
    expect(page.searchParams.get('utm_source')).toBe('stv.pm')
    expect(page.searchParams.get('utm_medium')).toBe('referral')
  })

  it('falls back to the free-text description, then to none', () => {
    expect(toPhoto({ ...apiPhoto, alt_description: null }, 0).description).toBe('Long description')
    expect(
      toPhoto({ ...apiPhoto, alt_description: null, description: null }, 0).description
    ).toBeNull()
  })

  it('rejects non-positive dimensions', () => {
    expect(() => toPhoto({ ...apiPhoto, width: 0 }, 0)).toThrow(UpstreamError)
  })
})

describe('UnsplashPhotoRepository', () => {
  afterEach(() => vi.unstubAllGlobals())

  const repo = new UnsplashPhotoRepository({
    apiUrl: 'https://api.unsplash.com',
    accessKey: 'key',
    username: 'stvlynn'
  })

  it('requests the latest photos with the access key', async () => {
    const fetchMock = vi.fn(async () => Response.json([apiPhoto]))
    vi.stubGlobal('fetch', fetchMock)

    const photos = await repo.listLatest(12)

    expect(photos).toHaveLength(1)
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toBe('https://api.unsplash.com/users/stvlynn/photos?per_page=12&order_by=latest')
    expect(init.headers).toMatchObject({ Authorization: 'Client-ID key' })
  })

  it('turns an error status into an UpstreamError', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('', { status: 403, statusText: 'Forbidden' }))
    )
    await expect(repo.listLatest(12)).rejects.toThrow(/403 Forbidden/)
  })

  it('refuses limits Unsplash would not honour', async () => {
    await expect(repo.listLatest(31)).rejects.toThrow(RangeError)
  })
})
