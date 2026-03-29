import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PreviewPane } from './PreviewPane'

const items = [
  {
    id: '1',
    order: 0,
    category: 'Primi',
    categoryEn: 'Homemade Fresh Pasta',
    titleIt: 'Risotto',
    titleEn: 'Risotto',
    price: '16',
    allergens: '7',
  },
]

const contentControls = {
  zoomPercent: 100,
  offsetYmm: 0,
  fontScalePercent: 100,
  lineHeightPercent: 100,
}

const sectionTitleTranslations = {
  Primi: {
    titleIt: 'Primi',
    titleEn: 'First Courses',
  },
}

describe('PreviewPane', () => {
  it('renderizza template interno per vista IT', () => {
    render(
      <PreviewPane
        view="IT"
        items={items}
        contentControls={contentControls}
        sectionTitleTranslations={sectionTitleTranslations}
      />,
    )

    expect(screen.getByText('Primi')).toBeInTheDocument()
    expect(screen.getByText('Risotto')).toBeInTheDocument()
  })

  it('renderizza template esterno per vista EXTERNAL', () => {
    render(
      <PreviewPane
        view="EXTERNAL"
        items={items}
        contentControls={contentControls}
        sectionTitleTranslations={sectionTitleTranslations}
      />,
    )

    expect(screen.getByAltText('Logo CCV')).toBeInTheDocument()
    expect(screen.getByText('Primi')).toBeInTheDocument()
    expect(screen.getAllByText('Risotto')).toHaveLength(2)
  })
})
