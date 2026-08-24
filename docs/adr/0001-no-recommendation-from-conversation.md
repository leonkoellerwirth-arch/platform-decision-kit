# ADR 0001 — No recommendation is derived from a conversation

**Status:** accepted · **Date:** 2026-08-24

## Context

The obvious product here is a recommendation engine: interview a client about their brownfield
platform, run the notes through an agent, produce "migrate to X by Q2". Everything in the
toolchain makes that easy, and it is what buyers ask for.

The problem is what a conversation actually is. A 90-minute interview yields claims: what someone
believes, what someone remembers, what someone is willing to say in front of their colleagues.
Some of it is fact with a source. Most of it is not. An agent processing those notes cannot tell
the difference, and a well-formatted brief erases the distinction entirely — the statement and
the fact come out looking the same, and by the time it reaches a slide, both read as evidence.

That erasure is not a model defect to be prompted away. It is what summarisation *is*.

## Decision

The kit produces no recommendation, no ranking, and no preferred option. Directions are phrased
conditionally and carry the `to-verify` IDs they depend on.

Instead of resolving uncertainty, the instrument makes it structural:

- Every answer carries a **Basis** tag and a **Verification** tag, independently ([INV-2]).
- A fact requires a source reference; without one it is not a fact ([INV-3]).
- Security, data protection, regulation, cost and irreversibility get no defaults — unknown stays
  unknown and becomes a task ([INV-4]).
- The agent invents nothing; every claim in a brief references a question ID, and conflicting
  input goes into "Offene Punkte & Konflikte" unresolved ([INV-7]).

`tools/check.py` enforces this against three hand-authored fixtures with forbidden-phrase
assertions, offline, in the gate.

## Consequences

**What we give up.** The kit is less immediately satisfying than a recommendation engine. A
client who wants an answer receives a map of what they do not yet know. Some will not want that.

**What we get.** The output survives contact with an auditor, a regulator, and a post-mortem. A
directional statement that later proves wrong can be traced to the claim it rested on and to the
verification that was never done — which is the difference between a decision that was wrong and
a decision that was unfounded.

**What this constrains.** No future feature may collapse the two tag dimensions, rank options, or
fill a blank field from experience. Those are not enhancements to this design; they are its
negation.
