<!-- hand-authored fixture intake — filled by a human, not generated -->
# Platform Decision Kit — DISCOVERY FORM (filled) — PaymentHub

> This form is a CONVERSATION NOTE, not an authoritative source.
> Fictional scenario. No real organisation, system, or person is described.

**Date:** 2026-08-20  **Context:** Architecture review, payment processing hub  **Interviewer:** External architect  **Partner(s):** CTO, CFO, engineering lead, DBA team lead

---

## Decision Head (from Theme 2)

| Field | Answer |
|---|---|
| Decision question | Should PaymentHub move to a new settlement core with dual-write during transition? |
| Decision owner | CTO (named in intake, redacted for the public fixture) |
| In scope | Settlement core, dual-write transition mechanism, schema reconciliation |
| Out of scope | Card scheme certification, the merchant onboarding portal |
| Deadline | Contested — see [Q2.5]; two conflicting statements are on record |

---

## Theme 1 — Pain & Occasion / Schmerz & Anlass

#### Q1.1 — What is the presenting problem in one sentence?

**Answer:** Settlement reconciliation breaks on roughly 0.4% of transactions and is repaired by a nightly manual process.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Reconciliation exception report, July 2026.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.2 — How long has this situation existed, and what changed to trigger a review now?

**Answer:** The exception rate has been stable for two years. The review was triggered by the card scheme's 2027 message-format change.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scheme bulletin 2026-06, ref SCH-2026-11.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.3 — Who named this a problem — and who agrees, who does not?

**Answer:** Named by the engineering lead. Operations agrees. Finance considers the manual repair acceptable.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.4 — What has already been attempted to address this situation, and what was the outcome?

**Answer:** A matching-rule rewrite in 2025 reduced the exception rate from 0.9% to 0.4%.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Change record CHG-2025-0810.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.5 — What is the estimated cost of inaction over 12 months — quantified, or explicitly stated as unquantified?

**Answer:** Manual repair effort is quantified at 180,000 EUR over 12 months.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Finance calculation FIN-2026-4980.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 2 — Success & Benchmark / Erfolg & Messlatte

#### Q2.1 — What is the primary decision question — stated as a question with a yes/no or option-selecting answer?

**Answer:** Should PaymentHub move to a new settlement core with dual-write during transition?

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.2 — Who is the decision owner — the single named person accountable for the outcome?

**Answer:** The CTO is named as decision owner.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.3 — What is explicitly in scope for this decision?

**Answer:** Settlement core, dual-write transition mechanism, schema reconciliation.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.4 — What is explicitly out of scope for this decision?

**Answer:** Card scheme certification and the merchant onboarding portal.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.5 — What is the decision deadline, and what happens — explicitly — if it passes without a decision?

**Answer:** Two statements are on record and they contradict each other. Statement 1 — CTO at architecture review 2026-08-10: "Decision required by end of Q3 2026." Statement 2 — CFO at budget review 2026-08-15: "Budget cycle runs to Q1 2027; no commitment before then." Neither is adopted here.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Statement 1: Architecture review minutes 2026-08-10, ref ARC-2026-44. Statement 2: CFO budget memo 2026-08-15, ref FIN-2026-5001.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q2.6 — What does success look like in 12 months — in terms that a neutral observer could verify?

**Answer:** Settlement exceptions below 0.05% and full compatibility with the 2027 scheme message format.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.7 — Who must be satisfied for this to be considered a good outcome, and by what criteria do they judge it?

**Answer:** Operations (exception volume), Finance (manual repair cost), Compliance (scheme conformance).

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 3 — Constraints & Phase / Vorgaben & Phase

#### Q3.1 — What architecture or technology mandates are fixed — i.e., not open for discussion in this decision?

**Answer:** The settlement store must remain on the licensed enterprise database; the licence runs to 2029.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Licence agreement DB-2024-07, clause 2.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.2 — What budget envelope exists for this initiative — or is there none defined?

**Answer:** Budget envelope has not been fixed. The CFO memo defers commitment to the FY2027 cycle.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** CFO budget memo 2026-08-15, ref FIN-2026-5001.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q3.3 — What is the current maturity phase of this platform — how long has it been in production, and what is the cadence of changes?

**Answer:** 6 years in production. Roughly one release per month, with a freeze over each month-end settlement window.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Release log 2020-2026.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.4 — What regulatory or audit commitments constrain the timeline of any change?

**Answer:** An annual scheme compliance audit each March constrains changes to the settlement path.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Compliance calendar 2026, ref CMP-2026-09.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.5 — What governance process must any significant platform decision pass through, and how long does it take?

**Answer:** Architecture board, then risk committee, then CFO sign-off. Historically 10 to 14 weeks.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Governance handbook v6.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 4 — Inventory & Knowledge / Bestand & Wissen

#### Q4.1 — What exists today — list the core components, their approximate production age, and their technology stack?

