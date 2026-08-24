<!-- hand-authored fixture intake — filled by a human, not generated -->
# Platform Decision Kit — DISCOVERY FORM (filled) — LegacyHR

> This form is a CONVERSATION NOTE, not an authoritative source.
> Fictional scenario. No real organisation, system, or person is described.

**Date:** 2026-08-19  **Context:** Modernisation review, HR platform  **Interviewer:** External architect  **Partner(s):** IT lead, HR operations lead

---

## Decision Head (from Theme 2)

| Field | Answer |
|---|---|
| Decision question | Should LegacyHR be replaced with a SaaS HR platform within 18 months? |
| Decision owner | CIO (named in intake, redacted for the public fixture) |
| In scope | Employee master data, payroll calculation, absence management |
| Out of scope | Recruiting tooling, the works council portal |
| Deadline | Decision target 2027-02-28; no consequence documented if it passes |

---

## Theme 1 — Pain & Occasion / Schmerz & Anlass

#### Q1.1 — What is the presenting problem in one sentence?

**Answer:** Payroll runs require manual correction almost every month, and no one can say in advance which cases will fail.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.2 — How long has this situation existed, and what changed to trigger a review now?

**Answer:** The platform is 12 years old. The review was triggered by regulatory pressure to modernise, not by a specific incident.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.3 — Who named this a problem — and who agrees, who does not?

**Answer:** Named by HR operations. IT agrees. The works council has not been consulted yet.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.4 — What has already been attempted to address this situation, and what was the outcome?

**Answer:** A vendor assessment was started in 2023 and abandoned; the reason is no longer documented.

**Basis:** ( ) Fact  ( ) Statement  (x) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, recollection — no document found.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q1.5 — What is the estimated cost of inaction over 12 months — quantified, or explicitly stated as unquantified?

**Answer:** Not quantified. The manual correction effort has never been measured.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## Theme 2 — Success & Benchmark / Erfolg & Messlatte

#### Q2.1 — What is the primary decision question — stated as a question with a yes/no or option-selecting answer?

**Answer:** Should LegacyHR be replaced with a SaaS HR platform within 18 months?

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Modernisation kickoff note, 2026-08-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.2 — Who is the decision owner — the single named person accountable for the outcome?

**Answer:** The CIO is named as decision owner in the kickoff note.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Modernisation kickoff note, 2026-08-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.3 — What is explicitly in scope for this decision?

**Answer:** Employee master data, payroll calculation, absence management.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Modernisation kickoff note, 2026-08-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.4 — What is explicitly out of scope for this decision?

**Answer:** Recruiting tooling and the works council portal.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Modernisation kickoff note, 2026-08-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.5 — What is the decision deadline, and what happens — explicitly — if it passes without a decision?

**Answer:** Decision target end of February 2027. What happens if it passes is not defined.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Modernisation kickoff note, 2026-08-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.6 — What does success look like in 12 months — in terms that a neutral observer could verify?

**Answer:** Stated as "payroll runs without manual correction". No metric or measurement method is attached.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** HR operations lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.7 — Who must be satisfied for this to be considered a good outcome, and by what criteria do they judge it?

**Answer:** HR operations and the payroll team. The criteria they would judge by have not been written down.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** HR operations lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 3 — Constraints & Phase / Vorgaben & Phase

#### Q3.1 — What architecture or technology mandates are fixed — i.e., not open for discussion in this decision?

**Answer:** The group's SaaS-first policy is stated as a mandate, attributed to the CIO rather than to a policy document.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q3.2 — What budget envelope exists for this initiative — or is there none defined?

**Answer:** No budget envelope has been defined.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q3.3 — What is the current maturity phase of this platform — how long has it been in production, and what is the cadence of changes?

**Answer:** 12 years in production. Changes are rare: roughly two per year, both around statutory payroll updates.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.4 — What regulatory or audit commitments constrain the timeline of any change?

**Answer:** Not established. Whether an audit commitment constrains the timeline is unknown.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q3.5 — What governance process must any significant platform decision pass through, and how long does it take?

**Answer:** Any HR system change requires works council consultation. The duration is not documented.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** HR operations lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## Theme 4 — Inventory & Knowledge / Bestand & Wissen

