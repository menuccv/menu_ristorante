import { describe, expect, it } from 'vitest'
import { resolveSectionTitle } from './resolveSectionTitle'

describe('resolveSectionTitle', () => {
  it('in vista EN priorizza Categoria EN del foglio', () => {
    const title = resolveSectionTitle(
      'Primi',
      'EN',
      {
        Primi: {
          titleIt: 'Primi',
          titleEn: 'First Courses (locale)',
        },
      },
      'Homemade Fresh Pasta',
    )

    expect(title).toBe('Homemade Fresh Pasta')
  })

  it('in vista EN mantiene fallback locale se Categoria EN manca', () => {
    const title = resolveSectionTitle('Primi', 'EN', {
      Primi: {
        titleIt: 'Primi',
        titleEn: 'First Courses (locale)',
      },
    })

    expect(title).toBe('First Courses (locale)')
  })
})
