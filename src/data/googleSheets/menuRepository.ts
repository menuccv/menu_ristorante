import {
  GOOGLE_SHEET_CSV_URL,
  IS_GOOGLE_SHEET_CONFIGURED,
} from '../../config/googleSheet'
import { type MenuDataset } from '../../domain/menu'
import { mapSheetRows } from './mapSheetRows'
import { parseCsv } from './csvParser'

export async function fetchMenuFromSheet(signal?: AbortSignal): Promise<MenuDataset> {
  if (!IS_GOOGLE_SHEET_CONFIGURED) {
    throw new Error(
      'URL Google Sheet non configurato. Imposta VITE_GOOGLE_SHEET_CSV_URL in .env.local o modifica src/config/googleSheet.ts.',
    )
  }

  let response: Response
  try {
    response = await fetch(GOOGLE_SHEET_CSV_URL, {
      method: 'GET',
      signal,
      cache: 'no-store',
      headers: {
        Accept: 'text/csv',
      },
    })
  } catch {
    throw new Error(
      'Errore foglio non raggiungibile. Verifica URL pubblico e connessione.',
    )
  }

  if (!response.ok) {
    throw new Error(`Errore foglio non raggiungibile (HTTP ${response.status}).`)
  }

  const csvContent = await response.text()
  const rows = parseCsv(csvContent)
  let items

  try {
    items = mapSheetRows(rows)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('Errore mapping colonne del foglio.')
  }

  return {
    items,
    source: {
      url: GOOGLE_SHEET_CSV_URL,
      fetchedAt: new Date().toISOString(),
    },
  }
}
