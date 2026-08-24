---
name: project-state
description: 'Overall project state — git status, commits ahead/behind, source/test counts, lint/gate result, and the newest handoff. Trigger: "project-state", "where do we stand", "status", "how far along are we", "wo stehen wir".'
---

# project-state

Deterministic status. Zero AI does the measuring; you add a two-line human read on top.

## Steps

1. Run `./scripts/state.sh` and, if a quick health read is wanted, `./scripts/gate.sh`.
2. Summarize in ≤3 lines: branch/dirty/ahead-behind, gate colour, and the newest HANDOFF *Next*.

Do not re-derive anything the scripts already print. Surface the numbers plus what they mean.
