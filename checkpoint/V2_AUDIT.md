# v2 Build Audit — against finalized plan + verified data
Date: 2026-06-03. Auditing the recovered so_trainer_v2.html.

## WHAT'S GOOD (keep)
- Structure: 4 panels (Workflow / Reference / Examples / Corpus) — solid IA
- NOC aesthetic restored (dark + navy/orange), responsive, print CSS
- SO Request parser → parsed fields → branching workflow engine
- 9 workflow state machines (DISC/RECON/VACA/UPGRADE_BOND/FIBER/MOVE/XCONN/RCF/EDGE)
- Reference panel: field map, speed tiers, equipment, port decoder, systems, procedures, linepacks/cable-book/rcf/switch-features/card-rules/glossary
- Corpus explorer with runtime JSON upload (✓ matches "corpus uploaded at runtime, not embedded")
- Port-line decoder (genuinely useful tool)
- localStorage persistence, keyboard shortcuts

## DISCREPANCIES vs VERIFIED DATA (must fix)

### FACS status — WRONG
- Code uses "No FACS Changes" / "FACS Updated" (old multi-value).
- DECISION: binary **FACS CHANGED / FACS UNCHANGED**. Fix generateResponse() + examples.

### Note format header — WRONG ORDER
- Code line 1 = `{date} - {FACS}`.
- VERIFIED (ServiceOrders.docx): line 1 = `{SO#} {action}`, line 2 = `{date} {NO FACS CHANGES|action desc}`. Two-line header.

### Bonded legs — uses generic, should be *TEL/*DSL (it mostly does, but verify)
- Code does emit *TEL/*DSL ✓. But the PIC placement and second-pair line need to match real examples (DSL line carries PIC,n / XCONN,n).

### Speed tiers — only 43, MISSING the C&C system
- Has D000-D036 + P-codes ✓ BUT:
  - Missing the real C&C Code (D000000 format) + cost + facility restriction groups (H07)
  - Missing Beasore tiers (DBESOR1/2/3) + dev codes (L000/L001/L002 = Mira Bella/Bella Vista/Tesoro Viejo)
  - Speed tier prices are GUESSES — not verified against H07. Need reconciliation.

### Equipment — only 44 sites, hardcoded "Auberry Exchange"
- Real equipment export = 156 cols, 54,455 rows, 66 Equip Types. The 44 here are a subset.
- Missing: PWHS, RKHL (from transcript H08). Slot-level detail missing.
- Should load equipment from uploaded export at runtime (like corpus), not hardcode 44.

### Sili Codes CLLI dictionary — MISSING entirely
- No wire-center → plain-name lookup. We have the full dict (Sili Codes.xlsx). Should be a reference tab + decoder enrichment.

### Workflows hardcoded with INVENTED templates
- The 9 WORKFLOWS step-lists are reasonable but NOT corpus-derived. Real corpus has 31 workflow types with REAL seed_templates.
- The response templates use placeholder formats (FRNT-XXXX-XXXX) — should derive from corpus seed_templates for the matched workflow.

### Glossary — has good terms but some UNVERIFIED / slightly off
- "BNDW: Wire center CLLI code, NOT bandwidth" — need to confirm this term
- "HACO: Aerial fiber splice case" ✓ (confirmed iVUE task doc)
- Missing the 173-term app_terms.json set (only ~26 glossary terms here)
- E.GIS listed but we decided E.GIS is OUT of scope — keep as glossary context only

### Parser gaps
- Doesn't extract APN, RECAP blocks well, *REFER TO ENGINEERING* flag (Beasore → engineering hold)
- Speed parsing: "100/20" → bonded ✓ but doesn't handle the 6 single-pair 100/20 exceptions
- Doesn't detect NPD, PERM, ACP, DOWNGRADE distinctly

### Scope
- EDGE workflow present — but E.GIS map-making is OUT (correct, EDGE the product ≠ E.GIS the task). EDGE service orders may still be in scope. CONFIRM.
- 911_EXT not present as workflow ✓ (correct, out of scope)

## ALIGNMENT WITH LOCKED DECISIONS
✓ Corpus uploaded at runtime (not embedded)
✓ NOC aesthetic
✗ FACS binary (uses old multi-value)
✗ Masking — examples use NXX XXXX placeholders (fine, not real data) but should confirm
~ Per-workflow templates (has them, but invented not corpus-derived)
✗ Progressive per-field validation (NOT implemented — no validation at entry)
✗ Note format (header order wrong)

## VERDICT
Strong skeleton, right architecture. But it was built BEFORE the full data review, so it encodes
several pre-verification assumptions that we now know are wrong (FACS values, header order, speed
prices, equipment subset, missing C&C/Sili/corpus-derived templates, no validation).
This is a Phase 3 artifact built ahead of Phase 1-2. Right move: finish Phase 1 (knowledge base) +
Phase 2 (flows) so the app is driven by verified data, then retrofit this shell.
