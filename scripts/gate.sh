#!/usr/bin/env bash
# Hard quality gate — the invariants from CONSTITUTION.md §4, checked deterministically.
# Zero AI. Auto-detects python (pyproject.toml) and/or web (package.json) and runs both.
# Prints "GATE: PASS" (exit 0) or "GATE: FAIL" (exit 1).
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# When copied into a repo as scripts/gate.sh, ROOT_DIR is the repo root.
cd "$ROOT_DIR" || exit 1

fail=0
check() { if eval "$2" >/dev/null 2>&1; then echo "  ✓ $1"; else echo "  ✗ $1"; fail=1; fi; }
skip()  { echo "  · $1"; }

echo "== hard gate =="

# --- Python surface ---
if [ -f pyproject.toml ]; then
  PY=".venv/bin/python"; [ -x "$PY" ] || PY="python3"
  RUFF=".venv/bin/ruff"; [ -x "$RUFF" ] || RUFF="ruff"
  check "ruff check clean"        "$RUFF check ."
  check "ruff format clean"       "$RUFF format --check ."
  check "pytest green (offline)"  "$PY -m pytest -q -m 'not slow'"
  check "no TODO/FIXME in src/"   "! grep -rniE --include='*.py' 'TODO|FIXME|XXX' src"
fi

# --- Web surface ---
WEB="."
[ -f app/package.json ] && WEB="app"
if [ -f "$WEB/package.json" ]; then
  if [ -d "$WEB/node_modules" ]; then
    # Single source of truth: if the repo defines verify:ci (the web analog of this gate —
    # typecheck · lint · budgets · tests · build), run exactly that so CI and gate never drift.
    if grep -sq '"verify:ci"' "$WEB/package.json"; then
      check "verify:ci (typecheck·lint·budgets·tests·build)" "(cd '$WEB' && npm run -s verify:ci)"
    else
      check "eslint clean"          "(cd '$WEB' && npm run -s lint)"
      check "typecheck clean"       "(cd '$WEB' && npm run -s typecheck)"
      check "build (tsc + vite)"    "(cd '$WEB' && npm run -s build)"
    fi
  else
    skip "web checks skipped ($WEB/node_modules absent — run npm ci)"
  fi
fi

# --- Shell surface (every repo has scripts; a broken backbone is a silent hazard) ---
# All tracked *.sh must pass shellcheck. Degrades to a skip where shellcheck is absent, so the
# gate stays runnable everywhere; CI installs shellcheck so the check is enforced there.
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  # bash 3.2 (macOS default) has no `mapfile`; collect into a space-joined list the portable way.
  # Includes every tracked *.sh AND extensionless scripts with a shell shebang (e.g. bin/base) —
  # a CLI without a .sh suffix is still shell, and a broken one is still a hazard.
  SH_FILES=""; SH_N=0
  while IFS= read -r f; do
    case "$f" in
      *.sh) ;;                                     # always a shell file
      *.*)  continue ;;                            # some other extension → not shell
      *)    head -1 "$f" 2>/dev/null | grep -qE '^#!.*/(env +)?(ba)?sh( |$)' || continue ;;
    esac
    SH_FILES="$SH_FILES $f"; SH_N=$((SH_N+1))
  done < <(git ls-files 2>/dev/null)
  if [ "$SH_N" -gt 0 ]; then
    if command -v shellcheck >/dev/null 2>&1; then
      check "shellcheck clean ($SH_N scripts)" "shellcheck -S warning$SH_FILES"
    else
      skip "shellcheck skipped (not installed — brew install shellcheck)"
    fi
  fi
fi

# --- Token / LOC ratchet (CONSTITUTION.md §4) ---
BUDGET_SH="$(dirname "${BASH_SOURCE[0]}")/budget.sh"
[ -f "$BUDGET_SH" ] && check "token/LOC budget within ceiling" "bash '$BUDGET_SH'"

# --- Universal guardrails (CONSTITUTION.md §7) ---
# Secret scan — gitleaks (full history + entropy, reads .gitleaks.toml) when installed;
# a regex fallback otherwise, so the gate stays runnable everywhere. CI installs gitleaks.
if command -v gitleaks >/dev/null 2>&1; then
  check "gitleaks — no secrets in history" "gitleaks git --no-banner --redact ."
else
  check "no obvious secrets tracked (regex fallback — brew install gitleaks for full scan)" \
    "! git grep -nIE '(sk-[A-Za-z0-9]{20,}|BEGIN (RSA|OPENSSH) PRIVATE KEY|AIza[0-9A-Za-z_-]{30,})' -- . ':(exclude).env.example'"
fi
check "no customer-internal names" \
  "! git grep -rniE '(daimler|toennies|tönnies)' -- . ':(exclude)CONSTITUTION.md' ':(exclude)*/LESSONS.md' ':(exclude,glob)**/gate.sh'"
check "no internal briefing tracked" \
  "! git ls-files --error-unmatch -- '*CLAUDE-CODE-BRIEFING*' 2>/dev/null | grep -q ."

echo
if [ "$fail" -eq 0 ]; then echo "GATE: PASS"; else echo "GATE: FAIL"; exit 1; fi
