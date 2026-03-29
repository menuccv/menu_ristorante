import { SidebarControls } from './components/SidebarControls'
import { PreviewPane } from './components/PreviewPane'
import { useMenuPrintApp } from './hooks/useMenuPrintApp'
import { exportMenuPdfFromPreview } from '../print/utils/exportMenuPdf'

export function App() {
  const {
    menuData,
    selectedView,
    contentControls,
    setSelectedView,
    adjustContentControl,
    resetContentControls,
  } = useMenuPrintApp()

  const handleExportPdf = async () => {
    try {
      await exportMenuPdfFromPreview()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Impossibile esportare il PDF dalla preview.'
      console.error(message)
    }
  }

  return (
    <div className="app-shell">
      <SidebarControls
        selectedView={selectedView}
        onChangeView={setSelectedView}
        onExportPdf={handleExportPdf}
        contentControls={contentControls}
        onAdjustContentControl={adjustContentControl}
        onResetContentControls={resetContentControls}
      />
      <PreviewPane
        view={selectedView}
        items={menuData?.items ?? []}
        contentControls={contentControls}
      />
      <p className="device-warning">
        Questa build e' ottimizzata per iPad/tablet. Usa almeno 768px di viewport.
      </p>
    </div>
  )
}
