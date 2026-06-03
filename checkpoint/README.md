# Ponderosa SO Trainer — Full Checkpoint 2026-06-03

Complete point-in-time snapshot: all plan, decisions, verified knowledge, and build spec
before coding the rebuild. Standalone LOCAL HTML tool (not a Claude artifact).

## START HERE
- BUILD_SPEC.md — locked decisions for the rebuild (styling, 3-pane UX, ISSUE-TRACKING system, flows)
- MASTER_PLAN.md — overall plan (purpose, scope, phases, note format)
- design_system.md — Ponderosa palette sampled from the real site (light/clean, orange/navy/green)
- OPEN_QUESTIONS.md — 23 resolved, ~2-3 non-blocking open
- V2_AUDIT.md / RECOVERED_v2_NOTE.md — the old v2 build, what to keep/fix

## VERIFIED KNOWLEDGE (the app reads from these)
- knowledge_base_v4.json — AUTHORITATIVE consolidated KB: 6 flows (corpus-mapped w/ real templates),
  173 terms, note format + field sources, action codes, palette, decisions, _pending flags
- wf_canonical_templates.json — the 31 corpus workflows' real seed_templates w/ frequencies
- app_terms.json — 173 terms, 100% cross-checked, normalized, masked
- knowledge_base.json — systems, field map, RCF, switch features, contacts (v3, folded into v4)
- action_locked.json — 24 atomic + 22 combo action codes w/ occurrence counts
- build_data.json — speed tiers (prices need H07 verification), equipment, examples
- DATA_REVIEW_FINDINGS.md — every doc/email/PDF reviewed, 4 passes, cited
- network_topology_diagram.md — end-to-end physical path model (IMG_4389)
- image_capture_notes.md — all 11 screenshots transcribed

## PROVENANCE / TRAIL
- corrected_core_terms.json, phase0_proposed_terms.json, xcheck_all_results.json
- transcript_pastes/ — data tables pasted in chat (C&C, equipment, NewNetCMS SQL, real SO examples)
- rcf_ocr/ — RCF workflow + Iva notes PDF pages (OCR source)
- doctxt/ — Quintrex legacy doc as text

## SOURCE FILES (NOT bundled — large/are uploads, in /mnt/user-data/uploads)
- corpus.pkl (13MB, 13,159 SOs) ; corpus.json (15.9MB)
- equipment_examples_sanitized.json (256MB, 156 cols) ; ttickets_examples_sanitized.json (464MB, 161 cols)
- sso_responses_examples.txt (676KB, 518 req->resp pairs)
- 15 docs/PDFs/emails, linepack_equipment.xlsx, Sili Codes.xlsx, GPON_MGCP_Creator.xlsx

## NEXT
Build order per BUILD_SPEC.md: (1) issue module, (2) three-pane app w/ flag-hooks, (3) enrich KB.
