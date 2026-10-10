import { describe, expect, it } from 'vitest'
import { getCopy, LOCALES, localePath } from './index'

/** Every leaf key of a dictionary, as dotted paths. */
function keys(value: unknown, prefix = ''): string[] {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return [prefix]
  return Object.entries(value).flatMap(([key, child]) =>
    keys(child, prefix ? `${prefix}.${key}` : key)
  )
}

describe('dictionaries', () => {
  it('give every locale exactly the English keys', () => {
    const english = keys(getCopy('en')).sort()
    for (const locale of LOCALES) expect(keys(getCopy(locale)).sort()).toEqual(english)
  })

  it('serve English at the root and other locales under their code', () => {
    expect(LOCALES.map(localePath)).toEqual(['/', '/ja', '/zh'])
  })
})
