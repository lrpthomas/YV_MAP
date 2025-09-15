#!/usr/bin/env python3
import argparse
import json
import os
import sys
import urllib.request
import urllib.error


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
			try:
				return e.code, json.loads(body)
			except json.JSONDecodeError:
				return e.code, body
def main():
	parser = argparse.ArgumentParser(description="Create GitHub issues from issues.json")
	parser.add_argument("--owner", default=os.environ.get("OWNER", "lrpthomas"))
	parser.add_argument("--repo", default=os.environ.get("REPO", "YV_MAP"))
	parser.add_argument("--file", default=os.path.join(os.path.dirname(__file__), "issues.json"))
	parser.add_argument("--dry-run", action="store_true")
	args = parser.parse_args()

	with open(args.file, "r", encoding="utf-8") as f:
		issues = json.load(f)

	print(f"Repository: {args.owner}/{args.repo}")
	print(f"Issues to create: {len(issues)}")

	token = os.environ.get("GITHUB_TOKEN", "")
	if not args.dry_run and not token:
		print("ERROR: GITHUB_TOKEN environment variable is required for live run", file=sys.stderr)
		return 1

	base = f"https://api.github.com/repos/{args.owner}/{args.repo}/issues"

	for issue in issues:
		payload = {
			"title": issue.get("title"),
			"body": issue.get("body", ""),
			"labels": issue.get("labels", []),
		}
		# Optional fields
		if issue.get("assignees"):
			payload["assignees"] = issue["assignees"]
		if issue.get("milestone"):
			payload["milestone"] = issue["milestone"]

		if args.dry_run:
			print(f"DRY-RUN create issue: {json.dumps(payload, ensure_ascii=False)[:4000]}")
			continue

		status, resp = http_request("POST", base, token, payload)
		if status in (200, 201):
			print(f"Created issue #{resp.get('number')}: {resp.get('title')}")
		else:
			print(f"Failed to create issue '{payload['title']}': {status} {resp}", file=sys.stderr)

	return 0


if __name__ == "__main__":
	sys.exit(main())