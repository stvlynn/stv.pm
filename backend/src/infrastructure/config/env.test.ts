import { describe, expect, it } from 'vitest'
import { ConfigurationError } from '../../domain/shared/errors'
import { readContentSourceConfig } from './env'

describe('readContentSourceConfig', () => {
  it('uses production endpoints by default', () => {
    expect(readContentSourceConfig({ UNSPLASH_ACCESS_KEY: 'key' })).toEqual({
      blogFeedUrl: 'https://blog.stv.pm/rss/feed.json',
      unsplash: { apiUrl: 'https://api.unsplash.com/', accessKey: 'key', username: 'stvlynn' }
    })
  })

  it('requires an Unsplash access key', () => {
    expect(() => readContentSourceConfig({})).toThrow(ConfigurationError)
    expect(() => readContentSourceConfig({ UNSPLASH_ACCESS_KEY: '  ' })).toThrow(
      /UNSPLASH_ACCESS_KEY/
    )
  })

  it('rejects a relative endpoint override', () => {
    expect(() =>
      readContentSourceConfig({ UNSPLASH_ACCESS_KEY: 'key', BLOG_FEED_URL: '/rss/feed.json' })
    ).toThrow(/BLOG_FEED_URL/)
  })
})
