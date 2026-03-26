import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fetchMenuFromSheet } from '../../data/googleSheets/menuRepository'
import {
  type ContentControls,
  type FooterCopy,
  type LoadStatus,
  type MenuDataset,
  type MenuView,
  type SectionTitleTranslations,
} from '../../domain/menu'
import {
  type ContentControlId,
  DEFAULT_CONTENT_CONTROLS,
  stepContentControlValue,
} from '../../state/contentControls'
import { normalizeSectionTitleTranslations } from '../../state/sectionTitleTranslations'
import { loadAppSettings, saveAppSettings } from '../../state/settingsStore'

interface UseMenuPrintAppResult {
  status: LoadStatus
  errorMessage: string
  menuData: MenuDataset | null
  selectedView: MenuView
  footerCopy: FooterCopy
  contentControls: ContentControls
  sectionTitleTranslations: SectionTitleTranslations
  setSelectedView: (view: MenuView) => void
  adjustContentControl: (
    id: ContentControlId,
    direction: 'decrease' | 'increase',
  ) => void
  resetContentControls: () => void
  saveSectionTitleTranslations: (translations: SectionTitleTranslations) => void
}

export function useMenuPrintApp(): UseMenuPrintAppResult {
  const [settings, setSettings] = useState(loadAppSettings)
  const [status, setStatus] = useState<LoadStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [menuData, setMenuData] = useState<MenuDataset | null>(null)
  const isLoadInProgressRef = useRef(false)

  useEffect(() => {
    saveAppSettings(settings)
  }, [settings])

  const loadData = useCallback(async (signal?: AbortSignal) => {
    if (isLoadInProgressRef.current) {
      return
    }

    isLoadInProgressRef.current = true
    setStatus((current) => (current === 'ready' ? current : 'loading'))
    setErrorMessage('')

    try {
      const nextData = await fetchMenuFromSheet(signal)
      setMenuData(nextData)
      setStatus('ready')
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return
      }

      const fallbackMessage = 'Impossibile caricare i dati da Google Sheet.'
      setErrorMessage(error instanceof Error ? error.message : fallbackMessage)
      setStatus('error')
    } finally {
      isLoadInProgressRef.current = false
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const timerId = window.setTimeout(() => {
      void loadData(controller.signal)
    }, 0)

    return () => {
      window.clearTimeout(timerId)
      controller.abort()
    }
  }, [loadData])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void loadData()
    }, 45000)

    const syncWhenVisible = () => {
      if (document.visibilityState === 'visible') {
        void loadData()
      }
    }

    const syncOnFocus = () => {
      void loadData()
    }

    document.addEventListener('visibilitychange', syncWhenVisible)
    window.addEventListener('focus', syncOnFocus)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', syncWhenVisible)
      window.removeEventListener('focus', syncOnFocus)
    }
  }, [loadData])

  const setSelectedView = useCallback((view: MenuView) => {
    setSettings((current) => ({
      ...current,
      selectedView: view,
    }))
  }, [])

  const adjustContentControl = useCallback(
    (id: ContentControlId, direction: 'decrease' | 'increase') => {
      setSettings((current) => ({
        ...current,
        contentControls: stepContentControlValue(current.contentControls, id, direction),
      }))
    },
    [],
  )

  const resetContentControls = useCallback(() => {
    setSettings((current) => ({
      ...current,
      contentControls: { ...DEFAULT_CONTENT_CONTROLS },
    }))
  }, [])

  const saveSectionTitleTranslations = useCallback(
    (translations: SectionTitleTranslations) => {
      setSettings((current) => ({
        ...current,
        sectionTitleTranslations: normalizeSectionTitleTranslations(translations),
      }))
    },
    [],
  )

  return useMemo(
    () => ({
      status,
      errorMessage,
      menuData,
      selectedView: settings.selectedView,
      footerCopy: settings.footer,
      contentControls: settings.contentControls,
      sectionTitleTranslations: settings.sectionTitleTranslations,
      setSelectedView,
      adjustContentControl,
      resetContentControls,
      saveSectionTitleTranslations,
    }),
    [
      adjustContentControl,
      resetContentControls,
      saveSectionTitleTranslations,
      errorMessage,
      menuData,
      setSelectedView,
      settings.contentControls,
      settings.footer,
      settings.sectionTitleTranslations,
      settings.selectedView,
      status,
    ],
  )
}
