# AGENTS.md — platform-decision-kit (Codex / OpenAI agents)

The binding foundation is `dev/base/CONSTITUTION.md`. This file is the Codex-facing operating
contract; it agrees with `CLAUDE.md` and never contradicts the constitution.

## Boot sequence (do this before editing anything)

1. Read `dev/base/CONSTITUTION.md`, then this repo's `BIBLE.md`, then `HANDOFF.md` (newest entry).
2. Inspect the current repo structure.
3. Detect, don't assume: package manager · framework · routing model · styling system ·
   lint/test/build commands.
4. Produce a concise implementation plan before editing files.
5. Preserve existing architecture unless there is a clear, stated reason to change it.

## Gates — don't rely on memory, run them

- Python repo: `./scripts/gate.sh` must print `GATE: PASS`.
- Web repo: `npm run verify:ci` (typecheck · lint · budget ratchets · tests · build).
- Budget lints (`lint:tokens`, `lint:loc`) are **ratchets** with committed baselines — fix
  violations and update the baseline in their own commit; never raise a budget to silence a
  regression.

## If docs and code disagree

Trust the code, update the docs, and note the contradiction in your final summary.

## Evidence protocol (any substantive finding)

Claim → Evidence (file, exact line, short verbatim quote, link) → Interpretation → Counter-check
→ scoped action item. Missing facts are marked as an open decision, never improvised.

## Definition of done

A change is complete only when: it aligns with `CONSTITUTION.md` + `BIBLE.md`; lint/build/type
checks are run where available and green; the gate passes; changed files are summarized; and
remaining risks or assumptions are stated.

## Commits

Conventional Commits, one concern per commit, documenting what and why. Breaking changes go in
`CHANGELOG.md`.
