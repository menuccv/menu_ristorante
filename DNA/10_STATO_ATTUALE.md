# Stato Attuale del Progetto

## Stato generale

Stato operativo avanzato e stabile su base frontend-only, con flusso completo dati->template->export PDF.

## Funzioni operative

- App shell iPad con sidebar minimale e anteprima A4 centrale.
- Tre viste attive (`MenuView`): `IT`, `EN`, `EXTERNAL`.
- Etichette sidebar: `ITALIANO`, `INGLESE`, `ESTERNO`.
- Pulsante `Esporta PDF` attivo in sidebar (sopra `Google Sheet`, stile rosso testo bianco), unica azione output, collegato a export PDF diretto da preview A4.
- Nessun pulsante reload manuale: sync foglio automatica.
- Integrazione Google Sheet read-only via CSV.
- Parsing e mapping tipizzato dei dati menu.
- Hardening ingestione CSV:
  - supporto header reale `-*` come alias di `Titolo IT`
  - validazione payload fetch per rifiutare risposte HTML/non CSV
- Titoli sezione condivisi cross-device:
  - vista `IT`: `Categoria`
  - vista `EN`: `Categoria EN` (fallback su `Categoria`)
- Nessuna traduzione locale titoli sezione in app.
- Controlli contenuto con persistenza locale (zoom, offset, font, interspazio).
- Persistenza settings versionata in localStorage (`menu-print-app-settings-v3`) con baseline marker controlli contenuto (`contentControlsBaselineVersion = 2`).
- Footer fisso nel template interno; template EXTERNAL senza footer tecnico.
- CSS template consolidato in due moduli separati:
  - `menu-template.css` (logica IT/EN + regole condivise foglio A4)
  - `external-menu-template.css` (solo EXTERNAL)
- Tuning EXTERNAL corrente:
  - logo `logo_ccv.png` ridotto a `40.6mm` mantenendo proporzione (`height: auto`)
  - spazio `logo -> menu` ridotto (`external-menu__header.padding-bottom: 4.08mm`)
- Regola layout categoria consolidata:
  - distanza titolo->primo piatto uniforme
  - distanza titolo->primo piatto invariata anche quando cambia `Interspazio righe`
  - stessa regola anche per `Dessert`
  - interspazio righe piatti interno calibrato di default (`--category-row-gap: calc(2.1mm * var(--category-layout-scale))`), mantenendo invariati margine titolo->prima riga e centratura verticale dei blocchi categoria
  - metrica verticale guidata da `lineHeightPercent`
  - guardrail dinamico su `fontScalePercent` x `lineHeightPercent` (soglia `1.5`) per evitare overlap tra categorie
  - variabili di metrica categoria dichiarate sul wrapper `.a4-sheet__content` per coerenza con i controlli sidebar
- Margini laterali foglio piu ampi e fissi, con coerenza mantenuta anche durante `Zoom Menù`.
- Blocco righe piatto (`allergeni + titolo + prezzo`) centrato nel foglio e compattato in tutte le viste (`IT`, `EN`, `EXTERNAL`) riducendo la larghezza utile delle liste in modo simmetrico (prezzi piu vicini senza perdere centratura).
- Tuning stampa leggibilita allergeni:
  - allergeni riga (colonna sinistra) leggermente piu scuri in print
  - nomi allergeni nel footer leggermente piu scuri in print (numeri invariati)
- Setup installazione web app consolidato:
  - `manifest.webmanifest` attivo
  - icone statiche ottimizzate (`192`, `512`, `apple-touch-icon`, `favicon`)
  - logo esterno statico dedicato (`public/logo_ccv.png`)
  - meta tag head coerenti per Safari iOS/iPadOS/macOS
- Flusso Git operativo consolidato su `main` con remote canonico e workflow manuale commit/push.

## Qualita tecnica verificata (verifica 2026-03-29)

- `npm run quality`: OK
- `npm run build`: OK
- Nessun file di codice (`src/**/*.ts|tsx|css`) oltre governance 350 righe.

## Controllo continuo disponibile

- Test automatici con `vitest`.
- Coverage con soglie minime configurate.
- Formattazione coerente con `prettier`.
- Quality gate rapido: `npm run quality`.
- Quality gate esteso: `npm run quality:full`.

## Limiti correnti noti

- Taratura finale stampa su stampante target (micro-calibrazione hardware/browser) da completare.
- Eventuali ulteriori ottimizzazioni EXTERNAL non sono priorita rispetto al menu interno IT/EN.
- Lato EXTERNAL il logo dipende dal file statico locale dedicato (`public/logo_ccv.png`).
