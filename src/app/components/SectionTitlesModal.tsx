import { type SectionTitleTranslations } from '../../domain/menu'

interface SectionTitlesModalProps {
  isOpen: boolean
  categories: string[]
  draftTranslations: SectionTitleTranslations
  onChangeField: (
    category: string,
    field: 'titleIt' | 'titleEn',
    value: string,
  ) => void
  onClose: () => void
  onSave: () => void
}

export function SectionTitlesModal({
  isOpen,
  categories,
  draftTranslations,
  onChangeField,
  onClose,
  onSave,
}: SectionTitlesModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <header className="modal-card__header">
          <h3 className="modal-card__title">Translate Titoli</h3>
          <p className="modal-card__subtitle">
            Gestione locale dei titoli sezione IT/EN
          </p>
        </header>

        {categories.length === 0 ? (
          <p className="modal-empty">Nessuna categoria disponibile dal menu corrente.</p>
        ) : (
          <div className="modal-grid">
            {categories.map((category) => (
              <section key={category} className="modal-row">
                <p className="modal-row__category">{category}</p>
                <div className="modal-row__fields">
                  <label className="modal-field">
                    <span className="modal-field__label">Titolo IT</span>
                    <input
                      className="modal-field__input"
                      value={draftTranslations[category]?.titleIt ?? category}
                      onChange={(event) => {
                        onChangeField(category, 'titleIt', event.target.value)
                      }}
                    />
                  </label>
                  <label className="modal-field">
                    <span className="modal-field__label">Titolo EN</span>
                    <input
                      className="modal-field__input"
                      value={draftTranslations[category]?.titleEn ?? ''}
                      onChange={(event) => {
                        onChangeField(category, 'titleEn', event.target.value)
                      }}
                      placeholder="Fallback automatico su IT"
                    />
                  </label>
                </div>
              </section>
            ))}
          </div>
        )}

        <footer className="modal-actions">
          <button type="button" className="modal-btn modal-btn--ghost" onClick={onClose}>
            Chiudi
          </button>
          <button type="button" className="modal-btn modal-btn--primary" onClick={onSave}>
            Salva Traduzioni
          </button>
        </footer>
      </div>
    </div>
  )
}
