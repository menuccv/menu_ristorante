import { useMemo } from 'react'
import { SidebarControls } from './components/SidebarControls'
import { PreviewPane } from './components/PreviewPane'
import { useMenuPrintApp } from './hooks/useMenuPrintApp'

export function App() {
  const {
    menuData,
    selectedView,
    contentControls,
    sectionTitleTranslations,
    setSelectedView,
    adjustContentControl,
    resetContentControls,
    saveSectionTitleTranslations,
  } = useMenuPrintApp()

  const categories = useMemo(() => {
    const seen = new Set<string>()
    const orderedCategories: string[] = []

    for (const item of menuData?.items ?? []) {
      if (seen.has(item.category)) {
        continue
      }
      seen.add(item.category)
      orderedCategories.push(item.category)
    }

    return orderedCategories
  }, [menuData])

  return (
    <div className="app-shell">
      <SidebarControls
        selectedView={selectedView}
        onChangeView={setSelectedView}
        onPrint={() => {
          window.print()
        }}
        contentControls={contentControls}
        onAdjustContentControl={adjustContentControl}
        onResetContentControls={resetContentControls}
        categories={categories}
        sectionTitleTranslations={sectionTitleTranslations}
        onSaveSectionTitleTranslations={saveSectionTitleTranslations}
      />
      <PreviewPane
        view={selectedView}
        items={menuData?.items ?? []}
        contentControls={contentControls}
        sectionTitleTranslations={sectionTitleTranslations}
      />
      <p className="device-warning">
        Questa build e' ottimizzata per iPad/tablet. Usa almeno 768px di viewport.
      </p>
    </div>
  )
}
