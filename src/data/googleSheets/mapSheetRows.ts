import { SHEET_FIELD_ALIASES, type SheetFieldKey } from '../../config/googleSheet'
import { type MenuItem } from '../../domain/menu'
import { normalizeHeader } from './csvParser'

function findColumnIndex(headers: string[], field: SheetFieldKey): number {
  const aliases = SHEET_FIELD_ALIASES[field]
  const normalizedAliases = aliases.map(normalizeHeader)
  return headers.findIndex((header) => normalizedAliases.includes(header))
}

function readCell(row: string[], index: number): string {
  if (index < 0 || index >= row.length) {
    return ''
  }
  return row[index]?.trim() ?? ''
}

function buildItemId(rowIndex: number, category: string, titleIt: string): string {
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-')
  const normalizedTitle = titleIt.toLowerCase().replace(/\s+/g, '-')
  return `${rowIndex}-${normalizedCategory}-${normalizedTitle}`
}

export function mapSheetRows(rows: string[][]): MenuItem[] {
  if (rows.length < 2) {
    return []
  }

  const headers = rows[0].map(normalizeHeader)

  const categoryIndex = findColumnIndex(headers, 'category')
  const titleItIndex = findColumnIndex(headers, 'titleIt')
  const titleEnIndex = findColumnIndex(headers, 'titleEn')
  const priceIndex = findColumnIndex(headers, 'price')
  const allergensIndex = findColumnIndex(headers, 'allergens')

  const hasRequiredColumns =
    categoryIndex >= 0 &&
    titleItIndex >= 0 &&
    titleEnIndex >= 0 &&
    priceIndex >= 0 &&
    allergensIndex >= 0

  if (!hasRequiredColumns) {
    throw new Error(
      'Errore mapping colonne: richieste CATEGORIA, Titolo IT, Titolo EN, PREZZO, ALLERGENI.',
    )
  }

  return rows.slice(1).reduce<MenuItem[]>((items, row, rowIndex) => {
    const category = readCell(row, categoryIndex)
    const titleIt = readCell(row, titleItIndex)
    const titleEn = readCell(row, titleEnIndex)

    if (category.length === 0 || (titleIt.length === 0 && titleEn.length === 0)) {
      return items
    }

    items.push({
      id: buildItemId(rowIndex, category, titleIt || titleEn),
      order: rowIndex,
      category,
      titleIt,
      titleEn,
      price: readCell(row, priceIndex),
      allergens: readCell(row, allergensIndex),
    })

    return items
  }, [])
}
