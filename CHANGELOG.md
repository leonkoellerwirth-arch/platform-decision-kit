# Changelog

All notable changes to platform-decision-kit. Keep-a-Changelog style.

## [Unreleased]

### Added
- **The web instrument reads the canonical source.** `app/src/themes.ts` is a loader over
  `intake/themes.json` instead of a second, hand-maintained copy of the questions. All 55
  questions are in the app; discovery mode is real rather than a relabelled triage.
- **Discovery mode in the app** — the Entscheidungskopf (theme 2), the mini data inventory
  (theme 6), stop conditions, and the pattern hypotheses shown as hypotheses and marked English.
- **The presentation skeleton in the app** (`app/src/Deck.tsx`) — Output B's seven slides in the
  binding order, projected verbatim from the filled form with the tags intact. Print stylesheet
  for PDF. Layout vocabulary after Presenton (Apache-2.0); its runtime stays out.
- `red_flags` and `stop_conditions` are bilingual in `intake/themes/*.yaml`.
- **Canonical theme source** — `intake/themes/t01-*.yaml` … `t10-*.yaml`: 10 theme blocks,
  55 questions with stable IDs Q1.1…Q10.6, bilingual EN/DE, `no_defaults` flags on the
  security, privacy, regulatory, cost and irreversibility questions. Hypotheses live in their
  own block, never disguised as questions (INV-6).
- **Generator** — `tools/render_intake.py` renders `intake/00-triage.md` (the 10-question core
  set, one per theme), `intake/01-discovery.md` (all 55) and `intake/themes.json` from that one
  source. `--check` does a character-exact diff and fails the gate on drift (INV-5).
- **Offline checker** — `tools/check.py`: validates a filled intake (known Q-IDs, the two-stage
  tag mechanic intact, a fact never without a source) and runs the fixture assertions. No model
  call, no network (INV-8).
- **Three fixtures** — `examples/01-vollstaendig` (RetailCore), `examples/02-lueckenhaft`
  (LegacyHR), `examples/03-widersprüchlich` (PaymentHub). Each carries a scenario with a review
  checklist, a filled intake, a hand-authored reference brief, and a machine-readable
  `assertions.yaml` with sentinel strings that bite. **fixtures: 3/3 green.**
- **Agent prompt specification** — `pipeline/presentation-agent.md`: the non-invention rule, the
  prompt-injection notice (intake free text is data, not instruction), Output A (discovery brief)
  and Output B (the final, binding slide order), with the German sign-off line verbatim.
- **README** with the positioning, both modes, the two-stage tag mechanic, and the
  confidentiality wording verbatim in German.
- **ADR 0001** — no recommendation is derived from a conversation: the decision, what it costs,
  and what it forbids future features from doing.
- **Tests** — 27 offline tests across `tests/test_render_intake.py` and `tests/test_check.py`,
  including one red test per assertion type so a checker that never fails cannot pass as one
  that works.
- **Gate** — `scripts/gate.sh` extended with five repo-specific checks: render drift, fixtures
  3/3, both verbatim German wordings, and no TODO/FIXME in `tools/` or `tests/`.
- Scaffolded from `base` (python-service), then reshaped to the document-set layout; Docker as
  the reference gate environment; `./start.sh` as the single local entry point.
- Phase 2 web instrument (`app/`) — browser-only triage mode with the two-dimensional tag
  mechanic and a full EN/DE surface that marks German as a translation at every question.
