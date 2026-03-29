import { describe, expect, it } from 'vitest'
import { resolveSectionTitle } from './resolveSectionTitle'

describe('resolveSectionTitle', () => {
  it('in vista EN priorizza Categoria EN del foglio', () => {
    const title = resolveSectionTitle('Primi', 'EN', 'Homemade Fresh Pasta')

    expect(title).toBe('Homemade Fresh Pasta')
  })

  it('in vista EN usa fallback su categoria IT se Categoria EN manca', () => {
    const title = resolveSectionTitle('Primi', 'EN')

    expect(title).toBe('Primi')
  })
})
