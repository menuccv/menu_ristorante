type SectionTitleLanguage = 'IT' | 'EN'

function normalizeText(value: string | undefined): string {
  return value?.trim() ?? ''
}

export function resolveSectionTitle(
  category: string,
  language: SectionTitleLanguage,
  categoryEnFromSheet?: string,
): string {
  const titleIt = normalizeText(category)
  if (language === 'IT') {
    return titleIt
  }
  return normalizeText(categoryEnFromSheet) || titleIt
}
