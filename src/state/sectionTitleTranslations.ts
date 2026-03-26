import {
  type SectionTitleTranslation,
  type SectionTitleTranslations,
} from '../domain/menu'

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') {
    return ''
  }
  return value.trim()
}

function normalizeEntry(value: unknown): SectionTitleTranslation {
  if (!value || typeof value !== 'object') {
    return {
      titleIt: '',
      titleEn: '',
    }
  }

  const candidate = value as Partial<SectionTitleTranslation>
  return {
    titleIt: normalizeText(candidate.titleIt),
    titleEn: normalizeText(candidate.titleEn),
  }
}

export function normalizeSectionTitleTranslations(
  value: unknown,
): SectionTitleTranslations {
  if (!value || typeof value !== 'object') {
    return {}
  }

  const entries = Object.entries(value as Record<string, unknown>).map(([category, entry]) => [
    category,
    normalizeEntry(entry),
  ])

  return Object.fromEntries(entries)
}
