export type SheetFieldKey = 'category' | 'titleIt' | 'titleEn' | 'price' | 'allergens'

export const GOOGLE_SHEET_ID = '1TVHaO3bM4WALAey-TXNWYJh--RiGUheAaoU00gamJpY'
export const MENU_SHEET_GID = '1122482173'

const DEFAULT_GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${MENU_SHEET_GID}`
export const GOOGLE_SHEET_EDIT_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit?gid=${MENU_SHEET_GID}#gid=${MENU_SHEET_GID}`

export const GOOGLE_SHEET_CSV_URL =
  import.meta.env.VITE_GOOGLE_SHEET_CSV_URL?.trim() || DEFAULT_GOOGLE_SHEET_CSV_URL

export const IS_GOOGLE_SHEET_CONFIGURED = GOOGLE_SHEET_CSV_URL.length > 0

export const SHEET_FIELD_ALIASES: Record<SheetFieldKey, string[]> = {
  category: ['category', 'categoria', 'categoria menu', 'cat'],
  titleIt: [
    'title it',
    'titolo it',
    'nome it',
    'titolo italiano',
    '-*',
    '*',
  ],
  titleEn: ['title en', 'titolo en', 'name en', 'titolo inglese'],
  price: ['price', 'prezzo', 'prezzo euro', 'prezzo €'],
  allergens: ['allergens', 'allergeni', 'allergeni note'],
}
