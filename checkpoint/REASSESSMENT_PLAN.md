# SO Trainer — Full Breakdown & Reassessment Plan
*Authored 2026-06-10. Grounded in the actual repo state, not from memory.*

---

## 1. WHAT THE APP IS

**Ponderosa SO Trainer** — a single-file, offline HTML tool that helps a tech complete an
E.FACS service-order (SO) write-up note correctly and fast, and practice doing so.

Its job (Troy's north-star, from `MASTER_PLAN.md`): *"make GIS and iVUE records match the
switch."* The tool is **pointer + supplier + formatter**, human-in-the-loop, never autopilot:

- **POINTER** — for this SO type, touch these systems in this order, pull these fields.
- **SUPPLIER** — surface the right reference at the right step (speed→C&C, wirecenter→equipment, status codes, RCF rules, CLLI).
- **FORMATTER** — assemble the gathered values into the canonical note.

Scope is **E.FACS facility assignment only** (E.GIS map-making and 911_EXT are explicitly out).

---

## 2. ARCHITECTURE & BUILD

```
checkpoint/knowledge_base_v4.json  (the "brain": 6 flows, 31 workflows, terms, decisions)
checkpoint/workflow_specs.json     (per-workflow POINTER steps + guidance + options)
checkpoint/reference_extra.json    (C&C catalog, equipment, iVUE enums, procedures)
                │
                ▼  build_app.py  (injects the 3 JSON blobs into the template)
app/template.html  (151 KB — ALL the UI + logic, ~2400 lines of vanilla JS/CSS)
                │
                ▼
so_trainer.html    (278 KB — the shipped single file; double-click, file://, no server)
```

- **Single file, no dependencies, no network.** Runs locally; `localStorage`/`IndexedDB`
  are the persistence layer (drafts, recent SOs, issues, tech initials, theme, quiz scores).
- **Corpus + real-customer data are NEVER embedded** (locked BUILD_SPEC decision) — they are
  uploaded at runtime in the Corpus tab and stay on the machine.
- **Skill mirror:** `.claude/skills/ponderosa-so/` carries a copy of the KB + reference md so
  the agent-assist path stays aligned with the app.

### Feature surface
- **Workflow tab** — paste→parse→route, 6 flow cards, per-step wizard with POINTER guidance,
  per-field validation + "where to find it" + examples, live note preview, FACS control,
  splice/x-conn constructs, bulk-SO queue, draft autosave/resume.
- **Reference tab** — 19 sub-sections (note format, flows, action codes, glossary, speed tiers,
  C&C catalog, equipment, card rules, cable book, RCF, iVUE enums, procedures, legacy map…).
- **Examples tab** — 8 curated real-shape notes + 31 illustrative (one per workflow).
- **Corpus tab** — runtime upload + explorer (search/sort/paginate) + load-to-practice + quiz.
- **Issues tab** — flag-anywhere capture (context pre-filled) → punch-list → export.
- Cross-cutting: command palette (Ctrl+P), glossary tooltips, dark mode, mobile sticky copy
  bar, guided tour, quiz with structural scoring.

---

## 3. THE DATA FOUNDATION — AND ITS BIGGEST RISK

The app is **only as good as the KB it's built from**, and the KB is a *derived* artifact.

### What's present (derivatives / authored)
| File | What it is |
|---|---|
| `knowledge_base_v4.json` (98 KB) | 6 flows · 31 workflows (each: template, count, variants) · 35 validated + 138 suggested terms · 7 locked decisions |
| `workflow_specs.json` (18 KB) | POINTER steps + guidance + options per workflow |
| `reference_extra.json` (34 KB) | C&C catalog, equipment inventory, iVUE enums, procedures |
| `app_terms.json` (86 KB) | 173-term glossary (the term source-of-truth) |
| `build_data.json` (11 KB) | 43 speed tiers, 44 equip-inventory entries, 9 examples |
| `xcheck_all_results.json` (39 KB) | 174 term cross-check results |
| `app_chat_info.txt` (520 KB) | the build-session log (field profiles, decisions, evidence) |
| `doctxt/…Line_Assignments…txt` (37 KB) | one real Line-Assignments doc |
| `rcf_ocr/*.png` | RCF workflow screenshots (OCR'd) |

### ⚠ What's MISSING (the ground truth the KB was derived from)
`MASTER_PLAN.md` lists these as the data foundation, but **none are in the current repo**:
- `corpus.pkl` — **13,159 SOs, 31 workflows, seed templates** ← the templates came from here
- `sso_responses_examples.txt` — **518 full request→response pairs** ← the note ground truth
- `equipment_examples_sanitized.json` — 54,455 rows (iVUE facility schema)
- `ttickets_examples_sanitized.json` — 40k+ rows
- `PTCGIS_SO_FacilityAssignments.docx` — 944 paras of real worked examples

**Why this matters:** the 31 note templates are *clustering artifacts* from `corpus.pkl`. A
quality pass this session already found **three templates with real defects** baked in:
- `MOVE_QDS` leaked a real order's addresses (`Move DSL from 3390 to 2801`) and had a dead FACS
  toggle (hardcoded `No FACS Changed`).
- `UPGRADE_BONDED / UPGRADE_FTTH / EDGE_OTHER` froze a speed into the date line (notes said
  `100/20`/`100/100` regardless of the actual order).
- `PATH_TRACE_UPDATE` had no FACS line at all.

These were fixed, but **they are evidence that the templates were not systematically validated
against the corpus.** There are very likely more (e.g., `MOVE` is far barer than the real
NEW/OLD-ADDRESS structure documented in `OPEN_QUESTIONS.md` #6). **Re-validating all 31
templates against the original request→response pairs is the single most important
reassessment activity — and it requires re-supplying that source data.**

---

## 4. CURRENT QUALITY STATE

**Verified (this session, via ~34 Playwright suites — but see the gap below):**
- All 31 workflows build a note with no leftover `{placeholders}`, no `N/A` leaks, no empty
  notes, no instance-data leaks, FACS live on every applicable workflow.
- Routing 7–8/8 on real requests; precise workflow disambiguation; RCF handled.
- Live note preview is faithful (single-spaced, matches the copied text).
- FACS binary + optional exact-wording; drafts/resume; quiz works without a corpus (curated
  fallback) with structural scoring; bulk cycle; palette; reference renders.
- Accessibility: labeled controls, keyboard-navigable, body contrast 8.9:1 (WCAG AA).
- Zero console errors across journeys.

**⚠ The testing gap:** **none of these suites are committed** — they live in `/tmp` and the
container keeps reclaiming them. The app has *been* verified but has **no durable, repeatable
regression harness in the repo.** This is the #1 maintainability risk.

**Known/likely-remaining risks:**
- Template fidelity (Section 3) — unvalidated against corpus; MOVE and others look too bare.
- Line 1 vs line 2: both default to the same descriptor; real notes have a short line 1 +
  detailed line 2 (a pre-existing simplification, not yet addressed).
- Workflow-level routing is a best-guess when keywords are weak (flow-level is reliable).
- Mobile is functional but secondary; not exhaustively tested on real devices.
- Term glossary: 138 "suggested" terms are unvetted (only 35 validated).

---

## 5. WHAT IT NEEDS (gap list, prioritized)

**P0 — foundational (do before trusting any further work)**
1. **Re-supply the ground-truth data** (`corpus.pkl`, `sso_responses`, equipment, ttickets,
   FacilityAssignments) into `checkpoint/` so the KB can be validated.
2. **Commit a durable test harness** — move the Playwright suites into the repo (`/tests`) with
   a runner, so quality is regression-guarded and survives container resets.

**P1 — correctness**
3. **Validate all 31 templates against the corpus** request→response pairs (structural match
   rate per workflow); fix every template that diverges (leaks, frozen values, missing
   sections, bare structure).
4. **Rebuild MOVE / MOVE_QDS** to the documented NEW/OLD-ADDRESS + `*TEL`/`*DSL` structure.
5. **Separate line-1 (short action) from line-2 (detailed descriptor)** so notes match the
   real two-line header.

**P2 — completeness & polish**
6. Vet the 138 suggested glossary terms (promote/correct/drop).
7. Confirm the open routing/data questions (RCFA routing A/AE/B vs C/D; KIMW vs P.PROG; per-slot
   card inventory) — `OPEN_QUESTIONS.md` still has 🔴/🟡 items.
8. Mobile device testing; optional sticky-progress; print/PDF of a completed note.

**P3 — productionization**
9. Versioning + changelog; a one-page user guide; packaging (signed zip / hosted internal URL).
10. Decide deployment (double-click file vs internal hosting) and a KB-update workflow for
    non-engineers.

---

## 6. HOW IT SHOULD BE REVIEWED (dimensions + methodology)

Review along **eight dimensions**, each with an owner and an objective test:

| Dimension | Question | How to measure |
|---|---|---|
| **Note correctness** | Does the generated note match what a senior tech would write? | Structural match rate vs `sso_responses` pairs, per workflow (target ≥90%) + SME spot-review |
| **Data integrity** | Any leaked customer data / frozen instance values in templates? | Automated scan of all templates for digits/addresses/hardcoded FACS (now partly built) |
| **Routing accuracy** | Does paste→route land on the right flow *and* workflow? | Replay N corpus requests through `routeRequest`; measure flow + workflow hit rate |
| **Completeness** | Every workflow, field, and reference present and correct? | Coverage checklist + the 31-workflow integrity suite |
| **UX/flow** | Can a tech finish an SO fast without friction? | Task-completion walkthroughs + click/time counts; SME usability session |
| **Accessibility** | Keyboard-only, labels, contrast? | axe-style checks (started) + manual keyboard pass |
| **Performance/size** | Loads instantly, no jank with a big uploaded corpus? | Load time, corpus-of-13k render time |
| **Security/privacy** | No data leaves the machine; safe HTML rendering? | Confirm no network calls; audit `innerHTML`/`{html:}` sinks; corpus-stays-local check |

**Reviewers:** an **SME tech (Troy/Cody)** for correctness & terminology (the only source of
truth for "is this note right"), plus an **engineer** for the automated dimensions. Correctness
is SME-gated — automated tests can prove *consistency*, not *rightness*.

---

## 7. THE REASSESSMENT PLAN (phased)

### Phase 0 — Re-establish the foundation *(prereq, ~1 session)*
- Recover/re-supply the ground-truth datasets into `checkpoint/`.
- Lift the existing Playwright suites into `/tests` with a committed runner + README; wire a
  simple `make test`. **Now every later change is regression-guarded.**
- Snapshot current behavior as the baseline.

### Phase 1 — Corpus-grounded KB validation *(the core, ~2–3 sessions)*
- Write a **template-vs-corpus validator**: for each of the 31 workflows, render the template
  with the corpus row's fields and compare structurally to the real response. Output a per-
  workflow **fidelity score + a diff of what's missing/extra/leaked**.
- Triage every workflow under ~90%: fix leaks, frozen values, missing sections (MOVE/MOVE_QDS
  rebuild, line-1/line-2 split, etc.).
- Re-run; lock a fidelity floor as a committed test.

### Phase 2 — Terms, reference & open questions *(~1–2 sessions)*
- Vet the 138 suggested terms against the corpus + SME; promote/correct/drop.
- Cross-check the C&C catalog, equipment, RCF rules against source docs.
- Close the remaining 🔴/🟡 items in `OPEN_QUESTIONS.md` with the SME.

### Phase 3 — UX, accessibility & deployment review *(~1 session)*
- SME usability session on real SOs (measure friction, fix top 3).
- Full keyboard/contrast pass; mobile device check.
- Decide & implement deployment + a non-engineer KB-update path; add a user guide + versioning.

### Phase 4 — Productionize *(~1 session)*
- Tests green in a runnable harness; changelog; packaged release; handoff doc.

### Definition of "reassessed & trustworthy"
1. Ground-truth data is back and the validator runs. 2. Every workflow ≥ the fidelity floor,
SME-spot-checked. 3. Durable tests green in the repo. 4. Open questions closed. 5. A senior tech
completes 5 real SOs end-to-end with no correctness edits.

---

## APPENDIX — fast facts
- App: `so_trainer.html` 278 KB · source `app/template.html` 151 KB · build `python3 build_app.py`
- KB: 6 flows / 31 workflows / 35+138 terms / 7 locked decisions
- Origin branch: `claude/youthful-gates-C17bb` (this session's work)
- Biggest risks: (1) ground-truth corpus data missing → templates unvalidated; (2) no committed test harness
