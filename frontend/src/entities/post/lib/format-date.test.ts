import { describe, expect, it } from 'vitest'
import { formatPostDate } from './format-date'

describe('formatPostDate', () => {
  // 20:00 UTC on the 20th is already the 21st in Shanghai.
  const iso = '2026-09-20T20:00:00.000Z'

  it("formats in the owner's time zone", () => {
    expect(formatPostDate(iso, 'en')).toBe('Sep 21, 2026')
  })

  it("formats in the reader's language", () => {
    expect(formatPostDate(iso, 'ja')).toBe('2026年9月21日')
    expect(formatPostDate(iso, 'zh')).toBe('2026年9月21日')
  })
})
