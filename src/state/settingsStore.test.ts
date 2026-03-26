import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_APP_SETTINGS } from './defaultSettings'
import { loadAppSettings, saveAppSettings } from './settingsStore'

describe('settingsStore', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('ritorna i default se localStorage e vuoto', () => {
    expect(loadAppSettings()).toEqual(DEFAULT_APP_SETTINGS)
  })

  it('salva e rilegge le impostazioni persistite', () => {
    const nextSettings = {
      ...DEFAULT_APP_SETTINGS,
      selectedView: 'EXTERNAL' as const,
      footer: {
        ...DEFAULT_APP_SETTINGS.footer,
        allergensLineIt: 'Allergeni personalizzati',
      },
    }

    saveAppSettings(nextSettings)

    expect(loadAppSettings()).toEqual(nextSettings)
  })
})
