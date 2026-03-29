# Qualita, Debugging, Verifica e Controllo Continuo

## Obiettivo di questo intervento

Portare il progetto a una baseline solida enterprise-oriented con controlli automatici chiari, ripetibili e leggeri.

## Cosa e stato aggiunto

### 1) Test automation con Vitest

- Dipendenze: `vitest`, `@vitest/coverage-v8`, `jsdom`.
- Configurazione test in `vite.config.ts`.
- Coverage attivata con report `text`, `html`, `lcov`.
- Soglie minime impostate:
  - lines: 70
  - functions: 70
  - statements: 70
  - branches: 60

### 2) Test utilities React

- Dipendenze: `@testing-library/react`, `@testing-library/jest-dom`.
- Setup comune: `src/test/setup.ts`.
- Obiettivo: testare componenti UI senza cambiare UX.

### 3) Formattazione coerente e controllabile

- Dipendenze: `prettier`, `eslint-config-prettier`.
- Config: `.prettierrc.json`, `.prettierignore`.
- ESLint integrato con `eslint-config-prettier` per evitare conflitti regole stile.

### 4) Quality gate scripts

Script aggiunti in `package.json`:

- `test`
- `test:watch`
- `test:coverage`
- `format`
- `format:check`
- `quality`
- `quality:full`

## Test introdotti (baseline)

- `src/app/App.test.tsx`
- `src/app/components/PreviewPane.test.tsx`
- `src/app/components/SidebarControls.test.tsx`
- `src/app/hooks/useMenuPrintApp.test.tsx`
- `src/data/googleSheets/csvParser.test.ts`
- `src/data/googleSheets/mapSheetRows.test.ts`
- `src/data/googleSheets/menuRepository.test.ts`
- `src/print/utils/groupMenuItems.test.ts`
- `src/state/settingsStore.test.ts`

## Perche queste scelte

- Nessuna duplicazione tool (lint separato da format, test separato da build).
- Focus sui punti ad alto rischio regressione: parsing/mapping, grouping stampa, persistenza impostazioni, interazioni sidebar.
- Setup leggero: nessun backend, nessun servizio esterno, nessun framework superfluo.

## Regola operativa continua

Da ora ogni modifica significativa deve mantenere verdi i gate:

1. `npm run quality`
2. `npm run quality:full` (prima di rilasci/stampe ufficiali)

## Audit enterprise aggiuntivo (2026-03-26)

Controlli eseguiti:

- Verifica file-size governance: nessun file oltre 350 righe.
- Verifica coerenza test/build/lint: gate verdi.
- Verifica ridondanze CSS/strutturali su sidebar e template A4.
- Verifica performance sync dati: ridotti trigger concorrenti di fetch.

Interventi consolidati:

- `useMenuPrintApp`: hardening anti-overlap fetch (`isLoadInProgressRef`) per evitare richieste parallele su trigger ravvicinati (`focus`/`visibility`/`interval`).
- Test aggiuntivo su hook: copertura esplicita del caso "evita fetch concorrenti".
- Pulizia artefatti obsoleti di workspace: rimossa directory `coverage/` (rigenerabile da script).

Esito finale audit:

1. Qualita: `npm run quality` OK
2. Build: `npm run build` OK

## Audit print flow (2026-03-26, resa tipografica su carta)

Cause probabili individuate:

- Uso di `transform: ... scale(...)` sul body A4 anche in stampa, potenzialmente incline a rasterizzazione/blur in alcuni browser/driver.
- Contrasto e peso tipografico eccessivi per output B/N reale rispetto alla preview.
- Linee e neri pieni troppo aggressivi nel canale print.

Correzioni strutturali:

- `print.css`: rimosso fattore `scale()` in stampa (mantenuto solo `translateY`).
- `print.css`: override canonici print-only per palette e linee (inchiostro/piu leggero e linee meno spesse).
- `print.css`: alleggeriti i pesi font in stampa per titoli, piatti, prezzi e service line footer.
- `print.css`: introdotti hint di rendering tipografico e `print-color-adjust: economy` per ridurre resa troppo pesante.

## Audit enterprise consolidato (2026-03-26, post-fix multipli)

Controlli aggiuntivi eseguiti:

- Riesecuzione quality gate completo (`check + lint + test`) e build produzione.
- Verifica conflitti IT/EN vs EXTERNAL sui fogli A4.
- Verifica governance file-length (limite 350 righe per file) post-refinement.

Interventi di consolidamento:

- Corretta regressione di impaginazione IT/EN: la distribuzione verticale categorie e stata riallineata al wrapper canonico `.a4-sheet__content` (dopo introduzione del wrapper zoom).
- Modularizzazione CSS senza impatto UX: estratte regole EXTERNAL da `menu-template.css` in `external-menu-template.css` per eliminare superamento soglia linee e ridurre rischio conflitti cross-view.

Esito finale:

1. Qualita: `npm run quality` OK
2. Build: `npm run build` OK
3. Governance file-size: conforme (nessun file > 350 righe)

## Audit enterprise completo (2026-03-29)

Controlli eseguiti:

- Full gate end-to-end: `npm run quality:full` (check + lint + test + coverage + build).
- Revisione coerenza runtime `Sidebar -> settingsStore -> PreviewPane -> A4Sheet -> menu-template.css`.
- Verifica ridondanze/conflitti su variabili CSS del layout categorie IT/EN.
- Verifica file-size codice applicativo (`src`) rispetto al limite governance 350 righe.
- Verifica asset/struttura repository per assenza di file runtime obsoleti o duplicazioni funzionali.

Interventi consolidati:

- `src/styles/menu-template.css`:
  - allineata la sorgente canonica delle variabili categoria su `.a4-sheet__content` (coerente con le custom properties provenienti dalla sidebar),
  - confermata centratura categoria (`align-content: center`) e metrica uniforme titolo->prima riga,
  - interspazio righe piatti IT/EN calibrato al valore corrente `--category-row-gap: calc(2.1mm * var(--category-layout-scale))`.
- `src/state/contentControls.ts`:
  - range `lineHeightPercent` esteso a `88..150`,
  - guardrail anti-overlap aggiornato a soglia `MAX_CATEGORY_LAYOUT_PRESSURE = 1.5`.
- `src/state/settingsStore.ts`:
  - persistenza versionata `menu-print-app-settings-v3`,
  - migrazione legacy (`v2`/`v1`) con riallineamento `contentControls`,
  - marker `contentControlsBaselineVersion = 2` per stabilizzare i default canonicali.
- Test rinforzati su guardrail e migrazioni:
  - `src/state/contentControls.test.ts`
  - `src/state/settingsStore.test.ts`

Esito finale audit:

1. Stabilita: nessuna regressione funzionale rilevata.
2. Qualita: `npm run quality:full` OK.
3. Modularity/Maintainability: confermate (nessun file codice `src` oltre 350 righe).
