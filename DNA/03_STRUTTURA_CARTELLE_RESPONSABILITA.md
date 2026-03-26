# Struttura Cartelle e Responsabilita

## Root

- `src/`: codice applicativo.
- `public/`: asset statici installazione/icone (manifest, apple-touch-icon, favicon, icona base `menu.png`) + logo esterno (`logo_ccv.png`).
- `DNA/`: documentazione tecnica e operativa permanente.
- `Backup/`: archivi compressi di snapshot progetto.

## `src`

- `src/app/`: shell principale, sidebar, preview, hook applicativo.
- `src/config/`: configurazione Google Sheet e alias colonne.
- `src/data/googleSheets/`: parser CSV, mapper righe, repository fetch.
- `src/domain/`: tipi condivisi menu/stato.
- `src/print/components/`: wrapper A4 condiviso.
- `src/print/templates/`: layout stampa IT/EN e EXTERNAL.
- `src/print/utils/`: utility di raggruppamento contenuti + risoluzione titoli sezione.
- `src/state/`: default settings, config controlli contenuto, traduzioni titoli sezione, localStorage.
- `src/styles/`: stile shell, template, stampa.
