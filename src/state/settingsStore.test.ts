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

  it('riallinea i content controls se trova v3 senza marker baseline', () => {
    const staleV3 = {
      ...DEFAULT_APP_SETTINGS,
      contentControls: {
        ...DEFAULT_APP_SETTINGS.contentControls,
        lineHeightPercent: 118,
      },
    }

    window.localStorage.setItem('menu-print-app-settings-v3', JSON.stringify(staleV3))

    const migrated = loadAppSettings()
    expect(migrated.contentControls).toEqual(DEFAULT_APP_SETTINGS.contentControls)
  })

  it('riallinea i content controls se trova v3 con baseline precedente', () => {
    const staleV3 = {
      ...DEFAULT_APP_SETTINGS,
      contentControls: {
        ...DEFAULT_APP_SETTINGS.contentControls,
        lineHeightPercent: 120,
      },
      contentControlsBaselineVersion: 1,
    }

    window.localStorage.setItem('menu-print-app-settings-v3', JSON.stringify(staleV3))

    const migrated = loadAppSettings()
    expect(migrated.contentControls).toEqual(DEFAULT_APP_SETTINGS.contentControls)
  })

  it('migra da v2 mantenendo impostazioni e ripristinando default content controls', () => {
    const legacySettings = {
      ...DEFAULT_APP_SETTINGS,
      selectedView: 'EN' as const,
      contentControls: {
        ...DEFAULT_APP_SETTINGS.contentControls,
        lineHeightPercent: 118,
      },
      sectionTitleTranslations: {
        antipasti: {
          titleIt: 'Antipasti',
          titleEn: 'Starter',
        },
      },
    }

    window.localStorage.setItem('menu-print-app-settings-v2', JSON.stringify(legacySettings))

    const migrated = loadAppSettings()
    expect(migrated.selectedView).toBe('EN')
    expect(migrated.sectionTitleTranslations).toEqual(legacySettings.sectionTitleTranslations)
    expect(migrated.contentControls).toEqual(DEFAULT_APP_SETTINGS.contentControls)
  })

  it('migra da v1 se v2 non e presente', () => {
    const legacySettings = {
      ...DEFAULT_APP_SETTINGS,
      selectedView: 'IT' as const,
      contentControls: {
        ...DEFAULT_APP_SETTINGS.contentControls,
        lineHeightPercent: 120,
      },
    }

    window.localStorage.setItem('menu-print-app-settings-v1', JSON.stringify(legacySettings))

    const migrated = loadAppSettings()
    expect(migrated.selectedView).toBe('IT')
    expect(migrated.contentControls).toEqual(DEFAULT_APP_SETTINGS.contentControls)
  })
})
