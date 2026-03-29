import { type ContentControls } from '../domain/menu'

export type ContentControlId = keyof ContentControls

interface ContentControlConfig {
  id: ContentControlId
  label: string
  unit: '%' | 'mm'
  min: number
  max: number
  step: number
}

const MAX_CATEGORY_LAYOUT_PRESSURE = 1.5

export const CONTENT_CONTROL_CONFIGS: ContentControlConfig[] = [
  {
    id: 'zoomPercent',
    label: 'Zoom Menù',
    unit: '%',
    min: 85,
    max: 115,
    step: 1,
  },
  {
    id: 'offsetYmm',
    label: 'Sposta Menù',
    unit: 'mm',
    min: -14,
    max: 14,
    step: 1,
  },
  {
    id: 'fontScalePercent',
    label: 'Dimensione font',
    unit: '%',
    min: 88,
    max: 130,
    step: 1,
  },
  {
    id: 'lineHeightPercent',
    label: 'Interspazio righe',
    unit: '%',
    min: 88,
    max: 150,
    step: 1,
  },
]

const CONTENT_CONTROL_CONFIG_BY_ID = Object.fromEntries(
  CONTENT_CONTROL_CONFIGS.map((config) => [config.id, config]),
) as Record<ContentControlId, ContentControlConfig>

export const DEFAULT_CONTENT_CONTROLS: ContentControls = {
  zoomPercent: 100,
  offsetYmm: 0,
  fontScalePercent: 100,
  lineHeightPercent: 100,
}

function clampValue(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function getLayoutPressure(fontScalePercent: number, lineHeightPercent: number): number {
  return (fontScalePercent / 100) * (lineHeightPercent / 100)
}

function getMaxLineHeightForFont(fontScalePercent: number): number {
  return Math.floor((MAX_CATEGORY_LAYOUT_PRESSURE * 10000) / fontScalePercent)
}

function getMaxFontScaleForLineHeight(lineHeightPercent: number): number {
  return Math.floor((MAX_CATEGORY_LAYOUT_PRESSURE * 10000) / lineHeightPercent)
}

function clampTypographyPair(
  fontScalePercent: number,
  lineHeightPercent: number,
): Pick<ContentControls, 'fontScalePercent' | 'lineHeightPercent'> {
  let font = clampContentControlValue('fontScalePercent', fontScalePercent)
  let line = clampContentControlValue('lineHeightPercent', lineHeightPercent)

  const lineConfig = CONTENT_CONTROL_CONFIG_BY_ID.lineHeightPercent
  const fontConfig = CONTENT_CONTROL_CONFIG_BY_ID.fontScalePercent

  line = clampValue(line, lineConfig.min, Math.min(lineConfig.max, getMaxLineHeightForFont(font)))

  if (getLayoutPressure(font, line) > MAX_CATEGORY_LAYOUT_PRESSURE) {
    font = clampValue(
      font,
      fontConfig.min,
      Math.min(fontConfig.max, getMaxFontScaleForLineHeight(line)),
    )
  }

  return {
    fontScalePercent: font,
    lineHeightPercent: line,
  }
}

export function clampContentControlValue(id: ContentControlId, value: number): number {
  const config = CONTENT_CONTROL_CONFIG_BY_ID[id]
  return clampValue(Math.round(value), config.min, config.max)
}

export function normalizeContentControls(
  candidate: Partial<ContentControls> | undefined,
): ContentControls {
  const normalizedTypography = clampTypographyPair(
    candidate?.fontScalePercent ?? DEFAULT_CONTENT_CONTROLS.fontScalePercent,
    candidate?.lineHeightPercent ?? DEFAULT_CONTENT_CONTROLS.lineHeightPercent,
  )

  return {
    zoomPercent: clampContentControlValue(
      'zoomPercent',
      candidate?.zoomPercent ?? DEFAULT_CONTENT_CONTROLS.zoomPercent,
    ),
    offsetYmm: clampContentControlValue(
      'offsetYmm',
      candidate?.offsetYmm ?? DEFAULT_CONTENT_CONTROLS.offsetYmm,
    ),
    fontScalePercent: normalizedTypography.fontScalePercent,
    lineHeightPercent: normalizedTypography.lineHeightPercent,
  }
}

export function stepContentControlValue(
  controls: ContentControls,
  id: ContentControlId,
  direction: 'decrease' | 'increase',
): ContentControls {
  const config = CONTENT_CONTROL_CONFIG_BY_ID[id]
  const delta = direction === 'increase' ? config.step : -config.step

  const nextControls = {
    ...controls,
    [id]: clampContentControlValue(id, controls[id] + delta),
  }

  if (id === 'fontScalePercent' || id === 'lineHeightPercent') {
    const normalizedTypography = clampTypographyPair(
      nextControls.fontScalePercent,
      nextControls.lineHeightPercent,
    )
    return {
      ...nextControls,
      fontScalePercent: normalizedTypography.fontScalePercent,
      lineHeightPercent: normalizedTypography.lineHeightPercent,
    }
  }

  return nextControls
}

export function isAtBoundary(
  controls: ContentControls,
  id: ContentControlId,
  direction: 'decrease' | 'increase',
): boolean {
  const config = CONTENT_CONTROL_CONFIG_BY_ID[id]
  if (direction === 'decrease') {
    return controls[id] <= config.min
  }

  if (id === 'fontScalePercent') {
    const dynamicMax = Math.min(
      config.max,
      getMaxFontScaleForLineHeight(controls.lineHeightPercent),
    )
    return controls.fontScalePercent >= dynamicMax
  }

  if (id === 'lineHeightPercent') {
    const dynamicMax = Math.min(
      config.max,
      getMaxLineHeightForFont(controls.fontScalePercent),
    )
    return controls.lineHeightPercent >= dynamicMax
  }

  return controls[id] >= config.max
}
