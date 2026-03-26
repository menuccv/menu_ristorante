import { type AppSettings } from '../domain/menu'
import { normalizeContentControls } from './contentControls'
import { DEFAULT_APP_SETTINGS } from './defaultSettings'
import { normalizeSectionTitleTranslations } from './sectionTitleTranslations'

const STORAGE_KEY = 'menu-print-app-settings-v1'

function mergeSettings(candidate: Partial<AppSettings> | null): AppSettings {
  return {
    selectedView: candidate?.selectedView ?? DEFAULT_APP_SETTINGS.selectedView,
    footer: {
      allergensLineIt:
        candidate?.footer?.allergensLineIt ?? DEFAULT_APP_SETTINGS.footer.allergensLineIt,
      allergensLineEn:
        candidate?.footer?.allergensLineEn ?? DEFAULT_APP_SETTINGS.footer.allergensLineEn,
      breadServiceLineIt:
        candidate?.footer?.breadServiceLineIt ??
        DEFAULT_APP_SETTINGS.footer.breadServiceLineIt,
      breadServiceLineEn:
        candidate?.footer?.breadServiceLineEn ??
        DEFAULT_APP_SETTINGS.footer.breadServiceLineEn,
    },
    contentControls: normalizeContentControls(candidate?.contentControls),
    sectionTitleTranslations: normalizeSectionTitleTranslations(
      candidate?.sectionTitleTranslations,
    ),
  }
}

export function loadAppSettings(): AppSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_APP_SETTINGS
  }

  const serialized = window.localStorage.getItem(STORAGE_KEY)
  if (!serialized) {
    return DEFAULT_APP_SETTINGS
  }

  try {
    const parsed = JSON.parse(serialized) as Partial<AppSettings>
    return mergeSettings(parsed)
  } catch {
    return DEFAULT_APP_SETTINGS
  }
}

export function saveAppSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}
