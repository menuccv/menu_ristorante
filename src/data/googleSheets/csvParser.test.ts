import { describe, expect, it } from 'vitest'
import { normalizeHeader, parseCsv } from './csvParser'

describe('normalizeHeader', () => {
  it('normalizza maiuscole, trattini, underscore e spazi', () => {
    expect(normalizeHeader('  Title_EN-Menu  ')).toBe('title en menu')
  })
})

describe('parseCsv', () => {
  it('gestisce celle quotate con virgole', () => {
    const rows = parseCsv('category,title it\nPrimi,"Pasta, pomodoro"')

    expect(rows).toEqual([
      ['category', 'title it'],
      ['Primi', 'Pasta, pomodoro'],
    ])
  })

  it('ignora righe vuote e mantiene i contenuti validi', () => {
    const rows = parseCsv('category,title en\n\nDolci,Tiramisu\n')

    expect(rows).toEqual([
      ['category', 'title en'],
      ['Dolci', 'Tiramisu'],
    ])
  })
})
