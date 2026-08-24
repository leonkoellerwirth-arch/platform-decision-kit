# BIBLE — platform-decision-kit

The stable mind of this repo: invariants and the decision register. Public-safe (no business
internals). Wins on any in-repo conflict. Change it deliberately, with a commit.

## Zone

Product — (Engine = source-available/protected · Bridge = MIT open source · Product = private).
See `dev/base/CONSTITUTION.md` §1.

## Invariants

_(The rules that must never quietly break. Each one is testable by `scripts/gate.sh` where
possible. Example: "All AI-provider calls route through the feature gate; never seed 'live'.")_

- INV-1: …
- INV-2: …

## Decision register

Newest first. Each: date · decision · why · (superseded by …).

- **2026-08-24 — Repo created from `base` template.** Established the paved-road baseline
  (backbone scripts, session skills, CI, canonical CLAUDE.md/AGENTS.md).

## Open decisions

_(Blocking questions. Do not start substantive work that depends on an open decision here.)_

- …
