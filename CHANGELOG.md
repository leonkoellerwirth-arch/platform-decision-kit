# Changelog

All notable changes to platform-decision-kit. Keep-a-Changelog style.

## [Unreleased]

### Added
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
