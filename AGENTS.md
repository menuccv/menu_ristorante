# AGENTS

## Scope

These rules apply to the entire repository.

## Project Rules

- Frontend-only app. No backend, auth, DB, Supabase, or extra services.
- Keep exactly three views: `IT`, `EN`, `EXTERNAL`.
- Google Sheet is read-only source of truth.
- Keep controls, data ingestion, domain types, and print templates separated.
- Build around A4 print fidelity first; preview must stay centered and large.
- Keep footer support in every print template.
- Keep files under 350 lines; split before exceeding.
- No duplicate logic, dead code, fallback shadow implementations, or speculative features.
- Typography is limited to `Playfair Display` and `DM Sans`.
- Every structural, functional, or architectural change must update the impacted `DNA/*.md` files in the same step.

## Commit/Push Authorization Rule

- If the user writes an explicit command like `commit push`, `esegui commit push`, or equivalent wording, it is a single end-to-end authorization to run all required steps automatically: validation checks, commit creation, and push to `main`.
- Only stop for real blockers (missing GitHub permissions/auth, hard conflicts, or failing mandatory checks).
