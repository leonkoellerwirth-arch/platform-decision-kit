# Demo case: Demo-Firma

A worked example of a full Discovery pass, so you can see what the instrument produces before you
run one yourself.

Demo-Firma does not exist. The regulatory frame around it does: EnWG, MsbG, GDPR, the KRITIS
audit under §8a BSIG, and the IT security catalogue under §11 (1a) EnWG with its ISO 27001
obligation. The consumer list, the market communication over EDIFACT/AS4 and the redispatch
reporting are shaped the way such a landscape is shaped. Figures, document names and internal
deadlines are set to be plausible, not researched. Nothing here describes a real client, employer
or institution.

## The situation

Demo-Firma is a regional energy utility: a distribution grid operator with an attached retail
arm, around 450,000 metering points. Its meter and market data platform (ZMP) has been in
production since 2011 on an Oracle database behind a Java monolith, with eleven consuming systems
attached. It feeds billing, market communication, redispatch reporting and grid accounting.

Two things brought it up for review at the same time. Maintenance for the installed version ends
on 31 December 2027, and the first KRITIS audit under §8a BSIG is announced for Q4 2026.

The decision question is a yes or no: replace the data layer by Q2 2027, or pay to extend
maintenance once more.

## What the pass produced

All 58 Discovery questions answered, and that is the point of the example: even with nothing left
blank, the instrument arrives at no recommendation.

- **39 open points** in the to-verify register, six of them blocked
- **four recorded unknowns** rather than guesses: automated test coverage, who may accept a
  breaking interface change, the way back, and what a failed migration costs in data integrity
- **five assumptions** carried on the first slide with their question IDs, including the cost of
  inaction, which nobody had quantified

Slide 3 lists three options. "Carry on as before" comes first, because the status quo is an
option and its price is the price of inaction. The third is "defer the decision and run
Discovery", with the 39 question IDs it would close. No option is scored, ranked or preferred.

## The files

| File | What it is |
|---|---|
| `intake-filled.de.md` | the filled intake, exported from the web instrument |
| `intake-filled.en.md` | the same answers under the English question set |
| `deck.pdf` | the seven-slide deck, printed from the app, one page per slide |

The conversation was held in German, so the answers are German in both exports. Only the question
text switches language, which is what the bilingual design does: questions are translated,
answers never are, and question IDs are language-neutral in both files.

A clickable version of this case, the whole instrument in a single HTML file with the answers
already in it, is attached to the [v0.1.0 release](../../../releases/tag/v0.1.0). Download it and
open it by double-click. It runs offline, makes no network call, and writes only to its own
browser storage.

## Reading the tags

Every answer carries two independent dimensions. `Basis` is what kind of knowledge it is: fact,
statement, assumption, unknown. `Verifikation` is what work is still outstanding: none, open,
blocked.

They never collapse into one. Q4.3 in this case is a fact with a blocked verification: the
nightly reconciliation job between the platform and the billing system is real and documented,
and the developer who built it retired in 2024. Knowing something and being able to act on it are
different problems, and the register keeps them apart.

Q6.4 is the same shape from the other side. The retention rules are documented, and there is no
working erasure path: deletions are recorded as a blocking flag. A rule that exists on paper and
not in the system is a fact about the system, and the instrument records it as one.
