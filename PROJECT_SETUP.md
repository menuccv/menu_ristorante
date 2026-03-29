# PROJECT_SETUP

## Stack

- React
- TypeScript
- Vite
- Local state only (React hooks + localStorage persistence)

## Scripts

- `npm run dev`: start development server (fixed `http://localhost:5001`, `strictPort`)
- `npm run build`: type-check and production build
- `npm run preview`: preview production build
- `npm run check`: TypeScript check (`tsc -b`)
- `npm run lint`: ESLint run
- `npm run lint:fix`: ESLint auto-fix
- `npm run test`: run test suite once (Vitest)
- `npm run test:watch`: run tests in watch mode
- `npm run test:coverage`: run tests with coverage report
- `npm run format`: apply Prettier formatting
- `npm run format:check`: verify formatting without writes
- `npm run quality`: quick quality gate (`check + lint + test`)
- `npm run quality:full`: full gate (`quality + coverage + build`)
- `npm run backup`: create `.tar.gz` backup in `Backup/` with strict naming `Backup_DD Mese_HH.MM.tar.gz`

## Quick Start

1. `npm install`
2. Copy `.env.example` to `.env.local`
3. Set `VITE_GOOGLE_SHEET_CSV_URL` with your public Google Sheet CSV URL
4. `npm run dev`

## Structure

- `src/app`: shell composition, sidebar, preview, app hook
- `src/config`: Google Sheet URL + field aliases
- `src/domain`: shared menu types
- `src/data/googleSheets`: CSV parsing + mapping + repository fetch
- `src/print/components`: generic A4 sheet wrapper
- `src/print/templates`: IT/EN internal template + EXTERNAL bilingual template
- `src/print/utils`: grouping helpers for print rendering
- `src/state`: default settings + localStorage persistence
- `src/styles`: app shell, template interno (`menu-template.css`), template EXTERNAL (`external-menu-template.css`) e print CSS
- `public`: static install assets (`manifest.webmanifest`, icone app, apple-touch-icon, favicon)

## Architecture Notes

- Data ingestion (fetch/parse/map) is isolated from UI rendering.
- Print templates are isolated from sidebar/control logic.
- A4 dimensions are set in millimeters for preview and print alignment.
- Footer logic (allergens + bread/service lines) is built into every template from step 1.
- Sheet sync is automatic (mount + interval + focus + visibility) with anti-overlap guard for concurrent fetch triggers.
- Content controls are applied to `.a4-sheet__content` (not footer) through CSS custom properties.
- Settings persistence uses versioned key `menu-print-app-settings-v3` with baseline marker for canonical content controls defaults.
- Sidebar includes `Stampa` and `Esporta PDF`; PDF export intentionally uses native print dialog for print-preview parity (`Save as PDF`).

## Git Workflow (Manuale)

- Branch operativo unico: `main`.
- Remote canonico: `origin = https://github.com/menuccv/menu_ristorante.git`.
- Guardrail locali repository:
  - `push.default = simple`
  - `pull.ff = only`
- Nessuna automazione di commit/push: operazioni eseguite solo su richiesta esplicita.

Passi standard:

1. `git status`
2. `git add <file...>` (oppure `git add .` solo quando validato)
3. `git commit -m "<messaggio>"`
4. `git push origin main` (o `--force-with-lease` solo se richiesto esplicitamente)

Dipendenze ambiente locale:

- Autenticazione GitHub via CLI (`gh auth login` + `gh auth setup-git`) o credenziale HTTPS equivalente.
- Nessun token o credenziale viene salvato nel codice frontend.