**Answer:** A settlement core (6 years, Java 21), the licensed enterprise database, a message gateway, and a reconciliation batch.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-08.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.2 — Where does the definitive technical documentation live, and when was it last verified against the system?

**Answer:** An internal architecture wiki, verified against the running system in May 2026.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-08.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.3 — Which parts of the system does no one currently understand well enough to predict the effect of a change?

**Answer:** The reconciliation batch's exception-matching rules are understood by two engineers; no component is fully unowned.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-08, knowledge map.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.4 — What data does the platform manage — and what is the master data situation (single source, duplicates, ownership)?

**Answer:** Transaction, settlement, and merchant reference data. The settlement store is the single source; merchant reference is read from the onboarding system.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Data map DM-2026-06.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.5 — What integrations exist — documented or not — and who knows about them?

**Answer:** Message gateway to the card scheme, ledger export to Finance, and a read from merchant onboarding. All three are documented.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Integration register, ARC-INV-2026-08.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.6 — What is the current automated test coverage, and when was the last full regression run conducted?

**Answer:** Automated coverage 81% line, 93% on the settlement path. Last full regression 2026-08-08.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** CI report build 9902.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 5 — Consumers & Interfaces / Konsumenten & Schnittstellen

#### Q5.1 — Who are the current consumers of this platform — list them and describe how they integrate (sync, async, batch, event)?

**Answer:** Finance ledger (daily file), merchant portal (sync REST), card scheme gateway (sync message).

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Integration register, ARC-INV-2026-08.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.2 — Which consumers are business-critical, and what availability or latency do they require?

**Answer:** The card scheme gateway is business-critical: 99.95% availability, p99 under 250ms, contractually fixed.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scheme contract SCH-2024-02.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.3 — Are there consumers who have built workarounds, undocumented integrations, or shadow copies of platform data?

**Answer:** Finance maintains a spreadsheet reconciliation of the daily ledger file. It is documented and agreed.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Integration register, ARC-INV-2026-08.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.4 — Which interfaces are formally contracted or covered by an SLA — and which are informally used?

**Answer:** The card scheme interface is contractually fixed. The Finance ledger export is covered by an internal SLA. The merchant portal read is informal.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SCH-2024-02 and SLA-2025-11.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.5 — Who has the authority to accept a breaking interface change on behalf of each consumer — and is that person reachable?

**Answer:** Named accept-authority exists for the scheme gateway and the Finance export. For the merchant portal read it is not established.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

## Theme 6 — Data & Sovereignty / Daten & Souveränität

#### Q6.1 — What data classifications apply to data this platform stores or processes — and who validated that classification?

**Answer:** Transaction data is classified Restricted; merchant reference is Confidential. Validated by the Data Protection Officer.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Classification review CLS-2026-04.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.2 — Where does personal data enter the platform, and under what legal basis is it processed?

**Answer:** Personal data enters through the transaction message (cardholder reference, merchant contact). Legal basis: contract performance and legal obligation.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** ROPA-2026, entry 7.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.3 — Who is the named data owner for each major data domain processed by this platform?

**Answer:** Head of Payments Operations owns transaction and settlement data; Head of Merchant Services owns merchant reference.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Data map DM-2026-06.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.4 — What are the documented retention requirements, and is there a working erasure path that has been tested?

**Answer:** Transaction records retained 10 years per financial regulation. Erasure path tested for merchant reference data on 2026-05-14; not applicable to transaction records under the retention obligation.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** RET-2025-04 and ERT-2026-05.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.5 — Does data processed by this platform cross jurisdictions or leave the organisation's direct control?

**Answer:** Processing stays within the EU. The scheme gateway terminates in the EU region.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SCH-2024-02, data residency annex.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 7 — Regulation & Trust / Regulatorik & Vertrauen

#### Q7.1 — What regulatory frameworks apply to this platform — stated by whom, and when was this last reviewed?

**Answer:** PSD2 and GDPR apply; scheme rules apply contractually. Reviewed by Compliance on 2026-02-10.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Regulatory applicability assessment REG-2026-03.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.2 — When was the last external or internal audit that covered this platform, and what were the open findings?

**Answer:** Last scheme compliance audit March 2026. One finding on key rotation cadence, closed June 2026.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Audit report SCH-AUD-2026-03 and closure record.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.3 — Is AI/ML in the decision subject itself — in a production system or workflow — or only in the authoring process of this analysis?

**Answer:** No AI/ML in the decision subject. AI is used only in the authoring process of this analysis.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scoping statement, architecture review 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.4 — If AI/ML is in the decision subject: what is the role and risk class per Legal — or is this explicitly open?

**Answer:** Not applicable — AI/ML is not in the decision subject.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scoping statement, architecture review 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.5 — What trust or certification requirements do customers, partners, or regulators impose on this platform?

**Answer:** PCI DSS attestation is maintained annually; the settlement core is in scope.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** AoC 2026-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 8 — Migration & Reversibility / Migration & Reversibilität

