# Action codes

The action phrase on note line 1 is built from these codes. Atomic codes combine into the
combo phrases below (combo = what actually appears in real notes, with corpus frequency).

## Atomic codes

| Code | Meaning |
|------|---------|
| `VACA` | Vacation — customer leaving on, or returning from, vacation. |
| `DISC` | Disconnect. Usually followed by what is being disconnected (TEL / DSL / EDGE). |
| `CONN` | Connect. Usually paired with what is connected (QDS / a speed / FTTH). |
| `RECON` | Reconnect. |
| `QDS` | Quick Dial Service — the dialing rules layer (controls which numbers are allowed). Pairs with QDT (Quick Dial Tone), the state layer that provides dial tone in a restricted state. QDT = state, QDS = dialing rules; combined they produce a working "911-only line" (working nomenclature, not exact spec). Notes only ever write QDS. |
| `TEL` | Telephone / voice service. |
| `DSL` | DSL data service. |
| `ADSL` | Asymmetric DSL. |
| `VDSL` | Very-high-bit-rate DSL. |
| `FTTH` | Fiber to the Home. |
| `EDGE` | EDGE FTTH product. |
| `INT` | Internet. |
| `UPGRADE` | Increase service tier / speed. |
| `DOWNGRADE` | Decrease service tier. |
| `BND` | Bonded — two pairs working together for higher speed (also written BONDED). |
| `SNGL` | Single pair (non-bonded). |
| `CBOL` | Connected But Only-Online — the telephone line is removed; the customer stays connected to internet. Always paired with a 101 internet account that stays active. |
| `BILLING` | Billing action (usually 'Billing Correction'). |
| `CORRECTION` | A correction — billing or service-point. |
| `NPD` | Non-Pay Disconnect. |
| `PERM` | Permanent (e.g. PERM DISC = permanent disconnect). |
| `MOVE` | Move service to a new location. |
| `XCONN` | Cross-connect. |
| `ACP` | TBD — pending confirmation (suspected Affordable Connectivity Program). |

## Combo phrases (as written in real notes)

| Phrase | Occ | Meaning |
|--------|-----|---------|
| `VACA RECON` | 1126 | Reconnect service — customer back from vacation. |
| `VACA DISC` | 978 | Disconnect service — customer leaving on vacation. |
| `DISC TEL (CBOL), QDS CONN, & Billing Correction` | 1393 | Remove the phone line (internet stays), connect the QDS line, and fix billing. |
| `DISC & QDS CONN` | 766 | Disconnect the phone, connect QDS. |
| `DISC TEL (CBOL) & Billing Correction` | 365 | Remove the phone line (internet stays) and fix billing. |
| `QDS CONN` | 398 | Connect a QDS line. |
| `DISC DSL` | 368 | Disconnect DSL data only. |
| `NPD` | 320 | Non-Pay Disconnect. |
| `Correcting Service Points` | 250 | Provide 911 with the line number and address (the dispatch service-point record). |
| `DISC` | 244 | Plain disconnect. |
| `INT Upgrade to <speed> BND` | 476 | Internet speed upgrade, bonded. |
| `INT Upgrade to <speed> ADSL BND` | 389 | Internet upgrade, ADSL bonded. |
| `INT Upgrade to <speed> SNGL` | 182 | Internet upgrade, single pair. |
| `DISC TEL (CBOL)` | 150 | Remove the phone line; customer stays connected to internet. |
| `DISC & QDS RECON` | 144 | Disconnect the phone, reconnect QDS. |
| `CONN <speed> BND` | 101 | New connect at the given speed, bonded. |
| `ACP INT Upgrade to <speed> VDSL BND` | 94 | ACP internet upgrade, VDSL bonded. |
| `INT Upgrade to <speed> FTTH` | 84 | Internet upgrade to fiber. |
| `QDS RECON` | 75 | Reconnect a QDS line. |
| `DISC TEL` | 67 | Disconnect the phone line. |
| `NPD & QDS CONN` | 67 | Non-Pay Disconnect, then connect QDS. |
| `QDS DISC` | 56 | Disconnect a QDS line. |