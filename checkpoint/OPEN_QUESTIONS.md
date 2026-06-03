# SO Trainer — Open Questions Log
Last updated: 2026-06-03 (after full document review)
Key: 🔴 open · 🟡 assumption to confirm · 🟢 resolved (answer inline)

## RESOLVED BY DOCUMENT REVIEW
1. 🟢 **NPD** — DISC + QDS CONN; QDS stays for 911. Action label, not a flow.
2. 🟢 **PERM DISC** — real iVUE Disconnect Type (Permanent vs Nonpay). Releases facilities. [equipment export]
3. 🟢 **XCONN** — bonded-upgrade variant; DSL line carries `XCONN,n PIC,n` + `**Remove jumper… jump…**`. Not a separate flow. [ServiceOrders.docx]
4. 🟢 **FACS rule** — binary CHANGED/UNCHANGED. Header = `{date} {NO FACS CHANGES | action描述}`. [ServiceOrders.docx]
5. 🟢 **Bonded legs** — always `*TEL`/`*DSL` in the note, never Leg1/Leg2. Drop leg1/leg2 from formatter. [ServiceOrders.docx]
6. 🟢 **MOVE format** — NEW ADDRESS block + OLD ADDRESS block, each with QDS OUT/IN + *TEL/*DSL. [ServiceOrders.docx]
7. 🟢 **RCF** — full 4-step workflow, write-up `NXX-XXXX SWITCH TO RCFA ONLY / FRNT-0326-18XX / -tech`. Reserved FRNT-0326-1801–1900. Routing: A/AE/B→Switch Interface+P.PROG; C/D→P.FACS+P.PROG. [RCF PDFs + Troy email]
8. 🟢 **Note format / one-vs-many** — per-workflow body, shared header+footer. 8 labeled real examples exist. [ServiceOrders.docx]
9. 🟢 **Context terms scope** — reference only; engine drives facility steps. (Cody confirmed)
10. 🟢 **Second service on ONT** — copy facilities, CSX+"#2", ONT PRT-1/PRT-2, iVUE Port GE-D-2, no CRV (CBOL). [Troy email]
11. 🟢 **Splitter/GPON naming** — Equipment field = where GPON card physically lives; splitter has no own Node (parent is e.g. SVLK_GPON). [Troy email]
12. 🟢 **CALIX speeds** — DL = attainable×2×0.8; UL = aggregate÷10×2×0.8. [CALIX doc]
13. 🟢 **SO Type codes** — AD/BD/BI/ED/EQ/FD/MV/QD/QI/QR/RD/RI/SI/SR. [Quintrex doc]

## RESOLVED 2026-06-03 (this session)
26. 🟢 **E.GIS scope** — OUT. Tool is E.FACS only. No map-making branch.
27. 🟢 **Handoff** — progressive per-section + per-field validation (best for precision).
28. 🟢 **911_EXT** — OUT (context only). It's iVUE task seq 26, a separate task, not E.FACS. Unsourced 're-open/edit/re-close' claim removed.
29. 🟢 **ACP** — UPGRADE_VDSL with ACP prefix; facility work identical. [182 seeds]
30. 🟢 **DOWNGRADE** — simpler than upgrade; often single {port}, not *TEL/*DSL. [52 seeds]
31. 🟢 **other_port/OPX** — legacy, 0x modern corpus; rare edge slot only.
32. 🟢 **100/20 bonding** — defaults bonded (512/568) but 6 single-pair exist; allow override.
33. 🟢 **Beasore/dev** — routes differently: *REFER TO ENGINEERING* + HOLD first. [14 pairs]
34. 🟢 **Route target** — P.PROG (modern, via Continue Workflow); KIMW was legacy Quintrex.

## STILL OPEN — need Cody
20. 🔴 **C&C Code vs Speed Tier ID** — which code appears in the REQUEST you receive (D000000 C&C vs D000 tier). Cody is finding out. Non-blocking — affects one lookup detail only.

## ASSUMPTIONS — confirm or correct
21. 🟡 **Date format** — M.D.YY going forward (e.g. 6.3.26).
22. 🟡 **100/20 always bonded** (D036).
23. 🟡 **GET/PUT** — GET from LinePacks, PUT in iVUE, universal.
24. 🟡 **Development/Beasore codes** — change billing only, not the facility-assignment routing. (Need confirm — may route to engineering first per Beasore "*REFER TO ENGINEERING*" examples.)
25. 🟡 **Routing target** — after E.FACS, route to P:KIMW (Kim Walsh) / P.PROG depending on order. Confirm current target.
