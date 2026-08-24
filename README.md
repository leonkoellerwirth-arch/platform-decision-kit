# platform-decision-kit

A minimal, fully-local Python service on the paved road.

Built by Leon Köllerwirth Hlihel — AI governance & agentic engineering in regulated environments.

## Quickstart

```bash
./setup.sh              # .venv + install + offline tests
source .venv/bin/activate
platform-decision-kit hello --name Leon
./scripts/gate.sh       # GATE: PASS
```

## Working here

This repo is on the `dev/base` paved road. Start every session with `/session-start`, end with
`/session-stop`. The binding rules live in `dev/base/CONSTITUTION.md`; this repo's invariants and
decisions live in `BIBLE.md`; session handoffs in `HANDOFF.md`.

## Layout

```
src/platform_decision_kit/   package (import name)
tests/                  offline tests — heavy deps faked in conftest.py, real-model tests @slow
scripts/                deterministic backbone: gate · secure · state · session-snapshot
.claude/                session skills + edit-time hooks
```
