import { type SectionTitleTranslations } from '../../domain/menu'

type SectionTitleLanguage = 'IT' | 'EN'

function normalizeText(value: string | undefined): string {
  return value?.trim() ?? ''
}

function getResolvedPair(category: string, translations: SectionTitleTranslations) {
  const source = translations[category]
  const fallbackIt = normalizeText(category)
  const titleIt = normalizeText(source?.titleIt) || fallbackIt
  const titleEn = normalizeText(source?.titleEn) || titleIt

  return {
    titleIt,
    titleEn,
  }
}

export function resolveSectionTitle(
  category: string,
  language: SectionTitleLanguage,
  translations: SectionTitleTranslations,
  categoryEnFromSheet?: string,
): string {
  const resolved = getResolvedPair(category, translations)
  if (language === 'IT') {
    return resolved.titleIt
  }
  return normalizeText(categoryEnFromSheet) || resolved.titleEn
}
