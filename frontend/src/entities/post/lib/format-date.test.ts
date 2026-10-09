import { describe, expect, it } from 'vitest'
import { formatPostDate } from './format-date'

describe('formatPostDate', () => {
  it("formats in the owner's time zone", () => {
    // 20:00 UTC on the 20th is already the 21st in Shanghai.
    expect(formatPostDate('2026-09-20T20:00:00.000Z')).toBe('Sep 21, 2026')
  })
})
