# Data Re-Review Findings (2026-06-03)
*What a deeper pass over under-used data sources surfaced. Each finding cited to source.*

## SOURCES NEWLY/DEEPLY ANALYZED
- equipment_examples_sanitized.json — 156 cols, 54,455 rows (was only sampled)
- ttickets_examples_sanitized.json — 161 cols, 40k+ rows (was barely touched)
- PTCGIS_SO_FacilityAssignments.docx — 944 paras, real worked examples (under-read)

## KEY FINDINGS (resolve open questions)

### 1. PERM DISC — RESOLVED [equipment export]
`Disconnect Type` field has exactly 2 values: **Permanent** (3,399×) and **Nonpay** (136×).
`Class Of Serv`: OFFICIAL STATION / DISCONNECT / VACATION / ARREARS BILLING.
→ PERM is a real iVUE Disconnect Type = facility work (port released as Permanent). Distinct from Nonpay. Confirms PERM DISC releases facilities.

### 2. FACS rule — CONFIRMED [SO_FacilityAssignments.docx]
Header line = `{date} {action-or-FACS-state}`. No-change orders: literally "NO FACS CHANGES".
Change orders: header states the action ("MOVE PORTS FOR BOND, NEW DSL PAIR (891 FT)").
→ Binary FACS CHANGED / FACS UNCHANGED maps directly.

### 3. Bonded legs — CONFIRMED *TEL/*DSL, never Leg1/Leg2 [doc examples]
Every bonded note uses `*TEL` then `*DSL`, each = port line + location line.
→ DROP leg1/leg2 from formatter. other_port = rare extras only.

### 4. Real note structure [doc — canonical, multiple examples]
```
{date} {action / FACS state}
{phone}-{account} {speed} OUT          (disconnect side, optional)
{old port line}
{old location line}
{speed} IN                              (connect side, optional)
*TEL
{tel switch} {cable},{pair} {route}
{wirecenter} {node-shelf-card-port} BP,{bp}
*DSL
{dsl switch} {cable},{pair} PIC,{pic} {route}
{wirecenter} {node-shelf-card-port} BP,{bp}
**splicer instructions if any**
-{tech}
```
Port-line anatomy CONFIRMED: `{switch} {cable},{pair} {route}` + `{wirecenter} {node-shelf-card-port} BP,{bp}`

### 5. XCONN — REAL EXAMPLE FOUND [doc block 6]
```
11/3/22 new ports reqd for bond
841-**** qds out
FRNT-0321-0157 5,736 605d-4
SVLK N01-2-02-13
*tel 841-**** w/18/3 in
FRNT-SVLK_N2-CLX05-02-29 5,736 605d-4
SVLK N2-5-02-29
*DSL
FRNT-SVLK_N2-CLX05-02-30 5,731 XCONN,19 PIC,19 605D-4
SVLK N2-5-02-30
**Remove jumper SVLK-5,731 Pic,31 from its xconn jumper. jump svlk-5,731 to 605_1,19 pic,19**
-DS
```
→ XCONN appears inline in the DSL pair line as `XCONN,{n}` + a `**Remove jumper... jump...**` instruction. Not a separate workflow — a bonded-upgrade variant needing a splice jumper move.

### 6. Port Status vocabulary — [equipment export]
Working / Spare / Connected Not Functioning / Reserved / Connected Functioning. (For facility availability logic.)

### 7. iVUE OPEN FIELDS (custom fields) — NEW, HIGH VALUE [ttickets export]
The system carries these custom fields, several answer facility questions:
- Open Field-PIC PAIR, Open Field-PTY 2 PED LOCATION
- Open Field-AFC LET / AFC RST PRIMARY / PRIMARY2 / SECONDARY  (the legacy AFC/RST identifiers)
- Open Field 2-BONDED PAIRS, DSL QUALIFIED, DSL QUALIFIED-PRO, FIBER TO THE HOME
- Open Field 2-Full Loop Length, DROP SIZE, LP METER READING @ TURN-UP, OPTICAL RETURN LOSS @ TURN-UP
- Open Field 2-FILTER @ SNI, IW QUALIFICATION, INDOOR MICRODUCT, BBA @ PED, CAUTION ISSUES
- Switch chain: Switch / Switch Equipment / Access Device / Media Gateway / Access Line (+ Status/Desc each)

