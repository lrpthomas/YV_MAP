# Image Capture Notes — all 11 screenshots transcribed (2026-06-03)

## App-state screenshots (v1 workflow_trainer.html) — confirm app structure, not new source data
- **1780078072721_image.png** — Terms vetting cards (SO Number, Order Date, Action Phrase, FACS Status). Already in app_terms.json.
- **1780094887912_image.png** — Variant builder: workflow GEN_DISCONNECT_QDS_BILLING, variant DISC_RECON_BILL_QDS_TEL_CBOL, style "CT", system touches (iVUE/FACS/QUINTREX/CBOL/COS/NOTES), output template with {date}{phone_out}{phone_qds}{port1}{port2}{tech}.
- **1780095417714_image.png** — v1 Training mode, real corpus entry SO# 170155 (GEN_DISCONNECT_QDS_BILLING), GR303 example: FRNT-SVLK_N2-CLX05-02-11 / SVLK N2-5-02-11 (Leg1), -02-12 (Leg2), -KM. Shows full step list for the workflow (Order Date, SO Number, Action Phrase, FACS Status, Phone OUT, Phone QDS, Other Port + iVUE locate steps). Detected modules: ADSL, BILLING_CORRECTION, CBOL, DISCONNECT, DSL, DSL_BONDED, FACS_STATUS, QDS, RECONNECT, TEL_POTS, UPGRADE.

## iVUE ground-truth screenshots — HIGH VALUE, confirms field map
- **1780432980673_image.png** — Access export format menu (Excel/SharePoint/Word RTF/PDF/Access/Text/XML/ODBC/HTML/dBASE/Word Merge). Context for XLSX→JSON conversion.
- **1780433034019_image.png** — **LinePacks _LinePacks1 table columns CONFIRMED: Switch | Equipment | Status | Voice Agreement | Data Agreement | Line/BP | Card Type**
- **1780437052310_image.png** — iVUE main screen. Nav tree top level: iVUE Service / Facility Management / Trouble Management. Toolbar: Job Manager, Query Builder, Work Queue, User Services Care, Create Contact, Auto Create Contact. App title "05526app 5526 - Ponderosa Telephone Company iVUE Service". Alerts panel bottom-left.
- **1780437097864_image.png** — **iVUE Service Orders (SO) screen — THE key field-map confirmation:**
  - Nav: iVUE Service > Service Orders > Service Orders (SO); also Work Queue, Reports/Processes
  - SO grid cols: Account | Agreement | Customer | Name | SO | Hold SO | SO Type | SO Status | Description | Service Point
  - SO detail tabs: SO | Workflow | Agmt | General | Interfaces | Toll | Dir | Local | Serv Addr | 911 | Tax | Equip | Deposit | P&S
  - Request pane + Response pane side by side (confirms the req/resp data structure)
  - Office Information tab: Source, Requested By, Taken By, Contact Information, Contact Number, Delay Reason, Start Date, Start Time, **Complete By Date** (= DUE DATE), Complete By Time, Entry Date, Internal Order checkbox, Salesperson, Commission Type, Reason Codes (Type/Code In, Type/Code Out)
  - Other tabs row: Office Information | Complete | Open Field(s) | SO Payment | Work Order
  - Action bar: SO View, Continue Workflow, Review SO, Validate/Close, Void, Print, Create SO, Save, Reset
  - Alerts: E.FACS (1)
