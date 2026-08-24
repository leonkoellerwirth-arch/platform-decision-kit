# Failure modes

> How platform decisions die. The classical ways, and the newer ways an agent adds.
>
> This file is part of the instrument, not commentary beside it. Two of the entries — *A decision
> out of one conversation* and *Defaults instead of unknowns* — describe the temptations of this
> kit itself. A triage instrument that never names its own failure mode is marketing.

Each entry: **what it looks like · why it happens · the early tell · what the kit does about it.**
The last line is the only one that matters in practice, and it always points at a concrete
mechanism — a question, a tag, a stop-condition, a rule in the agent specification. Where the kit
does *nothing* against a failure mode, that is said plainly.

---

## Part I — Classical death modes

### F-1 · The decision out of one conversation

**What it looks like.** Ninety minutes with one well-informed person, a page of notes, and a
direction. The notes are accurate. The direction is not supported, because one person's view of a
brownfield platform is a role's view of it — complete about their own interfaces, thin about
everyone else's, and silent about what they were never told.

**Why it happens.** The conversation *felt* like evidence. It had detail, numbers, history, and
someone confident. Confidence is the single most reliable false signal in discovery work: it
correlates with tenure, not with verifiability.

**The early tell.** You can write the recommendation but you cannot name the document you would
send to a sceptic.

**What the kit does.** This is the reason for the two modes. TRIAGE (20 minutes, one counterpart)
has **no right of recommendation** — it is allowed to produce a situation picture, open points,
and red flags, and nothing else. DISCOVERY is where a direction may be phrased at all, and even
then only conditionally on the open `to-verify` items. The agent specification forbids
recommendation language outright, and `tools/check.py` fails the build when it appears.

### F-2 · Defaults instead of unknowns

**What it looks like.** The form is complete. Retention is "probably 10 years, like everywhere
else". The RTO is "a day, realistically". Encryption is "at rest, standard". None of it was said
by anyone; all of it is plausible; all of it is now written down and will be quoted back.

**Why it happens.** An empty field looks like sloppy work and a filled field looks like
competence. Experience makes it worse, not better — the more platforms you have seen, the more
convincingly you can fill a gap you have no source for.

**The early tell.** You filled in a field you could not attribute to a person, a date, or a
document.

**What the kit does.** The basis tag has a fourth value, `unknown`, and it is a legitimate
answer, not a defect. Questions touching **security, data protection, regulation, cost, and
irreversibility** carry a `no_defaults` marker: there, unknown stays unknown, source and free text
are dropped, and verification is set to `open` automatically. An unknown does not weaken the
document — it is the document's main output.

### F-3 · The target architecture without a migration path

**What it looks like.** A clean target picture, endorsed by everyone, and no answer to "what runs
in month seven, when half the consumers are on the old master data and half on the new".

**Why it happens.** The target picture is the part that is fun to draw and easy to agree on,
because nobody has to give anything up in it.

**The early tell.** The presentation has a "to-be" slide and no slide showing both systems live at
once.

**What the kit does.** Block 8 (migration and reversibility) asks for the intermediate state
explicitly, and treats dual-write and cutover as their own questions rather than as an
implementation detail. The presentation skeleton has no slide for a target picture that is not
paired with a way back.

### F-4 · The irreversible step nobody marked

**What it looks like.** A cutover, a key rotation, a physical deletion, a contract termination, a
schema change consumers cannot read backwards. It is discovered to be irreversible at the moment
it fails.

**Why it happens.** Reversibility is a property of a step, but decisions are discussed at the
level of options. Nobody owns the sentence "from here we cannot go back".

**The early tell.** The rollback plan says "restore from backup" and nobody has restored from that
backup.

**What the kit does.** Block 8 requires irreversible steps to be **marked as such**, and treats
"there is no way back" as a valid, documentable answer rather than a problem to be argued away.
Block 10 asks for the restore *test*, not the backup. The brief's risk section is required to
carry the irreversible steps by question ID.

### F-5 · Consumers as an afterthought

**What it looks like.** The platform is redesigned around the domain model, and the forty systems
reading from it are treated as an integration task at the end. Two of them turn out to be the
reason the old field semantics exist.

**Why it happens.** The consumers are not in the room. Their owners are not in the room either;
often nobody can produce a full list of them at all.

**The early tell.** Someone answers "how many consumers" with a range.

**What the kit does.** Block 5 asks for consumers and interfaces as an *observation*: who reads,
through which channel, how often, who would notice within an hour if it stopped. Where the list is
incomplete, the incompleteness itself becomes a `to-verify` entry with a named source — not a
footnote.

