# SO Trainer — Master Plan (Finalized 2026-06-03)

## PURPOSE (Troy's north-star, verbatim)
"We just want our GIS records and the iVUE records to match what is in the switch so we know what is available and what is not."
The tool's job: help complete E.FACS service orders accurately. It is **pointer + supplier + formatter**, human-in-the-loop — never autopilot.
- POINTER: for this SO type, touch these systems in this order, pull these fields.
- SUPPLIER: surface the right reference at the right step (speed→C&C, wirecenter→equipment/site, status codes, RCF rules, CLLI names).
- FORMATTER: assemble gathered values into a correct, standardized note.

## DATA FOUNDATION (all on disk, all reviewed & cited)
- corpus.pkl — 13,159 SOs, 31 workflows, seed templates
- sso_responses_examples.txt — 949 rows / 518 full request→response pairs, 14 metadata cols
- equipment_examples_sanitized.json — 156 cols, 54,455 rows (iVUE facility schema)
- ttickets_examples_sanitized.json — 161 cols (iVUE incl. Open Fields)
- app_terms.json v4.0 — 173 terms, 100% cross-checked, normalized, masked
- knowledge_base.json, action_locked.json (24 atomic + 22 combos), build_data.json
- DATA_REVIEW_FINDINGS.md — all document/email/PDF findings (4 passes, cited)
- Sili Codes (CLLI dictionary), GPON_MGCP_Creator, RCF workflow (OCR'd), images (11, transcribed)

## SCOPE DECISIONS (locked)
- FACS status = binary: **FACS CHANGED / FACS UNCHANGED**
- Note = per-workflow body + shared header (`{date} {action/FACS}`) + footer (`-{tech}`)
- Date format = M.D.YY
- Customer data masking = `****` last-4 (matches the export's own prefix-only standard)
- Corpus + any real-customer data = uploaded at runtime, never embedded
- Shipped examples = scrubbed unrecognizable, structure preserved
- Context terms (P.PROG, RECAP, task chain) = reference only; engine drives E.FACS steps
- **SCOPE = E.FACS ONLY.** E.GIS map-making (Q18) = OUT. 911_EXT (task 26, Q17) = OUT (context only). [Cody 2026-06-03]
- **HANDOFF = progressive per-section with per-field validation** (Q19): each value validated against its field pattern at the moment of entry, while still in the source system — catches errors when cheapest to fix. [Cody 2026-06-03]

## FLOW ARCHITECTURE (consolidated — ~6 core flows, action codes branch inside)
Each flow shares: header line, FACS CHANGED/UNCHANGED, *TEL/*DSL section logic, -tech footer.
1. **DISCONNECT** ── branches: plain DISC · NPD (+QDS stays) · PERM (Disconnect Type=Permanent) · VACA DISC (facilities HELD, UNCHANGED) · DISC TEL(CBOL) (internet stays)
2. **CONNECT / RECONNECT** ── branches: QDS CONN · RECON · VACA RECON · SR (seasonal) · new install
3. **UPGRADE** ── branches: bonded (*TEL/*DSL) · single · ADSL/VDSL · ACP-modified · move-ports-for-bond · +splice (ATTN SPLICER) · +XCONN (jumper move)
4. **MOVE** ── NEW ADDRESS block + OLD ADDRESS block; same/cross exchange
5. **FIBER / FTTH** ── GPON/splitter/ONT path (FEEDER→X-CONNECT→DISTRIBUTION); second-service-on-ONT; EDGE (125)
6. **RCF** ── A/AE/B (build+remove facs) vs C/D (manual permanent); fictitious SP at "0 DIR ADV,VM,RCFA"; reserved FRNT-0326-1801–1900
   (911_EXT and pure E.GIS map-making = scope TBD — Q17/Q18)

## NOTE FORMAT (canonical, from ServiceOrders.docx)
```
{SO#} {action}                          ← line 1 (SO + work)
{date} {NO FACS CHANGES | action desc}  ← line 2
{phone}-{account} {speed} OUT           ← disconnect side (optional)
{old port}                              ← {switch} {cable},{pair} {route}
{old location}                          ← {wirecenter} {node-shelf-card-port} BP,{bp}
{speed} IN                              ← connect side (optional)
*TEL
{tel port}
{tel location}
*DSL
{dsl port}                              ← may carry PIC,n or XCONN,n
{dsl location}
***ATTN SPLICER*** ...                  ← if splice (also email Dispatch)
-{tech}
```
Field sources (SO_Parsed_Fields): Switch=LinePacks CSX · Cable Name&Pair=Cable Book · SAI=Cable Book+X-Conn report · Drop Ped Pic=Cable Book · Node/Shelf/Card/Port=LinePacks Type · BP=LinePacks LN. Omit any N/A piece.

## REMAINING GATES (must answer before/while building)
OPEN: ACP(14), DOWNGRADE(15), other_port(16), 911_EXT scope(17), E.GIS scope(18), handoff(19), C&C-vs-tier(20)
ASSUMPTIONS to confirm: date(21), 100/20 bond(22), GET/PUT(23), dev/Beasore routing(24), route target(25)

## BUILD PHASES (revised)
- **Phase 0 — DONE.** Terms reconciled (173, 100% cross-checked), all docs reviewed, findings documented.
- **Phase 1 — Consolidate knowledge base.** Merge DATA_REVIEW_FINDINGS + terms + Sili CLLI dict + equipment schema into one authoritative knowledge_base v4 the app reads. Add the resolved flows + note format. (Can start now; gates 14-25 fill in specifics.)
- **Phase 2 — Define the 6 flows precisely** (steps, system-touch order, fields per step, branch logic, response template per workflow). Each step cites its source. Gated by 14-20.
- **Phase 3 — Build the app** (pointer+supplier+formatter, runtime corpus upload, masked examples).
- **Phase 4 — Skills** for completing an SO end-to-end, grounded in the verified KB.

## RULE OF ENGAGEMENT
Anything uncertain → log in OPEN_QUESTIONS.md, do not guess past it. Confirm with Cody. Better to flag than silently move on.
