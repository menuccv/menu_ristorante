# REPORT_STEP_01

## Files Created

- `.env.example`
- `AGENTS.md`
- `PROJECT_SETUP.md`
- `REPORT_STEP_01.md`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/app/components/SidebarControls.tsx`
- `src/app/components/PreviewPane.tsx`
- `src/app/hooks/useMenuPrintApp.ts`
- `src/config/googleSheet.ts`
- `src/domain/menu.ts`
- `src/data/googleSheets/csvParser.ts`
- `src/data/googleSheets/mapSheetRows.ts`
- `src/data/googleSheets/menuRepository.ts`
- `src/print/components/A4Sheet.tsx`
- `src/print/templates/InternalMenuTemplate.tsx`
- `src/print/templates/ExternalMenuTemplate.tsx`
- `src/print/utils/groupMenuItems.ts`
- `src/state/defaultSettings.ts`
- `src/state/settingsStore.ts`
- `src/styles/index.css`
- `src/styles/app-shell.css`
- `src/styles/menu-template.css`
- `src/styles/print.css`

## Architecture Chosen

- App shell split into left touch-friendly sidebar and central A4 preview stage.
- View control strictly limited to `IT`, `EN`, `EXTERNAL`.
- Print templates separated from control/state logic.
- Read-only Google Sheets layer separated into fetch, CSV parser, and row mapper.
- Shared domain types used across state/data/rendering.
- Local persistent settings foundation (selected view + footer copy) included for future refinement.

## Scripts Available

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run check`
- `npm run lint`
- `npm run lint:fix`

## What Is Already Working

- Initial iPad-oriented UI shell with minimal sidebar and centered large A4 preview.
- View switching between `IT`, `EN`, and `EXTERNAL`.
- Print action via browser print.
- Manual data reload action.
- Google Sheet read-only ingestion flow (CSV endpoint fetch + parsing + typed mapping).
- Initial rendering for all three templates with real data flow.
- Footer support in all templates for allergens and bread/service lines.
- Print CSS foundation with A4 size and print-only canvas behavior.
- TypeScript check, lint, and build passing.

## Step 2 Targets

- Finalize exact Google Sheet URL and real column naming variants.
- Validate print calibration on target iPad/browser/printer path.
- Add menu pagination strategy for long internal menus.
- Add controlled settings UI for footer text and minor print-safe tuning.
- Add lightweight QA checks for malformed rows and parser warnings.
