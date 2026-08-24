# CLAUDE.md — platform-decision-kit

Read this before doing any work in this repo. It is the local anchor; the binding foundation is
`dev/base/CONSTITUTION.md`, which takes precedence wherever this file disagrees with it.

**Read order at session start (highest precedence first):**
1. `dev/base/CONSTITUTION.md` — the paved-road constitution
2. `BIBLE.md` — this repo's invariants + decision register (wins on any in-repo conflict)
3. `HANDOFF.md` — newest session entry
4. this file

## What this repo is

A minimal, fully-local Python service on the paved road.

**Zone:** Product (see CONSTITUTION §1). Reference pattern, not a framework — never overclaim it.

## Session protocol

- **Start every session with `/session-start`.** It runs `scripts/state.sh`, reads `HANDOFF.md`
  + `BIBLE.md`, and reconstructs the exact state before anything changes.
- **Do not start substantive work while a blocking `BIBLE` decision is open or the gate is red.**
- **End every session with `/session-stop`.** Gate passes → `HANDOFF.md` updated → `BIBLE.md`
  decisions recorded → granular commits → push → `scripts/secure.sh` green.

## The gate is law

`./scripts/gate.sh` must print **GATE: PASS** before any change is called done (lint, format,
tests offline, no TODO/secrets/customer-names, build where present). CI mirrors it exactly.

## Non-negotiables (CONSTITUTION §7)

1. No scraping, no unofficial endpoints — not in code, comments, roadmap, or tests.
2. No customer-internal names; all examples fictive.
3. Secrets only via `.env` (git-ignored); `.env.example` is the contract.
4. Everything documented must run; CI green before done.
5. Run `/security-review` before merging anything touching `api/`, auth, AI-provider calls,
   upload flows, content proxies, or HTML rendering.

## House rules

- Conventional Commits (`feat: fix: docs: test: chore: ci:`), one concern per commit.
- Flag TypeScript `any` instead of silently accepting it.
- Default to inline work; subagents are the exception (CONSTITUTION §9).
- Any chat-only idea/decision is saved to `HANDOFF.md` before stop — or it's lost.

## Skills

`/session-start` · `/session-stop` · `/project-state`
