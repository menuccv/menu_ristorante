# Componenti Principali

## `src/app/App.tsx`

Composizione shell e collegamento eventi principali (`print`, cambio vista, traduzioni titoli sezione).

## `src/app/components/SidebarControls.tsx`

- Switch vista (`MenuView`): IT/EN/EXTERNAL con etichette UI `ITALIANO`/`INGLESE`/`ESTERNO`.
- Azione: stampa vista corrente (`Stampa`).
- Azione: apertura modale `Translate Titoli`.
- Controlli contenuto (solo body A4): zoom, offset verticale, font globale, interspazio globale.
- Reset rapido dei controlli contenuto.

## `src/app/hooks/useMenuPrintApp.ts`

Gestione stato app + sincronizzazione automatica Google Sheet (caricamento iniziale, interval, focus, visibilitychange) + persistenza traduzioni titoli sezione.
Include hardening anti-overlap per evitare fetch concorrenti su trigger ravvicinati.

## `src/app/components/SectionTitlesModal.tsx`

Modale per gestione locale/manuale `Titolo IT` e `Titolo EN` per categoria.

## `src/app/components/SidebarStepperControl.tsx`

Componente modulare touch-friendly per i controlli meno/valore/piu.

## `src/app/components/PreviewPane.tsx`

Instrada il rendering verso template interno o esterno in base alla vista attiva e applica i CSS custom properties al solo body A4.

## `src/print/components/A4Sheet.tsx`

Contenitore comune pagina A4 con header, body e footer opzionale; supporta stile separato del body per preservare il footer quando presente.

## Template

- `InternalMenuTemplate.tsx`: vista IT/EN interna con risoluzione titoli sezione tradotti.
- `ExternalMenuTemplate.tsx`: vista esterna dedicata (solo logo locale `logo_ccv.png` centrato, categorie in italiano, piatto IT + EN, prezzo a destra, senza allergeni riga e senza footer tecnico).
