#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────────────────────
# platform-decision-kit — local test launcher (same ergonomics as the other ~/dev projects).
#
# This repository is an instrument made of documents plus two small tools; there is no service
# to run. What there IS to run locally is the thing the release hangs on: the deterministic
# gate — lint, offline tests, the form/theme drift check, and the three fixture assertions
# ("fixtures: 3/3 green"). Docker is the point: the gate must give the same verdict on any
# machine, not only on one with the right Python, ruff and shellcheck installed.
#
# From Phase 2 on, the web instrument (Vite/React, client-side only) runs here too.
#
# Ports are OFFSET from the sibling static sites so they run side by side, zero clash:
#   5173 studywithme-bg · 5273 puls_cafe · 5275 monirahlihel.com · 5277 leonkoellerwirth.de
#   5281 HERE (web instrument) · 5282 HERE (static preview)
#
# Usage:
#   ./start.sh              gate in Docker, then the web instrument if app/ exists
#   ./start.sh --gate       only the deterministic gate (the release condition)
#   ./start.sh --app        only the web instrument            → http://localhost:5281
#   ./start.sh --build      production bundle + preview it     → http://localhost:5282
#   ./start.sh --shell      interactive shell in the tools container
#   ./start.sh --host       run on the host (.venv / node) instead of Docker
#   ./start.sh --rebuild    rebuild the tools image before running
#   ./start.sh --free-port  stop whatever holds the port first (opt-in)
#   ./start.sh --no-open    don't open a browser
#   ./start.sh -h|--help
#
# Ctrl-C stops the dev server. Containers are left stopped, not removed.
# ─────────────────────────────────────────────────────────────────────────────

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

APP_PORT="${APP_PORT:-5281}"
PREVIEW_PORT="${PREVIEW_PORT:-5282}"
MODE="all"          # all · gate · app · build · shell
USE_DOCKER=1
REBUILD=0
FREE_PORT=0
OPEN=1

usage() { sed -n '4,29p' "$0" | sed 's/^# \{0,1\}//'; }

while [ "$#" -gt 0 ]; do
  case "$1" in
    --gate)      MODE="gate" ;;
    --app)       MODE="app" ;;
    --build)     MODE="build" ;;
    --shell)     MODE="shell" ;;
    --host)      USE_DOCKER=0 ;;
    --rebuild)   REBUILD=1 ;;
    --free-port) FREE_PORT=1 ;;
    --no-open)   OPEN=0 ;;
    -h|--help)   usage; exit 0 ;;
    *) echo "❌ Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

have() { command -v "$1" >/dev/null 2>&1; }

docker_ready() {
  have docker || return 1
  docker compose version >/dev/null 2>&1 || return 1
  docker info >/dev/null 2>&1 || return 1
}

ensure_port_free() {
  local port="$1" pids=""
  have lsof || return 0
  pids="$(lsof -ti tcp:"$port" 2>/dev/null || true)"
  [ -z "$pids" ] && return 0
  if [ "$FREE_PORT" -eq 1 ]; then
    echo "⚠️  Freeing port $port (PID(s): $pids) — you passed --free-port."
    # shellcheck disable=SC2086  # lsof returns a whitespace-separated PID list by design.
    kill $pids 2>/dev/null || true
    sleep 1
    return 0
  fi
  { echo "❌ Port $port is in use by PID(s): $pids."
    echo "   Stop it, re-run with --free-port, or set APP_PORT/PREVIEW_PORT."; } >&2
  exit 1
}

open_browser() {
  [ "$OPEN" -eq 1 ] || return 0
  have open || return 0
  ( sleep 3; open "$1" >/dev/null 2>&1 || true ) &
}

# ── Docker availability ──────────────────────────────────────────────────────
if [ "$USE_DOCKER" -eq 1 ] && ! docker_ready; then
  if have docker; then
    echo "🐳 Docker is installed but the daemon isn't running."
    echo "   ▶ Start Docker Desktop for the reproducible gate, or pass --host to use .venv."
  else
    echo "🐳 Docker not found — falling back to the host environment (--host)."
  fi
  USE_DOCKER=0
fi

# ── The deterministic gate ───────────────────────────────────────────────────
run_gate() {
  if [ "$USE_DOCKER" -eq 1 ]; then
    echo "🐳 Gate → tools container (python 3.11 · ruff · pytest · shellcheck)"
    # Build only when asked, or when the image does not exist yet: `compose run` builds a
    # missing image on its own, and forcing a build on every run buries the gate's own output
    # under a build log that says nothing new.
    if [ "$REBUILD" -eq 1 ]; then
      docker compose build --no-cache gate
    fi
    docker compose run --rm gate
  else
    echo "🖥  Gate → host environment"
    [ -x .venv/bin/python ] || { echo "   .venv missing — running ./setup.sh first."; bash setup.sh; }
    bash scripts/gate.sh
  fi
}

# ── The web instrument (Phase 2) ─────────────────────────────────────────────
app_present() { [ -f app/package.json ]; }

app_missing_note() {
  echo "ℹ️  No web instrument yet — app/ arrives in Phase 2 (see README, \"Web instrument\")."
  echo "   Until then the intake forms are Markdown, and the gate above is what there is to run."
}

run_app() {
  ensure_port_free "$APP_PORT"
  echo "🌐 Web instrument → http://localhost:${APP_PORT}"
  open_browser "http://localhost:${APP_PORT}"
  if [ "$USE_DOCKER" -eq 1 ]; then
    exec docker compose --profile web up app
  else
    have node || { echo "❌ node not found (and no Docker). Install Node 20+." >&2; exit 1; }
    cd app
    [ -d node_modules ] || { echo "📦 npm install…"; npm install --no-audit --no-fund; }
    exec npm run dev -- --port "$APP_PORT" --strictPort
  fi
}

run_build() {
  ensure_port_free "$PREVIEW_PORT"
  echo "🔨 Production bundle + preview → http://localhost:${PREVIEW_PORT}"
  open_browser "http://localhost:${PREVIEW_PORT}"
  if [ "$USE_DOCKER" -eq 1 ]; then
    exec docker compose --profile web-preview up preview
  else
    have node || { echo "❌ node not found (and no Docker). Install Node 20+." >&2; exit 1; }
    cd app
    [ -d node_modules ] || npm install --no-audit --no-fund
    npm run build
    exec npm run preview -- --port "$PREVIEW_PORT" --strictPort
  fi
}

# ── Dispatch ─────────────────────────────────────────────────────────────────
echo "📐 platform-decision-kit — local test run"
echo

case "$MODE" in
  gate)
    run_gate
    ;;
  shell)
    [ "$USE_DOCKER" -eq 1 ] || { echo "❌ --shell needs Docker." >&2; exit 1; }
    exec docker compose --profile manual run --rm tools
    ;;
  app)
    app_present || { app_missing_note; exit 1; }
    run_app
    ;;
  build)
    app_present || { app_missing_note; exit 1; }
    run_build
    ;;
  all)
    run_gate
    echo
    if app_present; then
      run_app
    else
      app_missing_note
    fi
    ;;
esac
