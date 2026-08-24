# Platform Decision Kit

A triage and discovery instrument for platform decisions in existing systems: old master data,
many consumers, regulators in the room.

A conversation produces claims, not evidence. This kit records a platform situation as tagged
hypotheses (fact, statement, assumption, unknown) and turns the filled form into a discovery
brief and a seven-slide presentation. Both are projections of what was typed, not summaries of
it.

Band 3 of a series, after `agentic-ai-governance-toolkit` and `rag-approval-blueprint`. The
thread running through all three is verification instead of trust, applied here to the
architect's own work.

## What it does not do

It produces no recommendation. A recommendation belongs after the points marked `to-verify` have
been verified, and the kit's job is to make visible which points those are. That boundary is the
product rather than a gap in it.

## Two modes

| | Triage | Discovery |
|---|---|---|
| Time | 20 minutes | 90+ minutes |
| Partners | one | several roles, or follow-up conversations |
| Questions | 10 core questions, one per theme block | the full set of 55 |
| Output | situation picture, open points, red flags | discovery brief with an option space |
| Recommendation right | none | none |

Both forms are generated from one canonical source, so they cannot drift apart:
`intake/themes/t01-*.yaml` … `t10-*.yaml` produce `intake/00-triage.md`,
`intake/01-discovery.md` and `intake/themes.json`. The gate re-renders and diffs them.

## The two-axis tag mechanic

Every answer carries two independent dimensions, and they never collapse into one.

**Basis** is what kind of knowledge this is: fact, statement, assumption, unknown. A fact
requires a source reference. **Verification** is what work is still outstanding on it: none,
open, blocked. An open verification puts the item into the to-verify register.

A statement with an open verification stays a statement. It does not become a fact by being
written down, tagged, or projected onto a slide. That is the one rule the rest of the instrument
exists to protect.

## Confidentiality

Kunden-Rohdaten dürfen nur nach dokumentierter menschlicher Freigabe in einen Agenten eingegeben werden. Standard ist manuell-first — die Struktur IST das Werkzeug.

*(English translation; the German wording above is the binding one): "Customer raw data may only
be fed to an agent after documented human sign-off. The default is manual-first, and the
structure IS the tool."*

## Quickstart

```bash
git clone https://github.com/leonkoellerwirth-arch/platform-decision-kit.git
cd platform-decision-kit

./setup.sh                                   # .venv, install, offline tests
python tools/render_intake.py all            # regenerate the forms from the theme source
python tools/check.py fixtures               # fixtures: 3/3 green
./scripts/gate.sh                            # GATE: PASS
```

You can run the whole thing on paper. Fill `intake/00-triage.md` or `intake/01-discovery.md` by
hand during the conversation, then hand the filled file to an agent configured per
`pipeline/presentation-agent.md`. No model runs inside this repository.

## The web instrument

```bash
./start.sh --app --host                      # http://localhost:5281
```

The same question set in the browser, with three views.

**Intake** is the guided form. Each question takes a written answer, an optional source, and one
cell in a four by three grid: basis across, verification down. Clicking a cell sets both axes at
once. The unknown column is struck through except in the open row, because an unknown answer is
always open and the rule is drawn rather than silently enforced. Keyboard: 1 to 4 for the basis,
Q, W and E for the verification.

**Register** lists everything still to verify, in a size you can turn the screen around and show
to the client.

**Presentation** is a 16:9 slide, one at a time, arrow keys to move and F for full screen. The
seven slides are built from the intake verbatim, with the tags, in the order the specification
fixes. There is no model in the page. "Print / save as PDF" is the browser's own print dialogue
against the print stylesheet, one page per slide, no library and no upload.

Nothing leaves the machine. The claim is checkable: after `npm run build`, a grep over `app/dist`
for `fetch(`, `XMLHttpRequest`, `EventSource`, `WebSocket` and `sendBeacon` returns nothing. The
question set is inlined into the bundle at build time. Every build stamps its own version and
commit into the bar and the footer, so a screenshot says which build produced it.

Slide layout vocabulary follows [Presenton](https://github.com/presenton/presenton) (Apache-2.0):
bold display headings, rounded content cards, a footer pagination marker, soft corner accents.
No code, assets or font files are copied from it, and its runtime, a backend plus a model, stays
out, because the browser-only property is an invariant here.

## A worked example

[`demo/`](demo/) holds one full Discovery pass for an invented regional energy utility: the
filled intake in both question languages and the seven-slide deck as a PDF. The company does not
exist; the regulatory frame around it (EnWG, MsbG, the KRITIS audit under §8a BSIG) does. All 55
questions are answered, and the instrument still arrives at no recommendation, which is the point
of the example. A clickable version, the whole instrument in a single HTML file with the answers
already in it, is attached to the v0.1.0 release.

## Layout

```
intake/themes/          canonical theme source, 10 YAML files, stable question IDs Q1.1 … Q10.6
intake/00-triage.md     generated: the 10-question triage form
intake/01-discovery.md  generated: the full discovery form
intake/themes.json      generated: structured export for the web instrument
tools/render_intake.py  generator; --check fails the gate on drift
tools/check.py          offline verification of filled intakes and reference briefs
examples/               three fixtures (complete, gappy, contradictory) with assertions
pipeline/               the agent prompt specification
app/                    the browser-only web instrument (Vite, React, TypeScript, Tailwind v4)
app/src/EvidenceGrid.tsx  the basis by verification grid
app/src/Deck.tsx        the seven-slide presentation, rendered from the intake
demo/                   one worked Discovery pass, invented, with its deck as a PDF
failure-modes.md        the classical and agentic failure modes this kit is built against
scripts/gate.sh         the deterministic quality gate
```

## Known limitations

The kit structures a conversation. It verifies nothing for you. What it does is record what is
unverified and refuse to let that be forgotten.

`tools/check.py` validates hand-authored reference outputs against machine-readable assertions.
It does not evaluate a live agent's output, which stays a human review step.

English is the binding language. The German texts in the web instrument are translations, fully
usable but not authoritative. Question IDs are language-neutral.

The presentation is a skeleton by design: structure and evidence, no narration. Two of the seven
slides, the undecided directions and the open points, run onto a second sheet when the register
is long. They are allowed to, because a slide may cost an extra page but may not lose its tail.

All examples in this repository are fictional. Nothing here describes a real client, employer or
institution.

## Licence

Code MIT (`LICENSE`). Documents CC BY 4.0 (`LICENSE-docs`).

Built by Leon Köllerwirth Hlihel, AI governance and agentic engineering in regulated
environments.
