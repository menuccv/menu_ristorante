import { type AppSettings } from '../domain/menu'
import { DEFAULT_CONTENT_CONTROLS } from './contentControls'

export const DEFAULT_APP_SETTINGS: AppSettings = {
  selectedView: 'IT',
  footer: {
    allergensLineIt: 'Allergeni: consultare il personale per dettagli completi.',
    allergensLineEn: 'Allergens: ask our staff for full details.',
    breadServiceLineIt: 'Pane e coperto inclusi dove previsto dal menu.',
    breadServiceLineEn: 'Bread and service included where indicated by the menu.',
  },
  contentControls: DEFAULT_CONTENT_CONTROLS,
  sectionTitleTranslations: {},
}
