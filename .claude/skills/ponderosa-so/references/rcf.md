# RCF (Remote Call Forwarding) codes & routing

| Code | Meaning |
|------|---------|
| `RCFA` | Inter Exchange (between PTC exchanges) — Term Sub Free |
| `RCFB` | Intra Service Area (within 559/local call) — EAS/Intra Lata Free/800# |
| `RCFC` | Intra State (in CA; inside/outside 559; toll call) — Intra Lata Toll |
| `RCFD` | Inter State (between states) — Intra Lata Toll |
| `RCFAE` | Inter Exchange (employee) — Term Sub Free |
| `RCFVM` | Inter Exchange (to voicemail) — Virtual Subscriber |
| `RCFF` | RCF Free — cannot auto-assign via switch |
| `RCFP` | RCF Additional Path — cannot auto-assign via switch |

- **Reserved switch block:** FRNT-0326-1801 through FRNT-0326-1900 reserved for RCF/VM
- **Routing:** A / AE / B → build + remove facilities (Switch Interface + P.PROG).
- **Routing:** C / D → manual permanent (P.FACS + P.PROG).
- Write-up pattern: `NXX-XXXX SWITCH TO RCFA ONLY / FRNT-0326-18XX / -{tech}`.
- Fictitious SP at `0 DIR ADV,VM,RCFA`. Reserved range FRNT-0326-1801–1900.