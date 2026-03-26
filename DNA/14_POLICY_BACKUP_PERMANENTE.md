# Policy Permanente Backup

## Regola non negoziabile

Ogni nuovo backup deve essere creato come nuovo file in `Backup/`.
Nessun backup esistente deve mai essere sovrascritto, rinominato o cancellato automaticamente.

## Formato obbligatorio

- Formato compresso: `tar.gz`
- Formato `.zip`: non consentito

## Strumento standard di progetto

- Script principale: `npm run backup`
- Implementazione: `scripts/create-backup.mjs`

## Regola naming e univocita

Formato unico consentito:

- `Backup_DD Mese_HH.MM.tar.gz`

Esempio:

- `Backup_26 Marzo_14.21.tar.gz`

Regole obbligatorie:

- mese in italiano con iniziale maiuscola (`Gennaio ... Dicembre`)
- nessun suffisso progressivo (`_01`, `_02`, `__02`)
- nessun testo extra (`verify`, `label`, ecc.)
- nessun formato ISO nel nome
- orario con punto (`HH.MM`), mai con `:`

## Ordinamento cronologico e tracciabilita

- Se lo stesso nome e gia presente, lo script non sovrascrive: avanza automaticamente al minuto successivo mantenendo sempre il formato `Backup_DD Mese_HH.MM`.
- Ogni creazione backup aggiorna `Backup/BACKUP_MANIFEST.json` con:
  - `fileName`
  - `createdAtIso`
- Il manifest viene anche riallineato ai file `.tar.gz` gia presenti in `Backup/`, per mantenere traccia completa nel tempo.

## Comportamento cross-machine

La logica dipende solo da:

- struttura cartelle del progetto (`Backup/`)
- script versionato nel repository (`scripts/create-backup.mjs`)
- regole documentate in `DNA`

Non dipende da file temporanei locali o stato macchina specifico.
