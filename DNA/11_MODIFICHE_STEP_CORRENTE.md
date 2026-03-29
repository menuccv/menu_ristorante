# Modifiche Eseguite in Questo Step

## Data step

2026-03-25

## Modifiche applicate

1. Creata cartella `DNA`.
2. Creata documentazione tematica multi-file in `DNA`.
3. Definita regola permanente di aggiornamento documentazione `DNA`.
4. Creata cartella `Backup`.
5. Creato primo backup compresso del progetto con naming richiesto.
6. File backup creato: `Backup/Backup_25 Marzo_14.40.tar.gz`.
7. Formato backup usato: `tar.gz`.

## Impatto

- Governance progetto migliorata.
- Tracciabilita tecnica centralizzata.
- Snapshot ripristinabile disponibile.

## Aggiornamento successivo - Quality hardening

1. Installato stack test/coverage (`vitest`, `@vitest/coverage-v8`, `jsdom`).
2. Installato stack verifica UI test (`@testing-library/react`, `@testing-library/jest-dom`).
3. Installato stack formattazione (`prettier`, `eslint-config-prettier`).
4. Configurati quality gate in `package.json` (`quality`, `quality:full`).
5. Aggiunti test baseline su parsing, mapping, grouping, settings e sidebar.
6. Aggiornata documentazione DNA con report dedicato (`13_QUALITA_DEBUGGING_CONTROLLO_CONTINUO.md`).

## Aggiornamento successivo - Fix permanente backup

1. Creato script versionato `scripts/create-backup.mjs`.
2. Aggiunto script npm `backup`.
3. Introdotta naming policy cronologica con univocita automatica.
4. Introdotto manifest `Backup/BACKUP_MANIFEST.json` per tracciabilita.
5. Aggiunta policy permanente in `DNA/14_POLICY_BACKUP_PERMANENTE.md`.

## Aggiornamento successivo - Step 2 collegamento foglio reale

1. Impostato URL CSV reale di default con `gid=1122482173`.
2. Rafforzato mapping colonne richieste: `CATEGORIA`, `Titolo IT`, `Titolo EN`, `PREZZO`, `ALLERGENI`.
3. Migliorata gestione errori: foglio non raggiungibile vs errore mapping colonne.
4. Aggiunto stato chiaro UI per `Nessun dato disponibile`.

## Aggiornamento successivo - Step 3 template editoriale A4 interno

Data aggiornamento: 2026-03-26

1. Aggiornato `InternalMenuTemplate` per eliminare intestazioni generiche e usare solo contenuto del foglio.
2. Applicata struttura editoriale IT/EN con categorie centrate uppercase e linee laterali.
3. Introdotta griglia riga piatto a 3 colonne (allergeni, titolo, prezzo) con migliore gerarchia visiva.
4. Reso il footer interno strutturale e fisso con:
   - `Pane & Coperto 3` (IT)
   - `Bread & Cover Charge 3` (EN)
   - legenda allergeni completa IT/EN
5. Rafforzata la stabilita stampa con regole `break-inside: avoid` su sezioni, righe e footer.
6. Mantenuta compatibilita della vista `EXTERNAL` senza introdurre nuove feature.

## Aggiornamento successivo - Step 4 rifinitura tipografica/footer/sidebar

Data aggiornamento: 2026-03-26

1. Rifinita la tipografia interna IT/EN con pesi e dimensioni piu editoriali (meno effetto dashboard).
2. Migliorato il footer interno con composizione centrale, service line in evidenza e legenda subordinata.
3. Aggiornata la sidebar iPad in ottica definitiva: layout minimale, touch-friendly e piu compatto.
4. Rinominata azione sidebar in `Aggiorna Foglio`.
5. Confermata policy font: solo `Playfair Display` + `DM Sans` (nessun uso di `Fira Code` nel layout menu).

## Aggiornamento successivo - Sidebar finale con controlli contenuto

Data aggiornamento: 2026-03-26

1. Esteso `AppSettings` con `contentControls` persistiti in localStorage.
2. Introdotta configurazione centralizzata dei controlli (`src/state/contentControls.ts`) con limiti/step/clamp.
3. Sidebar completata con controlli touch-friendly:
   - zoom contenuto
   - spostamento verticale contenuto
   - dimensione font globale contenuto
   - interspazio righe globale contenuto
   - reset contenuto
4. Separazione tecnica mantenuta: i controlli agiscono solo sul body A4 (`.a4-sheet__body`), footer escluso.
5. Aggiornati test unitari per hook, sidebar, app e preview in coerenza con i nuovi controlli.

## Aggiornamento successivo - Rimozione refresh manuale

Data aggiornamento: 2026-03-26

1. Rimosso il pulsante `Aggiorna Foglio` dalla sidebar.
2. Attivata sincronizzazione automatica del foglio:
   - on load
   - ogni 45 secondi
   - su `focus`
   - su `visibilitychange` quando il tab torna visibile
3. Aggiornati test e documentazione in coerenza con il nuovo comportamento.

## Aggiornamento successivo - Allineamento tipografico Playfair/DM Sans

Data aggiornamento: 2026-03-26

1. Corretta la vista `EXTERNAL` per rispettare la stessa regola tipografica del progetto.
2. `menu-section__title` in `DM Sans` (parte tecnica/strutturale).
3. `menu-item-row__title` e `menu-item-row__subtitle` in `Playfair Display` (parte editoriale del menu).
4. Confermata esclusione di `Fira Code` dal layout stampato.

## Aggiornamento successivo - Font titoli sezione in Playfair Display

Data aggiornamento: 2026-03-26

1. Aggiornati i titoli sezione/categoria (`ANTIPASTI`, `PRIMI`, ecc.) a `Playfair Display` su viste interne ed external.
2. Aggiornata la regola font in DNA per riflettere il nuovo mapping tipografico.

## Aggiornamento successivo - Pulizia footer interno

Data aggiornamento: 2026-03-26