### 8. Equip Type taxonomy (66 distinct) — [equipment export]
PORT(41k) GE POTS RN Calix-711GE GPON CALIX-SLOT 2PRT-Channel ADT-SLOT LPU-4CHNL-SLOT 1PRT-Channel T1...

## STILL UNDER-ANALYZED (next pass)
- The .msg emails (Second Service on one ONT, LinePacks corrections, WNWD cutsheet, RCF SO#167391)
- GIS_how_to.docx (4.4MB — largest doc, not read)
- PTCGIS_iVUE_TaskAssignment.docx (224KB), PTCGIS_WorkOrders.docx
- Line_Assignments_Quintrex_UPDATE_AV.doc
- Sili Codes.xlsx, GPON_MGCP_Creator.xlsx, Verifying Speeds in CALIX.docx
- Stale artifacts to reconcile/delete: _terms.json, new_terms.json, varmap.json, headers.txt, profiles_raw.json

---
# PASS 2 — Documents (2026-06-03 cont.)

## GIS_how_to.docx — REVIEWED (field locator/811 training, 17 photos)
Field-tech locating, NOT E.FACS. Confirms: cable color (Blue=CO, Orange=N, Green=E, Brown=S, Slate=W, Red=power/drop); pedestals BD3=100pr/BD4=200/BD5=600/BD7=1200, BD#A=pole-mount; BFC=buried filled copper, UO=fiber in conduit; SEB=drop; 811 marking PTC=copper/PTFO=fiber. Reference only.

## PTCGIS_iVUE_TaskAssignment.docx — REVIEWED (E.GIS task, NOT E.FACS)
**E.GIS ≠ E.FACS.** E.GIS = make vicinity + facility maps for Eng Clerk (Amanda Martin) before fielding, esp. EDGE inquiries.
- Facility map from I:\Eng_GIS\GEO_Drawings\PonderosaEdge_Millerton_WorkOrderVersion.dwg (11x17 → PDF)
- Examples: G:\Daniel\Edge Inquiry ; H:\Ponderosa Edge Project\EDGE ORDERS (prior IQs/SOs by splitter/fiber → find vacant fibers)
- Vicinity map from ParcelQuest (pqweb.parcelquest.com), 11x17 tabloid PDF
- Markup: HACO=aerial fiber splice case; green circles=poles, orange=property perimeter, comment boxes=pair/pole/APN
- Deliver to Amanda Martin + GIS group. Name "Edge SO#____ Facilities/Vicinity Map"

## PTCGIS_ServiceOrders.docx — **THE ROSETTA STONE** (canonical how-to)
**5-line note recipe:** (1) SO#+work (2) Date+what-to-do (3) Phone for linepacks+tech action (4) CSX#,Cable,Pair,Ped (5) Card Type(Port),Binding post(LN) (6) -Initials. Copy lines 2-6 to iVUE SO Response → Workflow → right-click Complete.

**LinePacks _LinePacks1 columns CONFIRMED:** CSX | Type | Status | Number | LN
- Status encodes bonding: `BND TEL (25,26)` / `BND DSL (25,26)` — the (n,n) = the bonded port-pair numbers.
- Type = Node/Shelf/Card/Port. LN = binding post.

**ONE LABELED REAL EXAMPLE PER WORKFLOW (all NO FACS CHANGES unless noted):**
- SINGLE: `128638 DSL DISC` → phone OUT, one port line + location, -DS
- BONDED: `128747 VAC DISC` → *TEL block + *DSL block
- PERM DISC: `128948 DISC W/DSL & 128951 QDS CONN` → W/DSL OUT, QDS IN, port, -DS  (note: "Perm Disc" label but written as DISC+QDS CONN)
- INT UPGRADE/MOVE PORTS: `135764 INT UPGRADE` → header "MOVE PORTS FOR BOND, NEW DSL PAIR (891 FT)"; OLD (speed) OUT line, "100/20 IN", *TEL, *DSL
- SPLICE: `135462 INT UPGRADE` → "MOVE PORT AND NEW DSL PR (4,522 FT)"; *TEL/*DSL then:
  `***ATTN SPLICER***  @PED 1-8 SPLICE (100PR INCOMING) PIC,28 TO PIC,28 (50PR OUTGOING) AND USE FOR DSL ON DROP @ PED 1-9.`
  RULE: Email Dispatch as heads-up; subject = ***ATTN SPLICER*** + SO#.
- X-CONN: `131020 qds disc & 131018 conn w/dsl` → DSL line carries `XCONN,19 PIC,19`; then `**Remove jumper ... jump ... to ...**`
- MOVE: `135461 MOVE, 135464 QDS DISC & 135466 QDS CONN` → NEW ADDRESS block (QDS OUT, *TEL/*DSL) + OLD ADDRESS block (OUT, QDS IN, *TEL/*DSL). Both addresses fully written.

**FACILITIES CARDS rule:** ADTRAN=shorter/faster, good odd/odd even/even. CALIX=slower/farther, wants DT on odd-low, DSL on even-high.

**SO_Parsed_Fields write-up format:** `[Switch] [Cable Name],[Cable Pair] [SAI Cable],[SAI Pair] [Drop Ped Pic]` / `[Node/Shelf/Card/Port] [Binding Post]`. Omit any N/A piece. Sources: Switch=LinePacks CSX; Cable Name&Pair=Cable Book; SAI=Cable Book + Cross-Connect report; Drop Ped Pic=Cable Book; Node/Shelf/Card/Port=LinePacks Type; BP=LinePacks LN.

**EQUIPMENT CREATION (new sites):**
- Switch Equip: iVUE→Switch Equip→Create, Switch=Taqua, prefix MUST MATCH TAQUA (e.g. Friant-CRLK-CLX01), Length=total cards, End=card end (48/24)
- Equipment Type: Facility Mgmt→Equipment, Create New Master, Type=E7 Shelf (copy or new), Details→Mass Assignment→Switch Equipment Connection, Switch=Taqua, First/End (Card 1-01 / Card 2-48)
- Path Trace colors: Yellow=Pathtraced, Green=Connected/Functional
- CUTSHEETS: pull old card info from LinePacks → new Excel → type set, copy down, repeat card 2 → match leaders → paste to LinePacks → update iVUE ports on cutover day. **Card 1=Bond, Card 2=Single Pair.**
- Query Builder: Load blank → find cutsheet by cable → limit by Catalog Item (speed>0). Service types: RESLINE / MBL (multibusiness) / SBL (single business). Right-click→Send to spreadsheet.

## PTCGIS_WorkOrders.docx — REVIEWED (WO workflow pointers)
WO flow: Engineering (Automated Utility Design) → NewNet Workflow (http://newnet/sysworkflow/...) → AutoCAD posting (I:\Eng_GIS\GEO_Drawings, PTCGIS email alerts) → AGOL (PTC Eng Online Map). Reporting: ptc17 Report server (WorkOrdersOpen_PTC, WorkOrdersOpenTT). Stakeholders: gisportal.co.fresno.ca.us.

---
# PASS 3 — Quintrex legacy doc + .msg emails (HIGHEST-VALUE FINDS)

## Line_Assignments_Quintrex_UPDATE_AV.doc — legacy AS400/Quintrex manual
Pre-iVUE process but logic carries over. **iVUE replaced Quintrex + AS400.**

**SO TYPE CODES (the iVUE 'SO Type' field 2-letter values):**
AD=Additional Number · BD=Business Disconnect · BI=Business Install · ED/EQ=DSL order · FD=Final Disconnect · MV=Move · QD=Quintrex Disconnect · QI=Quintrex QDS Install · QR=Reinstall · RD=Residential Disconnect · RI=Residential Install · SI=Reinstall · SR=Seasonal Reconnect

**E.FACS = the task queue:** Quintrex Service Order Maintenance → Change → search by Department "E.FACS" → "Next due in route/not completed". (In iVUE this is the E.FACS workflow task.)

**Legacy→modern identifier map (glossary gold):**
AFC=Advanced Fiber Communication (now ADTRAN) · Node=Calix Shelf · RST=AFC Port w/ Binding Posts · CRV=last 4 of IDE · IDE=IDT Index · OPX=Off Premises Extension · VPI/VCI=DSL identifier · Pannaway=equip type · Class of Service: POTS=IDTL, disconnect COS=D, residential=1FR, business=1FB

**5-system loop (legacy):** Quintrex → Access (LinePacks1) → AS400 (review/Plant Records OP→AC→I) → Excel (Terminal Book) → Cablebook. Routing target: **P:KIMW (Kim Walsh)**.

**Disconnect rule:** delete phone in LinePacks; Status col add CO/CODISC + disconnect date; Cablebook draw line through 4-digit #, write CODISC + date. For RD: also open QDS IN order, unassign/reassign service location.
**Plant assignment in Quintrex:** Cable Pair radio → Switch ID=FRNT/CIMA, Cable No=wirecenter, Pair=# → route/ped/pic-pair. Line Circuit radio → IDE in Location. Party radio → AFC RST PRIMARY = RST number (AFC LET blank).
Seasonal Reconnect (SR) + cut sheets on N drive.

## .msg EMAILS — Troy Feldner (GIS Analyst) institutional knowledge

### NORTH-STAR PRINCIPLE [RE: SO#167391]
> "We just want our GIS records and the iVUE records to match what is in the switch so we know what is available and what is not."
This is the core purpose of all E.FACS facility work.

### RCF — RESOLVED [RE: SO#167391, Troy's analysis]
- Group 326, CRVs **1801–1900 reserved for RCF agreements**.
- **RCFA / RCFAE / RCFB** (local exchanges): route through switch interface only to BUILD the agreement/subscriber record in Taqua, then **remove the facilities** — no permanent switch assignment needed. Clear Switch CRV facs from iVUE + LinePack records.
- **RCFC / RCFD** (outside PTC service area / Extended Area Service): need **manually-built permanent switch assignments** — leave in iVUE + LinePack.
- RCF has no physical cable pairs.
- This was an open team question even among staff — treat as "follow this rule, confirm edge cases with Troy/Kim."

### SECOND SERVICE ON ONE ONT (fiber CBOL) — RESOLVED [SO# 170405]
- Residential ONT has 2 POTS + 2 Ethernet/Data ports → two independent parallel services on same fiber, split only at ONT.
- LinePacks: copy main facility record; append "#2" to CSX to keep grouped; Status gets "ONT PRT-1" (orig) / "ONT PRT-2" (new).
- iVUE: copy ONT + parent equipment from existing internet service to new; change **Port to GE-D-2**.
- CBOL = no CRV needed. (ONT can't do much higher combined services — capacity limit.)

### SPLITTER/GPON EQUIPMENT NAMING — RESOLVED [PNCL & SNRK correction]
- LinePacks "Equipment" field must reflect **where the GPON card physically lives** (for NetOps to provision in CalixCMS/AdTran).
- A splitter (e.g. PNCL, SNRK) has **no independent Node** — the actual Node is the parent GPON (e.g. **SVLK_GPON**). Don't write "PNCL N1-1-5" as if it's a node; NetOps will look for it in Calix and not find it.

### CABLE BOOK "CAPPED AT" MECHANICS — [Cable book corrections]
- Cable book traces the **Designation Pair** in NewNetCMS (the MDF/CO pair tag used when you "shoot the count"), finds the physical pair with a **Source Splice and no Destination Splice**, looks up parent Physical Cable, returns "Destination Location" → renamed **"Capped At"**.
- Border/boundary peds (counts from 2 COs) named like **"1-12/2-13"** — must match in BOTH NewNetCMS and iVUE.
- NewNetCMS relationships: Designation Pair → Designation Group (MDF cable name, e.g. "ABRY-2-Copper") → Cable Pairs tab lists physical pairs.

### CUTSHEET AUTOMATION — [WNWD Cutsheet]
- Cutsheet has a Cutsheet tab + MGCP tab, laid out across the cards (Card 1/Card 2).
- Troy automating via SQL + FME (pulling Data Subscriptions). This is the modern replacement for manual cutsheet building.

## PEOPLE / ROUTING (confirmed)
- Troy Feldner = GIS Analyst, escalation/teaching (SQL/FME), 559-868-****
- Kyla Moore (KM) = dedicated line assigner (the -KM- signature, 12,819 corpus SOs)
- Kim Walsh (Kim W / P:KIMW / PKIMW) = routing target after facilities
- Amanda Martin = Engineering Clerk (E.GIS map deliverables)
- Diana = Customer Care (ONT/modem assignment)
- Ziad Amro, Roxanne Dove, Ryan Schwoerer, Jennifer Marshall = on RCF thread

---
# PASS 4 — RCF PDFs (OCR), New Site, CALIX speeds, Sili Codes, GPON Creator

## RCF — FULLY RESOLVED [SO_RCFA-RCFAE-RCFB-VM_Workflow.pdf, Troy 3/14/2024]
**Definition:** Changing a line to RCF/VM = customer keeps their number agreement but disassociates it from the physical path, forwarding to another number (no longer rides copper/fiber to the NID).
**Goal:** disconnect the SP at the physical location, clear port/pair for reuse, reconnect the number at a "fictitious" service address/SP, choose switch assignment from the reserved group.
**Workflow:**
1. Find old facilities, write up as a disconnect. In LinePacks: CO Disconnect, clear the agreement. If internet disconnecting, include card/port for NetOps to de-provision. (LinePacks status e.g. "DISC to RCFA 3/29/2024")
2. iVUE Agreement → Service Points tab: select old SP → "Disconnect Service Point"; verify Activity="Disconnect" old / "Connect" new.
3. Create fictitious telephone SP at Service Address **"0 DIR ADV,VM,RCFA"** (in O'Neals exchange): Serv Addr tab → Connect Service Points → search → List → Add Service Point → add 1 Telephone type → review/accept.
4. Add switch assignment: Friant Taqua reserved **FRNT-0326-1801 through FRNT-0326-1900**. Pick free assignment from LinePacks (status "CRV 1801 THRU 1900, RES RCFA/VM"), update phone#, plug into iVUE facilities tab for fictitious SP. Write up as connect.
   **Write-up format:** `855-**** SWITCH TO RCFA ONLY` / `FRNT-0326-1809` / `-TDF`
5. Route Along.

## RCF CODE TABLE [RCF_notes_from_Iva.pdf]
| Code | Description | Switch Set-up |
|---|---|---|
| RCFA | Inter Exchange (between PTC exchanges) | Term Sub Free |
| RCFB | Intra Service Area (within 559/local) | EAS/Intra Lata Free/800# |
| RCFC | Intra State (CA; toll) | Intra Lata Toll |
| RCFD | Inter State | Intra Lata Toll |
| RCFAE | Inter Exchange (employee) | Term Sub Free |
| RCFVM | Inter Exchange (to voicemail) | Virtual Subscriber |
| RCFF | RCF Free | *** |
| RCFP | RCF Additional Path | *** |
- Item code by setup: PTC exchanges→RCFA/RCFAE; EAS→RCFB; Non-Telco/Non-EAS→RCFC/RCFD; voicemail→RCFVM
- **RCFP, RCFF cannot be assigned automatically via switch interface.**
- **Procedure:** Issue EQ order → insert removal dates on active equip → add RCF item code → add forwarding params → SO/subscriber comments (numbers from/to, due date, special instr, contact, PIC assignment if RCFC/D). If forwarding outside PTC+EAS (RCFC/D or 800#), RCF number needs unique setup as a dialtone number (not virtual subscriber): Customer Support does CRV assignment from P.FACS (IDE 6, CRV 1801-1900) + Switch Feature Code CFV.
- **ROUTING [Iva p3]:** RCFA/RCFAE/RCFB → (1) Switch Interface (2) P.PROG [default on EQ order]. RCFC/RCFD → (1) P.FACS (2) P.PROG [cannot route to switch interface; manual].
- Legacy switch command codes (2007): RCFOWNEXCH, RCFEASEXCH, RCFOTHEREXCH, RCFVM.

## CALIX SPEED VERIFICATION — CONFIRMED [Verifying Speeds in CALIX.docx]
- Log into Calix CMS (creds on G drive), add IP under server info. Look up port in iVUE → search Node/Shelf/Card/Port in CMS → Status page.
- **Download estimate = attainable rate × 2 × 0.8**
- **Upload estimate = aggregate transmit rate, move decimal left once (÷10), × 2 × 0.8** (e.g. 18.2 → 1.8 → ×2 ×0.8)

## NEW SITE INSTRUCTIONS — [New Site Instructions.docx] (build-out procedure)
Order to create in iVUE: WireCenter → Switch Equipment (GR303/MGCP from Work Order folders or Taqua MGCP>>MGTermination by CLLI) → Equipment (Node/Shelf/Cards) → Splitters → Distribution Cable → Backbone Fiber.
- iVUE matches via **SwitchTalk** on SOs (minus FRNT-/CIMA- prefix). Taqua shows 100 results/page.
- Splitter naming: **CLLI-S<#>** (e.g. SCDA-S1). Ruggedized "2x32" = two 1x16 in one chassis (copy S1+S2). 
- Distribution Cable name: **[EXCH]-[CLLI]** (e.g. SVLK-SCDA). Backbone Fiber: **[CLLI SOURCE]_[CLLI DEST]** (e.g. BMRT_SCDA).
- NewNetCMS: Wirecenter w/ CLLI, Designation Group per cable, designation pairs. Distribution = "<CLLI>-Copper" / "<CLLI>-Fiber". X-Connect = "<X-Conn CLLI>-Xconn Pairs" (e.g. 10_1-XConn Pairs). Site-to-site = "<Origin>_<Dest>".
- **CUTSHEET ("Lay-Cut" = swing each customer individually):** from Engineering schematic (old name+pairs in parens, new outside). iVUE list of customers on old pairs. Columns: Excel Row#, Agreement, Switch, Node-Shelf-Slot-Port, BP, Cable Pair, Pic at serving ped, Serving Ped Name, Service Type. Lowest NEW pair# at top → first port/BP.
- **CUTSHEET ROW COLORS: Black=Vacant Port, Red=POTS** (+ more for DSL/Bonded).

## SILI CODES — [Sili Codes.xlsx] WIRE CENTER / CLLI DICTIONARY (3 sheets)
This is the **master CLLI → plain-name map** by exchange. Examples:
- ABRY: ACRN=Acorn, ALSP=Alder Springs, ANRH=Arnold Ranch, BGSD=Big Sandy
- BGCK: BGCK=Big Creek, CALT=CalTrans, CMPS=Camp Sierra, DWVL=Dowville
- FRNT: BGRA/BGRB=Biglione Ranch Rd, BLVW=Bellview, BNDL=Bondadelle
- ONLS: BBRD=Blue Bird, BLKH=Blackhawk, BTFD=Butterfield, CRCJ=Circle J Ranch
- Ring-Protected vs Radio classification per exchange (North Fork, O'Neals, Friant, Auberry). Beasore=BSOR, Goat Mtn=GTMN, Lions Pt=LNPT, Teaford=TFRD.
→ This dictionary should be loaded as a wire-center lookup. (Confirms/expands the equipment-site map.)

## GPON_MGCP_CREATOR — [GPON_MGCP_Creator.xlsx] MGCP string builder
Columns: Switch CLLI (4ch) | Site/Node Name | Distribution CSA CLLI | Brand (CLX/ADT) | Shelf# (2d) | Card/Slot# (2d) | PON Port# (2d) | Split#/Splitter
Builds the MGCP/GPON equipment string from parts. E.g. FRNT + BRMT_GPON + GRRD + CLX + 02 + 01 + 01 + 01.

## SMALL DOCS — Training_Notes & SO_Parsed_Fields = subset of ServiceOrders.docx (already captured). No new info.
