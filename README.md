# Ponderosa SO Trainer

> **Note:** this repository was originally the Yosemite Valley map (`YV_MAP`). It has been
> **repurposed** to host the **Ponderosa SO Trainer** project. The old map files were removed
> (still recoverable from git history on `main`).

A human-in-the-loop tool that helps a tech **complete a Ponderosa E.FACS service order
accurately**. It is a **pointer + supplier + formatter** — never autopilot.

> North star: *"We just want our GIS records and the iVUE records to match what is in the
> switch so we know what is available and what is not."*

## Layout

| Path | What |
|------|------|
| `.claude/skills/ponderosa-so/` | Orchestrator skill — work an SO end-to-end. Bundles the authoritative KB + generated reference docs. |
| `.claude/skills/ponderosa-so-classify/` | POINTER skill — classify a request into flow / workflow / action codes. |
| `.claude/skills/ponderosa-so-note/` | FORMATTER skill — assemble + validate the canonical write-up note. |
| `checkpoint/` | The `2026-06-03` data foundation: plan, locked decisions, verified knowledge, provenance. |

## Start here (in `checkpoint/`)

- **`BUILD_SPEC.md`** — locked decisions for the rebuild (styling, 3-pane UX, issue tracking, flows).
- **`MASTER_PLAN.md`** — purpose, scope, phases, note format.
- **`knowledge_base_v4.json`** — AUTHORITATIVE consolidated KB (6 flows, 173 terms, note format,
  action codes, palette). The skills' reference docs are generated from this file.
- **`OPEN_QUESTIONS.md`** — resolved decisions + the few non-blocking open items.
- **`README.md`** (inside `checkpoint/`) — full index of every file in the snapshot.

## Locked decisions (scope = E.FACS only)

- Binary FACS: `FACS CHANGED` / `FACS UNCHANGED`.
- Note = two-line header (`{SO#} {action}` / `{date} {FACS|desc}`) + per-flow body + `-{tech}` footer.
- Date `M.D.YY`; customer phone/account masked to last-4 `****`; omit any N/A line.
- Corpus + real-customer data uploaded at runtime, never embedded.
- E.GIS map-making and 911_EXT are out of scope (context only).

## Status

Phase 4 (Skills) of the master plan is in place. Known-open items carry `PENDING`/`Q##` markers
in the KB and reference docs (Q20 C&C-vs-tier code, speed-tier prices vs H07, Q24 Beasore routing).
