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
SPECS_PATH = ROOT / "checkpoint" / "workflow_specs.json"
TEMPLATE_PATH = ROOT / "app" / "template.html"
OUT_PATH = ROOT / "so_trainer.html"

KB_PLACEHOLDER = "/*__KB_JSON__*/"
SPECS_PLACEHOLDER = "/*__SPECS_JSON__*/"


def _inject(template: str, placeholder: str, data) -> str:
    if placeholder not in template:
        raise SystemExit(f"placeholder {placeholder!r} not found in template")
    # compact JSON so the placeholder substitution stays one line
    return template.replace(placeholder, json.dumps(data, ensure_ascii=False, separators=(",", ":")))


def main() -> None:
    kb = json.loads(KB_PATH.read_text(encoding="utf-8"))
    specs = json.loads(SPECS_PATH.read_text(encoding="utf-8"))
    html = TEMPLATE_PATH.read_text(encoding="utf-8")
    html = _inject(html, KB_PLACEHOLDER, kb)
    html = _inject(html, SPECS_PLACEHOLDER, specs)
    OUT_PATH.write_text(html, encoding="utf-8")
    size = OUT_PATH.stat().st_size
    n_wf = sum(len(f.get("members", [])) for f in kb.get("flows", {}).values())
    print(f"wrote {OUT_PATH.relative_to(ROOT)} ({size:,} bytes)")
    print(f"  KB version {kb.get('version')} generated {kb.get('generated')}")
    print(f"  flows: {len(kb.get('flows', {}))}  workflows: {n_wf}  "
          f"specs: {len([k for k in specs if not k.startswith('_')])}  "
          f"terms: {len(kb.get('terms', {}).get('validated', []))} validated")


if __name__ == "__main__":
    main()
