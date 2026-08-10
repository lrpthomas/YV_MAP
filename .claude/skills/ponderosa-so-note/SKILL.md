---
name: ponderosa-so-note
description: Assemble and validate the canonical Ponderosa E.FACS service-order write-up note from gathered field values (the FORMATTER step) — two-line header, per-flow body, -tech footer, binary FACS status, M.D.YY date, last-4 masking, and the omit-N/A rule. Use when the user asks to "write the note", "format the write-up", "build the response", or to check that an SO note matches the locked format.
---

# Format the SO note (FORMATTER)

Assemble gathered values into a correct, standardized write-up. This is step 5 of the full
`ponderosa-so` skill; the authoritative format spec is
`../ponderosa-so/references/note-format.md`.

## The recipe (assemble top-to-bottom; omit any N/A line)
```
{SO#} {action}                          ← line 1: SO number + action phrase
{date} {NO FACS CHANGES | action desc}  ← line 2: date + FACS state / description
{OUT line(s)}                           ← disconnect side (optional)
{old port + location}
{IN line}                               ← connect side (optional)
*TEL
{tel_port}
{tel_location}
*DSL
{dsl_port}                              ← may carry PIC,n or XCONN,n
{dsl_location}
***ATTN SPLICER*** {instructions}       ← if splice (also email Dispatch)
-{tech}
```

## Locked rules (verify every note against these)
- **FACS status is binary:** `FACS CHANGED` / `FACS UNCHANGED` — nothing else.
- **Header is two lines:** line 1 `{SO#} {action}`, line 2 `{date} {FACS|action desc}`.
  (Do NOT put the date/FACS on line 1 — that's the old, wrong v2 order.)
- **Date:** `M.D.YY`, no leading zeros (e.g. `6.3.26`).
- **Masking:** customer phone/account last-4 → `****` (e.g. `877 ****`, `101 877 ****`).
- **Bonded legs:** always `*TEL` / `*DSL` sections — never `Leg1` / `Leg2`.
- **Omit rule:** any field N/A to this order is dropped entirely (no blank line).
- **Footer:** `-{tech}` initials.
- **Splice:** add `***ATTN SPLICER*** {instructions}` and email Dispatch.

## How to build
1. Pull the matched workflow's seed template from `../ponderosa-so/references/flows.md` as the
   skeleton.
2. Fill fields from gathered values; validate each against
   `../ponderosa-so/references/validation.md` before placing it.
3. Drop every line whose value is N/A. Apply masking + date format.
4. Emit the note in monospace. If anything is uncertain or failed validation, flag it inline
   rather than guessing.