#### Q4.1 — What exists today — list the core components, their approximate production age, and their technology stack?

**Answer:** A Java web layer (2014), an Oracle database, and a COBOL payroll module that predates both.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.2 — Where does the definitive technical documentation live, and when was it last verified against the system?

**Answer:** A SharePoint folder from the 2014 project. It has not been verified against the running system since.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.3 — Which parts of the system does no one currently understand well enough to predict the effect of a change?

**Answer:** The COBOL payroll module calculates net pay, but no one currently on the team understands its branching logic. Last person who knew left in 2024.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q4.4 — What data does the platform manage — and what is the master data situation (single source, duplicates, ownership)?

**Answer:** Employee master data lives in the Oracle database. A second copy exists in the time-tracking system; no reconciliation process is documented.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q4.5 — What integrations exist — documented or not — and who knows about them?

**Answer:** Time tracking, the finance ledger, and an export to the pension provider. Whether further integrations exist is not known.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q4.6 — What is the current automated test coverage, and when was the last full regression run conducted?

**Answer:** No automated test suite. Payroll changes are verified by comparing against the previous month's run.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 5 — Consumers & Interfaces / Konsumenten & Schnittstellen

#### Q5.1 — Who are the current consumers of this platform — list them and describe how they integrate (sync, async, batch, event)?

**Answer:** Time tracking (nightly batch), finance ledger (monthly file), pension provider (monthly file).

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.2 — Which consumers are business-critical, and what availability or latency do they require?

**Answer:** The monthly payroll run is business-critical in the sense that it is legally due on a fixed date. No availability or latency target is written down.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** HR operations lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.3 — Are there consumers who have built workarounds, undocumented integrations, or shadow copies of platform data?

**Answer:** HR operations maintains a spreadsheet copy of absence data for reporting. Whether other shadow copies exist is not known.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** HR operations lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q5.4 — Which interfaces are formally contracted or covered by an SLA — and which are informally used?

**Answer:** None of the three interfaces is covered by a written SLA.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.5 — Who has the authority to accept a breaking interface change on behalf of each consumer — and is that person reachable?

**Answer:** For the pension export, the contact is named. For the other two, who could accept a breaking change is not established.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## Theme 6 — Data & Sovereignty / Daten & Souveränität

#### Q6.1 — What data classifications apply to data this platform stores or processes — and who validated that classification?

**Answer:** HR data is treated as sensitive in practice. No formal classification has been made and no one validated one.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q6.2 — Where does personal data enter the platform, and under what legal basis is it processed?

**Answer:** Personal data enters through the employee onboarding form. The legal basis is assumed to be employment contract performance; not confirmed by Legal.

**Basis:** ( ) Fact  ( ) Statement  (x) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q6.3 — Who is the named data owner for each major data domain processed by this platform?

**Answer:** No named data owner exists for any HR data domain.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q6.4 — What are the documented retention requirements, and is there a working erasure path that has been tested?

**Answer:** No documented retention policy for HR records. Legal has been asked, response pending.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q6.5 — Does data processed by this platform cross jurisdictions or leave the organisation's direct control?

**Answer:** The platform runs in the company's own data centre. Whether the pension export leaves the jurisdiction is not established.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## Theme 7 — Regulation & Trust / Regulatorik & Vertrauen

#### Q7.1 — What regulatory frameworks apply to this platform — stated by whom, and when was this last reviewed?

**Answer:** GDPR is assumed to apply. No documented applicability assessment exists and no review date is known.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q7.2 — When was the last external or internal audit that covered this platform, and what were the open findings?

**Answer:** No audit has covered this platform in the memory of the current team.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.3 — Is AI/ML in the decision subject itself — in a production system or workflow — or only in the authoring process of this analysis?

**Answer:** No AI/ML in the decision subject. AI is used only in the authoring process of this analysis.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scoping statement, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.4 — If AI/ML is in the decision subject: what is the role and risk class per Legal — or is this explicitly open?

**Answer:** Not applicable — AI/ML is not in the decision subject.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scoping statement, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.5 — What trust or certification requirements do customers, partners, or regulators impose on this platform?

