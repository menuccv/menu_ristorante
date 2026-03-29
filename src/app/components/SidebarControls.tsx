import { GOOGLE_SHEET_EDIT_URL } from '../../config/googleSheet'
import { type ContentControls, type MenuView } from '../../domain/menu'
import {
  CONTENT_CONTROL_CONFIGS,
  type ContentControlId,
  isAtBoundary,
} from '../../state/contentControls'
import { SidebarStepperControl } from './SidebarStepperControl'

interface SidebarControlsProps {
  selectedView: MenuView
  contentControls: ContentControls
  onChangeView: (view: MenuView) => void
  onAdjustContentControl: (
    id: ContentControlId,
    direction: 'decrease' | 'increase',
  ) => void
  onResetContentControls: () => void
  onExportPdf: () => void
}

const VIEW_OPTIONS: ReadonlyArray<{ value: MenuView; label: string }> = [
  { value: 'IT', label: 'ITALIANO' },
  { value: 'EN', label: 'INGLESE' },
  { value: 'EXTERNAL', label: 'ESTERNO' },
]

export function SidebarControls({
  selectedView,
  contentControls,
  onChangeView,
  onAdjustContentControl,
  onResetContentControls,
  onExportPdf,
}: SidebarControlsProps) {
  const formatValue = (id: ContentControlId): string => {
    const value = contentControls[id]
    if (id === 'offsetYmm') {
      return `${value > 0 ? '+' : ''}${value} mm`
    }
    return `${value}%`
  }

  return (
    <aside className="app-sidebar">
      <section className="control-block" aria-label="Selettore vista">
        <div className="view-switch">
          {VIEW_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                option.value === selectedView
                  ? 'view-switch__btn is-active'
                  : 'view-switch__btn'
              }
              onClick={() => onChangeView(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <section className="control-block" aria-label="Controlli contenuto foglio">
        <div className="stepper-grid">
          {CONTENT_CONTROL_CONFIGS.map((control) => (
            <SidebarStepperControl
              key={control.id}
              label={control.label}
              valueText={formatValue(control.id)}
              onDecrease={() => onAdjustContentControl(control.id, 'decrease')}
              onIncrease={() => onAdjustContentControl(control.id, 'increase')}
              isDecreaseDisabled={isAtBoundary(
                contentControls,
                control.id,
                'decrease',
              )}
              isIncreaseDisabled={isAtBoundary(
                contentControls,
                control.id,
                'increase',
              )}
            />
          ))}
        </div>
        <button
          type="button"
          className="control-reset-btn"
          onClick={onResetContentControls}
        >
          Reset Contenuto
        </button>
      </section>

      <section className="control-block" aria-label="Azioni">
        <button
          type="button"
          className="action-btn action-btn--pdf"
          onClick={onExportPdf}
        >
          Esporta PDF
        </button>
        <a
          className="action-btn action-btn--sheet"
          href={GOOGLE_SHEET_EDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Sheet
        </a>
      </section>
    </aside>
  )
}
