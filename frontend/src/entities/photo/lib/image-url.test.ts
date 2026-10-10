import { describe, expect, it } from 'vitest'
import { photoTileSrcSet, photoUrl } from './image-url'

const photo = { imageUrl: 'https://images.unsplash.com/photo-1?ixid=abc' }

describe('photoUrl', () => {
  it('keeps the original parameters and adds sizing', () => {
    const url = new URL(photoUrl(photo, 640))
    expect(url.searchParams.get('ixid')).toBe('abc')
    expect(url.searchParams.get('w')).toBe('640')
    expect(url.searchParams.get('auto')).toBe('format')
  })

  it('builds a width-described srcset', () => {
    expect(
      photoTileSrcSet(photo)
        .split(', ')
        .map((entry) => entry.split(' ')[1])
    ).toEqual(['400w', '640w', '960w'])
  })
})
