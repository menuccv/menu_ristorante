import { describe, expect, it } from 'vitest'
import { groupMenuItems } from './groupMenuItems'

describe('groupMenuItems', () => {
  it('ordina per campo order e raggruppa per categoria', () => {
    const grouped = groupMenuItems([
      {
        id: '2',
        order: 2,
        category: 'Primi',
        titleIt: 'Pasta',
        titleEn: 'Pasta',
        price: '14',
        allergens: '1',
      },
      {
        id: '1',
        order: 1,
        category: 'Antipasti',
        titleIt: 'Bruschetta',
        titleEn: 'Bruschetta',
        price: '9',
        allergens: '1',
      },
      {
        id: '3',
        order: 3,
        category: 'Primi',
        titleIt: 'Risotto',
        titleEn: 'Risotto',
        price: '16',
        allergens: '7',
      },
    ])

    expect(grouped).toHaveLength(2)
    expect(grouped[0].category).toBe('Antipasti')
    expect(grouped[1].category).toBe('Primi')
    expect(grouped[1].items.map((item) => item.id)).toEqual(['2', '3'])
  })
})