1. Rimossa la voce `Legenda allergeni` dal footer interno.
2. Rimossa la linea sottile superiore del footer interno.
3. Eliminato relativo CSS non utilizzato.

## Aggiornamento successivo - Allergeni vuoti senza placeholder

Data aggiornamento: 2026-03-26

1. Nel template interno, quando gli allergeni non sono presenti la colonna resta vuota.
2. Rimosso placeholder `-`/`—` per gli allergeni mancanti.

## Aggiornamento successivo - Ottimizzazione distribuzione verticale A4 interna

Data aggiornamento: 2026-03-26

1. Corpo menu interno portato a layout flex verticale con `justify-content: space-between`.
2. Introdotta altezza utile minima del body per distribuire meglio le sezioni lungo la pagina.
3. Ridotto il padding inferiore del body per diminuire lo spazio vuoto prima del footer.
4. Footer mantenuto fisso in basso senza alterazioni strutturali.

## Aggiornamento successivo - Modale Translate Titoli

Data aggiornamento: 2026-03-26

1. Aggiunto pulsante sidebar `Translate Titoli` con modale dedicato IT/EN per ogni categoria rilevata dal menu.
2. Introdotta persistenza locale `sectionTitleTranslations` in `AppSettings` (localStorage).
3. Applicata risoluzione titoli sezione nei template:
   - IT: usa titolo IT manuale, fallback categoria originale
   - EN: usa titolo EN manuale, fallback su IT, poi categoria originale
   - EXTERNAL: usa resa combinata IT/EN coerente con fallback
4. Confermato che il data layer Google Sheet resta read-only e non viene modificato.

## Aggiornamento successivo - Scala titoli sezione menu interno

Data aggiornamento: 2026-03-26

1. Incrementata la dimensione tipografica dei titoli sezione (Playfair Display) nel layout interno.
2. Ribilanciati gap e tracking del titolo per mantenerlo elegante e piu autorevole.
3. Ispessite leggermente le linee laterali per migliore proporzione con il nuovo titolo.

## Aggiornamento successivo - Ottimizzazione foglio A4 per stampa bianco/nero

Data aggiornamento: 2026-03-26

1. Introdotta palette dedicata al foglio A4 in scala di grigi/nero:
   - `--sheet-ink-900: #111`
   - `--sheet-ink-700: #2f2f2f`
   - `--sheet-ink-500: #5f5f5f`
   - `--sheet-line-200: #c7c7c7`
   - `--sheet-line-300: #adadad`
2. Applicata la palette a titoli sezione, linee laterali, allergeni, prezzi, footer e legenda.
3. Mantenuta invariata la palette della sidebar/app shell.

## Aggiornamento successivo - Formato allergeni tra parentesi

Data aggiornamento: 2026-03-26

1. Gli allergeni di riga ora sono sempre formattati come `(2,6,10)` quando presenti.
2. Se assenti, il campo resta vuoto (nessun placeholder).
3. Footer legenda allergeni lasciato invariato.

## Aggiornamento successivo - Separatore footer tra service line e legenda

Data aggiornamento: 2026-03-26

1. Aggiunta una sola linea sottile elegante tra `Pane & Coperto` e la legenda allergeni nel footer interno.
2. Nessun altro separatore aggiuntivo introdotto.

## Aggiornamento successivo - Incremento ulteriore titoli sezione

Data aggiornamento: 2026-03-26

1. Aumentata ancora la dimensione dei titoli sezione del menu interno (Playfair Display) per maggiore presenza visiva.

## Aggiornamento successivo - Calibrazione contrasto B/N foglio A4

Data aggiornamento: 2026-03-26

1. Rafforzato il contrasto della palette foglio verso nero/grigio neutro.
2. Titoli sezione e sottotitoli principali portati a nero pieno per maggiore leggibilita in stampa monocromatica.
3. Linee e testi secondari mantenuti su grigi neutri, eliminando dipendenza da tonalita calde.

## Aggiornamento successivo - Pulizia sidebar senza titoli box

Data aggiornamento: 2026-03-26

1. Rimossi i titoli testuali dei blocchi sidebar (`Vista`, `Contenuto Foglio`, `Azioni`).
2. Mantenuti invariati tutti i controlli e la disposizione funzionale.

## Aggiornamento successivo - Prezzi aumentati di default

Data aggiornamento: 2026-03-26

1. Aumentata la dimensione testo prezzi di default di circa `+2pt` su template interno ed external.

## Aggiornamento successivo - Titoli sezione con valori tipografici fissi

Data aggiornamento: 2026-03-26

1. Impostati i titoli sezione con `font-size: 1.4rem` e `letter-spacing: 0.12em`.

## Aggiornamento successivo - Footer interno più presente e leggibile

Data aggiornamento: 2026-03-26

1. Aumentata la presenza tipografica del footer (service line e legenda).
2. Ribilanciata la spaziatura verticale tra `Pane & Coperto` e riga allergeni.
3. Legenda allergeni resa su tutta la larghezza utile con layout coerente.
4. Numeri allergeni impostati in grassetto.

## Aggiornamento successivo - Centratura verticale definitiva dei blocchi categoria

Data aggiornamento: 2026-03-26

1. Corretto il limite del precedente approccio: distribuiva solo i blocchi categoria tra loro, ma non centrava i piatti dentro ogni blocco.
2. Introdotta struttura sezione `header + content` nel template interno.
3. Assegnata altezza sezione proporzionale automatica al numero righe (`--section-weight`).
4. Applicata centratura verticale reale nel body della sezione con `align-content: center`.

## Aggiornamento successivo - Titoli sezione senza grassetto

Data aggiornamento: 2026-03-26

1. Rimosso il grassetto dai titoli sezione nel foglio A4 (interno ed esterno).

## Aggiornamento successivo - Ripristino legenda allergeni footer su una riga

Data aggiornamento: 2026-03-26

