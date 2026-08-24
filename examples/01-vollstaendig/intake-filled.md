<!-- hand-authored fixture intake — filled by a human, not generated -->
# Platform Decision Kit — DISCOVERY FORM (filled) — RetailCore OMS

> This form is a CONVERSATION NOTE, not an authoritative source.
> Fictional scenario. No real organisation, system, or person is described.

**Date:** 2026-08-18  **Context:** Platform review, order management  **Interviewer:** External architect  **Partner(s):** Platform lead, SRE lead, Head of Fulfillment

---

## Decision Head (from Theme 2)

| Field | Answer |
|---|---|
| Decision question | Should RetailCore OMS be migrated to a cloud-native event-driven architecture by Q2 2027? |
| Decision owner | VP Engineering (named in intake, redacted for the public fixture) |
| In scope | Order intake, order state machine, fulfilment dispatch, event distribution to the three consuming teams |
| Out of scope | Payment provider integration, warehouse robotics control, the retail web frontend |
| Deadline | Decision by 2026-11-30; scoped delivery window Q2 2027 |

---

## Theme 1 — Pain & Occasion / Schmerz & Anlass

#### Q1.1 — What is the presenting problem in one sentence?

**Answer:** Order processing latency has increased from avg 120ms to 950ms over 6 months.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Monitoring dashboard, exported 2026-08-01, owned by Ops team.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.2 — How long has this situation existed, and what changed to trigger a review now?

**Answer:** The situation has developed over roughly 6 months. The review was triggered when the fulfilment team's SLA breach count crossed 12 in July 2026.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SLA breach log, Fulfilment Ops, July 2026 extract.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.3 — Who named this a problem — and who agrees, who does not?

**Answer:** Named by the Head of Fulfillment. The platform team agrees on the symptom; Analytics considers latency secondary to their batch export gaps.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.4 — What has already been attempted to address this situation, and what was the outcome?

**Answer:** Two attempts: connection-pool tuning (Feb 2026, partial relief for 3 weeks) and a read-replica for the analytics export (May 2026, held).

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Change records CHG-2026-0212 and CHG-2026-0517.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q1.5 — What is the estimated cost of inaction over 12 months — quantified, or explicitly stated as unquantified?

**Answer:** Cost of inaction is quantified at 240,000 EUR over 12 months in SLA credits and manual reprocessing effort.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Finance calculation FIN-2026-4390, 2026-07-20.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 2 — Success & Benchmark / Erfolg & Messlatte

#### Q2.1 — What is the primary decision question — stated as a question with a yes/no or option-selecting answer?

**Answer:** Should RetailCore OMS be migrated to a cloud-native event-driven architecture by Q2 2027?

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-31.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.2 — Who is the decision owner — the single named person accountable for the outcome?

**Answer:** VP Engineering is the accountable decision owner; named in the intake, redacted here.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Decision charter DC-2026-07, signed 2026-07-02.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.3 — What is explicitly in scope for this decision?

**Answer:** Order intake, order state machine, fulfilment dispatch, event distribution to the three consuming teams.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Decision charter DC-2026-07.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.4 — What is explicitly out of scope for this decision?

**Answer:** Payment provider integration, warehouse robotics control, the retail web frontend.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Decision charter DC-2026-07.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.5 — What is the decision deadline, and what happens — explicitly — if it passes without a decision?

**Answer:** Decision deadline 2026-11-30. If it passes, the current capex allocation returns to the general pool and the review restarts in the FY2027 cycle.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** CFO memo 2026-07-15, ref FIN-2026-4412.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.6 — What does success look like in 12 months — in terms that a neutral observer could verify?

**Answer:** p95 order processing latency below 300ms, zero SLA breaches per quarter, and analytics export completing within its 04:00 window.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Decision charter DC-2026-07, success criteria section.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q2.7 — Who must be satisfied for this to be considered a good outcome, and by what criteria do they judge it?

