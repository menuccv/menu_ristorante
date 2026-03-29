import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SidebarControls } from './SidebarControls'

describe('SidebarControls', () => {
  it('renderizza controlli principali e invoca callback', () => {
    const onChangeView = vi.fn()
    const onPrint = vi.fn()
    const onExportPdf = vi.fn()
    const onAdjustContentControl = vi.fn()
    const onResetContentControls = vi.fn()
    const onSaveSectionTitleTranslations = vi.fn()

    render(
      <SidebarControls
        selectedView="IT"
        contentControls={{
          zoomPercent: 100,
          offsetYmm: 0,
          fontScalePercent: 100,
          lineHeightPercent: 100,
        }}
        onChangeView={onChangeView}
        onAdjustContentControl={onAdjustContentControl}
        onResetContentControls={onResetContentControls}
        categories={['Antipasti']}
        sectionTitleTranslations={{}}
        onSaveSectionTitleTranslations={onSaveSectionTitleTranslations}
        onPrint={onPrint}
        onExportPdf={onExportPdf}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'INGLESE' }))
    fireEvent.click(screen.getByRole('button', { name: 'Stampa' }))
    fireEvent.click(screen.getByRole('button', { name: 'Esporta PDF' }))
    fireEvent.click(screen.getByLabelText('Zoom Menù diminuisci'))
    fireEvent.click(screen.getByLabelText('Sposta Menù aumenta'))
    fireEvent.click(screen.getByRole('button', { name: 'Reset Contenuto' }))
    fireEvent.click(screen.getByRole('button', { name: 'Translate Titoli' }))
    fireEvent.change(screen.getByLabelText('Titolo EN'), {
      target: { value: 'Starters' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salva Traduzioni' }))

    expect(onChangeView).toHaveBeenCalledWith('EN')
    expect(onPrint).toHaveBeenCalledTimes(1)
    expect(onExportPdf).toHaveBeenCalledTimes(1)
    expect(onAdjustContentControl).toHaveBeenCalledWith('zoomPercent', 'decrease')
    expect(onAdjustContentControl).toHaveBeenCalledWith('offsetYmm', 'increase')
    expect(onResetContentControls).toHaveBeenCalledTimes(1)
    expect(onSaveSectionTitleTranslations).toHaveBeenCalledWith({
      Antipasti: {
        titleIt: 'Antipasti',
        titleEn: 'Starters',
      },
    })
  })
})
