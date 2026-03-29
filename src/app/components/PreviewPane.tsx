import { type CSSProperties, useEffect, useRef, useState } from 'react'
import {
  type ContentControls,
  type MenuItem,
  type MenuView,
} from '../../domain/menu'
import { ExternalMenuTemplate } from '../../print/templates/ExternalMenuTemplate'
import { InternalMenuTemplate } from '../../print/templates/InternalMenuTemplate'

interface PreviewPaneProps {
  view: MenuView
  items: MenuItem[]
  contentControls: ContentControls
}

const MM_TO_PX = 96 / 25.4
const A4_WIDTH_MM = 210
const A4_WIDTH_PX = A4_WIDTH_MM * MM_TO_PX

export function PreviewPane({
  view,
  items,
  contentControls,
}: PreviewPaneProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [previewScale, setPreviewScale] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const computeScale = () => {
      const styles = window.getComputedStyle(canvas)
      const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0
      const paddingRight = Number.parseFloat(styles.paddingRight) || 0
      const availableWidth = canvas.clientWidth - paddingLeft - paddingRight

      if (availableWidth <= 0) {
        setPreviewScale(1)
        return
      }

      const nextScale = Math.min(1, availableWidth / A4_WIDTH_PX)
      setPreviewScale((current) =>
        Math.abs(current - nextScale) < 0.001 ? current : nextScale,
      )
    }

    computeScale()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', computeScale)
      return () => {
        window.removeEventListener('resize', computeScale)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      computeScale()
    })

    resizeObserver.observe(canvas)
    window.addEventListener('resize', computeScale)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', computeScale)
    }
  }, [])

  const contentStyle = {
    '--menu-content-scale': String(contentControls.zoomPercent / 100),
    '--menu-content-offset-y': `${contentControls.offsetYmm}mm`,
    '--menu-content-font-scale': String(contentControls.fontScalePercent / 100),
    '--menu-content-line-height-scale': String(contentControls.lineHeightPercent / 100),
  } as CSSProperties

  const previewStyle = {
    '--preview-sheet-scale': String(previewScale),
  } as CSSProperties

  return (
    <main className="preview-pane">
      <div className="preview-pane__canvas" aria-label="Area anteprima A4" ref={canvasRef}>
        <div className="preview-pane__sheet-frame" style={previewStyle}>
          <div className="preview-pane__sheet-scale">
            {view === 'EXTERNAL' ? (
              <ExternalMenuTemplate
                items={items}
                contentStyle={contentStyle}
              />
            ) : (
              <InternalMenuTemplate
                items={items}
                language={view === 'IT' ? 'IT' : 'EN'}
                contentStyle={contentStyle}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