1. Ripristinata la legenda allergeni nel footer interno con set corretto allineato al riferimento.
2. Legenda impostata su una sola riga continua, centrata e ottimizzata in larghezza.

## Aggiornamento successivo - Linee titoli sezione più sottili

Data aggiornamento: 2026-03-26

1. Ridotto lo spessore delle linee laterali dei titoli sezione per una resa più elegante.

## Aggiornamento successivo - Riduzione leggera font titoli sezione

Data aggiornamento: 2026-03-26

1. Ridotta leggermente la dimensione default dei titoli sezione (interno ed esterno).

## Aggiornamento successivo - Regola uniforme ultima categoria (Dessert)

Data aggiornamento: 2026-03-26

1. Introdotta spaziatura interna superiore uniforme nel body di ogni categoria.
2. Anche l’ultima categoria (`Dessert`) mantiene lo stesso distacco titolo/primo piatto delle altre sezioni.
3. Regola strutturale CSS, indipendente dai controlli sidebar.

## Aggiornamento successivo - Testi sidebar centrati

Data aggiornamento: 2026-03-26

1. Allineati centralmente tutti i testi nella sidebar (label, controlli e pulsanti).

## Aggiornamento successivo - Pulsante Google Sheet in sidebar

Data aggiornamento: 2026-03-26

1. Aggiunto pulsante `Google Sheet` con stile verde e testo chiaro.
2. Collegato al link edit del foglio configurato (`GOOGLE_SHEET_EDIT_URL`).

## Aggiornamento successivo - Footer interno scalato +30%

Data aggiornamento: 2026-03-26

1. Aumentate in proporzione le dimensioni del footer interno (tipografia e spaziature) di circa +30%.
2. Adeguato lo spazio riservato nel body per mantenere separazione corretta dal contenuto menu.
3. Contenuto testuale invariato.

## Aggiornamento successivo - Spazio numero/allergene nel footer

Data aggiornamento: 2026-03-26

1. Aggiunto spazio visivo esplicito tra numero e nome allergene (es. `3. Pesce`).

## Aggiornamento successivo - Uniformita linee titoli sezione

Data aggiornamento: 2026-03-26

1. Unificati colore e spessore linee titoli sezione con variabili condivise CSS.
2. Applicata la stessa caratteristica grafica sia su internal che external.

## Aggiornamento successivo - Riduzione ulteriore font titoli sezione

Data aggiornamento: 2026-03-26

1. Ridotta ancora la dimensione default dei titoli sezione su internal ed external.

## Aggiornamento successivo - Correzione allineamento testi sidebar (solo titoli)

Data aggiornamento: 2026-03-26

1. Rimosso l'allineamento globale `text-align: center` da `.app-sidebar` per non influenzare i box.
2. Ripristinato `justify-items: stretch` su `.stepper-row` per mantenere i controlli con layout pieno e stabile.
3. Mantenuto l'allineamento centrale solo sui testi titolo dei controlli (`.stepper-row__label`).

## Aggiornamento successivo - Footer: più spazio service/legenda + separatore centrato

Data aggiornamento: 2026-03-26

1. Aumentata la distanza verticale tra `Pane & Coperto` e riga allergeni senza modificare i testi.
2. Spostata la logica separatore su elemento dedicato centrato (`.menu-footer__separator`) tra service line e legenda.
3. Rimossa la vecchia linea `border-bottom` dal testo service line per evitare disallineamenti.

## Aggiornamento successivo - Interspazio righe collegato alla struttura categorie

Data aggiornamento: 2026-03-26

1. Il parametro `lineHeightPercent` ora governa anche la metrica verticale delle sezioni interne, non solo il line-height dei testi.
2. Collegate a `--menu-content-line-height-scale` le distanze strutturali: gap tra categorie, gap titolo/contenuto, gap tra righe menu e padding verticale del body categoria.
3. Centratura interna resa stabile con `justify-content: center` in `.menu-section__content`, mantenuta anche per l'ultima categoria (`Dessert`).

## Aggiornamento successivo - Sidebar senza grassetti nei testi

Data aggiornamento: 2026-03-26

1. Rimossi i pesi bold dai testi della sidebar (switch vista, azioni, label controlli, valori e reset).
2. Nessuna altra area o logica modificata.

## Aggiornamento successivo - Micro tracking allergeni riga

Data aggiornamento: 2026-03-26

1. Aumentata leggermente la spaziatura tra caratteri solo per gli allergeni in riga (`letter-spacing: 0.03em`).
2. Footer non modificato.

## Aggiornamento successivo - Footer: aumento netto spazio service line / allergeni

Data aggiornamento: 2026-03-26

1. Aumentata sensibilmente la distanza verticale tra `Pane & Coperto` e riga allergeni.
2. Spaziatura gestita esclusivamente sui margini della linea separatrice centrale (`.menu-footer__separator`).
3. Testi del footer invariati.

## Aggiornamento successivo - Linea footer allineata alle linee titolo

Data aggiornamento: 2026-03-26

1. Portata la larghezza della linea separatrice footer a `100%` per allinearla alla stessa ampiezza utile delle linee dei titoli sezione.

## Aggiornamento successivo - Uniformita totale linee pagina (riferimento footer)

Data aggiornamento: 2026-03-26

1. Introdotte variabili uniche `--rule-line-color` e `--rule-line-thickness` nel foglio A4.
2. Allineate a queste variabili le linee titoli sezione e la linea separatrice footer.
3. Uniformata anche la linea base del footer template alla stessa coppia colore/spessore.

## Aggiornamento successivo - Audit tecnico + fix definitivo sidebar/categorie

Data aggiornamento: 2026-03-26

1. **Audit sidebar**: il fix richiesto non era completo; larghezza sidebar e proporzioni interne non risultavano ridotte in modo strutturale.
2. **Sidebar ridotta ~10%** in modo canonico su layout desktop e breakpoint tablet:
   - colonna sidebar ridotta (`14.5rem`, breakpoint `12.9rem`)
   - padding/gap dei blocchi ridotti in proporzione
   - pulsanti `-`/`+` lasciati invariati (`2.4rem`)
   - box valore ridotto strutturalmente con colonna centrale fissa (`4.05rem`)
