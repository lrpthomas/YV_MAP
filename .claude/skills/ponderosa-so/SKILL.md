---
name: ponderosa-so
description: Complete a Ponderosa E.FACS service order (SO) end-to-end — classify the order into its flow, point the tech to the right systems/fields in order, supply reference data (speed tiers, action codes, CLLI, RCF rules), and assemble the canonical write-up note. Use whenever the user is working a Ponderosa/iVUE/LinePacks service order, an E.FACS facility assignment, asks to "write the note" / "complete an SO" / classify an SO request, or pastes an SO request block. Scope is E.FACS facility assignment only (E.GIS map-making and 911_EXT are out of scope).
---

# Ponderosa SO Trainer — complete a service order end-to-end

## North star
> "We just want our GIS records and the iVUE records to match what is in the switch so we
> know what is available and what is not."

This skill helps a tech **complete an E.FACS service order accurately**. It is a
**pointer + supplier + formatter**, human-in-the-loop — never autopilot. Anything uncertain
gets flagged, not guessed past.

- **POINTER** — for this SO type, touch these systems in this order, pull these fields.
- **SUPPLIER** — surface the right reference at the right step (speed→tier, wirecenter→CLLI,
  status codes, RCF rules).
- **FORMATTER** — assemble gathered values into a correct, standardized note.

## Scope (locked)
- **In:** E.FACS facility-assignment only — the 6 flows below.
- **Out:** E.GIS map-making and 911_EXT (reference/context only, never a branch).
- All real customer / corpus data is uploaded at runtime, **never embedded**. Mask customer
  phone/account to last-4 → `****`.

## The 6 flows
| Flow | SOs | What it covers |
|------|-----|----------------|
| DISCONNECT | 3413 | plain DISC · NPD (QDS stays) · PERM · VACA DISC (facilities held) · DISC TEL (CBOL) |
| CONNECT_RECONNECT | 6345 | QDS CONN · RECON · VACA RECON · SR seasonal · new install |
| UPGRADE | 2160 | bonded · single · ADSL/VDSL · ACP · move-ports-for-bond · +splice · +XCONN · DOWNGRADE |
| MOVE | 315 | NEW ADDRESS + OLD ADDRESS blocks; same / cross exchange |
| FIBER_FTTH | 916 | GPON/splitter/ONT path; 2nd service on ONT; EDGE (125) |
| CROSS_CONNECT | 10 | jumper move at SAI; bonded XCONN variants |

## Procedure (work an SO top-to-bottom)
1. **Classify.** Read the incoming request block. Identify flow → specific corpus workflow →
   action code(s). See `references/flows.md` and `references/action-codes.md`. For just this
   step the `ponderosa-so-classify` skill is the focused entry point.
2. **Point.** State which systems to touch and in what order, and which fields to pull from
   each. Field → source map is in `references/note-format.md`; system layout in
   `references/systems.md` (`PENDING` where the KB hasn't captured it).
3. **Gather + validate per field.** Collect values section by section (`*TEL`, then `*DSL`,
   etc.). Validate each value against its pattern **at entry, while the source system is still
   open** — see `references/validation.md`. Flag mismatches; never auto-correct customer data.
4. **Supply references on demand.** speed → `references/speed-tiers.md`; codes/terms →
   `references/action-codes.md`, `references/terms-glossary.md`; RCF → `references/rcf.md`.
5. **Format the note.** Assemble per `references/note-format.md`: two-line header
   (`{SO#} {action}` / `{date} {FACS state or action desc}`), per-flow body from the matched
   corpus template, `-{tech}` footer. Binary FACS CHANGED/UNCHANGED. Date M.D.YY. **Omit any
   N/A line.** The `ponderosa-so-note` skill is the focused entry point for this step.
6. **Route.** After E.FACS, route per the order (P.PROG via Continue Workflow, modern path).
   Beasore / development codes route to `*REFER TO ENGINEERING*` + HOLD first — flag these.

## Reference files (read on demand — don't load all at once)
- `references/flows.md` — 6 flows + every corpus workflow's seed template.
- `references/action-codes.md` — 24 atomic + 22 combo phrases with corpus frequency.
- `references/note-format.md` — canonical recipe, field sources, port-line anatomy, rules.
- `references/validation.md` — per-field shapes + the per-field-at-entry validation rule.
- `references/speed-tiers.md` — tier table (prices PENDING H07 verification).
- `references/terms-glossary.md` — 173 terms / validated canonical fields / glossary.
- `references/rcf.md` — RCF codes, routing, reserved switch block.
- `references/systems.md` — iVUE/LinePacks navigation and the SO screen.
- `references/knowledge_base_v4.json` — the authoritative machine-readable KB (single source
  of truth; the markdown above is generated from it).

## Rules of engagement
- Better to flag than silently move on. Log uncertainty; confirm with Cody.
- Don't guess past an open question. Known-open items carry `PENDING`/`Q##` markers:
  - **Q20** — does the request carry the C&C code (`D000000`) or the tier ID (`D000`)?
  - Speed tier **prices** are estimates until reconciled with the H07 C&C table.
  - **Q24** — confirm Beasore/dev codes route `*REFER TO ENGINEERING*` + HOLD first.
