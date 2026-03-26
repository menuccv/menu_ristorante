import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { useMenuPrintApp } from './hooks/useMenuPrintApp'

vi.mock('./hooks/useMenuPrintApp', () => ({
  useMenuPrintApp: vi.fn(),
}))

describe('App', () => {
  const mockedUseMenuPrintApp = vi.mocked(useMenuPrintApp)

  beforeEach(() => {
    mockedUseMenuPrintApp.mockReturnValue({
      status: 'ready',
      errorMessage: '',
      menuData: {
        items: [
          {
            id: '1',
            order: 0,
            category: 'Primi',
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
      },
      selectedView: 'IT',
      footerCopy: {
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
      setSelectedView: vi.fn(),
      adjustContentControl: vi.fn(),
      resetContentControls: vi.fn(),
      saveSectionTitleTranslations: vi.fn(),
    })
  })

  it('renderizza shell e risponde alle azioni principali', () => {
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => undefined)

    render(<App />)

    expect(screen.getByText('Primi')).toBeInTheDocument()
    expect(screen.getByText('Risotto')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Stampa' }))
    expect(printSpy).toHaveBeenCalledTimes(1)

    printSpy.mockRestore()
  })
})
