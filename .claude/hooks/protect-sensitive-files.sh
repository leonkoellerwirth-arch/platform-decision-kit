#!/usr/bin/env bash
# PreToolUse(Edit|Write|MultiEdit) guard — blocks edits to prod env + lockfiles.
# Wire in .claude/settings.json. Exit 2 feeds the message back into Claude's context.
# Reads the tool payload as JSON on stdin (Claude Code hook contract).
set -uo pipefail
payload="$(cat)"
path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
[ -z "$path" ] && exit 0

case "$path" in
  */.env|*/.env.prod|*/.env.production|*/api/.env*)
    echo "BLOCKED: $path is a production env file. Edit .env.example instead; real secrets never enter the repo (CONSTITUTION §1)." >&2
    exit 2 ;;
  */package-lock.json|*/pnpm-lock.yaml|*/yarn.lock|*/composer.lock|*/uv.lock)
    echo "BLOCKED: $path is a lockfile. Change dependencies via the manifest + install tool, not by hand." >&2
    exit 2 ;;
esac
exit 0
