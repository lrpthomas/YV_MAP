# Issue and Label Bootstrapper

This folder contains JSON definitions and simple Python scripts to create labels and issues for the `lrpthomas/YV_MAP` repository.

Prerequisites:
- Python 3.8+
- A GitHub personal access token in `GITHUB_TOKEN` (only for live runs)

Dry run (prints what would be created):

```bash
python3 /workspace/tools/issues/create_labels.py --dry-run
python3 /workspace/tools/issues/create_issues.py --dry-run
```

Live run (creates/updates on GitHub):

```bash
export GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
# Optional overrides:
export OWNER=lrpthomas
export REPO=YV_MAP

python3 /workspace/tools/issues/create_labels.py
python3 /workspace/tools/issues/create_issues.py
```

Files:
- `labels.json`: Label definitions (name, color, description)
- `issues.json`: Issue definitions (title, body, labels)
- `create_labels.py`: Creates/updates labels via GitHub API
- `create_issues.py`: Creates issues via GitHub API

Notes:
- Re-running label creation will update existing labels.
- Issue creation is **not idempotent**: running the script multiple times will create duplicate issues, as there is no deduplication logic. Avoid re-running unless you intend to create duplicates.