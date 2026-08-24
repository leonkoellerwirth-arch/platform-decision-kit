#!/usr/bin/env bash
# One-shot local setup — idempotent. Distilled from local-agent-pipeline (LESSONS.md).
set -euo pipefail
for arg in "$@"; do case "$arg" in
  -h|--help) echo "usage: ./setup.sh   (creates .venv, installs, runs offline tests)"; exit 0 ;;
  *) echo "Unknown option: $arg"; exit 2 ;;
esac; done

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -t 1 ]; then BOLD=$(printf '\033[1m'); GREEN=$(printf '\033[32m'); YELLOW=$(printf '\033[33m'); RESET=$(printf '\033[0m'); else BOLD=""; GREEN=""; YELLOW=""; RESET=""; fi
step(){ echo "${BOLD}==>${RESET} $*"; }
ok(){ echo "${GREEN}✓${RESET} $*"; }

VENV=".venv"; VENV_PY="$VENV/bin/python"
find_python(){ for c in python3.13 python3.12 python3.11; do command -v "$c" >/dev/null 2>&1 && { echo "$c"; return 0; }; done
  command -v python3 >/dev/null 2>&1 && python3 -c 'import sys; raise SystemExit(0 if sys.version_info>=(3,11) else 1)' && { echo python3; return 0; }; return 1; }

if [ -x "$VENV_PY" ]; then step "Reusing $VENV"; else
  PY=$(find_python) || { echo "${YELLOW}Python >= 3.11 not found.${RESET}"; exit 1; }
  step "Creating virtualenv with $PY"
  if command -v uv >/dev/null 2>&1; then uv venv "$VENV" --python "$PY"; else "$PY" -m venv "$VENV"; fi
fi

step "Installing package + dev dependencies"
if command -v uv >/dev/null 2>&1; then uv pip install -e ".[dev]" --python "$VENV_PY" >/dev/null
else "$VENV_PY" -m pip install --upgrade pip >/dev/null && "$VENV_PY" -m pip install -e ".[dev]" >/dev/null; fi
ok "installed ($("$VENV_PY" --version))"

[ ! -f .env ] && [ -f .env.example ] && cp .env.example .env && ok "created .env from .env.example"

step "Running the offline test suite"
"$VENV_PY" -m pytest -q -m "not slow"

echo; ok "${BOLD}Setup complete.${RESET}  Activate: source $VENV/bin/activate   Gate: ./scripts/gate.sh"
