const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const EXPORT_SCALE = 2

function buildFileName(): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  return `menu-${yyyy}${mm}${dd}.pdf`
}

function findPrintableSheet(): HTMLElement {
  const sheet = document.querySelector<HTMLElement>('.preview-pane .a4-sheet')
  if (!sheet) {
    throw new Error('Anteprima A4 non disponibile per export PDF.')
  }
  return sheet
}

function mountExportClone(source: HTMLElement): {
  clone: HTMLElement
  cleanup: () => void
} {
  const mountRoot = document.createElement('div')
  mountRoot.style.position = 'fixed'
  mountRoot.style.left = '-100000px'
  mountRoot.style.top = '0'
  mountRoot.style.pointerEvents = 'none'
  mountRoot.style.opacity = '0'
  mountRoot.setAttribute('aria-hidden', 'true')

  const clone = source.cloneNode(true) as HTMLElement
  clone.style.border = 'none'
  clone.style.boxShadow = 'none'
  clone.style.margin = '0'
  clone.style.transform = 'none'
  clone.style.width = `${A4_WIDTH_MM}mm`
  clone.style.minHeight = `${A4_HEIGHT_MM}mm`
  clone.style.setProperty('--section-title-line-thickness', '0.18mm')

  mountRoot.appendChild(clone)
  document.body.appendChild(mountRoot)

  return {
    clone,
    cleanup: () => {
      mountRoot.remove()
    },
  }
}

export async function exportMenuPdfFromPreview(): Promise<void> {
  const sheet = findPrintableSheet()

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  await document.fonts.ready

  const { clone, cleanup } = mountExportClone(sheet)

  try {
    const canvas = await html2canvas(clone, {
      backgroundColor: '#ffffff',
      scale: EXPORT_SCALE,
      useCORS: true,
      logging: false,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight,
    })

    const imageData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    })

    // Forza 1 pagina A4 piena: evita pagine extra e disallineamenti nel print flow iPad.
    pdf.addImage(imageData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM)
    pdf.save(buildFileName())
  } finally {
    cleanup()
  }
}
