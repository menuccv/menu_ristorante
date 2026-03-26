import { type CSSProperties } from 'react'
import { type MenuItem, type SectionTitleTranslations } from '../../domain/menu'
import { A4Sheet } from '../components/A4Sheet'
import { groupMenuItems } from '../utils/groupMenuItems'
import { resolveSectionTitle } from '../utils/resolveSectionTitle'

interface ExternalMenuTemplateProps {
  items: MenuItem[]
  contentStyle?: CSSProperties
  sectionTitleTranslations: SectionTitleTranslations
}

function getItalianLabel(item: MenuItem): string {
  return item.titleIt || item.titleEn
}

function getEnglishLabel(item: MenuItem): string {
  return item.titleEn || item.titleIt
}

export function ExternalMenuTemplate({
  items,
  contentStyle,
  sectionTitleTranslations,
}: ExternalMenuTemplateProps) {
  const groups = groupMenuItems(items)

  return (
    <A4Sheet variant="external" contentStyle={contentStyle}>
      {groups.length === 0 ? (
        <p className="empty-message">Nessuna riga menu disponibile dal foglio.</p>
      ) : (
        <div className="external-menu">
          <header className="external-menu__header">
            <img
              src="/logo_ccv.png"
              alt="Logo CCV"
              className="external-menu__logo"
            />
          </header>

          {groups.map((group) => (
            <section key={group.category} className="external-menu__section">
              <h3 className="external-menu__section-title">
                {resolveSectionTitle(group.category, 'IT', sectionTitleTranslations)}
              </h3>
              <ul className="external-menu__list">
                {group.items.map((item) => (
                  <li key={item.id} className="external-menu__item">
                    <div className="external-menu__item-copy">
                      <p className="external-menu__item-title-it">
                        {getItalianLabel(item)}
                      </p>
                      <p className="external-menu__item-title-en">
                        {getEnglishLabel(item)}
                      </p>
                    </div>
                    <p className="external-menu__item-price">{item.price}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </A4Sheet>
  )
}
