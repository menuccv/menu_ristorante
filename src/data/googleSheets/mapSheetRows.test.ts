import { describe, expect, it } from 'vitest'
import { mapSheetRows } from './mapSheetRows'

describe('mapSheetRows', () => {
  it('mappa le righe con colonne richieste e alias', () => {
    const rows = [
      ['Categoria', 'Titolo IT', 'Title EN', 'Prezzo', 'Allergeni'],
      ['Primi', 'Risotto', 'Risotto', '16', '7'],
      ['Dolci', 'Tiramisu', 'Tiramisu', '8', '1,3,7'],
    ]

    const items = mapSheetRows(rows)

    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({
      category: 'Primi',
      categoryEn: '',
      titleIt: 'Risotto',
      titleEn: 'Risotto',
      price: '16',
      allergens: '7',
      order: 0,
    })
  })

  it('riconosce la colonna titolo IT con header speciale del foglio reale', () => {
    const rows = [
      ['CATEGORIA', '-*', 'Titolo EN', 'PREZZO', 'ALLERGENI'],
      ['Primi', 'Tagliatelle al ragù.', 'Tagliatelle with meat sauce.', '18', '1,5,6,10'],
    ]

    const items = mapSheetRows(rows)

    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({
      category: 'Primi',
      categoryEn: '',
      titleIt: 'Tagliatelle al ragù.',
      titleEn: 'Tagliatelle with meat sauce.',
      price: '18',
      allergens: '1,5,6,10',
    })
  })

  it('mappa la colonna categoria EN quando presente', () => {
    const rows = [
      ['Categoria', 'Categoria EN', 'Titolo IT', 'Titolo EN', 'Prezzo', 'Allergeni'],
      ['Primi', 'Homemade Fresh Pasta', 'Tagliatelle al ragù.', 'Tagliatelle with meat sauce.', '18', '1,5,6,10'],
    ]

    const items = mapSheetRows(rows)

    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({
      category: 'Primi',
      categoryEn: 'Homemade Fresh Pasta',
    })
  })

  it('salta righe senza categoria o titolo', () => {
    const rows = [
      ['category', 'title it', 'title en', 'price', 'allergens'],
      ['', '', '', '9', '1'],
      ['Antipasti', 'Bruschetta', '', '10', '1'],
    ]

    const items = mapSheetRows(rows)

    expect(items).toHaveLength(1)
    expect(items[0].category).toBe('Antipasti')
  })

  it('lancia errore se mancano colonne obbligatorie', () => {
    const rows = [
      ['category', 'price'],
      ['Primi', '14'],
    ]

    expect(() => mapSheetRows(rows)).toThrow(
      'Errore mapping colonne: richieste CATEGORIA, Titolo IT, Titolo EN, PREZZO, ALLERGENI.',
    )
  })
})
