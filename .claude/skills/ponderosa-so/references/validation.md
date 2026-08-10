# Per-field validation patterns

The locked handoff model is **progressive per-section entry with per-field validation**:
validate each value the moment it is entered, *while the source system is still open*, so an
error is caught when it is cheapest to fix. Patterns below are derived from the verified field
examples in the KB — treat them as guidance, and flag (don't silently "fix") anything that
doesn't match.

| Field | Shape | Verified example | Notes |
|-------|-------|------------------|-------|
| SO Number | digits | `142965` | iVUE SO#. |
| Order date | `M.D.YY` | `8.1.23` | No leading zeros; dots. |
| Phone (masked) | `NNN ****` | `877 ****` | Always last-4 masked. |
| Account (masked) | `101 NNN ****` | `101 877 ****` | `101` = internet account prefix. |
| Direction marker | `IN` / `OUT` / `QDS IN` | `841 ND IN` | Trails the phone/account line. |
| CSX / CRV string | `FRNT-NNNN-NNNN` | `FRNT-0306-1994` | 4-letter prefix + 4 + 4 digits. |
| TEL/DSL port line | `{CSX} {CLLI},{pair} PIC,{n} {route}` | `FRNT-0306-0847 TFRD,244 PIC,19 105N-4-2` | DSL port may also carry `XCONN,n`. |
| Location line | `{CLLI} {node}-{shelf}-{card}-{port} BP,{n}` | `TFRD N06-3-01-31 BP,232` | Node like `N06`. |
| MGCP line-pack name | `{CLLI}-{equip}_GPON-CLX01-NN-NN-NNNN-NN` | `FRNT-PRSV_GPON-CLX01-01-04-1421-01` | Fiber line packs. |
| GPON port | `{CLLI}-N01-03-02 GPON-X-N` | `MLTN-N01-03-02 GPON-B-1` | |
| EDGE port | `EDGE-{CLLI}-FTTH PORT-X-NN PAIR NN` | `EDGE-MLTN-FTTH PORT-D-30 PAIR 30` | |
| EDGE customer ID | `125 NNN****` | `125 001****` | EDGE product. |
| Speed tier | `D0NN` or `D000000` | `D036` | See speed-tiers.md; Q20 open. |
| Tech initials | 2 letters | `KM` | Footer `-{tech}`. |
| FACS status | enum | `FACS CHANGED` / `FACS UNCHANGED` | Binary only. |

## Validation behavior
- A value that matches its pattern → green / accept.
- A value that doesn't → flag at entry, ask the tech to re-check the source system, never auto-correct.
- A value that's N/A for the order → omit the line entirely (don't emit a blank).
