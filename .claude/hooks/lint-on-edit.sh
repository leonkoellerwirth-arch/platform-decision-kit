#!/usr/bin/env bash
# PostToolUse(Edit|Write|MultiEdit) guard — runs the relevant fast lint at edit-time so drift is
# caught immediately, not at commit. Wire in .claude/settings.json. Exit 2 warns back into context.
set -uo pipefail
payload="$(cat)"
path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
[ -z "$path" ] && exit 0

root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$root" || exit 0
WEB="."; [ -f app/package.json ] && WEB="app"

case "$path" in
  *.py)
    RUFF=".venv/bin/ruff"; [ -x "$RUFF" ] || RUFF="ruff"
    if ! "$RUFF" check "$path" >/tmp/lint-on-edit.$$ 2>&1; then
      echo "ruff flagged $path:"; cat /tmp/lint-on-edit.$$ >&2; rm -f /tmp/lint-on-edit.$$; exit 2
    fi ;;
  *.ts|*.tsx|*.css)
    if [ -d "$WEB/node_modules" ]; then
      # budget ratchets first (cheap), then eslint on the file
      (cd "$WEB" && npm run -s lint:tokens >/dev/null 2>&1 && npm run -s lint:loc >/dev/null 2>&1) \
        || { echo "token/LOC budget regressed after editing $path (CONSTITUTION §4 ratchet)." >&2; exit 2; }
    fi ;;
esac
rm -f /tmp/lint-on-edit.$$ 2>/dev/null
exit 0
