import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useMenuPrintApp } from './useMenuPrintApp'
import { fetchMenuFromSheet } from '../../data/googleSheets/menuRepository'
import { loadAppSettings, saveAppSettings } from '../../state/settingsStore'

vi.mock('../../data/googleSheets/menuRepository', () => ({
  fetchMenuFromSheet: vi.fn(),
}))

vi.mock('../../state/settingsStore', () => ({
  loadAppSettings: vi.fn(),
  saveAppSettings: vi.fn(),
}))

describe('useMenuPrintApp', () => {
  const mockedFetchMenuFromSheet = vi.mocked(fetchMenuFromSheet)
  const mockedLoadAppSettings = vi.mocked(loadAppSettings)
  const mockedSaveAppSettings = vi.mocked(saveAppSettings)

  beforeEach(() => {
    vi.clearAllMocks()

    mockedLoadAppSettings.mockReturnValue({
      selectedView: 'IT',
      footer: {
        allergensLineIt: 'Allergeni IT',
        allergensLineEn: 'Allergens EN',
        breadServiceLineIt: 'Pane IT',
        breadServiceLineEn: 'Bread EN',
      },
      contentControls: {
        zoomPercent: 100,
        offsetYmm: 0,
        fontScalePercent: 100,
        lineHeightPercent: 100,
      },
      sectionTitleTranslations: {},
    })
  })

  it('carica i dati al mount, sincronizza su focus e gestisce i controlli', async () => {
    mockedFetchMenuFromSheet.mockResolvedValue({
      items: [
        {
          id: '1',
          order: 0,
          category: 'Primi',
          categoryEn: 'Homemade Fresh Pasta',
          titleIt: 'Risotto',
          titleEn: 'Risotto',
          price: '16',
          allergens: '7',
        },
      ],
      source: {
        url: 'https://example.com/menu.csv',
        fetchedAt: '2026-03-25T17:00:00.000Z',
      },
    })

    const { result } = renderHook(() => useMenuPrintApp())

    await waitFor(() => {
      expect(result.current.status).toBe('ready')
    })

    expect(result.current.menuData?.items).toHaveLength(1)

    act(() => {
      result.current.setSelectedView('EXTERNAL')
    })

    expect(result.current.selectedView).toBe('EXTERNAL')

    act(() => {
      result.current.adjustContentControl('zoomPercent', 'increase')
    })

    expect(result.current.contentControls.zoomPercent).toBe(101)

    act(() => {
      result.current.resetContentControls()
    })

    expect(result.current.contentControls.zoomPercent).toBe(100)

    act(() => {
      result.current.saveSectionTitleTranslations({
        Primi: {
          titleIt: 'Primi',
          titleEn: 'First Courses',
        },
      })
    })

    expect(result.current.sectionTitleTranslations.Primi?.titleEn).toBe('First Courses')

    act(() => {
      window.dispatchEvent(new Event('focus'))
    })

    await waitFor(() => {
      expect(mockedFetchMenuFromSheet).toHaveBeenCalledTimes(2)
    })
    expect(mockedSaveAppSettings).toHaveBeenCalled()
  })

  it('porta lo stato in errore se il fetch fallisce', async () => {
    mockedFetchMenuFromSheet.mockRejectedValue(new Error('Errore remoto'))

    const { result } = renderHook(() => useMenuPrintApp())

    await waitFor(() => {
      expect(result.current.status).toBe('error')
    })

    expect(result.current.errorMessage).toBe('Errore remoto')
  })

  it('evita fetch concorrenti durante trigger ravvicinati', async () => {
    let resolveFetch: ((value: Awaited<ReturnType<typeof fetchMenuFromSheet>>) => void) | null =
      null

    mockedFetchMenuFromSheet.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve
        }),
    )

    const { result } = renderHook(() => useMenuPrintApp())

    await waitFor(() => {
      expect(mockedFetchMenuFromSheet).toHaveBeenCalledTimes(1)
    })

    act(() => {
      window.dispatchEvent(new Event('focus'))
      window.dispatchEvent(new Event('focus'))
    })

    expect(mockedFetchMenuFromSheet).toHaveBeenCalledTimes(1)

    act(() => {
      resolveFetch?.({
        items: [],
        source: {
          url: 'https://example.com/menu.csv',
          fetchedAt: '2026-03-26T14:00:00.000Z',
        },
      })
    })

    await waitFor(() => {
      expect(result.current.status).toBe('ready')
    })
  })
})
