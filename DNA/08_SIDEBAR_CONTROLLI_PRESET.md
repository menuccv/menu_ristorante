# Sidebar Controlli e Preset

## Sidebar finale attuale

- Selettore vista (etichette UI): `ITALIANO`, `INGLESE`, `ESTERNO`
- Logica interna invariata: `MenuView = IT | EN | EXTERNAL`
- Controlli contenuto foglio:
  - `Zoom Menù` (85% - 115%)
  - `Sposta Menù` (-14mm - +14mm)
  - `Dimensione font` (88% - 130%)
  - `Interspazio righe` (88% - 125%, con tetto dinamico in base al font)
- Pulsante `Reset Contenuto`
- Pulsante `Translate Titoli` (modale locale IT/EN)
- Azione `Stampa`
- Pulsante link `Google Sheet` (verde, nuova tab)

## Regole layout sidebar consolidate

- Larghezza sidebar ridotta in modo strutturale di circa 10%:
  - desktop: `14.5rem`
  - breakpoint tablet: `12.9rem`
- Riduzione proporzionale di padding/gap interni
- Pulsanti `- / +` invariati (`2.4rem`)
- Box valori centrali ridotti con larghezza canonica (`4.05rem`)
- Nessun titolo box visivo (`Vista`, `Contenuto`, `Azioni` rimossi)

## Sincronizzazione dati

- Nessun pulsante manuale di refresh.
- Dati sincronizzati automaticamente:
  - al caricamento app
  - ogni 45 secondi
  - quando la finestra torna in focus
  - quando il tab torna visibile
- Hardening anti-overlap: trigger ravvicinati non avviano fetch concorrenti.

## Preset e persistenza locale

- `selectedView` persistito in localStorage
- `contentControls` persistiti in localStorage
- `sectionTitleTranslations` persistite in localStorage
- Footer copy modellato in `AppSettings`

## Separazione contenuto/footer

I controlli sidebar agiscono solo su `.a4-sheet__body` tramite CSS variables:
- `--menu-content-scale`
- `--menu-content-offset-y`
- `--menu-content-font-scale`
- `--menu-content-line-height-scale`

Il footer resta escluso dalle trasformazioni per mantenere stabilita stampa.
La distanza `titolo categoria -> primo piatto` resta canonica e non viene alterata dal controllo `Interspazio righe`.
`Dimensione font` e `Interspazio righe` sono ora accoppiati da un vincolo anti-overlap per prevenire collisioni tra categorie ai valori estremi.
Lo `Zoom Menù` agisce sul wrapper interno del contenuto con compensazione di larghezza, quindi i margini laterali del foglio restano coerenti.

## Traduzione titoli categoria

- Fonte: categorie reali rilevate dal menu caricato.
- Gestione: modale `Translate Titoli` con campi `Titolo IT` e `Titolo EN` per categoria.
- Persistenza: solo locale app (settings), nessuna scrittura su Google Sheet.
- Fallback:
  - vista `IT`: `Titolo IT` se presente, altrimenti categoria originale
  - vista `EN`: `Titolo EN` se presente, altrimenti `Titolo IT`, altrimenti categoria originale
