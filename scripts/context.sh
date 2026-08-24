#!/usr/bin/env bash
# context.sh — measure the REAL context usage of the running Claude Code session and warn when a
# fresh session beats pushing a full context further.
#
# How: Claude Code writes the true token counts (`usage`) of every message into the session
# transcript (~/.claude/projects/<project>/<session>.jsonl). The MOST RECENT usage line carries
# input_tokens + cache_creation_input_tokens + cache_read_input_tokens = the complete prompt the
# model read on its last turn = the current context occupancy (still correct after compaction,
# because the next line carries the reduced number). Zero AI, zero tokens.
#
# Usage:
#   ./scripts/context.sh              # human report (bar, %, recommendation)
#   ./scripts/context.sh --hook       # quiet: prints ONLY at/above the warn threshold
#   ./scripts/context.sh <file.jsonl> # inspect a specific transcript
#
# Config (env):
#   CONTEXT_WINDOW  window size in tokens (default 1000000 = Opus 4.8 · 1M)
#   CONTEXT_WARN    warn threshold in %   (default 60)
#   CONTEXT_CRIT    critical threshold %  (default 80)
#   CONTEXT_PROJDIR transcript directory  (default: derived from the CWD project path)
set -euo pipefail

MODE="report"
ARG_FILE=""
for a in "$@"; do
  case "$a" in
    --hook) MODE="hook" ;;
    -*)     ;;                       # ignore unknown flags
    *)      ARG_FILE="$a" ;;
  esac
done

WINDOW="${CONTEXT_WINDOW:-1000000}"
WARN="${CONTEXT_WARN:-60}"
CRIT="${CONTEXT_CRIT:-80}"

# Project transcript directory: ~/.claude/projects/<cwd-with-dashes>
if [ -n "${CONTEXT_PROJDIR:-}" ]; then
  PROJDIR="$CONTEXT_PROJDIR"
else
  SLUG="$(pwd | sed 's#/#-#g')"
  PROJDIR="$HOME/.claude/projects/$SLUG"
fi

# Transcript file: argument > newest .jsonl in the project directory
if [ -n "$ARG_FILE" ]; then
  FILE="$ARG_FILE"
else
  FILE="$(ls -t "$PROJDIR"/*.jsonl 2>/dev/null | head -1 || true)"
fi

if [ -z "${FILE:-}" ] || [ ! -f "$FILE" ]; then
  [ "$MODE" = "hook" ] && exit 0
  echo "context: no session transcript found (in $PROJDIR)." >&2
  exit 0
fi

# Read the newest usage occupancy (python: robust JSON parsing, recursive usage lookup)
read -r CTX SESSION < <(FILE="$FILE" python3 - <<'PY'
import json, os

path = os.environ["FILE"]
session = os.path.splitext(os.path.basename(path))[0][:8]
last = 0

def find_usage(o):
    # recursively find the first dict carrying token counts
    if isinstance(o, dict):
        if "cache_read_input_tokens" in o or ("input_tokens" in o and "output_tokens" in o):
            it = o.get("input_tokens", 0) or 0
            cc = o.get("cache_creation_input_tokens", 0) or 0
            cr = o.get("cache_read_input_tokens", 0) or 0
            tot = it + cc + cr
            if tot > 0:
                return tot
        for v in o.values():
            r = find_usage(v)
            if r:
                return r
    elif isinstance(o, list):
        for v in o:
            r = find_usage(v)
            if r:
                return r
    return 0

with open(path, "r", encoding="utf-8", errors="ignore") as f:
    for line in f:
        line = line.strip()
        if not line or '"usage"' not in line:
            continue
        try:
            obj = json.loads(line)
        except Exception:
            continue
        tot = find_usage(obj)
        if tot:
            last = tot   # LAST one wins = most recent turn

print(last, session)
PY
)

CTX="${CTX:-0}"
SESSION="${SESSION:-?}"

if [ "$CTX" -le 0 ]; then
  [ "$MODE" = "hook" ] && exit 0
  echo "context: no usage data in the transcript yet." >&2
  exit 0
fi

PCT=$(( CTX * 100 / WINDOW ))

if [ "$PCT" -ge "$CRIT" ]; then
  LEVEL="crit"
elif [ "$PCT" -ge "$WARN" ]; then
  LEVEL="warn"
else
  LEVEL="ok"
fi

# Thousands separators (portable via awk, BSD/GNU)
fmt() { echo "$1" | awk '{n=$1;s="";while(length(n)>3){s=","substr(n,length(n)-2) s;n=substr(n,1,length(n)-3)}printf "%s%s\n",n,s}'; }

# Bar, built robustly (0..10 segments, no seq/printf overflow)
mkbar() { # $1=filled $2=empty
  local i out=""
  for ((i=0;i<$1;i++)); do out="${out}▓"; done
  for ((i=0;i<$2;i++)); do out="${out}░"; done
  printf "%s" "$out"
}

# --- hook mode: quiet unless it's serious ---
if [ "$MODE" = "hook" ]; then
  if [ "$LEVEL" = "warn" ]; then
    echo "⚠️  Context at ${PCT}% ($(fmt "$CTX")/$(fmt "$WINDOW") tokens). Consider finishing the current thought, then starting a fresh session (/session-stop → new)."
  elif [ "$LEVEL" = "crit" ]; then
    echo "🔴 Context at ${PCT}% ($(fmt "$CTX")/$(fmt "$WINDOW") tokens) — at the limit. Save now (/session-stop) and continue in a fresh session; the model works more precisely with fresh context."
  fi
  exit 0
fi

# --- human report ---
FILLED=$(( PCT / 10 )); [ "$FILLED" -gt 10 ] && FILLED=10; [ "$FILLED" -lt 0 ] && FILLED=0
EMPTY=$(( 10 - FILLED ))
BAR="$(mkbar "$FILLED" "$EMPTY")"

case "$LEVEL" in
  ok)   ICON="🟢"; MSG="fresh — keep working, plenty of room.";;
  warn) ICON="🟡"; MSG="over ${WARN}% — good moment to finish the current thought, then start fresh (/session-stop → new session).";;
  crit) ICON="🔴"; MSG="over ${CRIT}% — at the limit. Save now & start fresh; fresh context = more precise model.";;
esac

echo "📊  CONTEXT FILL · session ${SESSION}"
echo "────────────────────────────────────────────"
printf "  Context tokens : %s\n" "$(fmt "$CTX")"
printf "  Window         : %s\n" "$(fmt "$WINDOW")"
printf "  Usage          : %s %s%%\n" "$BAR" "$PCT"
printf "  Status         : %s %s\n" "$ICON" "$MSG"
echo "────────────────────────────────────────────"
echo "  Thresholds: 🟡 ${WARN}%  ·  🔴 ${CRIT}%   (override: CONTEXT_WARN/CONTEXT_CRIT/CONTEXT_WINDOW)"
