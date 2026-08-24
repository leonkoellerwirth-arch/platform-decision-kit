#!/usr/bin/env bash
# Emit a HANDOFF.md entry skeleton for the current session. No AI.
# Usage: scripts/session-snapshot.sh [YYYY-MM-DD]   (date is passed in; scripts can't read the clock reliably)
set -uo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR" || exit 1

DATE="${1:-$(date +%F 2>/dev/null || echo UNDATED)}"
head=$(git rev-parse --short HEAD 2>/dev/null || echo "?")
ahead=$(git rev-list --count "@{u}..HEAD" 2>/dev/null || echo "?")
gate=$(scripts/gate.sh >/dev/null 2>&1 && echo PASS || echo FAIL)
secure=$(scripts/secure.sh >/dev/null 2>&1 && echo "all saved" || echo "action needed")

cat <<EOF
## $DATE — Session

_HEAD $head · commits-ahead $ahead · gate $gate · secure: ${secure}_

- **Done:** _(fill in)_
- **Decided:** _(fill in — also record durable decisions in BIBLE.md)_
- **Open:** _(blocking questions / open decisions)_
- **Next:** _(the first thing next session should do)_
- **Continuity warnings:** _(anything that will drift if forgotten)_

-- recent commits --
$(git log -15 --format='- %h %s' 2>/dev/null || echo '- (no history)')
EOF
