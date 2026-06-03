# Network Topology Diagram — CVIN River Park (IMG_4389)
*The end-to-end physical path mental model. Source: hand-reference diagram, transcribed 2026-06-03.*
*Title block: "CVIN River Park (Tie-in to World)"*

## LINE ASSIGNMENT EXAMPLE (worked, top-right box)
```
855-3800 UPGRADE SNG TO 100/20 BND VDSL
*TEL: FRNT-0330-1707  SCMR,293  835-2
       SCMR N49-1-06-03  BP,128
*DSL:  SCMR,294  PIC,44  835-2
       SCMR N49-1-06-04  BP,129
```
This single example threads through EVERY layer below. (Note: SCMR wirecenter, FRNT switch, bonded 100/20 VDSL upgrade, *TEL on port 03 / *DSL on port 04 — consecutive ports, BP 128/129 consecutive.)

## THE END-TO-END PATH (top → bottom = CO → customer)

### 1. CVIN River Park / Friant CO → "Tie-in to World"
- Friant CO connects to Core Network + Carrier Rings (Transport Fiber) → the outside world.

### 2. TAQUA SWITCH (for Voice)
- GR303: [RDP]-[CRV]
- MGCP: [CLLI]-[Vendor+Shelf]-[Slot]-[Card]-[Port]
- → "Switch Assignment"

### 3. WIRECENTER / DSLAM
- Common Language Location Identifier (CLLI)
- Central Office (CO) Cabinet
- Digital Subscriber Line Area Multiplexer (DSLAM)
- Transport/Backbone Fiber In
- Shown as 2U / 2U rack units

### 4. CLLI — two linked concept circles (the equipment address):
- **CLLI circle 1:** Node (AdTran/Calix/etc), Shelf, Slot/Card (xPON)
- **CLLI circle 2:** Node (AdTran/Calix/etc), Shelf, Slot/Card (ADSL/VDSL/T1), Port (Bonding Group)
- → "Port Assignment"

### 5. PROVISIONED BY CO TECH / NetOps  (the *TEL / *DSL port block)
The worked example's switch/port lines map here:
```
*TEL FRNT-0330-1707  SCMR,293         *DSL SCMR,294
     SCMR N49-1-06-03  BP,128              SCMR N49-1-06-04  BP,128
                                            PIC,44   835-2
```
- "Copper Out (Amphenol) / Line Count"
- MDF/CO Pair → "For Field Tech"; Binding Post → "For Field Tech"

### 6. C.O. CROSS-CONNECT
- **Main Distribution Frame "MDF" / Cable Count** (Copper)  ← Distribution Copper
- Tie-down block labeled with Node-Port info (Buildings)
- Binding Post "BP" Punch-down (Cabinets w/ BDS)
- Jumpers between blocks
- X-Connect Pair(s) (when applicable); PIC(s) at Drop Ped (when not already spliced)

### 7. FIELD / SUBDIVISION X-CONNECT  (outside plant)
- **Route / Pedestal / Handhole / Vault / 3X5 / Manhole**
- Cable Segment → MDF Cable Count → PIC
- Scotchlock (Splice) / ClearCap (Unspliced)
- **MDF Pair "66-block" Punch-down** ←jumpers→ **X-Connect Pair "66-block" Punch-down**
- Binding Post "BP" Punch-down on each

### 8. DROP PED / HANDHOLE
- X-Connect Cable Count → Cable Segment → PIC
- Scotchlock (Splice) / ClearCap (Unspliced)
- Subscriber Drop →

### 9. NETWORK INTERFACE (customer premises)
- Network Interface Device (NID) / Subscriber Network Interface (SNI) / Demarcation Point (D-mark) / Service Entrance
- Internal Wiring "IW" CAT III/IV/VI
- → Dedicated Jack → phone/service

## KEY DEFINITIONS (bottom-left legend, transcribed)
- **Cable Count** = Spliced count (MDF Count) that is completely spliced upstream to the MDF (or equipment). In order by PIC placement. Spliced pairs are given the MDF count that they trace back to at the site cross-connect/MDF. Un-spliced pairs are designated XD with the PIC pair. Sequential counts are consolidated into ranges.
- **PIC** = Polyethylene-Insulated-Copper. Used to represent physical placement within cable by 25-pair color code, regardless of connection/splice status. Used for splicing and tracing.
- **Superbinder** = 600 PICS. **Binder/Group** = 25 PICS.

## CABLE COUNT EXAMPLE (bottom legend, worked)
```
PRAT,1-25=XD,26-30=PRAT,28=PRAT,32-50.
```
- In this example, Pairs 1-25 are spliced clean "in count" and "PIC-for-PIC" on PICs 1-25 and trace back to the site cross-connect positions 1-25.
- The next 5 pairs (PICs 26-30) are not spliced back to the site and would not carry a signal without upstream splicing.
- The next pair (PRAT,28) is splice "Out of Count" onto PIC,31 somewhere upstream, but traces back to PRAT,31 at the site.
- The next 19 pairs (PRAT,32-50) are back to being spliced "in count" on PICs,32-50.

## WHY THIS MATTERS FOR THE TOOL
This diagram is the **physical model** behind every field in the note format:
- Switch (FRNT-/GR303/MGCP) = layer 2-3
- CLLI Node/Shelf/Card/Port + Bonding Group = layer 4 (the *TEL/*DSL port lines)
- MDF Cable,Pair + Binding Post = layer 5-6 (CO cross-connect)
- X-Connect Pair (XCONN,n) + PIC = layer 7 (field x-connect — explains the XCONN note format)
- Drop Ped + PIC at drop = layer 8
- NID/IW = layer 9 (customer)
The "Cable Count vs PIC vs XD" logic explains the cable-book "in count / out of count / XD" status the formatter must respect.
