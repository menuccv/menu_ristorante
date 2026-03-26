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
      titleIt: 'Risotto',
      titleEn: 'Risotto',
      price: '16',
      allergens: '7',
      order: 0,
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
