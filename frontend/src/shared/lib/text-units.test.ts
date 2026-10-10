import { describe, expect, it } from 'vitest'
import { splitTextUnits } from './text-units'

describe('splitTextUnits', () => {
  it('splits Latin text into words that keep their trailing space', () => {
    expect(splitTextUnits('On the way to AGI.')).toEqual(['On ', 'the ', 'way ', 'to ', 'AGI.'])
  })

  it('splits CJK text into characters', () => {
    expect(splitTextUnits('写真を')).toEqual(['写', '真', 'を'])
  })

  it('keeps closing punctuation with the character before it', () => {
    expect(splitTextUnits('基座。')).toEqual(['基', '座。'])
  })

  it('handles Latin words inside CJK text', () => {
    expect(splitTextUnits('人类与 Agent 构建')).toEqual(['人', '类', '与 ', 'Agent ', '构', '建'])
  })

  it('never loses characters', () => {
    const line = '次世代の人間とエージェントのための基盤をつくっています。'
    expect(splitTextUnits(line).join('')).toBe(line)
  })
})
