import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SidebarControls } from './SidebarControls'

describe('SidebarControls', () => {
  it('renderizza controlli principali e invoca callback', () => {
    const onChangeView = vi.fn()
    const onExportPdf = vi.fn()
    const onAdjustContentControl = vi.fn()
    const onResetContentControls = vi.fn()

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
        onExportPdf={onExportPdf}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'INGLESE' }))
    fireEvent.click(screen.getByRole('button', { name: 'Esporta PDF' }))
    fireEvent.click(screen.getByLabelText('Zoom Menù diminuisci'))
    fireEvent.click(screen.getByLabelText('Sposta Menù aumenta'))
    fireEvent.click(screen.getByRole('button', { name: 'Reset Contenuto' }))

    expect(onChangeView).toHaveBeenCalledWith('EN')
    expect(onExportPdf).toHaveBeenCalledTimes(1)
    expect(onAdjustContentControl).toHaveBeenCalledWith('zoomPercent', 'decrease')
    expect(onAdjustContentControl).toHaveBeenCalledWith('offsetYmm', 'increase')
    expect(onResetContentControls).toHaveBeenCalledTimes(1)
  })
})
