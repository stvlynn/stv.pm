// Han, kana, CJK punctuation and full-width forms: scripts written without
// spaces, where every character is a valid place to wrap.
const CJK = '\\u3000-\\u303f\\u3040-\\u30ff\\u3400-\\u4dbf\\u4e00-\\u9fff\\uff00-\\uffef'
const UNIT = new RegExp(`[${CJK}]\\s*|[^\\s${CJK}]+\\s*|\\s+`, 'gu')
/** Marks that must not start a line; they stay with the character before. */
const CLOSING = /^[、。，．！？：；）」』】〉》]/u

/**
 * Splits a line into the units a text animation moves one at a time: words
 * (with their trailing space) in Latin text, single characters in Chinese and
 * Japanese, so CJK lines can still wrap. Closing punctuation is kept with the
 * character before it.
 */
export function splitTextUnits(line: string): string[] {
  const units: string[] = []
  for (const unit of line.match(UNIT) ?? []) {
    const previous = units.length - 1
    if (CLOSING.test(unit) && previous >= 0) units[previous] += unit
    else units.push(unit)
  }
  return units
}
