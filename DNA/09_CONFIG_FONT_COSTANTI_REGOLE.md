# Configurazioni, Font, Costanti e Regole

## Font consentiti

- `Playfair Display`
- `DM Sans`

## Font effettivamente caricati

- `Playfair Display`: pesi `500`, `600`, `700`
- `DM Sans`: pesi `400`, `500`, `600`, `700`

Nessun uso di `Fira Code` nel layout menu/stampa.

## Regola tipografica applicata nel layout

- `Playfair Display`:
  - titoli categoria/sezione
  - nomi piatti (IT/EN/EXTERNAL)
  - prezzi
  - testo editoriale principale del menu
  - service line footer (`Pane & Coperto 3` / `Service 3`)
- `DM Sans`:
  - allergeni riga
  - legenda allergeni footer
  - microtesti e label sidebar

## Palette base

Toni chiari caldi (bianco, crema, marrone soft) definiti in `src/styles/index.css`.

## Costanti/config rilevanti

- `GOOGLE_SHEET_CSV_URL` in `src/config/googleSheet.ts`
- `SHEET_FIELD_ALIASES` in `src/config/googleSheet.ts`
- `STORAGE_KEY` settings in `src/state/settingsStore.ts`:
  - chiave corrente: `menu-print-app-settings-v3`
  - baseline marker: `contentControlsBaselineVersion = 2`
  - legacy keys supportate: `menu-print-app-settings-v2`, `menu-print-app-settings-v1`
- `CONTENT_CONTROL_CONFIGS` + `DEFAULT_CONTENT_CONTROLS` in `src/state/contentControls.ts`
- Guardrail tipografico in `src/state/contentControls.ts`:
  - soglia dinamica: `MAX_CATEGORY_LAYOUT_PRESSURE = 1.5`
  - combinazione `fontScalePercent` x `lineHeightPercent` limitata da soglia dinamica anti-overlap
  - range `lineHeightPercent`: `88` - `150` (con massimo effettivo dipendente da `fontScalePercent`)
- Metrica default interspazio righe piatti IT/EN in `src/styles/menu-template.css`:
  - `--category-row-gap: calc(2.1mm * var(--category-layout-scale))`
- `sectionTitleTranslations` in `AppSettings` + normalizzazione in `src/state/sectionTitleTranslations.ts`
- `manifest.webmanifest` in `public/` con `name`, `short_name`, `start_url`, `display`, `theme_color`, `background_color`, `icons`
- Meta installazione in `index.html`:
  - `theme-color`
  - `mobile-web-app-capable`
  - `apple-mobile-web-app-capable`
  - `apple-mobile-web-app-title`
  - `apple-mobile-web-app-status-bar-style`

## Regole architetturali

- Frontend only.
- Nessuna duplicazione logica.
- Moduli separati per dati, rendering e controlli.
- Limite dimensione file: 350 linee.
