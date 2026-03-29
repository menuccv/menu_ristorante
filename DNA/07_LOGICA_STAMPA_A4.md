# Logica Stampa A4

## Principio

La UI e progettata print-first, con misure in millimetri per ridurre drift tra preview e stampa.

## Regole CSS fondamentali

- `@page { size: A4 portrait; margin: 0; }`
- `.a4-sheet` con `width: 210mm`, `min-height: 297mm`
- Margini laterali foglio definiti da variabile canonica (`--sheet-pad-x`) condivisa da contenuto e footer
- Footer posizionato in fondo pagina (`position: absolute`)
- In stampa la sidebar viene nascosta
- Per il template interno (IT/EN), categorie centrate in uppercase con linee laterali
- Per il template interno (IT/EN), riga piatto a 3 colonne fisse: allergeni, titolo, prezzo
- Footer interno con blocco stabile: `Pane & Coperto 3` / `Service 3` + legenda allergeni completa
- Footer interno centrato con gerarchia finale: service line dominante + legenda subordinata
- Legenda allergeni del footer con numeri in grassetto e distribuzione su larghezza utile del foglio
- Sezioni interne strutturate a blocchi `header + content` con metrica verticale canonica legata a `--menu-content-line-height-scale`
- Distanza `titolo categoria -> primo piatto` uniforme su tutte le sezioni, inclusa l'ultima (`Dessert`)
- La distanza canonica `titolo -> primo piatto` resta fissa anche variando `Interspazio righe`, per evitare disallineamenti tra categorie
- Nessuna eccezione `last-child` per l'ultima categoria: ritmo verticale uniforme fino al footer
- Hardening stampa: `break-inside: avoid` su sezioni, righe e footer
- Palette foglio A4 dedicata in scala di grigi/nero (indipendente dalla palette sidebar)
- In stampa, il body A4 evita la `scale()` per ridurre rischio rasterizzazione/blur tipografico
- In stampa, palette/linee/pesi tipografici sono alleggeriti con override canonici in `src/styles/print.css`
- Zoom contenuto gestito su wrapper interno (`.a4-sheet__content`) con compensazione larghezza (`width: calc(100% / scale)`) per mantenere fissi i margini laterali
- Griglia interna righe menu calibrata per avvicinare la colonna prezzi al testo piatti senza alterare i margini foglio
- Per il template EXTERNAL:
  - pagina A4 verticale dedicata (non copia del template interno)
  - header con solo logo locale centrato (`logo_ccv.png`)
  - categorie solo in italiano
  - righe piatto con IT principale + EN di supporto visivo + prezzo a destra
  - nessun allergene riga e nessun footer tecnico allergeni

## Obiettivo tecnico

Allineare nel tempo:

- anteprima in app
- print preview browser
- export PDF da preview A4 (`Esporta PDF` -> file PDF diretto)
- foglio stampato reale

L'export PDF usa una pipeline dedicata che cattura la preview A4 (`.a4-sheet`) su clone non scalato e genera un file PDF A4 su singola pagina senza header/footer browser (URL, data, numerazione pagine).
