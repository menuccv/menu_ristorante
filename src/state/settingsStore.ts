import { type AppSettings } from '../domain/menu'
import { DEFAULT_CONTENT_CONTROLS } from './contentControls'
import { normalizeContentControls } from './contentControls'
import { DEFAULT_APP_SETTINGS } from './defaultSettings'

const STORAGE_KEY = 'menu-print-app-settings-v3'
const CONTENT_CONTROLS_BASELINE_VERSION = 2
const LEGACY_STORAGE_KEYS = [
  'menu-print-app-settings-v2',
  'menu-print-app-settings-v1',
] as const

type PersistedAppSettings = Partial<AppSettings> & {
  contentControlsBaselineVersion?: number
}

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
  }
}

export function loadAppSettings(): AppSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_APP_SETTINGS
  }

  const serialized = window.localStorage.getItem(STORAGE_KEY)
  if (serialized) {
    try {
      const parsed = JSON.parse(serialized) as PersistedAppSettings
      const shouldResetContentControls =
        parsed.contentControlsBaselineVersion !== CONTENT_CONTROLS_BASELINE_VERSION

      return mergeSettings({
        ...parsed,
        contentControls: shouldResetContentControls
          ? { ...DEFAULT_CONTENT_CONTROLS }
          : parsed.contentControls,
      })
    } catch {
      return DEFAULT_APP_SETTINGS
    }
  }

  // One-time migration: keep legacy user settings, but restore current canonical default
  // content controls so new visual defaults apply without manual sidebar resets.
  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    const legacySerialized = window.localStorage.getItem(legacyKey)
    if (!legacySerialized) {
      continue
    }

    try {
      const legacyParsed = JSON.parse(legacySerialized) as Partial<AppSettings>
      return mergeSettings({
        ...legacyParsed,
        contentControls: { ...DEFAULT_CONTENT_CONTROLS },
      })
    } catch {
      continue
    }
  }

  return DEFAULT_APP_SETTINGS
}

export function saveAppSettings(settings: AppSettings): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...settings,
      contentControlsBaselineVersion: CONTENT_CONTROLS_BASELINE_VERSION,
    }),
  )
}