- **1780437113399_image.png** — **iVUE Workflow tab — FULL SO TASK CHAIN (the "whole workflow" Cody referenced):**
  - Tab tooltip: "Defines tasks assoc with SOs, contact tracking, and ad hoc."
  - Task Type: A - All Tasks. SO Needed Date 10/15/2021 04:30. 27 tasks, current 19.0.
  - Sequence (Task / Seq / Status):
    - C.DIRVAL – Review Directory Summary
    - C.CALLBLK – Verify Call Blocking
    - C.P&S – Add Charges & Credits (15.00) COMP
    - N.NOC – Network Operations (16.00) COMP
    - I.INTERNET – Internet Department (17.00) COMP
    - C.MODEM – Add Modem (18.00) COMP
    - **E.FACS – Facilities (19.00) QUEUE  ← Cody's task**
    - P.PROG – Programming (20.00) QUEUE
    - P.VALCONN – Validate Connect Date (21.00)
    - P.SCHEDULE – Schedule/Dispatch (22.00)
    - P.COMPLETE – Enter Completed By Date (23.00)
    - C.PRORATE – Enter Prorate Date (24.00)
    - CLOSE_SO – Close SO (25.00)
    - 911_EXT (26.00)
    - C.DIR ASST – Add DA Allowance 1 for Res (27.00)
  - Cols: Task | Task Seq | Critical | Priority | Needed | Needed Date | Needed Time | Duration | Current Status | Description
  - Buttons: Move Up, Move Down, Show Workflow, Task Assignments, Auto Close, Delete Workflow, Insert Workflow, Add Row, Delete Row

## GPON/MGCP source procedure PNGs — HIGH VALUE
- **Subscriber Query via Cable name for EXCH.PNG** — iVUE Query Builder procedure: Category=Service Points, View="Service Point - Facilities with Serv Addr Status", filter "Cable Name contains EXCH", Configure Columns/Load/Save/View SQL/Max Rows/Search. Result cols: Serv Address City, Service Address, Serv Address Unit, Tax Zone, Wire Center, Service Point Description, Service Point Remarks.
- **TSVJ Splitter Install instructions location.PNG** — GIS Sites directory index \\ptc27\Drawings\DataPortal\LinkedDocs\GIS\Sites\ — wire-center → site-name → exchange map:
  - (ABRY) CASS & SAND, SLVR (Silver Oak/MEDC/Oak Knolls), TMTN Temp Trailers
  - (EDGE) Ponderosa Edge
  - (FRNT) LNST-Biglione, MRBL-Mira Bella, PRSV-Friant Preserve, RNSE-Renaissance, TSVJ-Tesoro Viejo
  - (NFRK) CNCP-Central Camp, WAUP-Wah Up Way
  - (ONLS) DTON-Downtown O'Neals FTTH
  - (SVLK) CRES-Cressman, LCRS-Lower Cressman & pwr to RSCK, LTFD-Littlefield, SCDR-Sierra Cedars A&B, SNRK-Sunrock, WLDF-Wildflower
  - Key files: Adtran Active-E card locations.xlsx, AdTran ActiveE ONTs and SFPs PDF, Calix_MGCP_PON_Construction.png, FRNT CLX ONT CRV Pool.txt, FTTH_SO_Documentation.docx, PTC FiberBook.xlsx, Tesoro Splitter Turn-up examples.msg
- **TSVJ Splitter Install Response Template.PNG** — Real fiber splitter turn-up response:
  ```
  822-4110 IN W/ 1G/1G FTTH
  FRNT-0313-1869  CKSD,140 MST-Port,12 AH1938
  BNDL-GPON-1-1-7 CKSD SPLT-1,P,1

  New Splitter Turnup Equipment/Fiber Path:
  FEEDER:
  @BNDL Cabinet: BNDL-GPON-1-1-7 >> FDP#2X15
  @BNDX X-Connect: FDP-IN,15 >> FDP-OUT,133 (BNDL_CKSD,133)
  @CKSD Splitter: Splitter Tail IN,1 >> CKSD FDP#1X1 (BNDL_CKSD,133)
  DISTRIBUTION:
  CKSD SPLT-1,P1 >> CKSD,140 AH,1939 MST-PORT,12 (3X5)
  -TDF
  ```
  Equipment pickup note: Corning Dual 1X16 splitter, SFP 100-05148, UPCSC/SC SM DX 2M, UPCLC/SC SM DX 1M.
