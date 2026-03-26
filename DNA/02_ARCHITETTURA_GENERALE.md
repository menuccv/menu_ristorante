# Architettura Generale

## Stack

- React
- TypeScript
- Vite
- Stato locale con hook React + localStorage

## Flusso principale

1. Hook applicativo carica impostazioni locali.
2. Hook richiama repository dati Google Sheet (read-only CSV).
3. CSV parser converte testo in righe.
4. Mapper converte righe in `MenuItem` tipizzati.
5. App shell mostra sidebar + anteprima A4 centrale.
6. Template stampa renderizza `IT`, `EN` o `EXTERNAL`.

## Separazione responsabilita

- `app`: orchestrazione UI e stato di pagina.
- `data/googleSheets`: fetch/parsing/mapping.
- `print`: rendering stampabile A4.
- `state`: persistenza impostazioni locali.
- `domain`: tipi condivisi.