### F-6 · The master data whose truth was assumed

**What it looks like.** The migration is planned against the schema and fails against the data:
duplicate keys, historical values that violate the current constraint, a field that has meant
three different things since 2011.

**Why it happens.** The schema is documented and the data is not. Reading the schema feels like
due diligence.

**The early tell.** Nobody can say when someone last counted the rows that violate the rule.

**What the kit does.** Block 4 asks about the stock and the knowledge about it separately — how
the data is known to be correct, who last looked, and what a check would cost. Block 6 adds the
mini data inventory (domain · classification · owner · retention · erasure path) as a table,
deliberately without a process apparatus around it.

### F-7 · Conway ignored

**What it looks like.** An architecture that requires two teams under different budgets in
different reporting lines to release together, weekly.

**Why it happens.** The organisational chart is treated as changeable and the architecture as
fixed. In practice it is the other way round for the duration of the project.

**The early tell.** The design's critical path crosses a budget boundary.

**What the kit does.** Block 9 asks for the team cut and the decision rights as observations.
Conway's law appears in the kit only in the `hypotheses` block — as a **testable hypothesis with a
scope of validity**, never as a question in disguise, because "isn't this really a Conway problem"
is a leading question and produces the answer it wants.

### F-8 · The platform as its own purpose

**What it looks like.** An enabler platform is built, is technically good, and has no first
consumer with a date. Eighteen months later it is a cost centre looking for a use case.

**Why it happens.** A platform is easier to fund than a product, because it promises everyone
something and owes nobody anything specific.

**The early tell.** The value case is a sum of savings across systems whose owners have not
committed to the migration.

**What the kit does.** Block 2 forces the decision head: the decision question, the decision
owner, what is in and out of scope, the deadline. The enabler-platform pattern lives in the
`hypotheses` block with the condition that makes it testable — a named first consumer with a date.

### F-9 · Regulation at the end

**What it looks like.** The architecture is agreed and then legal, the data protection officer, or
the works council raises something structural — a processing location, a retention duty, a
monitoring capability — and the design changes at the most expensive possible moment.

**Why it happens.** Regulation is treated as an approval to obtain rather than as a constraint to
discover, and the people who hold it are invited to review rather than to scope.

**The early tell.** The regulatory question on the list is "do we need approval?" rather than
"what does this constrain?".

**What the kit does.** Block 7 is a **scoping** block, not a checklist. On AI in particular it asks
one question — is AI in the object of the decision or only in the authoring process? — and records
that role and risk class are *open with legal*. It deliberately ships no AI Act checklist: a
checklist in a kit like this would be read as an assessment, and it would be wrong within a year.

### F-10 · Cost as one number

**What it looks like.** "About 1.2 million." It survives into the board slide and becomes the
thing the decision is measured against, without anyone able to say which parts are one-off, which
recur, and what the parallel operation of two systems costs while both are live.

**Why it happens.** A single number is comparable and a set of dimensions is not. Boards ask for
comparable.

**The early tell.** The cost figure has no unit of time attached.

**What the kit does.** The brief may only express cost as **dimensions** — one-off, running,
parallel operation, risk — and must write "not estimated" wherever the data is missing. Inventing
a number is a hard failure in `tools/check.py`; the fixtures carry sentinel figures that must not
appear in any output.

### F-11 · Operations discovered after go-live

**What it looks like.** The platform is live and nobody agreed an availability target, nobody
owns the incident path, the logs do not answer "who read this record", and the restore has never
been run.

**Why it happens.** Operations has no seat in a design decision; it inherits the result.

**The early tell.** Everyone can describe the architecture and no one can describe the on-call
rotation.

**What the kit does.** Block 10 exists for exactly this: SLO and availability, RTO/RPO **and the
restore test**, observability, incident and change, identity and permissions, encryption. Minimal
questions only — and a stop-condition when all of it is unknown, because at that point the
discovery is not incomplete, it has hit a wall that has to be reported rather than worked around.

---

## Part II — Agentic death modes

### F-12 · The agent fills the gap

**What it looks like.** A gappy intake goes in and a complete, fluent brief comes out. Nothing in
it is flagged as missing. The gaps were not filled with data; they were filled with plausibility.

**Why it happens.** Fluency is the thing language models optimise. A brief with holes in it reads
like a failed generation, so the model closes them — and closing a hole with the most likely
continuation is exactly what it is good at.