**Answer:** Head of Fulfillment (SLA breaches), Head of Analytics (export window), VP Engineering (operational cost per order).

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 3 — Constraints & Phase / Vorgaben & Phase

#### Q3.1 — What architecture or technology mandates are fixed — i.e., not open for discussion in this decision?

**Answer:** PostgreSQL remains the system of record; the company's approved cloud provider is fixed by an existing enterprise agreement.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Enterprise cloud agreement CLD-2024-01, clause 3.2.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.2 — What budget envelope exists for this initiative — or is there none defined?

**Answer:** Budget envelope: up to 800,000 EUR capex + 120,000 EUR annual opex uplift.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** CFO memo 2026-07-15, ref FIN-2026-4412.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.3 — What is the current maturity phase of this platform — how long has it been in production, and what is the cadence of changes?

**Answer:** 8 years in production. Change cadence: roughly 2 releases per month, with a quarterly freeze around peak trading.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Release log 2018-2026, platform team.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.4 — What regulatory or audit commitments constrain the timeline of any change?

**Answer:** Annual PCI-adjacent scope review each January constrains any change touching order records; no other audit commitment applies.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Compliance calendar 2026, ref CMP-2026-02.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q3.5 — What governance process must any significant platform decision pass through, and how long does it take?

**Answer:** Architecture board review, then CFO capex sign-off. Historically 6 to 8 weeks end to end.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Governance handbook v4, plus last three decisions ARC-2025-12, ARC-2025-19, ARC-2026-03.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 4 — Inventory & Knowledge / Bestand & Wissen

#### Q4.1 — What exists today — list the core components, their approximate production age, and their technology stack?

**Answer:** Java monolith (8 years, Java 17 after a 2023 uplift), PostgreSQL 14, a batch export job, and an internal admin UI.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-05, verified 2026-06-30.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.2 — Where does the definitive technical documentation live, and when was it last verified against the system?

**Answer:** Confluence architecture space; last verified against the running system during the June 2026 inventory.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-05.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.3 — Which parts of the system does no one currently understand well enough to predict the effect of a change?

**Answer:** No dark zone remains: the last unowned component (a legacy pricing hook) was documented and covered by tests in the June 2026 inventory.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-05, section 4.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.4 — What data does the platform manage — and what is the master data situation (single source, duplicates, ownership)?

**Answer:** Order, customer reference, and fulfilment state. PostgreSQL is the single source; customer master lives in CRM and is referenced, not copied.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Data map DM-2026-02, verified 2026-06-30.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.5 — What integrations exist — documented or not — and who knows about them?

**Answer:** Three documented integrations (fulfilment, customer service, analytics) plus a documented CRM read. No undocumented integrations found in the June inventory.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-05, integration register.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q4.6 — What is the current automated test coverage, and when was the last full regression run conducted?

**Answer:** Automated coverage 74% line, 81% on the order state machine. Last full regression run 2026-08-05.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** CI report build 4821, 2026-08-05.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 5 — Consumers & Interfaces / Konsumenten & Schnittstellen

#### Q5.1 — Who are the current consumers of this platform — list them and describe how they integrate (sync, async, batch, event)?

**Answer:** Fulfilment (sync REST), customer service (sync REST), analytics (nightly batch export).

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Integration register, ARC-INV-2026-05.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.2 — Which consumers are business-critical, and what availability or latency do they require?

**Answer:** Fulfilment is business-critical: 99.5% availability, p95 under 400ms. Customer service is important but tolerates degradation. Analytics is batch, no latency requirement.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SLA schedule SLA-2025-03, signed.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.3 — Are there consumers who have built workarounds, undocumented integrations, or shadow copies of platform data?

**Answer:** No shadow copies found. The June inventory reconciled 90 days of API access logs against the integration register with no unaccounted caller.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** API access log review, ARC-INV-2026-05 appendix B.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.4 — Which interfaces are formally contracted or covered by an SLA — and which are informally used?

