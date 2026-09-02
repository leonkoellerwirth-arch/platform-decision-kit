#!/usr/bin/env bash
# PostToolUse(Edit|Write|MultiEdit) guard — runs the relevant fast lint at edit-time so drift is
# caught immediately, not at commit. Wire in .claude/settings.json. Exit 2 warns back into context.
set -uo pipefail
payload="$(cat)"
path="$(printf '%s' "$payload" | sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')"
[ -z "$path" ] && exit 0
# Eine Datei, die es nicht (mehr) gibt, ist kein Befund — wie das fehlende Werkzeug unten.
[ -f "$path" ] || exit 0

root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$root" || exit 0
WEB="."; [ -f app/package.json ] && WEB="app"

case "$path" in
  *.py)
    # Fehlt ruff, wird uebersprungen statt zu scheitern — dieselbe Regel wie
    # bei shellcheck in gate.sh: ein fehlendes Werkzeug ist kein Befund.
    # (2026-09-02: der Hook wurde nach 51 toten Tagen verdrahtet und brach
    # sofort auf der ersten .py-Datei, weil ruff hier nicht installiert ist.)
    RUFF=".venv/bin/ruff"; [ -x "$RUFF" ] || RUFF="$(command -v ruff || true)"
    [ -n "$RUFF" ] || exit 0
    if ! "$RUFF" check "$path" >/tmp/lint-on-edit.$$ 2>&1; then
      echo "ruff flagged $path:"; cat /tmp/lint-on-edit.$$ >&2; rm -f /tmp/lint-on-edit.$$; exit 2
    fi ;;
  *.ts|*.tsx|*.css)
    # 2026-09-02: hier standen `npm run lint:tokens` und `lint:loc` — zwei Skripte, die es
    # in package.json NICHT (mehr) gibt. Weil der Hook seit dem 13. Juli in keiner
    # Settings-Datei stand, ist das 51 Tage niemandem aufgefallen; beim Verdrahten
    # blockierte er sofort JEDE .ts-Aenderung mit einer erfundenen Ratchet-Meldung.
    # Der Token/LOC-Ratchet gehoert ohnehin scripts/budget.sh (ueber gate.sh), nicht hier.
    # Was hier hingehoert, ist genau das, was der Kopf dieser Datei verspricht: der
    # schnelle Lint auf der EINEN geaenderten Datei.
    # 2026-09-03: eslint nur auf Dateien, die wirklich unter $WEB liegen — sonst meldet
    # es bei WEB="app" fuer eine Datei ausserhalb "No files matching" und der Hook
    # blockiert wieder ohne Befund.
    case "$path" in "$root/$WEB"/*|"$root"/*) ;; *) exit 0 ;; esac
    [ "$WEB" = "." ] || case "$path" in "$root/$WEB"/*) ;; *) exit 0 ;; esac
    if [ -d "$WEB/node_modules" ] && [ -x "$WEB/node_modules/.bin/eslint" ]; then
      if ! (cd "$WEB" && ./node_modules/.bin/eslint "$path") >/tmp/lint-on-edit.$$ 2>&1; then
        echo "eslint flagged $path:" >&2; cat /tmp/lint-on-edit.$$ >&2
        rm -f /tmp/lint-on-edit.$$; exit 2
      fi
    fi ;;
esac
rm -f /tmp/lint-on-edit.$$ 2>/dev/null
exit 0
