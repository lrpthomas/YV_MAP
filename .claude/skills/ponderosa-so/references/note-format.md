# Canonical note format

Source: PTCGIS_ServiceOrders.docx — the Rosetta Stone document.

## Recipe (assemble top-to-bottom, omit any N/A line)

```
{SO#} {action}
{date} {NO FACS CHANGES | action desc}
{OUT line(s)}
{old port + location}
{IN line}
*TEL / {tel_port} / {tel_location}
*DSL / {dsl_port (may carry PIC,n or XCONN,n)} / {dsl_location}
***ATTN SPLICER*** {instructions} (if splice; also email Dispatch)
-{tech}
```

## Rules (locked decisions)

- **FACS status** — binary: `FACS CHANGED` / `FACS UNCHANGED`. Header line 2 = `{date} {NO FACS CHANGES | action desc}`.
- **Header** — line 1 = `{SO#} {action}`; line 2 = `{date} {FACS state or action desc}`; footer = `-{tech}`.
- **Date format** — M.D.YY (e.g. `6.3.26`).
- **Masking** — customer phone/account shown last-4 → `****` (e.g. `877 ****`).
- **Bonded legs** — always `*TEL` / `*DSL` sections, never Leg1/Leg2.
- **Omit rule** — Any piece Not Applicable to an order is omitted from the write-up.
- **Splice** — if a splice is needed, add `***ATTN SPLICER*** {instructions}` AND email Dispatch.

## Field sources (where each value is read from)

| Field | Source |
|-------|--------|
| Switch | LinePacks CSX field |
| Cable Name & Pair | Cable Book (cable into drop ped) |
| SAI Cable & Pair | Cable Book + X-Connect report (XCONN only) |
| Drop Ped PIC | Cable Book |
| Node/Shelf/Card/Port | LinePacks Type field |
| Binding Post | LinePacks LN field |

## Port-line anatomy

```
Port line:     FRNT-0306-0847 TFRD,244 PIC,19 105N-4-2

  FRNT-0306-0847           CSX — Switch Equipment string (created in Taqua)
  TFRD                     Wire center cable abbreviation (4-letter CLLI code)
  ,244                     Cable pair number
  PIC,19                   Pair In Cable — position within the cable count
  105N-4-2                 Cable book route designation (cable-segment-subsegment)

Location line: TFRD N06-3-01-31 BP,232

  TFRD                     Wire center
  N06                      Node number
  -3                       Shelf
  -01                      Card
  -31                      Port on the card
  BP,232                   Binding Post number at the pedestal
```