**Answer:** Fulfilment and customer service are covered by signed internal SLAs. The analytics export is contracted through a data-sharing agreement.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SLA-2025-03 and DSA-2025-07.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q5.5 — Who has the authority to accept a breaking interface change on behalf of each consumer — and is that person reachable?

**Answer:** Named accept-authority per consumer is recorded in the SLA schedule; all three are current employees and reachable.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SLA schedule SLA-2025-03, signatory list.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 6 — Data & Sovereignty / Daten & Souveränität

#### Q6.1 — What data classifications apply to data this platform stores or processes — and who validated that classification?

**Answer:** Order data is classified Internal; customer reference data is classified Confidential. Validated by the Data Protection Officer.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Classification review CLS-2026-01, DPO-signed 2026-03-11.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.2 — Where does personal data enter the platform, and under what legal basis is it processed?

**Answer:** Personal data enters through the order intake API (name, delivery address, contact email). Legal basis: contract performance.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Record of processing activities ROPA-2026, entry 14.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.3 — Who is the named data owner for each major data domain processed by this platform?

**Answer:** Head of Commerce Operations owns order data; Head of CRM owns customer master.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Data map DM-2026-02, ownership section.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.4 — What are the documented retention requirements, and is there a working erasure path that has been tested?

**Answer:** Order records retained 7 years from last transaction per commercial law. The erasure path was tested end to end on 2026-04-22.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Retention policy RET-2025-01 and erasure test report ERT-2026-04.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q6.5 — Does data processed by this platform cross jurisdictions or leave the organisation's direct control?

**Answer:** All processing stays within the EU region of the approved cloud provider. No transfer outside the organisation's control.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Enterprise cloud agreement CLD-2024-01, data residency annex.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 7 — Regulation & Trust / Regulatorik & Vertrauen

#### Q7.1 — What regulatory frameworks apply to this platform — stated by whom, and when was this last reviewed?

**Answer:** GDPR applies. PCI DSS applies to the payment path, which is out of scope for this decision. Reviewed by Compliance on 2026-01-15.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Regulatory applicability assessment REG-2026-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.2 — When was the last external or internal audit that covered this platform, and what were the open findings?

**Answer:** Last internal audit 2026-01. Two findings, both closed by 2026-03.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Internal audit report IA-2026-01 and closure record.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.3 — Is AI/ML in the decision subject itself — in a production system or workflow — or only in the authoring process of this analysis?

**Answer:** No AI/ML in the decision subject. AI is used only in the authoring process of this analysis.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scoping statement, architecture review 2026-08-10.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.4 — If AI/ML is in the decision subject: what is the role and risk class per Legal — or is this explicitly open?

**Answer:** Not applicable — AI/ML is not in the decision subject.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Scoping statement, architecture review 2026-08-10.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q7.5 — What trust or certification requirements do customers, partners, or regulators impose on this platform?

**Answer:** ISO 27001 certification is maintained at group level; the platform is in scope of the statement of applicability.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Certificate ISO-2025-441 and SoA v6.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 8 — Migration & Reversibility / Migration & Reversibilität

#### Q8.1 — What migration paths have been considered — even informally — and what was the reasoning for or against each?

**Answer:** Three paths considered: in-place optimisation, event-driven rebuild with strangler cut-over, and a full rewrite. The full rewrite was set aside for delivery risk.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10, ref ARC-2026-31.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.2 — Which steps in any migration path under consideration are irreversible — once taken, the previous state cannot be restored?

**Answer:** One irreversible step: the cut-over of the order state machine to the event store. Once orders are written there, the monolith's write path is decommissioned and cannot be restored without a data replay.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-02, step 6.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.3 — What approach for running old and new in parallel — if any — has been considered, and for how long?

**Answer:** Dual-run of old and new order intake for one full quarter, including a peak-trading window, was considered and costed.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-02, section 3.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.4 — If this migration goes wrong, what is the rollback path — and what does it cost in time and data fidelity?

**Answer:** Rollback before the cut-over step is a configuration switch, under 1 hour, no data loss. After the cut-over, rollback requires a replay estimated at 12 hours with full fidelity retained.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-02, rollback section.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.5 — Has the scenario "return is impossible" been explicitly evaluated and documented — not just noted as a risk?

