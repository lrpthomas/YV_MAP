---
name: ponderosa-so-classify
description: Classify a Ponderosa / iVUE E.FACS service-order request into its flow, specific corpus workflow, and action codes — and tell the tech which systems and fields to touch in order (the POINTER step). Use when the user pastes an SO request block or asks "what flow is this", "what kind of order", "which workflow", or "what do I touch for this SO" before writing the note.
---

# Classify an SO request (POINTER)

Given an incoming SO request block, determine **flow → corpus workflow → action code(s)**, then
point the tech at the right systems/fields. This is step 1–2 of the full `ponderosa-so` skill;
use that skill to then gather, validate, and format the note.

## Steps
1. **Read the request box** (what Customer Service wrote — left side of the iVUE SO screen).
2. **Pick the flow** from the six (see `../ponderosa-so/references/flows.md`):
   DISCONNECT · CONNECT_RECONNECT · UPGRADE · MOVE · FIBER_FTTH · CROSS_CONNECT.
3. **Narrow to the corpus workflow** by matching the action language and template skeleton in
   `flows.md` (e.g. `VACA DISC` → DISCONNECT/VACA_DISCONNECT; `INT Upgrade to 100/20 BND` →
   UPGRADE/UPGRADE_BONDED; `DISC TEL (CBOL), QDS CONN, & Billing Correction` →
   CONNECT_RECONNECT/GEN_DISCONNECT_QDS_BILLING).
4. **Resolve action codes** against `../ponderosa-so/references/action-codes.md` (24 atomic,
   22 combos). The combo phrase is what appears verbatim on note line 1.
5. **Point** to the systems/fields needed for that workflow's template (field → source map in
   `../ponderosa-so/references/note-format.md`).

## Classification cues
- `VACA` → vacation DISC/RECON; facilities are **held** on VACA DISC (FACS UNCHANGED).
- `NPD` → Non-Pay Disconnect; the QDS line stays for 911.
- `CBOL` → phone removed, internet (101 account) stays.
- `QDS` present → a 911-only dialing line is involved.
- `BND` / two pairs / `*TEL`+`*DSL` → bonded; `SNGL` → single pair.
- `FTTH` / `GPON` / `ONT` / `EDGE`/`125` → FIBER_FTTH.
- `MOVE` → NEW + OLD address blocks.
- `XCONN` / "moved & added pair" / SAI jumper → CROSS_CONNECT.
- `ACP` → treat as UPGRADE_VDSL with an ACP prefix; facility work is identical.
- Beasore / development codes → flag `*REFER TO ENGINEERING*` + HOLD (Q24, confirm).

## Out of scope (don't branch on these)
E.GIS map-making and 911_EXT — context only.
