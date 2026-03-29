import { type CSSProperties } from 'react'
import { type MenuItem, type SectionTitleTranslations } from '../../domain/menu'
import { A4Sheet } from '../components/A4Sheet'
import { formatAllergensInline } from '../utils/formatAllergens'
import { groupMenuItems } from '../utils/groupMenuItems'
import { resolveSectionTitle } from '../utils/resolveSectionTitle'

interface InternalMenuTemplateProps {
  items: MenuItem[]
  language: 'IT' | 'EN'
  contentStyle?: CSSProperties
  sectionTitleTranslations: SectionTitleTranslations
}

function getItemLabel(item: MenuItem, language: 'IT' | 'EN'): string {
  if (language === 'IT') {
    return item.titleIt || item.titleEn
  }
  return item.titleEn || item.titleIt
}

function getSectionWeight(itemCount: number): number {
  return Math.max(1, itemCount)
}

const SERVICE_LINE_IT = 'Pane & Coperto 3'
const SERVICE_LINE_EN = 'Service 3'

const ALLERGEN_LEGEND_IT = [
  { code: '1', label: 'Glutine' },
  { code: '2', label: 'Lattosio' },
  { code: '3', label: 'Pesce' },
  { code: '4', label: 'Frutta Secca' },
  { code: '5', label: 'Sedano' },
  { code: '6', label: 'Uova' },
  { code: '7', label: 'Soia' },
  { code: '8', label: 'Funghi' },
  { code: '9', label: 'Sesamo' },
  { code: '10', label: 'Solfiti' },
  { code: '11', label: 'Senape' },
]

const ALLERGEN_LEGEND_EN = [
  { code: '1', label: 'Gluten' },
  { code: '2', label: 'Lactose' },
  { code: '3', label: 'Fish' },
  { code: '4', label: 'Tree Nuts' },
  { code: '5', label: 'Celery' },
  { code: '6', label: 'Eggs' },
  { code: '7', label: 'Soy' },
  { code: '8', label: 'Mushrooms' },
  { code: '9', label: 'Sesame' },
  { code: '10', label: 'Sulphites' },
  { code: '11', label: 'Mustard' },
]

export function InternalMenuTemplate({
  items,
  language,
  contentStyle,
  sectionTitleTranslations,
}: InternalMenuTemplateProps) {
  const groups = groupMenuItems(items)
  const isItalian = language === 'IT'
  const allergenLegend = isItalian ? ALLERGEN_LEGEND_IT : ALLERGEN_LEGEND_EN

  return (
    <A4Sheet
      variant="internal"
      contentStyle={contentStyle}
      footer={
        <>
          <p className="menu-footer__service-line">
            {isItalian ? SERVICE_LINE_IT : SERVICE_LINE_EN}
          </p>
          <div className="menu-footer__separator" aria-hidden />
          <div className="menu-footer__legend-row">
            {allergenLegend.map((item) => (
              <span key={item.code} className="menu-footer__legend-item">
                <strong className="menu-footer__legend-number">{item.code}.</strong>{' '}
                {item.label}
              </span>
            ))}
          </div>
        </>
      }
    >
      {groups.length === 0 ? (
        <p className="empty-message">Nessuna riga menu disponibile dal foglio.</p>
      ) : (
        groups.map((group) => (
          <section
            key={group.category}
            className="menu-section"
            style={{ '--section-weight': String(getSectionWeight(group.items.length)) } as CSSProperties}
          >
            <h3 className="menu-section__title">
              <span>
                {resolveSectionTitle(
                  group.category,
                  language,
                  sectionTitleTranslations,
                  group.categoryEn,
                )}
              </span>
            </h3>
            <div className="menu-section__content">
              <ul className="menu-list">
                {group.items.map((item) => {
                  const allergensLabel = formatAllergensInline(item.allergens)

                  return (
                    <li key={item.id} className="menu-item-row">
                      <p className="menu-item-row__allergens">{allergensLabel}</p>
                      <p className="menu-item-row__title">{getItemLabel(item, language)}</p>
                      <p className="menu-item-row__price">{item.price}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        ))
      )}
    </A4Sheet>
  )
}