#### Q8.1 — What migration paths have been considered — even informally — and what was the reasoning for or against each?

**Answer:** Two paths considered: dual-write transition to a new settlement core, and an in-place message-format uplift on the existing core.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.2 — Which steps in any migration path under consideration are irreversible — once taken, the previous state cannot be restored?

**Answer:** One irreversible step: the settlement cut-over. Once the new core becomes the book of record, the old settlement store is closed to writes and cannot be restored as authoritative.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-09, step 4.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.3 — What approach for running old and new in parallel — if any — has been considered, and for how long?

**Answer:** Two statements are on record and they contradict each other. Statement 1 — Engineering lead: "Dual-write can be operational in 4 weeks." Statement 2 — DBA team: "Minimum 6 months for schema reconciliation under dual-write." Neither is adopted here.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Statement 1: Engineering lead, internal meeting 2026-08-05. Statement 2: DBA team written assessment 2026-08-12, ref DBA-2026-18.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q8.4 — If this migration goes wrong, what is the rollback path — and what does it cost in time and data fidelity?

**Answer:** Before cut-over, rollback is a routing switch under 30 minutes. After cut-over, no rollback path has been described.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-09, rollback section.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q8.5 — Has the scenario "return is impossible" been explicitly evaluated and documented — not just noted as a risk?

**Answer:** Evaluated for the pre-cut-over phase and documented. For the post-cut-over phase it has not been evaluated.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-09, DP-2.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q8.6 — What data migration strategy exists for master data and historical records — particularly records with retention obligations?

**Answer:** Historical transaction records under the 10-year obligation stay in the existing store as a read-only archive; the strategy is documented.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-09, data section.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 9 — Organisation & Team / Organisation & Team-Schnitt

#### Q9.1 — Who owns this platform — the single named person or team with accountability for its availability and evolution?

**Answer:** The Payments Platform team owns PaymentHub; the accountable lead is named in the intake.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Service catalogue entry SVC-031.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.2 — How does work reach this platform team — who initiates changes, who reviews them, and where do handoffs stall?

**Answer:** Changes arrive through the service catalogue and are reviewed by two engineers plus a DBA for anything touching the settlement schema.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Governance handbook v6.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.3 — Where is knowledge concentrated — who are the individuals whose absence would delay or block a migration?

**Answer:** Settlement schema knowledge is concentrated in the DBA team; exception-matching knowledge sits with two engineers.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-08, knowledge map.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.4 — What organisational changes — restructuring, key departures, team mergers — are planned or underway that affect this work?

**Answer:** No restructuring is planned within the decision window.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Workforce plan 2026-H2.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.5 — Who are the informal decision-makers whose alignment is necessary — even if they have no formal authority over this decision?

**Answer:** The DBA team lead holds effective veto over settlement schema changes; no such change has proceeded over their objection.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-44.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 10 — Operations, Security & Resilience / Betrieb, Sicherheit & Resilienz

#### Q10.1 — What are the current SLO/availability targets — and are they being met? If no SLO exists, state that explicitly.

**Answer:** SLO: 99.95% monthly availability on the scheme gateway path. Met for the last 12 months at 99.97%.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SRE runbook v5 and availability report.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.2 — What are the RTO and RPO targets — and when was the last restore test conducted?

**Answer:** RTO 1 hour, RPO 0 for settlement. The last restore test was scheduled for July 2026 and has not been carried out.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Operations, interview 2026-08-20.

**Verification:** ( ) None  (x) Open  ( ) Blocked

---

#### Q10.3 — What observability exists — what is logged, what is measured, what triggers an alert?

**Answer:** Structured logs, RED metrics, traces on the settlement path, and reconciliation exception alerting.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Observability configuration, SRE runbook v5.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.4 — What is the incident response process — and what is the change management process? Are they documented and followed?

**Answer:** Documented incident process with 24/7 on-call and a change process with a month-end freeze. Both exercised in the March audit.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SRE runbook v5, audit report SCH-AUD-2026-03.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.5 — Who has access to production systems and data — and is there a documented, reviewed identity and permissions model?

**Answer:** Production access is role-based through the central identity provider with quarterly review; last review 2026-07-01.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Access review AR-2026-Q2.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.6 — What encryption is in place at rest and in transit — and are cryptographic keys managed separately from the data they protect?

**Answer:** Encrypted at rest and in transit. Keys are held in a hardware security module, separate from the data.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Security baseline SEC-2025-06 and AoC 2026-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## To-Verify Register

| # | Item | Source needed | Status |
|---|---|---|---|
| 1 | Binding decision deadline [Q2.5] | Written reconciliation between CTO and CFO | open — contested |
| 2 | Dual-write operational timeline [Q8.3] | Joint technical assessment, engineering and DBA | open — contested |
| 3 | Tested restore for the settlement store [Q10.2] | Restore rehearsal | open |

---

> Situation picture only. No recommendation is derived from this form.
