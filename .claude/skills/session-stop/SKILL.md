---
name: session-stop
description: 'Close a work session — save the repo memory, pass the hard gate, and commit & push everything so nothing is forgotten and nothing is left half-done. Counterpart to session-start. Trigger: "session-stop", "session-end", "wrap up", "end session", "done for today", "close the session", "sauber abschließen", end of a work session.'
---

# session-stop

Nothing forgotten, nothing half-done. Deterministic checks gate the close.

## Steps

1. **Rescue the chat (mandatory).** Any idea, decision, or owner instruction that lives *only in
   this conversation* is lost unless written down now. Capture it into `HANDOFF.md` / `BIBLE.md`.
   If claude-mem is available, query it for this session's `decision` and `discovery` observations
   and use them as *candidates* — then decide per item: BIBLE entry, HANDOFF entry, or nothing.
   Write the judgment, never copy an observation verbatim. Without claude-mem, work from the
   conversation directly.
2. **Record durable decisions** in `BIBLE.md`'s decision register (date · decision · why).
3. **Write the HANDOFF entry:** run `./scripts/session-snapshot.sh <today's-date>` and fill in
   Done / Decided / Open / Next / Continuity warnings at the top of `HANDOFF.md` (newest first).
4. **Pass the gate:** `./scripts/gate.sh` must print `GATE: PASS`. Fix reds; never commit over a
   red gate.
5. **Update `CHANGELOG.md`** under `[Unreleased]` if user-facing behaviour changed.
6. **Commit granularly** — Conventional Commits, one concern per commit. No sweep commit.
7. **Push**, then run `./scripts/secure.sh` — it must print `SECURE: all saved`.

Report the final gate + secure status in one line.