**Answer:** Yes — evaluated and documented. Return after the cut-over is possible but costly; it is recorded as a dated decision point, not as a risk line.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-02, decision point DP-3.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q8.6 — What data migration strategy exists for master data and historical records — particularly records with retention obligations?

**Answer:** Historical orders under retention obligation migrate ahead of cut-over in a verified bulk load; the 7-year window is preserved.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Migration outline MIG-2026-02, data section, reviewed against RET-2025-01.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 9 — Organisation & Team / Organisation & Team-Schnitt

#### Q9.1 — Who owns this platform — the single named person or team with accountability for its availability and evolution?

**Answer:** The Platform Engineering team owns RetailCore OMS; the accountable lead is named in the intake.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Org chart 2026-07 and service catalogue entry SVC-014.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.2 — How does work reach this platform team — who initiates changes, who reviews them, and where do handoffs stall?

**Answer:** Change requests arrive through the service catalogue, are triaged weekly, and are reviewed by two platform engineers. Handoffs stall most often at the analytics export contract.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Ticket flow analysis, Q2 2026.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.3 — Where is knowledge concentrated — who are the individuals whose absence would delay or block a migration?

**Answer:** Knowledge on the order state machine sits with three engineers; the June inventory removed the previous single-holder concentration.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture inventory ARC-INV-2026-05, knowledge map.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.4 — What organisational changes — restructuring, key departures, team mergers — are planned or underway that affect this work?

**Answer:** No restructuring planned. One engineer joins the team in October 2026.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Workforce plan 2026-H2.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q9.5 — Who are the informal decision-makers whose alignment is necessary — even if they have no formal authority over this decision?

**Answer:** The Head of Fulfillment holds informal veto power: no previous OMS change has proceeded over their objection.

**Basis:** ( ) Fact  (x) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Architecture review minutes 2026-08-10.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## Theme 10 — Operations, Security & Resilience / Betrieb, Sicherheit & Resilienz

#### Q10.1 — What are the current SLO/availability targets — and are they being met? If no SLO exists, state that explicitly.

**Answer:** SLO: 99.5% monthly availability. Met: last 12 months 99.7%. Source: SRE runbook v3.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SRE runbook v3 and the 12-month availability report.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.2 — What are the RTO and RPO targets — and when was the last restore test conducted?

**Answer:** RTO 4 hours, RPO 15 minutes. Last restore test 2026-02-19, both targets met.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Restore test report RST-2026-02.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.3 — What observability exists — what is logged, what is measured, what triggers an alert?

**Answer:** Structured logs, RED metrics on all endpoints, distributed traces on the order path. Alerts on SLO burn rate and on batch export overrun.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Observability configuration, SRE runbook v3.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.4 — What is the incident response process — and what is the change management process? Are they documented and followed?

**Answer:** Documented incident process with a 24/7 on-call rota, and a change process with a peak-trading freeze. Both were exercised during the July SLA breaches.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** SRE runbook v3 and incident records INC-2026-0712 ff.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.5 — Who has access to production systems and data — and is there a documented, reviewed identity and permissions model?

**Answer:** Production access is role-based through the central identity provider and reviewed quarterly. Last review 2026-07-01.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Access review AR-2026-Q2.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

#### Q10.6 — What encryption is in place at rest and in transit — and are cryptographic keys managed separately from the data they protect?

**Answer:** Encrypted at rest (provider-managed volume encryption) and in transit (TLS 1.3). Keys are held in the central key vault, separate from the data.

**Basis:** (x) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown

**Evidence / Source:** Security baseline SEC-2025-02.

**Verification:** (x) None  ( ) Open  ( ) Blocked

---

## To-Verify Register

| # | Item | Source needed | Status |
|---|---|---|---|
| — | (empty — all items resolved) | — | closed |

---

> Situation picture only. No recommendation is derived from this form.
