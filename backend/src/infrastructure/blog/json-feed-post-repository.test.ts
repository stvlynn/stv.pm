import { describe, expect, it } from 'vitest'
import { UpstreamError } from '../../domain/shared/errors'
import { toPost } from './json-feed-post-repository'

const item = {
  id: 'https://blog.stv.pm/hello',
  url: 'https://blog.stv.pm/hello',
  title: 'Hello',
  summary: '  First post  ',
  date_published: '2026-09-21T08:00:00.000Z'
}

describe('toPost', () => {
  it('maps a JSON Feed item', () => {
    expect(toPost(item, 0)).toEqual({
      id: 'https://blog.stv.pm/hello',
      url: 'https://blog.stv.pm/hello',
      title: 'Hello',
      summary: 'First post',
      publishedAt: new Date('2026-09-21T08:00:00.000Z')
    })
  })

  it('reads a missing summary as empty', () => {
    const { summary: _summary, ...withoutSummary } = item
    expect(toPost(withoutSummary, 0).summary).toBe('')
  })

  it.each(['id', 'title', 'url', 'date_published'] as const)(
    'rejects an item without %s',
    (key) => {
      const { [key]: _omitted, ...rest } = item
      expect(() => toPost(rest, 3)).toThrow(UpstreamError)
    }
  )

  it('rejects an unparseable publish date', () => {
    expect(() => toPost({ ...item, date_published: 'yesterday' }, 0)).toThrow(/date_published/)
  })
})
