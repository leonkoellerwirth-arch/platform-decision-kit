#!/usr/bin/env bash
# Token + LOC ratchet — zero AI. Keeps the always-loaded agent context lean and source growth
# honest, so a repo stays cheap to reason about. CONSTITUTION §4: budgets are RATCHETS — raise a
# ceiling only in a dedicated commit, never to silence a regression.
#
# Usage: scripts/budget.sh            check the current footprint against .budget (read-only)
#        scripts/budget.sh --update   re-baseline .budget to the current footprint (+5% headroom)
#
# Prints "BUDGET: PASS" (exit 0) or "BUDGET: FAIL" (exit 1). Permissive until a .budget exists.
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR" || exit 1

# Context docs an agent loads every session — the AI-token footprint we keep lean.
DOC_FILES=(CLAUDE.md AGENTS.md BIBLE.md HANDOFF.md CONSTITUTION.md README.md)
doc_chars=0
for f in "${DOC_FILES[@]}" docs/*.md; do
  [ -f "$f" ] || continue
  c=$(wc -c < "$f" 2>/dev/null | tr -d ' ')
  doc_chars=$((doc_chars + c))
done
DOC_TOKENS=$((doc_chars / 4))   # ~4 chars per token — the standard rough estimate

# Source LOC — python src/ or web app/src (whichever the repo has).
SRC_LOC=0
if [ -d src ]; then
  SRC_LOC=$(find src -name '*.py' -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
elif [ -d app/src ]; then
  SRC_LOC=$(find app/src \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \) -exec cat {} + 2>/dev/null | wc -l | tr -d ' ')
fi

echo "== budget =="
printf "  context docs : ~%s tokens (%s chars over always-loaded docs)\n" "$DOC_TOKENS" "$doc_chars"
printf "  source LOC   : %s\n" "$SRC_LOC"

if [ "${1:-}" = "--update" ]; then
  dmax=$(( (DOC_TOKENS * 105 + 99) / 100 ))   # +5%, rounded up, so routine edits don't flap
  smax=$(( (SRC_LOC   * 105 + 99) / 100 ))
  cat > .budget <<EOF
# Budget ceilings — the ratchet (CONSTITUTION §4). Raise ONLY in a dedicated commit, never to
# silence a regression. Re-baseline deliberately with: scripts/budget.sh --update
DOC_TOKENS_MAX=$dmax
SRC_LOC_MAX=$smax
EOF
  echo "  → wrote .budget (DOC_TOKENS_MAX=$dmax, SRC_LOC_MAX=$smax)"
  echo "BUDGET: PASS"; exit 0
fi

if [ ! -f .budget ]; then
  echo "  · no .budget baseline yet — permissive. Set one with: scripts/budget.sh --update"
  echo "BUDGET: PASS"; exit 0
fi

# shellcheck disable=SC1091
. ./.budget
fail=0
if [ "$DOC_TOKENS" -gt "${DOC_TOKENS_MAX:-0}" ]; then
  echo "  ✗ context docs ~$DOC_TOKENS tokens > ceiling $DOC_TOKENS_MAX — trim, or raise deliberately"
  fail=1
else
  echo "  ✓ context docs within ceiling ($DOC_TOKENS ≤ ${DOC_TOKENS_MAX:-0})"
fi
if [ "$SRC_LOC" -gt "${SRC_LOC_MAX:-0}" ]; then
  echo "  ✗ source LOC $SRC_LOC > ceiling $SRC_LOC_MAX — split, or raise deliberately"
  fail=1
else
  echo "  ✓ source LOC within ceiling ($SRC_LOC ≤ ${SRC_LOC_MAX:-0})"
fi
echo
if [ "$fail" -eq 0 ]; then echo "BUDGET: PASS"; else echo "BUDGET: FAIL"; exit 1; fi
