import { type MenuItem } from '../../domain/menu'

export interface GroupedMenuItems {
  category: string
  categoryEn: string
  items: MenuItem[]
}

export function groupMenuItems(items: MenuItem[]): GroupedMenuItems[] {
  const byCategory = new Map<string, MenuItem[]>()

  const ordered = [...items].sort((a, b) => a.order - b.order)
  for (const item of ordered) {
    const existing = byCategory.get(item.category)
    if (existing) {
      existing.push(item)
      continue
    }
    byCategory.set(item.category, [item])
  }

  return [...byCategory.entries()].map(([category, groupItems]) => ({
    category,
    categoryEn: groupItems.find((item) => item.categoryEn.trim().length > 0)?.categoryEn ?? '',
    items: groupItems,
  }))
}
