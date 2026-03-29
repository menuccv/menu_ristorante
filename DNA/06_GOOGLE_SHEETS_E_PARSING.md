# Logica Google Sheets / Parsing Dati

## Configurazione URL

- File: `src/config/googleSheet.ts`
- Variabile ambiente: `VITE_GOOGLE_SHEET_CSV_URL`
- URL di default attivo (read-only reale):  
  `https://docs.google.com/spreadsheets/d/1TVHaO3bM4WALAey-TXNWYJh--RiGUheAaoU00gamJpY/export?format=csv&gid=1122482173`

## Colonne previste (mapping base)

- `CATEGORIA`
- `Titolo IT`
- `Titolo EN`
- `PREZZO`
- `ALLERGENI`

Alias runtime supportati includono anche header non standard del foglio reale (es. `-*` come equivalente di `Titolo IT`).

## Flusso dati

1. `menuRepository.ts` esegue fetch read-only del CSV.
2. `csvParser.ts` fa parsing CSV robusto (quote, virgole, newline).
3. `mapSheetRows.ts` risolve alias header e produce `MenuItem[]`.
4. Output finale: `MenuDataset` con `items` e metadati `source`.

## Errori gestiti

- URL non configurato.
- Foglio non raggiungibile (rete/HTTP).
- Payload non valido (HTML/login/redirect non CSV).
- Errore mapping colonne obbligatorie.
