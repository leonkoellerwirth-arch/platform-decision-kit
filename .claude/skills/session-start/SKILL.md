---
name: session-start
description: 'Open a work session — reconstruct the exact project state from the deterministic scripts and repo memory (CONSTITUTION → BIBLE.md → HANDOFF.md) before changing anything, so work continues without drift. Counterpart to session-stop. Trigger: "session-start", "continue", "where were we", "new session", "catch me up", "weiter", start of a work session.'
---

# session-start

Reconstruct the exact state before touching anything. Facts first (deterministic), reasoning second.

## Steps

0. **Read the constitution chain (highest precedence first):** `dev/base/CONSTITUTION.md`, then this
   repo's `BIBLE.md` (invariants + open decisions), then the newest `HANDOFF.md` entry. If a
   family constitution / `ECOSYSTEM.md` is referenced, read it before the repo's own docs.
1. **Run the backbone (zero AI):**
   - `./scripts/state.sh` — branch, ahead/behind, source/test counts, last commits, newest HANDOFF.
   - `./scripts/gate.sh` — is the tree already green? (don't fix yet, just know.)
2. **Layer in the plugin context (if available).** The session hook may have injected a claude-mem
   block (timeline, observation IDs, token stats). Treat it as background. **If it contradicts
   `BIBLE.md`, `BIBLE.md` wins.** If an observation names a file, function or flag, verify it
   against the code before building on it.
3. **Report back, briefly:** where we are, what the newest HANDOFF says is *Next*, and whether any
   **blocking decision is open** in `BIBLE.md` or the **gate is red**.
4. **Do not start substantive work** while a blocking decision is open or the gate is red — resolve
   or surface that first.

Keep it to a few lines. The goal is "caught up and grounded", not a wall of output.