3. **Audit centratura categorie**: presente ma con metrica distribuita in formule sparse.
4. **Consolidamento strutturale categorie**: introdotte variabili canoniche di layout categoria derivate da `--menu-content-line-height-scale`:
   - gap tra categorie
   - distanza titolo↔body
   - gap righe piatti
   - padding verticale body categoria
5. **Regola Dessert** confermata e consolidata: nessuna eccezione `last-child`; l'ultima categoria usa la stessa struttura e lo stesso padding top/bottom delle altre.
6. **Centratura interna definitiva** mantenuta con body categoria in grid e `align-content: center`, indipendente dalla sidebar.

## Aggiornamento successivo - Allineamento test suite al naming UI

Data aggiornamento: 2026-03-26

1. Aggiornato il test `App.test.tsx` sul label reale del pulsante stampa (`Stampa`) per mantenere il quality gate coerente con la UI corrente.

## Aggiornamento successivo - Fix definitivo distanza titolo/primo piatto (incl. Dessert)

Data aggiornamento: 2026-03-26

1. Rimossa la centratura interna variabile del body categoria (`align-content: center`) che produceva differenze visive tra sezioni.
2. Impostata logica strutturale uniforme con flow verticale `flex-start` nel body categoria.
3. La distanza `titolo -> primo piatto` ora dipende solo da metriche canoniche condivise (`row-gap` + `--category-body-pad-y`) ed è uguale per tutte le categorie, compresa `Dessert`.

## Aggiornamento successivo - Etichette viste sidebar in italiano esteso

Data aggiornamento: 2026-03-26

1. Aggiornate le etichette dei pulsanti vista sidebar:
   - `IT` -> `ITALIANO`
   - `EN` -> `INGLESE`
   - `EXTERNAL` -> `ESTERNO`
2. Logica interna invariata (`MenuView` resta `IT | EN | EXTERNAL`).
3. Aggiornato test `SidebarControls` sul nuovo naming UI.

## Aggiornamento successivo - Audit enterprise completo e consolidamento finale

Data aggiornamento: 2026-03-26

1. Eseguito audit completo su sidebar, template A4, data sync, test suite e file-length governance.
2. `useMenuPrintApp` hardenizzato contro fetch concorrenti su trigger ravvicinati (`focus`/`visibility`/`interval`) mantenendo business logic invariata.
3. Aggiunto test dedicato anti-concorrenza in `useMenuPrintApp.test.tsx`.
4. Eliminato artefatto obsoleto `coverage/` (rigenerabile da script).
5. Aggiornata documentazione informativa oltre al changelog (`PROJECT_SETUP.md`, `DNA/05`, `DNA/07`, `DNA/08`, `DNA/10`, `DNA/13`).
6. Nessun file oltre il limite governance 350 righe.

## Aggiornamento successivo - Backup post-audit

Data aggiornamento: 2026-03-26

1. Creato nuovo backup completo senza sovrascrittura: `Backup/Backup_2026-03-26_14-14_enterprise-audit.tar.gz`.
2. Manifest aggiornato automaticamente: `Backup/BACKUP_MANIFEST.json`.

## Aggiornamento successivo - Fix strutturale resa stampa (nitidezza/finezza)

Data aggiornamento: 2026-03-26

1. Audit print flow: individuato come causa principale il `scale()` attivo in stampa sul body A4.
2. In `print.css` rimosso il fattore di scala in stampa (`transform` ora solo `translateY`), riducendo rischio rasterizzazione/blur.
3. Introdotti override print-only canonici per alleggerire output su carta:
   - palette inchiostro piu leggera
   - linee meno spesse
   - pesi font alleggeriti su titoli, piatti, prezzi e service line footer
4. Aggiunti hint di rendering tipografico in stampa e `print-color-adjust: economy`.
5. Nessuna modifica a layout/sidebar/business logic o data layer Google Sheet.

## Aggiornamento successivo - Installabilita moderna + compatibilita Apple

Data aggiornamento: 2026-03-26

1. Audit `public/menu.png`: file base valido (512x512 RGBA), usato come sorgente canonica icone.
2. Generato set icone minimo/leggero da `menu.png`:
   - `public/icon-192.png`
   - `public/apple-touch-icon.png` (180x180)
   - `public/favicon-32.png`
   - `public/menu.png` mantenuto come icona 512x512 nel manifest
3. Aggiunto `public/manifest.webmanifest` con configurazione installazione consolidata (`name`, `short_name`, `start_url`, `display`, `theme_color`, `background_color`, `icons`).
4. Aggiornato `index.html` con riferimenti canonical a manifest/favicon/apple-touch-icon e meta web app Apple/modern browser.
5. Rimosso file statico obsoleto di logo non referenziato.

## Aggiornamento successivo - EXTERNAL A4 dedicato (menu commerciale)

Data aggiornamento: 2026-03-26

