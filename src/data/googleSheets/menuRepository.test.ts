import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const fetchMock = vi.fn()

describe('fetchMenuFromSheet', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllGlobals()
    vi.stubGlobal('fetch', fetchMock)
    fetchMock.mockReset()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('fallisce se la configurazione foglio non e valida', async () => {
    vi.doMock('../../config/googleSheet', async (importOriginal) => {
      const actual = await importOriginal<typeof import('../../config/googleSheet')>()
      return {
        ...actual,
        GOOGLE_SHEET_CSV_URL: 'placeholder',
        IS_GOOGLE_SHEET_CONFIGURED: false,
      }
    })

    const { fetchMenuFromSheet } = await import('./menuRepository')

    await expect(fetchMenuFromSheet()).rejects.toThrow(
      'URL Google Sheet non configurato. Imposta VITE_GOOGLE_SHEET_CSV_URL in .env.local o modifica src/config/googleSheet.ts.',
    )
  })

  it('carica e mappa correttamente il CSV in modalità read-only', async () => {
    vi.doMock('../../config/googleSheet', async (importOriginal) => {
      const actual = await importOriginal<typeof import('../../config/googleSheet')>()
      return {
        ...actual,
        GOOGLE_SHEET_CSV_URL: 'https://example.com/menu.csv',
        IS_GOOGLE_SHEET_CONFIGURED: true,
      }
    })

    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () =>
        `category,title it,title en,price,allergens
Primi,Risotto,Risotto,16,7`,
    })

    const { fetchMenuFromSheet } = await import('./menuRepository')
    const dataset = await fetchMenuFromSheet()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(dataset.items).toHaveLength(1)
    expect(dataset.items[0]).toMatchObject({
      category: 'Primi',
      titleIt: 'Risotto',
      titleEn: 'Risotto',
      price: '16',
      allergens: '7',
    })
    expect(dataset.source.url).toBe('https://example.com/menu.csv')
  })

  it('fallisce con stato HTTP non valido', async () => {
    vi.doMock('../../config/googleSheet', async (importOriginal) => {
      const actual = await importOriginal<typeof import('../../config/googleSheet')>()
      return {
        ...actual,
        GOOGLE_SHEET_CSV_URL: 'https://example.com/menu.csv',
        IS_GOOGLE_SHEET_CONFIGURED: true,
      }
    })

    fetchMock.mockResolvedValue({ ok: false, status: 500, text: async () => '' })

    const { fetchMenuFromSheet } = await import('./menuRepository')

    await expect(fetchMenuFromSheet()).rejects.toThrow(
      'Errore foglio non raggiungibile (HTTP 500).',
    )
  })

  it('fallisce se il foglio non e raggiungibile', async () => {
    vi.doMock('../../config/googleSheet', async (importOriginal) => {
      const actual = await importOriginal<typeof import('../../config/googleSheet')>()
      return {
        ...actual,
        GOOGLE_SHEET_CSV_URL: 'https://example.com/menu.csv',
        IS_GOOGLE_SHEET_CONFIGURED: true,
      }
    })

    fetchMock.mockRejectedValue(new Error('Failed to fetch'))

    const { fetchMenuFromSheet } = await import('./menuRepository')

    await expect(fetchMenuFromSheet()).rejects.toThrow(
      'Errore foglio non raggiungibile. Verifica URL pubblico e connessione.',
    )
  })
})
