# Platform Decision Kit

**A system architect's triage & discovery instrument for brownfield platforms in the agentic era.**

A conversation yields claims, not evidence. This kit captures a platform situation in structured
hypotheses — tagged fact / statement / assumption / to-verify — and lets an agent draft a
**discovery brief** and a **presentation skeleton**. No recommendation without evidence gates.
Built for brownfield: old master data, many consumers, regulators in the room.

Band 3 of a series, after `agentic-ai-governance-toolkit` and `rag-approval-blueprint`. The
common thread is **verification instead of trust** — here turned on the architect's own work.

## What it does not do

It produces no recommendation. Recommendations come **after** the points marked `to-verify` have
been verified. What the kit does is make visible *what* must be verified. That is its job, and
that boundary is the product — not a limitation of it.

## Two modes

| | TRIAGE | DISCOVERY |
|---|---|---|
| Time | 20 minutes | 90+ minutes |
| Partners | one | several roles, or follow-up conversations |
| Questions | 10 core questions, one per theme block | the full set (55) |
| Output | situation picture · open points · red flags | discovery brief with an option **space** |
| Recommendation right | none | none |

Both forms are generated from the same canonical source, so they cannot drift apart:
`intake/themes/t01-*.yaml` … `t10-*.yaml` → `intake/00-triage.md`, `intake/01-discovery.md`,
`intake/themes.json`.

## The two-stage tag mechanic

Every answer carries two independent dimensions, and they never collapse into one:

- **Basis** — fact · statement · assumption · unknown. A *fact* requires a source reference.
- **Verification** — none · open · blocked. "Open" puts the item into the To-Verify register.

A statement with an open verification stays a statement. It does not become a fact by being
processed, summarised, or presented. That is the single rule the rest of the instrument protects.

## Confidentiality

Kunden-Rohdaten dürfen nur nach dokumentierter menschlicher Freigabe in einen Agenten eingegeben werden. Standard ist manuell-first — die Struktur IST das Werkzeug.

*(EN translation — the German wording above is binding): "Customer raw data may only be fed to an
agent after documented human sign-off. The default is manual-first — the structure IS the tool."*

## Quickstart

```bash
./setup.sh                                   # .venv + install + offline tests
python tools/render_intake.py all            # regenerate the forms from the theme source
python tools/check.py fixtures               # fixtures: 3/3 green
./scripts/gate.sh                            # GATE: PASS
```

Then fill `intake/00-triage.md` (or `01-discovery.md`) by hand during the conversation, and hand
the filled file to an agent configured per `pipeline/presentation-agent.md`.

The web instrument (same question set, browser-only, nothing leaves the machine):

```bash
./start.sh app                               # http://localhost:5281
```

## Layout

```
intake/themes/          canonical theme source — 10 YAML files, stable question IDs Q1.1…Q10.6
intake/00-triage.md     generated: the 10-question triage form
intake/01-discovery.md  generated: the full discovery form
intake/themes.json      generated: structured export for the web instrument
tools/render_intake.py  generator; --check fails the gate on drift
tools/check.py          offline verification of filled intakes and reference briefs
examples/               three fixtures: complete · gappy · contradictory, with assertions
pipeline/               the agent prompt specification (no model runs in this repo)
app/                    the browser-only web instrument (Vite · React · TypeScript)
failure-modes.md        the classical and the agentic death modes this kit is built against
```

## Known limitations

- The kit structures a conversation. It does not verify anything for you — it records what is
  unverified and refuses to let that be forgotten.
- `tools/check.py` validates hand-authored reference outputs against machine-readable assertions.
  It does not evaluate a live agent's output; that remains a human review step.
- English is the binding language. The German texts in the web instrument are translations,
  fully usable but not the authoritative version. Question IDs are language-neutral.
- All examples are fictional. Nothing in this repository describes a real client, employer, or
  institution.

## Licence

Code MIT (`LICENSE`). Documents CC BY 4.0 (`LICENSE-docs`).

Built by Leon Köllerwirth Hlihel — AI governance & agentic engineering in regulated environments.
