#!/usr/bin/env bash
# Is everything saved? No AI. CONSTITUTION.md §2 rescue rule enforcement.
# Prints "SECURE: all saved" (exit 0) or "SECURE: action needed" (exit 1).
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR" || exit 1

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)
issues=0

if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  echo "✗ uncommitted changes:"; git status --short | sed 's/^/    /'; issues=1
else
  echo "✓ working tree clean"
fi

git fetch --quiet origin "$branch" 2>/dev/null || true
ahead=$(git rev-list --count "origin/$branch..$branch" 2>/dev/null || echo "?")
if [ "$ahead" = "0" ]; then
  echo "✓ pushed — origin/$branch is up to date"
elif [ "$ahead" = "?" ]; then
  echo "· no upstream for $branch yet (push with: git push -u origin $branch)"
else
  echo "✗ $ahead commit(s) not pushed to origin/$branch"; issues=1
fi

echo
if [ "$issues" -eq 0 ]; then echo "SECURE: all saved"; else echo "SECURE: action needed"; exit 1; fi
