# Ponderosa SO Trainer — Design System
Source: official Ponderosa website header (1780516231277_image.png), colors sampled directly.

## BRAND PALETTE (sampled from real site)
- **Orange** (primary accent / top+bottom rule): #ec813c  rgb(236,129,60)
  - darker: #e4632e / #d9701f for hover
- **Navy** (buttons, headers, primary UI): #234f74  rgb(35,79,116)
  - lighter: #305379 ; darker: #1a3c5a
- **Green** (logo mark, success/positive): #2a8649  rgb(42,134,73)
  - "Your Life Connected." brand line
- **Slate-blue accent** (secondary): #596e93
- **Text gray** (nav, body): #4a4a4a / #5d6470 ; light #8b949e
- **Backgrounds**: white #ffffff (page), #f5f7fa (panels), #eef1f5 (insets)
- **Borders**: #d8dee6 / #e3e8ee

## FEEL
Light/clean corporate (matches the real Ponderosa web aesthetic) — NOT the dark NOC theme.
White base, navy structural elements, orange accent rules top & bottom (signature brand stripes),
green for success/confirmation states. Professional, calm, telco-utility.

## TYPOGRAPHY
- UI/headings: system sans (the site uses a clean bold sans — approximate with -apple-system/Segoe UI/Inter)
- Logo wordmark is heavy italic bold; headers can echo with bold weight
- Monospace for note output / port strings / codes: JetBrains Mono / Consolas

## SIGNATURE ELEMENTS (from the header)
- Thin ORANGE rule across the very top and bottom of the page (3-4px)
- Navy pill/rect buttons with white uppercase text, letter-spaced
- Green circular logo mark (stylized pine/ponderosa)
- Generous white space, light section dividers

## LAYOUT (locked UX)
Three-pane working view:
- LEFT: step list (where am I in the SO) — navy active state, green checkmarks for done
- CENTER: wizard (current step, inputs, per-field validation, instruction)
- RIGHT: live note preview (monospace, builds in real time as fields fill)
- Top: orange rule + Ponderosa logo + nav (Workflow / Reference / Examples / Corpus)
- Bottom: orange rule + status bar

## STATE COLORS
- Active/current: navy #234f74
- Complete/valid: green #2a8649
- Accent/attention: orange #ec813c
- Error/invalid: #c0392b (warm red, brand-harmonious)
- Neutral/pending: gray #8b949e
