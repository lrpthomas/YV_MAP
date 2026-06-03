#!/usr/bin/env python3
"""Build the Ponderosa SO Trainer single-file app.

Injects the authoritative knowledge base (checkpoint/knowledge_base_v4.json)
into the HTML template and writes so_trainer.html at the repo root.

Why a build step: the reference docs in .claude/skills are already "generated
from knowledge_base_v4.json"; the app follows the same pattern so its embedded
reference data never drifts from the KB. Corpus + real-customer data are NOT
embedded here -- they are uploaded at runtime (locked BUILD_SPEC decision).

Usage:  python3 build_app.py
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
KB_PATH = ROOT / "checkpoint" / "knowledge_base_v4.json"
TEMPLATE_PATH = ROOT / "app" / "template.html"
OUT_PATH = ROOT / "so_trainer.html"

PLACEHOLDER = "/*__KB_JSON__*/"


def main() -> None:
    kb = json.loads(KB_PATH.read_text(encoding="utf-8"))
    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    if PLACEHOLDER not in template:
        raise SystemExit(f"placeholder {PLACEHOLDER!r} not found in template")
    # compact JSON so the placeholder substitution stays one line
    kb_json = json.dumps(kb, ensure_ascii=False, separators=(",", ":"))
    html = template.replace(PLACEHOLDER, kb_json)
    OUT_PATH.write_text(html, encoding="utf-8")
    size = OUT_PATH.stat().st_size
    print(f"wrote {OUT_PATH.relative_to(ROOT)} ({size:,} bytes)")
    print(f"  KB version {kb.get('version')} generated {kb.get('generated')}")
    print(f"  flows: {len(kb.get('flows', {}))}  terms: "
          f"{len(kb.get('terms', {}).get('validated', []))} validated")


if __name__ == "__main__":
    main()
