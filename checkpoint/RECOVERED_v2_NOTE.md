# Recovered v2 build (so_trainer_v2.html)

The v2 HTML build (lost in compaction, re-shared by Cody 2026-06-03) was audited in V2_AUDIT.md.
It is NOT carried forward as-is — it was built before the full data review and encodes pre-verification
assumptions (old multi-value FACS, wrong header order, guessed speed prices, hardcoded 44-site equipment,
invented workflow templates, no Sili dict, no per-field validation).

KEEP from v2: 4-panel IA, NOC+Ponderosa aesthetic, parser→engine pattern, runtime corpus upload,
port-line decoder, reference-tab structure.
REBUILD: data-driven from verified knowledge_base v4 + corpus seed_templates, binary FACS,
correct note header, runtime equipment/Sili loading, per-field validation.
