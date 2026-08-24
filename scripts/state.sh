#!/usr/bin/env bash
# Where do we stand? No AI. The factual ground truth /session-start reasons on top of.
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR" || exit 1

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "?")
head=$(git rev-parse --short HEAD 2>/dev/null || echo "?")
dirty=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
git fetch --quiet 2>/dev/null || true
ahead=$(git rev-list --count "@{u}..HEAD" 2>/dev/null || echo "?")
behind=$(git rev-list --count "HEAD..@{u}" 2>/dev/null || echo "?")

echo "== project state =="
echo "branch : $branch @ $head"
echo "changes: $dirty uncommitted file(s)   ahead:$ahead behind:$behind"

if [ -f pyproject.toml ]; then
  tests=$(grep -rlE '^\s*def test_' tests 2>/dev/null | wc -l | tr -d ' ')
  src=$(find src -name '*.py' 2>/dev/null | wc -l | tr -d ' ')
  echo "python : $src source file(s), $tests test module(s)"
fi
WEB="."; [ -f app/package.json ] && WEB="app"
if [ -f "$WEB/package.json" ]; then
  ver=$(node -p "require('./$WEB/package.json').version" 2>/dev/null || echo "?")
  echo "web    : $WEB @ v$ver"
fi

echo
echo "-- last 8 commits --"
git log -8 --format='  %h %s (%cr)' 2>/dev/null || echo "  (no history yet)"
echo
echo "-- HANDOFF.md (newest entry) --"
if [ -f HANDOFF.md ]; then awk 'NR>1 && /^## / {exit} {print "  " $0}' HANDOFF.md | head -20; else echo "  (none yet)"; fi