**Answer:** No certification requirement is known to apply to this platform.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## Theme 8 — Migration & Reversibility / Migration & Reversibilität

#### Q8.1 — What migration paths have been considered — even informally — and what was the reasoning for or against each?

**Answer:** Two paths have been discussed informally: full SaaS replacement, and replacing everything except the COBOL payroll module.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.2 — Which steps in any migration path under consideration are irreversible — once taken, the previous state cannot be restored?

**Answer:** Data migration from COBOL module is assumed possible but not validated.

**Basis:** ( ) Fact  ( ) Statement  (x) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q8.3 — What approach for running old and new in parallel — if any — has been considered, and for how long?

**Answer:** Running old and new payroll in parallel for two cycles has been mentioned but not planned or costed.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.4 — If this migration goes wrong, what is the rollback path — and what does it cost in time and data fidelity?

**Answer:** No rollback path has been described.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q8.5 — Has the scenario "return is impossible" been explicitly evaluated and documented — not just noted as a risk?

**Answer:** The scenario has not been evaluated.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q8.6 — What data migration strategy exists for master data and historical records — particularly records with retention obligations?

**Answer:** No data migration strategy exists for historical payroll records.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## Theme 9 — Organisation & Team / Organisation & Team-Schnitt

#### Q9.1 — Who owns this platform — the single named person or team with accountability for its availability and evolution?

**Answer:** The IT lead is the de facto owner. No service catalogue entry or written ownership exists.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.2 — How does work reach this platform team — who initiates changes, who reviews them, and where do handoffs stall?

**Answer:** Requests arrive by email to the IT lead. There is no review step.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.3 — Where is knowledge concentrated — who are the individuals whose absence would delay or block a migration?

**Answer:** Knowledge sits with the IT lead alone for the Java layer. For the COBOL module it sits with no one.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.4 — What organisational changes — restructuring, key departures, team mergers — are planned or underway that affect this work?

**Answer:** No restructuring is planned. The IT lead's retirement is within five years but no date is set.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.5 — Who are the informal decision-makers whose alignment is necessary — even if they have no formal authority over this decision?

**Answer:** The works council holds effective veto power over any HR system change.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** HR operations lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 10 — Operations, Security & Resilience / Betrieb, Sicherheit & Resilienz

#### Q10.1 — What are the current SLO/availability targets — and are they being met? If no SLO exists, state that explicitly.

**Answer:** No SLO exists. Availability has never been formally measured.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q10.2 — What are the RTO and RPO targets — and when was the last restore test conducted?

**Answer:** No RTO or RPO targets defined. Restore has never been tested.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q10.3 — What observability exists — what is logged, what is measured, what triggers an alert?

**Answer:** Application errors are written to a log file on the server. There are no metrics and no alerts.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.4 — What is the incident response process — and what is the change management process? Are they documented and followed?

**Answer:** No documented incident process. Change management consists of the IT lead informing HR operations before a payroll update.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** IT lead, interview 2026-08-19.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.5 — Who has access to production systems and data — and is there a documented, reviewed identity and permissions model?

**Answer:** Four people hold database credentials. There is no documented or reviewed permissions model.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q10.6 — What encryption is in place at rest and in transit — and are cryptographic keys managed separately from the data they protect?

**Answer:** Transport encryption is in place for the web layer. Whether data at rest is encrypted, and where keys are held, is not established.

**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  (x) Unknown

**Evidence / Source:** 

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## To-Verify Register

| # | Item | Source needed | Status |
|---|---|---|---|
| 1 | Branching logic of the COBOL payroll module [Q4.3] | Code analysis or a former maintainer | open |
| 2 | Documented retention requirement and tested erasure path for HR records [Q6.4] | Legal statement | open |
| 3 | RTO/RPO targets and a restore test [Q10.2] | Operations, restore rehearsal | open |
| 4 | Feasibility of data migration out of the COBOL module [Q8.2] | Technical validation | open |
| 5 | Applicable regulatory frameworks and date of last review [Q7.1] | Compliance statement | open |
| 6 | Named data owners per HR data domain [Q6.3] | HR / data governance | open |

---

> Situation picture only. No recommendation is derived from this form.