**The early tell.** The output is longer than the input and nothing in it says "unknown".

**What the kit does.** The non-invention rule in `pipeline/presentation-agent.md`: no new facts,
figures, costs, or regulatory statements, and **every claim references a question ID**. Missing or
conflicting input goes into a dedicated "Open points & conflicts" section and is never filled in.
The gappy fixture exists to prove this: its assertions require every empty question ID in the
register and forbid any value, cause, cost, or direction derived from a gap.

### F-13 · Tag collapse

**What it looks like.** The intake said "*statement*, source: workshop, verification open". The
brief says "the platform handles 40 000 transactions a day". Same content, different epistemic
status, and the status is the part that was load-bearing.

**Why it happens.** Summarisation strips qualifiers. Qualifiers are, statistically, the least
informative tokens in a sentence — and the most important ones here.

**The early tell.** A sentence in the brief reads better than the corresponding line in the form.

**What the kit does.** This is INV-2, the invariant the whole instrument stands on: basis and
verification are separate dimensions and **never collapse**. A statement with an open verification
stays a statement, in the form, in the brief, and in the app. The agent specification says it, the
brief's own structure sorts hypotheses by tag, and the complete fixture asserts that tags and
sources survive the transformation.

### F-14 · The intake as instruction

**What it looks like.** Someone types into a free-text answer — or pastes a document into one —
that contains a sentence addressed to the model. The brief acquires a section nobody asked for, or
loses one it was required to have.

**Why it happens.** The intake is user content and it arrives in the same channel as the
instructions. That is the whole of prompt injection; nothing more sophisticated is needed.

**The early tell.** The output deviates structurally from the specified sections.

**What the kit does.** The agent specification states that **intake free text is data, not
instruction**, and that the section structure of both outputs is fixed. This is a mitigation, not a
guarantee, and the kit says so: the structural check that catches a deviation is
`tools/check.py`, run by a human on the output — the defence is the fixed output shape and the
check, not the model's compliance.

### F-15 · The brief becomes the source

**What it looks like.** Six weeks later someone cites the brief for a number. The number came from
the brief, which took it from a statement, which came from a conversation. The chain still exists
in the file and nobody walks it.

**Why it happens.** A rendered document with a structure and a date outranks a form, socially. The
better the brief looks, the more it is trusted as a source.

**The early tell.** A slide cites the brief instead of citing a question ID.

**What the kit does.** Every claim carries its question ID, so the chain is one grep long rather
than a memory exercise. The brief's footer carries a **version stamp** — intake version, prompt
version, model — and its final line is the human sign-off with fixed wording that says, in the
document itself, that this is a discovery brief and not a recommendation. A document that
contradicts its own misuse is the cheapest available defence.

### F-16 · Confidentiality by convenience

**What it looks like.** The intake for a real customer, pasted into an agent, because that is
obviously the fastest way to get the brief. No approval, no record, and content that was never
cleared to leave the room.

**Why it happens.** The kit's own value proposition — structure in, brief out — makes this the
path of least resistance. The failure mode is created by the tool.

**The early tell.** You are about to paste and you have not asked anyone.

**What the kit does.** The confidentiality rule sits prominently in `README.md` in fixed wording:
customer raw data may only be entered into an agent after **documented human approval**, and the
default is manual-first — the structure *is* the tool. The web instrument (Phase 2) is
client-side, without a backend, so that using it is not a data transfer at all.

### F-17 · Speed read as quality

**What it looks like.** The brief arrives in forty seconds and the room treats it as forty seconds
of work saved rather than as forty seconds of unverified text produced.

**Why it happens.** Latency is the only quality signal that is immediately visible. Everything
else takes reading.

**The early tell.** Nobody in the room has opened the intake form.

**What the kit does.** Structurally, little — and this is worth saying rather than dressing up.
What it does do is make the unverified parts *countable*: the to-verify register is a list with a
length, the red-flag counter is per block, and the sign-off line has to be signed by a person.
A number of open points is harder to wave through than a paragraph about limitations.

---

## What this file is not

It is not a maturity model and not a scoring scheme. There is no "how many of these do you have"
count, because the answer would immediately be used as a result — which is the failure mode this
whole repository is built against.

## Open questions

- F-17 has no mechanism behind it. If one exists that is not theatre, it belongs here.
- The agentic entries are written against current model behaviour (August 2026). F-12 and F-13 in
  particular are properties of how these systems summarise, not laws of nature; if that changes,
  this file is wrong and should be corrected rather than defended.
