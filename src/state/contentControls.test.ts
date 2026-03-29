import { describe, expect, it } from 'vitest'
import {
  isAtBoundary,
  normalizeContentControls,
  stepContentControlValue,
} from './contentControls'

describe('contentControls typography guard', () => {
  it('clampa combinazioni estreme in normalizzazione per evitare overlap', () => {
    const normalized = normalizeContentControls({
      fontScalePercent: 130,
      lineHeightPercent: 150,
      zoomPercent: 100,
      offsetYmm: 0,
    })

    expect(normalized.fontScalePercent).toBe(130)
    expect(normalized.lineHeightPercent).toBe(115)
  })

  it('blocca incremento interspazio quando il font e gia al massimo sostenibile', () => {
    const next = stepContentControlValue(
      {
        zoomPercent: 100,
        offsetYmm: 0,
        fontScalePercent: 130,
        lineHeightPercent: 115,
      },
      'lineHeightPercent',
      'increase',
    )

    expect(next.lineHeightPercent).toBe(115)
    expect(next.fontScalePercent).toBe(130)
  })

  it('mostra boundary dinamico per interspazio in base al font attuale', () => {
    const controls = {
      zoomPercent: 100,
      offsetYmm: 0,
      fontScalePercent: 130,
      lineHeightPercent: 115,
    }

    expect(isAtBoundary(controls, 'lineHeightPercent', 'increase')).toBe(true)
    expect(isAtBoundary(controls, 'fontScalePercent', 'increase')).toBe(true)
  })
})
