import { type CSSProperties } from 'react'
import {
  type ContentControls,
  type MenuItem,
  type MenuView,
  type SectionTitleTranslations,
} from '../../domain/menu'
import { ExternalMenuTemplate } from '../../print/templates/ExternalMenuTemplate'
import { InternalMenuTemplate } from '../../print/templates/InternalMenuTemplate'

interface PreviewPaneProps {
  view: MenuView
  items: MenuItem[]
  contentControls: ContentControls
  sectionTitleTranslations: SectionTitleTranslations
}

export function PreviewPane({
  view,
  items,
  contentControls,
  sectionTitleTranslations,
}: PreviewPaneProps) {
  const contentStyle = {
    '--menu-content-scale': String(contentControls.zoomPercent / 100),
    '--menu-content-offset-y': `${contentControls.offsetYmm}mm`,
    '--menu-content-font-scale': String(contentControls.fontScalePercent / 100),
    '--menu-content-line-height-scale': String(contentControls.lineHeightPercent / 100),
  } as CSSProperties

  return (
    <main className="preview-pane">
      <div className="preview-pane__canvas" aria-label="Area anteprima A4">
        {view === 'EXTERNAL' ? (
          <ExternalMenuTemplate
            items={items}
            contentStyle={contentStyle}
            sectionTitleTranslations={sectionTitleTranslations}
          />
        ) : (
          <InternalMenuTemplate
            items={items}
            language={view === 'IT' ? 'IT' : 'EN'}
            contentStyle={contentStyle}
            sectionTitleTranslations={sectionTitleTranslations}
          />
        )}
      </div>
    </main>
  )
}
