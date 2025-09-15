#!/usr/bin/env python3
import argparse
import json
import os
import sys
import urllib.request
import urllib.error
import urllib.parse


def http_request(method: str, url: str, token: str, payload: dict | None):
	data = None
	if payload is not None:
		data = json.dumps(payload).encode("utf-8")
	req = urllib.request.Request(url=url, data=data, method=method)
	req.add_header("Accept", "application/vnd.github+json")
	if payload is not None:
		req.add_header("Content-Type", "application/json")
	if token:
		req.add_header("Authorization", f"Bearer {token}")
	try:
		with urllib.request.urlopen(req, timeout=30) as resp:
			return resp.getcode(), json.loads(resp.read().decode("utf-8"))
	except urllib.error.HTTPError as e:
		body = None
		try:
			body = e.read().decode("utf-8")
			return e.code, json.loads(body)
		except Exception:
			return e.code, {"message": body if body is not None else str(e)}


def main() -> int:
	parser = argparse.ArgumentParser(description="Create or update GitHub labels from labels.json")
	parser.add_argument("--owner", default=os.environ.get("OWNER", "lrpthomas"))
	parser.add_argument("--repo", default=os.environ.get("REPO", "YV_MAP"))
	parser.add_argument("--file", default=os.path.join(os.path.dirname(__file__), "labels.json"))
	parser.add_argument("--dry-run", action="store_true")
	args = parser.parse_args()

	with open(args.file, "r", encoding="utf-8") as f:
		labels = json.load(f)

	print(f"Repository: {args.owner}/{args.repo}")
	print(f"Labels to process: {len(labels)}")

	token = os.environ.get("GITHUB_TOKEN", "")
	if not args.dry_run and not token:
		print("ERROR: GITHUB_TOKEN environment variable is required for live run", file=sys.stderr)
		return 1

	base = f"https://api.github.com/repos/{args.owner}/{args.repo}/labels"

	for label in labels:
		name = label.get("name")
		payload = {k: v for k, v in label.items() if k in ("name", "color", "description")}
		if args.dry_run:
			print(f"DRY-RUN create/update label: {json.dumps(payload, ensure_ascii=False)}")
			continue

		status, resp = http_request("POST", base, token, payload)
		if status == 201:
			print(f"Created label: {name}")
			continue
		elif status == 422:
			# Already exists; try to update
			encoded = urllib.parse.quote(name, safe="")
			status, resp = http_request("PATCH", f"{base}/{encoded}", token, payload)
			if status == 200:
				print(f"Updated label: {name}")
			else:
				print(f"Failed to update label {name}: {status} {resp}", file=sys.stderr)
		else:
			print(f"Failed to create label {name}: {status} {resp}", file=sys.stderr)

	return 0


if __name__ == "__main__":
	sys.exit(main())