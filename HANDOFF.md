# HANDOFF — platform-decision-kit

Session handoffs, **newest entry first**. Written by `/session-stop` (via
`scripts/session-snapshot.sh`). Read the top entry at `/session-start`.

## 2026-08-24 — Session 3 (one source · discovery · the deck)

_HEAD 455aec9 · gate PASS · fixtures: 3/3 green · 27 tests_

- **Done — the three open app items:**
  1. `app/src/themes.ts` is now a loader over `intake/themes.json`, not a second copy.
     Verified: the bundle carries the question text and no `fetch(`.
  2. Discovery mode is real — all 55 questions, plus Entscheidungskopf, mini data inventory,
     stop conditions, and hypotheses (English, explicitly marked).
  3. Presentation view: the seven-slide skeleton (Output B) projected verbatim from the form,
     with a print stylesheet for PDF. Layout vocabulary after Presenton (Apache-2.0); its
     runtime (backend + LLM) deliberately stays out, per INV-10.
- **Source change:** `red_flags` and `stop_conditions` are bilingual now. Deviates from
  ARCHITECTURE-SPEC §3.2 on purpose; recorded in BIBLE.
- **Still open:**
  1. **Step 11 — tag v0.1.0 + GitHub release.** Outward-facing, needs an explicit go.
     Briefing deadline: 2026-08-25 evening.
  2. The deck is a *skeleton*, by design: structure and evidence, no narration. If a fully
     designed deck is wanted, that is a separate decision — and the honest place for it is
     after v0.1.0.
  3. `app/` has no test suite; `verify:ci` is typecheck + build only. The Python side carries
     the 27 tests.
- **Next:** decide the release.
- **Continuity warnings:** `./start.sh --app --host` for the web instrument. The dev server
  needs `server.fs.allow: ['..']` because the question set lives outside the app root.

## 2026-08-24 — Session 2 (the instrument itself)

_HEAD faab537 · gate PASS · fixtures: 3/3 green · 27 tests_

- **Done:** Spec steps 2–10. `intake/themes/` (10 themes, 55 questions, bilingual),
  `tools/render_intake.py` (+ drift check), `tools/check.py` (offline), three fixtures with
  hand-authored reference briefs and assertions, `pipeline/presentation-agent.md`, README with
  the confidentiality wording verbatim, ADR 0001, 27 tests, five repo-specific gate checks.
- **Recovered:** `ARCHITECTURE-SPEC.md` (1868 lines) existed only in a dead session's scratchpad.
  It is now in the repo root and git-ignored (internal blueprint, not a public artifact).
- **Open — carried over, not yet started:**
  1. **Presenton.** The last request of session 1 never reached the agent (terminal closed while
     it sat in the queue): no Markdown as the final output, a finished presentation inside the
     app instead, using https://github.com/presenton/presenton for the deck design.
  2. **App reads `themes.ts`, not `intake/themes.json`.** ARCHITECTURE-SPEC §11.2 wants the app
     fed from the generated JSON. Today the two are consistent by hand, which is exactly the
     drift INV-5 exists to prevent — wire it before v0.1.0.
  3. Discovery mode in the app (triage mode only so far).
  4. Step 11: tag v0.1.0 + GitHub release. Not done — outward-facing, needs a go.
- **Next:** decide 1 and 2 above, then release.
- **Continuity warnings:** run `./start.sh --app --host` for the web instrument; Docker path is
  the reference gate.

## 2026-08-24 — Session 0 (scaffold)

_HEAD — · commits-ahead — · gate PASS · secure: pending first push_

- **Done:** Repo scaffolded from `base` (python-service template).
- **Decided:** Adopt the paved road — backbone gate, session skills, canonical agent config.
- **Open:** Fill in the first real feature scope in `BIBLE.md`.
- **Next:** `./setup.sh` (or `npm ci`), run `./scripts/gate.sh`, first commit + push.
- **Continuity warnings:** none yet.
