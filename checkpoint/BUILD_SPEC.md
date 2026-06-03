# Ponderosa SO Trainer — Build Spec (locked decisions for the rebuild)
Date: 2026-06-03

## DEPLOYMENT
- Standalone single-file HTML, run LOCALLY (double-click, file://, no server, no internet, no install).
- NOT a Claude artifact — so localStorage/IndexedDB ARE available and are the persistence layer.

## STYLING (from real Ponderosa site — design_system.md)
- Light/clean corporate (NOT dark NOC).
- Orange #ec813c (top+bottom rules, accent), Navy #234f74 (structure/buttons), Green #2a8649 (success/logo).
- White #ffffff base, #f5f7fa panels, #d8dee6 borders. Red #c0392b for issues/errors.
- System sans UI; JetBrains Mono/Consolas for note output + codes.

## LAYOUT — three-pane working view
- LEFT: step list (where am I in the SO). Navy active, green check when done, RED ISSUE ICON if flagged.
- CENTER: wizard (current step, inputs, per-field validation, instruction).
- RIGHT: live note preview (monospace, builds in real time).
- TOP: orange rule + Ponderosa logo + nav tabs (Workflow / Reference / Examples / Corpus / Issues).
- BOTTOM: orange rule + status bar.

## UX PRINCIPLES
- Progressive per-section entry with per-field validation (catch errors at entry, while still in source system).
- Easiest-on-user: flagging an issue = ONE button, panel pre-filled with context; all detail optional.

## ISSUE-TRACKING SYSTEM (built FIRST — it's the spine; flag-hooks added to every level as built)
Capabilities (collapsed into one frictionless flow):
- Flag bad output + type correction
- Free-text note anywhere
- Enhancement/idea
- Mark-and-resolve (open/resolved state)
Quick-tag on capture: Wrong / Note / Idea.

Capture panel (slides in, pre-filled with context):
- Auto-captured: flow, step, field, parsed input, app output, timestamp.
- Optional: "should have been" correction, screenshot, free text, tag.
Screenshots — BOTH:
- Capture the app's own DOM (html2canvas).
- Paste/attach external image (Ctrl+V from snip of iVUE/LinePacks) + file attach.

Lifecycle:
- Flag -> issue persists -> RED ICON appears on the flagged item (note/step/field/reference value).
- Red icon STAYS until issue fixed (changes made) OR user clicks + confirms resolved.
- GLOBAL: open-count badge on Issues tab ("3 open") so unresolved issues are visible from anywhere.

Storage (local file):
- Auto-persist to IndexedDB (handles big base64 screenshots; localStorage too small).
- Export -> bundles all issues + screenshots to one JSON file, THEN asks "remove these from the app?"
- Import -> restore/review on another machine, or migrate when a new app version is sent.
- Export/import is the DURABLE backbone (file:// storage can be fragile across file replacements);
  auto-persist is the convenience layer.

Issues tab (5th nav tab):
- Review / edit / resolve / filter / export all logged issues. The punch-list for fixing the app.

## SCOPE
- E.FACS facility-assignment ONLY. E.GIS map-making + 911_EXT out (context only).

## FACS / NOTE
- Binary FACS CHANGED / FACS UNCHANGED.
- Note: line1 {SO#} {action}; line2 {date} {FACS|action desc}; body per-flow; footer -{tech}.
- Date M.D.YY. Customer data masked **** last-4. Omit N/A pieces.

## 6 FLOWS (corpus-mapped, in knowledge_base_v4.json)
1. DISCONNECT (3413 SOs) 2. CONNECT_RECONNECT (6345) 3. UPGRADE (2160)
4. MOVE (315) 5. FIBER_FTTH (916) 6. CROSS_CONNECT (10, thin — doc-derived)
Action codes branch INSIDE each flow.

## DATA LOADING
- Corpus + any real-customer data uploaded at runtime, never embedded.
- Shipped examples scrubbed unrecognizable, structure preserved.
- Equipment + Sili CLLI dictionary: load from uploaded exports at runtime (don't hardcode subset).

## BUILD ORDER
1. Issue module (storage + lifecycle + red-icon + slide-in capture + Issues tab + export-with-prompt).
2. Three-pane app around it, flag-hooks wired per level as built.
3. Enrich KB reference data (Sili dict, equipment schema, RCF, switch/cable codes, validation patterns).

## STILL OPEN (non-blocking)
- Q20: which code (C&C D000000 vs tier D000) appears in the REQUEST Cody receives — Cody checking.
- Q24: confirm Beasore/dev codes route *REFER TO ENGINEERING* + HOLD first.
- Speed tier PRICES need verification vs H07 C&C table (currently estimates).
