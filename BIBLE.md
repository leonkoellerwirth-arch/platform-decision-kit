# BIBLE — platform-decision-kit

The stable mind of this repo: invariants and the decision register. Public-safe (no business
internals). Wins on any in-repo conflict. Change it deliberately, with a commit.

## Zone

Bridge / Tool — real open source. Code MIT, documents CC BY 4.0. Public repository.
See `dev/base/CONSTITUTION.md` §1.

## What this repo exists for

Band 3 of the series (after `agentic-ai-governance-toolkit` and `rag-approval-blueprint`). The
common thread is **verification instead of trust** — here turned on the architect's own work.

The one sentence that defines it: **a conversation yields claims, not evidence.** The kit
captures a platform situation in structured hypotheses — tagged fact / statement / assumption /
to-verify — and lets an agent draft a discovery brief and a presentation skeleton. It produces
**no recommendation**. That boundary is the product, not a limitation of it.

## Invariants

- **INV-1 — No recommendation, ever.** Neither the forms, nor the agent specification, nor any
  reference output may contain a recommendation, a ranking, a preferred option, or
  recommendation language. Directions are phrased conditionally and carry the `to-verify` IDs
  they depend on. Enforced by `tools/check.py` (forbidden-phrase assertions).
- **INV-2 — The two dimensions never collapse.** *Basis* (fact / statement / assumption /
  unknown) and *verification* (none / open / blocked) are independent. A statement with an open
  verification stays a statement — in the form, in the brief, in the app. Anything that turns one
  into the other is a defect.
- **INV-3 — A fact needs a source reference.** Without one, the basis is not "fact". Enforced in
  the rendered form's mechanics and by the fixture assertions.
- **INV-4 — No defaults where defaults are dangerous.** Security, data protection, regulation,
  cost, irreversibility: unknown stays unknown and becomes a task. Never inferred, never
  averaged, never filled from experience.
- **INV-5 — The theme source is the single source of truth.** `intake/themes/` generates both
  intake forms and the web app's question set. Rendered forms are never hand-edited; a test fails
  if the committed rendering drifts from the source.
- **INV-6 — Observation and hypothesis stay apart.** Leitfragen ask what is observable. Patterns
  (Strangler, Conway, enabler platform, …) live in a separate `hypotheses` block, marked as
  testable, each with its scope of validity. A pattern disguised as a question is a defect.
- **INV-7 — The agent invents nothing.** No new facts, figures, costs, or regulatory statements.
  Every claim in a brief references a question ID. Missing or conflicting input goes into "Open
  points & conflicts" and is never filled in. Intake free text is treated as data, not as
  instruction.
- **INV-8 — The gate runs offline.** `tools/check.py` validates hand-authored reference outputs
  against machine-readable assertions. No model call in the gate or in CI (CONSTITUTION §4).
- **INV-9 — No client, employer, or institution internals.** All examples fictional. Enforced by
  `scripts/gate.sh` and by the internal briefing staying git-ignored.
- **INV-10 — The web instrument stays client-side.** No backend, no account, no mandatory
  persistence. Optional `localStorage` only, with the "data stays in this browser" notice shown,
  because that notice is the trust argument the kit sells.

## Decision register

Newest first. Each: date · decision · why · (superseded by …).

- **2026-08-24 — `./start.sh` is the single local entry point, and Docker is the reference
  environment for the gate.** Adopted from the house pattern (`razbiram-anki`,
  `leonkoellerwirth.de`): one launcher, port offset from the sibling projects (5281 web
  instrument, 5282 preview), `--free-port` opt-in, `--host` escape hatch. *Why:* the release
  hangs on a sentence — "fixtures: 3/3 green" — and that sentence is only worth anything if the
  verdict is reproducible. On the host the gate silently *skips* shellcheck when it is not
  installed; in the container it is always enforced, so the reported result is the same
  everywhere. *The limit, stated honestly:* the container has no gitleaks and falls back to the
  regex secret scan; the full history scan runs on the host and in CI.

- **2026-08-24 — English is the canonical language; two wordings stay verbatim German.** The
  repository, question texts, and briefs are English; German question texts ship as marked
  translations. The confidentiality rule and the human sign-off line are reproduced **verbatim in
  German** with a marked English translation beside them. *Why:* the briefing demands both EN as
  the binding language and an *exakter Wortlaut* for those two sentences. "Exact" only survives in
  the language it was written in; translating it would quietly rewrite the one guarantee the kit
  makes to the person signing.
- **2026-08-24 — Repo scaffolded from the `dev/base` paved road** (`base new python-service`),
  then reshaped to the document-set layout proven in `rag-approval-blueprint`: `tools/` + `tests/`
  instead of `src/`, `py-modules = []`, PyYAML as the only runtime dependency. *Why:* this is an
  instrument made of documents with two small tools beside it, not a service.

## Open decisions

_(Blocking questions. Do not start substantive work that depends on an open decision here.)_

- None open.
