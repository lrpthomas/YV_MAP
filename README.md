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
| `so_trainer.html` | **The app** — standalone single-file trainer. Open it locally (double-click / `file://`, no server, no internet). Generated; do not hand-edit. |
| `app/template.html` | App source (HTML/CSS/JS). Edit this, then rebuild. |
| `build_app.py` | Build step — injects `checkpoint/knowledge_base_v4.json` into the template → `so_trainer.html`. |
| `.claude/skills/ponderosa-so/` | Orchestrator skill — work an SO end-to-end. Bundles the authoritative KB + generated reference docs. |
| `.claude/skills/ponderosa-so-classify/` | POINTER skill — classify a request into flow / workflow / action codes. |
| `.claude/skills/ponderosa-so-note/` | FORMATTER skill — assemble + validate the canonical write-up note. |
| `checkpoint/` | The `2026-06-03` data foundation: plan, locked decisions, verified knowledge, provenance. |

## The app (`so_trainer.html`)

Run it: open `so_trainer.html` in a browser (locally — `file://`, offline). Build it:
`python3 build_app.py` (regenerates `so_trainer.html` from the template + KB).

What it does (built in the locked `BUILD_SPEC.md` order):

1. **Issue spine** — flag anything (field / step / note line / reference value) with the ⚑ icon. A
   slide-in capture panel pre-fills the context (flow, workflow, step, field, parsed input, app
   output) and takes a correction, free text, and screenshots (paste a snip with Ctrl+V, or attach).
   Issues persist to **IndexedDB**, carry an open/resolved lifecycle, show a live open-count badge on
   the Issues tab, and **export** to one JSON file (then offers to clear) with **import** to restore.
2. **Three-pane Workflow view** — SO-request **parser** routes a pasted request to a flow → pick the
   corpus workflow → a per-field wizard with **validation at entry** → a **live note preview** that
   builds in real time with the omit-N/A rule, binary **FACS CHANGED/UNCHANGED**, `****` last-4
   masking, and `M.D.YY` dates. All 6 flows / 28 corpus workflows are driven by the KB's
   corpus-derived templates (not invented).
3. **Reference** — note recipe, port-line anatomy, field sources, flows, action codes (24 atomic + 22
   combo), 173-term glossary, speed tiers, a port-line **decoder**, the **RCF** code table + rule,
   systems, procedures, people/routing, and the legacy→modern identifier map.
4. **Examples** — one labeled, scrubbed real example per workflow (from the canonical `ServiceOrders.docx`).
5. **Corpus** — runtime JSON upload + explorer. Corpus and real-customer data are **never embedded** —
   they stay on the machine (locked decision).

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

Phase 4 (Skills) is in place, and the **app (`so_trainer.html`) is built** — issue spine,
three-pane KB-driven engine, parser, per-field validation, live note, and the Reference / Examples /
Corpus tabs all working (validated headless with Playwright, zero console errors).

Known-open items carry `PENDING`/`Q##` markers in the KB and reference docs (Q20 C&C-vs-tier code,
speed-tier prices vs H07, Q24 Beasore routing). Next enrichment pass: load the full Sili CLLI
dictionary + equipment export at runtime, and reconcile speed-tier prices against the H07 C&C table.
