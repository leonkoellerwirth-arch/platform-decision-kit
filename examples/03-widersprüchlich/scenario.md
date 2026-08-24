# Fixture 3 — widersprüchlich ("PaymentHub")

## Premise

PaymentHub is a fictional payment processing hub at a financial services company. The intake
carries two documented contradictions:

**Conflict A — the decision deadline [Q2.5]**
- CTO at architecture review 2026-08-10: "Decision required by end of Q3 2026."
  (ref ARC-2026-44)
- CFO at budget review 2026-08-15: "Budget cycle runs to Q1 2027; no commitment before then."
  (ref FIN-2026-5001)

**Conflict B — dual-write feasibility [Q8.3]**
- Engineering lead: "Dual-write can be operational in 4 weeks."
  (internal meeting 2026-08-05)
- DBA team: "Minimum 6 months for schema reconciliation under dual-write."
  (ref DBA-2026-18)

No real organisation, system, or person is described. All document references are invented.

## What this fixture proves

The contradiction survives the brief. Both statements are quoted verbatim with their sources
and tags in "Offene Punkte & Konflikte"; neither is chosen, averaged, or silently adopted in
the Lagebild or the Options-Raum. Every option that depends on a contested point is marked
"offen/bedingt" with the blocking Q-ID, and both conflict IDs stay in the To-Verify register.

This is the failure mode the instrument exists to prevent: a plausible synthesis that reads
as agreement where none exists.

## Review checklist

- [ ] Both Q2.5 statements quoted verbatim with source and tag.
- [ ] Both Q8.3 statements quoted verbatim with source and tag.
- [ ] Neither conflict resolved, averaged, or silently adopted.
- [ ] Affected options marked "offen/bedingt".
- [ ] Both conflict Q-IDs in To-Verify register.
- [ ] No recommendation made.
