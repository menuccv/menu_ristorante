export function formatAllergensInline(allergens: string): string {
  const normalized = allergens.trim()
  if (!normalized) {
    return ''
  }

  const unwrapped = normalized.replace(/^\((.*)\)$/, '$1').trim()
  if (!unwrapped) {
    return ''
  }

  return `(${unwrapped})`
}