1. Sostituito il vecchio template EXTERNAL (derivato dall'interno) con un layout A4 dedicato e pulito.
2. `ExternalMenuTemplate.tsx` ora usa:
   - header dedicato
   - categorie solo in italiano (risoluzione `IT`)
   - riga piatto in italiano + traduzione inglese di supporto
   - prezzo allineato a destra
3. Rimossi dalla vista EXTERNAL:
   - allergeni riga
   - footer tecnico allergeni
4. `A4Sheet` aggiornato con footer opzionale, per evitare blocchi/footer tecnici nelle viste che non lo richiedono.
5. Nuovo CSS EXTERNAL dedicato in `menu-template.css` con classi proprie (`external-menu*`) e metrica verticale per una sola pagina A4.
6. Aggiornati override print di `print.css` sui nuovi selettori EXTERNAL, mantenendo coerenza preview/stampa.
7. Aggiornato test `PreviewPane.test.tsx` sul nuovo comportamento EXTERNAL (titolo fisso + categoria IT).
8. Inserito logo esterno dedicato nella vista EXTERNAL.

## Aggiornamento successivo - Naming backup rigido unificato

Data aggiornamento: 2026-03-26

1. Aggiornata la logica di `scripts/create-backup.mjs` per generare solo nomi nel formato `Backup_DD Mese_HH.MM.tar.gz`.
2. Rimossi supporto label e suffissi progressivi dal naming backup.
3. Mese forzato in italiano (`Gennaio ... Dicembre`), orario con punto (`HH.MM`), niente formato ISO.
4. In caso di collisione nome esistente, lo script avanza automaticamente al minuto successivo mantenendo lo stesso formato.
5. Allineati `package.json`, `PROJECT_SETUP.md` e `DNA/14_POLICY_BACKUP_PERMANENTE.md` alla nuova convenzione rigida.

## Aggiornamento successivo - Estensione range Dimensione font

Data aggiornamento: 2026-03-26

1. Esteso il limite massimo di `Dimensione font` nel controllo contenuto da `114%` a `130%`.
2. Nessuna modifica a logica categorie, footer, sidebar layout o data layer.
3. Aggiornata la documentazione sidebar (`DNA/08`) sul nuovo range operativo.

## Aggiornamento successivo - Hardening interspazio vs allineamento categorie

Data aggiornamento: 2026-03-26

1. Audit completo dei file informativi e della catena tecnica `contentControls -> PreviewPane -> InternalMenuTemplate -> menu-template.css`.
2. Corretto il legame dell'interspazio per mantenere stabile la distanza `titolo categoria -> primo piatto` su tutte le sezioni.
3. In `menu-template.css` rese costanti le metriche canoniche `--category-title-body-gap` e `--category-body-pad-y` per evitare drift visivo ai valori estremi di `Interspazio righe`.
4. Confermata coerenza regola anche sull'ultima categoria (`Dessert`) e indipendenza dalla sidebar.

## Aggiornamento successivo - Fix definitivo anti-overlap impaginazione interna

Data aggiornamento: 2026-03-26

1. Individuata causa reale delle sovrapposizioni: combinazione estrema `Dimensione font` alta + `Interspazio righe` alto oltre la capacita verticale del blocco categorie.
2. Inserito guardrail strutturale in `src/state/contentControls.ts`:
   - vincolo dinamico su `fontScalePercent` e `lineHeightPercent`
   - normalizzazione automatica su caricamento settings locali
   - boundary dinamico dei pulsanti `+` in sidebar
3. Mantenuto `Dimensione font` fino a `130%`, ma con tetto automatico dell'interspazio quando necessario per preservare impaginazione.
4. Aggiunti test dedicati in `src/state/contentControls.test.ts` per bloccare regressioni della logica anti-overlap.

## Aggiornamento successivo - Spaziatura allergeni footer

Data aggiornamento: 2026-03-26

1. Aumentata la distanza orizzontale tra gli elementi della legenda allergeni nel footer interno.
2. Nessuna modifica a testi/footer copy o logica dati.

## Aggiornamento successivo - Service line EN footer

Data aggiornamento: 2026-03-26

1. Aggiornato testo service line inglese del footer interno da `Bread & Cover Charge 3` a `Service 3`.
2. Nessuna modifica a layout o logica di impaginazione.

## Aggiornamento successivo - Pulizia asset logo EXTERNAL

Data aggiornamento: 2026-03-26

1. Eliminato il file logo errato (asset non conforme).
2. Vista EXTERNAL aggiornata a usare solo `public/logo_ccv.png`.
3. Rimosso completamente il titolo testuale dall'header EXTERNAL.
4. Confermata separazione definitiva:
   - `menu.png` solo per icone/installazione app
   - `logo_ccv.png` solo per logo locale in EXTERNAL

## Aggiornamento successivo - Tuning dimensione/logo EXTERNAL

Data aggiornamento: 2026-03-26

1. Ingrandito `logo_ccv` del 100% nella vista EXTERNAL (da `20mm` a `40mm`).
2. Ridotto il margine superiore dell'header EXTERNAL (`padding-top` da `1.2mm` a `0.4mm`).

## Aggiornamento successivo - Logo EXTERNAL ancorato in alto

Data aggiornamento: 2026-03-26

1. Ridotto drasticamente il margine superiore del logo EXTERNAL (`padding-top: 0`).
2. Compattato anche lo spazio sotto header (`padding-bottom: 0.2mm`) per mantenere il logo vicino al bordo alto utile.

## Aggiornamento successivo - Correzione proporzioni box logo EXTERNAL

Data aggiornamento: 2026-03-26

1. Individuata causa del falso margine alto: logo orizzontale inserito in box quadrato (`40mm x 40mm`).
2. Corretto CSS logo su proporzione reale:
   - `width: 58mm`
   - `height: auto`
   - `max-height: 10mm`
3. Risultato: logo visivamente a ridosso del bordo superiore utile A4 (~1 cm reale), senza spazio verticale artificiale.

## Aggiornamento successivo - Spaziatura logo->prima categoria EXTERNAL

Data aggiornamento: 2026-03-26

1. Aumentato lo spazio sotto il logo EXTERNAL per spostare piu in basso l'inizio del menu.
2. `external-menu__header.padding-bottom` portato a `8mm`.

## Aggiornamento successivo - Titoli categoria EXTERNAL allineati a IT/EN

Data aggiornamento: 2026-03-26

1. Uniformati i titoli categoria EXTERNAL (`ANTIPASTI`, `PRIMI`, ecc.) allo stesso stile delle viste interne IT/EN.
2. Aggiornati font family, size, line-height, letter-spacing e colore su base `Playfair Display` come template interno.

## Aggiornamento successivo - Spaziatura categorie + riduzione titoli EXTERNAL

Data aggiornamento: 2026-03-26

1. Aumentata la distanza verticale tra le categorie della vista EXTERNAL (`gap` contenitore sezioni).
2. Ridotta la dimensione font dei titoli categoria EXTERNAL per migliorare equilibrio visivo del foglio.

## Aggiornamento successivo - Respiro verticale blocchi categoria EXTERNAL

Data aggiornamento: 2026-03-26

1. Aumentata la distanza `titolo categoria -> primo piatto` nella sola vista EXTERNAL.
2. Introdotto layout sezione EXTERNAL a griglia con `row-gap` dedicato per separare meglio header categoria e lista piatti.
3. Aumentato leggermente anche il respiro tra blocchi categoria mantenendo il fitting su una pagina A4.

## Aggiornamento successivo - Ripristino metrica verticale default IT/EN

Data aggiornamento: 2026-03-26

1. Ripristinati i parametri verticali interni (`IT`/`EN`) ai valori precedenti da backup per la spaziatura righe/sezioni.
2. `--category-title-body-gap` e `--category-body-pad-y` tornati proporzionali a `--menu-content-line-height-scale`.
3. Mantenute invariate le ultime logiche integrate: wrapper zoom (`.a4-sheet__content`), guardrail anti-overlap e tuning EXTERNAL.

## Aggiornamento successivo - Margini laterali canonici + griglia prezzi

Data aggiornamento: 2026-03-26

1. Eseguito audit su margini foglio, distanza testo/prezzi e comportamento zoom nei template stampabili.
2. Consolidata logica unica in `menu-template.css`:
   - introdotte variabili canoniche padding foglio (`--sheet-pad-top`, `--sheet-pad-x`, `--sheet-pad-bottom`)
   - aumentato margine laterale foglio (`--sheet-pad-x`) per allontanare il contenuto dai bordi su IT/EN/EXTERNAL
   - footer ancorato alle stesse variabili laterali del foglio.
3. Refactor zoom pulito in `A4Sheet`:
   - nuovo wrapper `.a4-sheet__content`
   - `Zoom Menù` applicato al wrapper con compensazione `width: calc(100% / scale)`
   - margini laterali coerenti anche con zoom.
4. Avvicinata la colonna prezzi al testo piatti:
   - IT/EN: ridotte larghezza colonna prezzo e gap riga
   - EXTERNAL: ridotto `column-gap` della riga item.
5. Print CSS allineato alla nuova struttura (`.a4-sheet__content`) per mantenere coerenza preview/stampa.

## Aggiornamento successivo - Preparazione repository GitHub per deploy manuale

Data aggiornamento: 2026-03-26

1. Inizializzato repository Git locale su branch `main`.
2. Impostato remote `origin` a `https://github.com/menuccv/menu_ristorante.git`.
3. Verificata autenticazione GitHub CLI attiva con protocollo `https`.
4. Rafforzato `.gitignore` per escludere artefatti non deployabili:
   - `Backup/`
   - `*.tar.gz`
   - `dist/`
   - `node_modules/`
   - cache/temp (`coverage/`, `.cache/`, `.tmp/`, `tmp/`, `temp/`, `.eslintcache`, `.vite/`)
   - output TypeScript (`*.tsbuildinfo`)
   - segreti locali (`.env`, `.env.*`) mantenendo `!.env.example`
5. Nessun commit e nessun push eseguiti.

## Aggiornamento successivo - Procedura standard commit/push manuale

Data aggiornamento: 2026-03-26

1. Consolidata la procedura Git manuale su branch unico `main` con remote canonico `origin`.
2. Impostati guardrail locali repository:
   - `push.default = simple`
   - `pull.ff = only`
3. Aggiornato `PROJECT_SETUP.md` con workflow operativo minimo (`status -> add -> commit -> push`) e nota esplicita su assenza automazioni.
4. Confermata separazione sicurezza: nessuna credenziale/token nel frontend; auth dipendente dall'ambiente locale.
5. In questo intervento non sono stati eseguiti commit/push aggiuntivi.

## Aggiornamento successivo - EXTERNAL: riduzione margine logo->menu

Data aggiornamento: 2026-03-26

1. Ridotto leggermente solo lo spazio sotto header EXTERNAL (`padding-bottom` da `8mm` a `6.8mm`).
2. Menu esterno alzato visivamente senza modificare il logo (`size`, `width`, `max-height` invariati).

## Aggiornamento successivo - Fix regressione compattazione IT/EN

Data aggiornamento: 2026-03-26

1. Individuata causa regressione: dopo l'introduzione del wrapper `.a4-sheet__content`, la distribuzione verticale delle categorie interne era rimasta sul container `.a4-sheet__body`, che ora contiene un solo figlio.
2. Effetto: i `menu-section` non ricevevano piu la logica `flex + section-weight`, con risultato compattato in alto e spazio vuoto eccessivo prima del footer.
3. Fix strutturale applicato in `menu-template.css`:
   - `.a4-sheet--internal .a4-sheet__body` mantiene solo metriche e padding
   - `.a4-sheet--internal .a4-sheet__content` diventa il contenitore flex canonico delle categorie (gap + min-height).
4. EXTERNAL non modificata.

## Aggiornamento successivo - Audit enterprise completo e consolidamento

Data aggiornamento: 2026-03-26

1. Rieseguiti quality gate e build con esito verde.
2. Verificata coerenza architetturale: nessuna logica business alterata, nessuna modifica UX/layout fuori scope.
3. Individuata non conformita governance: `src/styles/menu-template.css` oltre limite 350 righe.
4. Modularizzazione neutra applicata:
   - regole EXTERNAL estratte in `src/styles/external-menu-template.css`
   - import aggiunto in `src/styles/index.css`
   - `menu-template.css` riportato entro soglia.
5. Aggiornati file informativi principali (`PROJECT_SETUP.md`, `DNA/03`, `DNA/10`, `DNA/13`) con stato reale post-consolidamento.

## Aggiornamento successivo - Correzione centratura blocchi categoria IT/EN

Data aggiornamento: 2026-03-26

1. Fix applicato solo su logica interna (`IT`/`EN`) in `menu-template.css`.
2. Riallineata la centratura verticale del body categoria:
   - `.menu-section__content` passato a `display: grid` con `align-content: center`.
3. Ridotta leggermente l'altezza utile del contenitore categorie (`.a4-sheet--internal .a4-sheet__content`) da `238mm` a `230mm` per evitare sezioni percepite troppo alte.
4. Nessuna modifica alle regole EXTERNAL.

## Aggiornamento successivo - Interspazio piatti IT/EN aumentato con bilanciamento categorie

Data aggiornamento: 2026-03-26

1. Incrementato in modo misurato l'interspazio tra righe piatti interne:
   - `--category-row-gap`: da `1.6mm` a `1.85mm` (scalato con `lineHeight`).
2. Ribilanciata la metrica verticale sezione per mantenere centratura:
   - `--category-title-body-gap`: da `1.5mm` a `1.6mm`
   - `--category-body-pad-y`: da `1.7mm` a `1.8mm`
   - `--category-block-gap`: da `2.4mm` a `2.6mm`
3. Fix applicato solo su IT/EN (`.a4-sheet--internal`), EXTERNAL invariata.

## Aggiornamento successivo - Correzione mirata solo interspazio righe piatti IT/EN

Data aggiornamento: 2026-03-26

1. Ripristinati invariati i parametri categoria non richiesti (`block-gap`, `title-body-gap`, `body-pad-y`).
2. Aumentato solo lo spazio tra righe piatti IT/EN:
   - `--category-row-gap`: `1.6mm` -> `2.2mm` (scalato con `lineHeight`).
3. Nessuna modifica EXTERNAL.

## Aggiornamento successivo - Migrazione settings per rendere visibile il default IT/EN

Data aggiornamento: 2026-03-26

1. Individuata causa "modifiche non visibili": valori sidebar persistiti in `localStorage` sovrascrivevano il default aggiornato.
2. Aggiornata chiave storage a `menu-print-app-settings-v2` con migrazione da `v1`.
3. In migrazione vengono mantenute le impostazioni utente utili (vista, footer, traduzioni), ma i `contentControls` vengono riallineati ai default canonici.
4. Aggiunto test dedicato in `settingsStore.test.ts` per bloccare regressioni della migrazione.

## Aggiornamento successivo - Porta dev fissata a 5001

Data aggiornamento: 2026-03-26

1. Configurato `vite.config.ts` con server canonico:
   - `host: 0.0.0.0`
   - `port: 5001`
   - `strictPort: true`
2. Confermato che `npm run dev` non fa fallback su porte alternative.
3. Aggiornato `PROJECT_SETUP.md` con nota operativa sulla porta fissa.

## Aggiornamento successivo - Solo aumento interspazio righe piatti IT/EN

Data aggiornamento: 2026-03-29

1. Applicata modifica esclusivamente al template interno (`IT`/`EN`) in `src/styles/menu-template.css`.
2. Aumentato solo `--category-row-gap`:
   - `2.2mm` -> `2.6mm` (scalato con `lineHeight`).
3. Mantenuti invariati:
   - margine `titolo categoria -> prima riga piatto` (`--category-title-body-gap`)
   - centratura verticale interna dei blocchi categoria (`.menu-section__content` con `align-content: center`)
   - metrica tra categorie e resto impaginazione.

## Aggiornamento successivo - Consolidamento interspazio/sidebar (runtime reale)

Data aggiornamento: 2026-03-29

1. Esteso il range UI `Interspazio righe`:
   - `lineHeightPercent.max`: `125` -> `150` in `src/state/contentControls.ts`.
2. Aggiornata soglia del guardrail tipografico:
   - `MAX_CATEGORY_LAYOUT_PRESSURE`: `1.43` -> `1.5`.
3. Hardening persistenza settings:
   - chiave corrente `menu-print-app-settings-v3`
   - marker `contentControlsBaselineVersion = 2`
   - migrazione legacy supportata da `v2` e `v1` con riallineamento dei `contentControls` ai default canonici.
4. Fix strutturale anti-conflitto CSS:
   - variabili categoria (`--category-layout-scale`, `--category-row-gap`, ecc.) spostate da `.a4-sheet__body` a `.a4-sheet__content` per coerenza con le custom properties della sidebar.
5. Calibrazione finale interspazio righe piatti IT/EN:
   - `--category-row-gap` portato e rifinito fino al valore corrente `calc(2.1mm * var(--category-layout-scale))`.
6. Copertura test aggiornata:
   - `src/state/contentControls.test.ts`
   - `src/state/settingsStore.test.ts`

## Aggiornamento successivo - Export PDF sidebar + tuning EXTERNAL finale

Data aggiornamento: 2026-03-29

1. Sidebar azioni aggiornata con nuovo pulsante `Esporta PDF`:
   - posizione: sopra `Google Sheet`
   - stile: sfondo rosso, testo bianco.
2. Flusso `Esporta PDF` collegato allo stesso motore nativo della stampa (`window.print`) per mantenere coerenza tra preview app, print preview browser, PDF e stampa finale.
3. Tuning EXTERNAL:
   - logo ridotto del 30% (`width: 58mm -> 40.6mm`, proporzione invariata con `height: auto`)
   - spazio `logo -> menu` ridotto del 40% (`padding-bottom: 6.8mm -> 4.08mm`)
   - posizione logo non modificata.
4. Test aggiornati:
   - `src/app/components/SidebarControls.test.tsx` (callback pulsante `Esporta PDF`)
   - `src/app/App.test.tsx` (invocazione print anche da `Esporta PDF`).

## Aggiornamento successivo - Fix runtime ingestione Google Sheet (zero righe in deploy)

Data aggiornamento: 2026-03-29

1. Individuata incompatibilita header reale del CSV: colonna titolo IT esposta come `-*` invece di `Titolo IT`.
2. Estesi alias mapping in `src/config/googleSheet.ts` per includere `-*`/`*` come equivalenti di `titleIt`.
3. Rafforzata normalizzazione header in `csvParser.ts` con `trim()` finale per evitare mismatch dovuti a spazi residui.
4. Rafforzato `menuRepository.ts` con validazione payload: errore esplicito se la risposta fetch non e CSV (es. HTML/redirect/login).
5. Aggiunti test di regressione su:
   - header speciale `-*` (`mapSheetRows.test.ts`)
   - validazione payload non CSV (`menuRepository.test.ts`)
   - normalizzazione header (`csvParser.test.ts`).
6. Ripristinata compatibilita locale dei gate `check/build` rimuovendo l'opzione TypeScript non supportata `erasableSyntaxOnly` dai `tsconfig` del progetto.

## Aggiornamento successivo - Titoli sezione EN persistenti cross-device via Google Sheet

Data aggiornamento: 2026-03-29

1. Esteso il mapping foglio con colonna opzionale `Categoria EN`.
2. `MenuItem` aggiornato con campo `categoryEn`.
3. Risoluzione titoli sezione in vista `EN` aggiornata con priorita:
   - `Categoria EN` (foglio)
   - `Translate Titoli` locale (`titleEn`)
   - fallback locali/categoria originale.
4. Vista `IT` e vista `EXTERNAL` lasciate invariate nella logica di resa categorie.
5. Aggiunti test di regressione su:
   - mapping `Categoria EN`
   - grouping con `categoryEn`
   - priorita risoluzione titoli sezione EN.

## Aggiornamento successivo - Esporta PDF dedicato senza header/footer browser

Data aggiornamento: 2026-03-29

1. Separata la logica del pulsante `Esporta PDF` dalla stampa nativa.
2. Introdotta utility `src/print/utils/exportMenuPdf.ts` che cattura la `.a4-sheet` della preview e genera PDF A4 diretto.
3. Rimossi dall'export PDF i metadati browser tipici (`URL`, data, numerazione pagina) non desiderati nel menu finale.
4. Aggiornato `App.tsx` per usare export dedicato e mantenere `Stampa` su `window.print`.
5. Aggiornati test applicativi e documentazione DNA/Setup in coerenza con il nuovo flusso.

Aggiornamento integrativo (stessa data):

6. Export PDF hardenizzato per iPad:
   - cattura su clone non scalato della pagina A4 (indipendente dalla scala preview),
   - render forzato su singola pagina A4 nel PDF (`210x297mm`),
   - preservazione visiva delle linee sottili dei titoli sezione durante l'export.

## Aggiornamento successivo - Tuning contrasto allergeni in stampa

Data aggiornamento: 2026-03-29

1. In `src/styles/print.css` aumentato leggermente il contrasto degli allergeni a sinistra delle righe piatti (`.menu-item-row__allergens`).
2. Aumentato leggermente il contrasto dei nomi allergeni nel footer (`.menu-footer__legend-item`) mantenendo invariati i numeri in grassetto.
3. Intervento limitato al solo media print, senza impatto sulla preview app.

## Aggiornamento successivo - Prezzi avvicinati alle righe piatti

Data aggiornamento: 2026-03-29

1. Corretto approccio layout: rimossa traslazione della sola colonna prezzi.
2. IT/EN: centrato il blocco riga completo riducendo la larghezza utile lista (`.menu-list`) di `30mm` e mantenendo `margin-inline: auto`.
3. EXTERNAL: applicata la stessa logica alla lista (`.external-menu__list`) per coerenza visiva.
4. Risultato: prezzi piu vicini ai piatti con centratura reale del blocco `allergeni + titolo + prezzo` sul foglio.

## Aggiornamento successivo - Rimozione funzione/pulsante Stampa

Data aggiornamento: 2026-03-29

1. Rimossa dalla sidebar l'azione `Stampa`.
2. Eliminata la callback `onPrint` dai componenti `App` e `SidebarControls`.
3. Mantenuta `Esporta PDF` come unica azione di output.
4. Aggiornati test UI (`App.test.tsx`, `SidebarControls.test.tsx`) e documentazione di stato.

## Aggiornamento successivo - Rimozione completa Translate Titoli

Data aggiornamento: 2026-03-29

1. Rimossi pulsante e modale `Translate Titoli` dalla sidebar.
2. Eliminati stato, callback e persistenza locale `sectionTitleTranslations` da hook/settings/types.
3. Rimosso file `src/app/components/SectionTitlesModal.tsx`.
4. Rimosso file `src/state/sectionTitleTranslations.ts`.
5. Risoluzione titoli sezione semplificata:
   - `IT`: `Categoria`
   - `EN`: `Categoria EN` con fallback su `Categoria`
6. Aggiornati test e documentazione corrente in coerenza con la nuova logica.

## Aggiornamento successivo - Convenzione persistente commit/push

Data aggiornamento: 2026-03-29

1. Formalizzata in `AGENTS.md` e `PROJECT_SETUP.md` la regola operativa: richiesta utente esplicita `commit push` (o equivalente) vale come autorizzazione unica end-to-end per validazioni, commit e push su `main`.
2. La procedura si interrompe solo su blocker reali (permessi/auth, conflitti hard, check obbligatori falliti).

## Aggiornamento successivo - Audit enterprise + backup coerente

Data aggiornamento: 2026-03-29

1. Eseguito controllo tecnico completo post-merge con quality gate verdi:
   - `npm run quality` OK
   - `npm run build` OK
2. Verificata assenza di riferimenti runtime residui a `Translate Titoli` / `sectionTitleTranslations` / `Stampa` nel codice sorgente.
3. Aggiornata documentazione DNA allo stato reale corrente, rimuovendo riferimenti residui non validi nel modello operativo attuale.
4. Creato nuovo backup coerente con policy permanente senza sovrascrittura:
   - `Backup/Backup_29 Marzo_23.18.tar.gz`
