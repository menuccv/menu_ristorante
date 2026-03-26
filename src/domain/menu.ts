export type MenuView = 'IT' | 'EN' | 'EXTERNAL'

export interface MenuItem {
  id: string
  order: number
  category: string
  titleIt: string
  titleEn: string
  price: string
  allergens: string
}

export interface MenuDataset {
  items: MenuItem[]
  source: {
    url: string
    fetchedAt: string
  }
}

export interface FooterCopy {
  allergensLineIt: string
  allergensLineEn: string
  breadServiceLineIt: string
  breadServiceLineEn: string
}

export interface ContentControls {
  zoomPercent: number
  offsetYmm: number
  fontScalePercent: number
  lineHeightPercent: number
}

export interface SectionTitleTranslation {
  titleIt: string
  titleEn: string
}

export type SectionTitleTranslations = Record<string, SectionTitleTranslation>

export interface AppSettings {
  selectedView: MenuView
  footer: FooterCopy
  contentControls: ContentControls
  sectionTitleTranslations: SectionTitleTranslations
}

export type LoadStatus = 'idle' | 'loading' | 'ready' | 'error'
