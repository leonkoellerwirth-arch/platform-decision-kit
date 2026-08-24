<!-- hand-authored reference output — the target shape for an agent brief, written by a human -->
# Discovery-Brief — PaymentHub

Fiktives Szenario. Grundlage ist ausschließlich `intake-filled.md`. Zwei Punkte im Intake sind
widersprüchlich belegt. Beide Seiten stehen unaufgelöst im Abschnitt "Offene Punkte & Konflikte";
keine wird in diesem Brief zur Tatsache erklärt, zusammengeführt oder ausgemittelt.

## Lagebild

- Die Settlement-Abstimmung bricht bei rund 0,4 % der Transaktionen und wird nächtlich manuell repariert [Q1.1] (Fakt · Reconciliation-Exception-Report Juli 2026).
- Auslöser des Reviews ist die Nachrichtenformat-Umstellung des Kartensystems für 2027, nicht eine Verschlechterung des Betriebs [Q1.2] (Fakt · SCH-2026-11).
- Ein Regelwerks-Rewrite 2025 hat die Ausnahmequote von 0,9 % auf 0,4 % gesenkt [Q1.4] (Fakt · CHG-2025-0810).
- Der manuelle Reparaturaufwand ist mit 180.000 EUR über zwölf Monate beziffert [Q1.5] (Fakt · FIN-2026-4980).
- Der Settlement-Store muss bis 2029 auf der lizenzierten Enterprise-Datenbank bleiben [Q3.1] (Fakt · DB-2024-07, Klausel 2).
- Der Bestand ist inventarisiert und die Dokumentation im Mai 2026 gegen das laufende System verifiziert [Q4.2] (Fakt · ARC-INV-2026-08).
- Das Gateway zum Kartensystem ist geschäftskritisch mit vertraglich fixierten 99,95 % Verfügbarkeit und p99 unter 250ms [Q5.2] (Fakt · SCH-2024-02).
- Transaktionsdaten sind als Restricted klassifiziert, geprüft durch den Datenschutzbeauftragten [Q6.1] (Fakt · CLS-2026-04).
- Transaktionsdatensätze unterliegen einer zehnjährigen Aufbewahrungspflicht [Q6.4] (Fakt · RET-2025-04).
- PSD2 und DSGVO gelten, Systemregeln vertraglich; zuletzt geprüft am 2026-02-10 [Q7.1] (Fakt · REG-2026-03).
- KI/ML ist nicht im Entscheidungsgegenstand; KI wird ausschließlich im Autorenprozess dieser Analyse eingesetzt [Q7.3] (Fakt · Scoping-Statement, ARC-2026-44).
- Das SLO von 99,95 % wird eingehalten; die letzten zwölf Monate lagen bei 99,97 % [Q10.1] (Fakt · SRE-Runbook v5).
- Der für Juli 2026 geplante Restore-Test wurde nicht durchgeführt; RTO 1 Stunde und RPO 0 sind damit unbelegt [Q10.2] (Aussage · Betrieb, Interview 2026-08-20).
- Das Wissen zum Settlement-Schema ist im DBA-Team konzentriert [Q9.3] (Fakt · ARC-INV-2026-08, Wissenskarte).
- Der DBA-Team-Lead hat faktische Vetomacht über Änderungen am Settlement-Schema [Q9.5] (Aussage · ARC-2026-44).

## Hypothesen

- Das Dual-Write-Fenster wird unterschiedlich eingeschätzt, weil es unter Produktionslast nie gemessen wurde. Geltungsbereich: Zwei fachlich zuständige Stellen nennen Größenordnungen, die um mehr als das Fünffache auseinanderliegen [Q8.3] (Aussage · beide Quellen, siehe Konfliktabschnitt). Widerlegt durch: einen Lasttest, der die Synchronisationslatenz unter produktionsnahen Bedingungen misst.
- Die Entscheidungsfrist ist nicht technisch, sondern durch zwei getrennte Planungszyklen bestimmt. Geltungsbereich: Die eine Frist folgt dem Architektur-Review, die andere dem Budgetzyklus [Q2.5] (Aussage · beide Quellen, siehe Konfliktabschnitt). Widerlegt durch: eine technische Abhängigkeit, die eine der beiden Fristen unabhängig begründet.
- Informelle Vetomacht liegt außerhalb der formalen Entscheidungskette. Geltungsbereich: Bisher ist keine Schemaänderung gegen den Einspruch des DBA-Team-Leads fortgeführt worden [Q9.5] (Aussage · ARC-2026-44). Widerlegt durch: eine dokumentierte Änderung, die trotz Einspruch umgesetzt wurde.
- Der operative Ist-Zustand ist besser belegt als der Rückweg. Geltungsbereich: SLO und Zugriffsmodell sind belegt [Q10.1] (Fakt · SRE-Runbook v5), während für die Phase nach dem Cut-over kein Rückweg beschrieben ist [Q8.4] (Aussage · MIG-2026-09). Widerlegt durch: einen dokumentierten und geprobten Rückweg für die Phase nach dem Cut-over.

## Options-Raum

Optionen, keine Rangfolge. Optionen, die von einem der beiden Konflikte abhängen, sind als
offen/bedingt markiert und tragen die blockierende Q-ID.

- Option 0 — weiter wie bisher: Betrieb ohne Architekturänderung. Der manuelle Reparaturaufwand von 180.000 EUR p.a. bleibt bestehen [Q1.5] (Fakt · FIN-2026-4980). Die Formatumstellung des Kartensystems für 2027 bleibt unadressiert [Q1.2] (Fakt · SCH-2026-11).
- Option 1 — In-Place-Uplift des Nachrichtenformats auf dem bestehenden Kern: erwogen und protokolliert [Q8.1] (Aussage · ARC-2026-44). Aufwandsdimension im Intake nicht geschätzt [Q3.2] (Aussage · FIN-2026-5001).
- Option 2 — Dual-Write-Übergang auf einen neuen Settlement-Kern: erwogen und protokolliert [Q8.1] (Aussage · ARC-2026-44). offen/bedingt — blockiert durch [Q8.3]: Die operative Dauer des Dual-Write ist widersprüchlich belegt, die Spanne reicht von vier Wochen bis sechs Monaten. Zusätzlich offen/bedingt durch [Q2.5]: Ob diese Option in den Entscheidungszeitraum passt, hängt davon ab, welche der beiden Fristen bindet. Enthält einen irreversiblen Schritt, den Settlement-Cut-over [Q8.2] (Aussage · MIG-2026-09, Schritt 4).
- Option 3 — Entscheidung vertagen und die beiden Konflikte auflösen: Diese Option adressiert genau die zwei offenen Punkte, die die übrigen Optionen bedingen — die bindende Frist [Q2.5] und die Dual-Write-Dauer [Q8.3]. Sie ist ebenfalls offen/bedingt, weil auch der Zeitraum des Vertagens von der strittigen Frist abhängt [Q2.5] (Aussage · beide Quellen, siehe Konfliktabschnitt).

## Risiken & Rückweg

- Der Settlement-Cut-over ist der einzige irreversible Schritt; danach ist der alte Settlement-Store für Schreibvorgänge geschlossen und nicht als maßgeblich wiederherstellbar [Q8.2] (Aussage · MIG-2026-09, Schritt 4).
- Vor dem Cut-over ist der Rückweg ein Routing-Schalter unter 30 Minuten; für die Zeit danach ist kein Rückweg beschrieben [Q8.4] (Aussage · MIG-2026-09, Rollback-Abschnitt).
- Das Szenario "Rückkehr ist unmöglich" ist für die Phase vor dem Cut-over bewertet, für die Phase danach nicht [Q8.5] (Aussage · MIG-2026-09, DP-2).
- Der Restore-Test steht aus; RTO und RPO für das Settlement sind damit unbelegt [Q10.2] (Aussage · Betrieb, Interview 2026-08-20).
- Das jährliche Systemaudit im März schränkt Änderungen am Settlement-Pfad zeitlich ein [Q3.4] (Fakt · CMP-2026-09).
- Das Governance-Verfahren dauert erfahrungsgemäß zehn bis vierzehn Wochen [Q3.5] (Fakt · Governance-Handbuch v6). Ob es in den Entscheidungszeitraum passt, ist von der strittigen Frist abhängig [Q2.5] (Aussage · beide Quellen, siehe Konfliktabschnitt).

## Offene Punkte & Konflikte

### Konflikt A — Entscheidungsfrist [Q2.5]

Zwei Aussagen stehen im Protokoll und widersprechen sich. Beide werden hier wörtlich geführt.
Keine wird übernommen.

- Aussage 1 (Aussage · Architektur-Review-Protokoll 2026-08-10, ref ARC-2026-44), CTO: "Decision required by end of Q3 2026."
- Aussage 2 (Aussage · CFO-Budget-Memo 2026-08-15, ref FIN-2026-5001), CFO: "Budget cycle runs to Q1 2027; no commitment before then."
- Status: strittig [Q2.5]. Die Frist ist für diesen Brief kein Datum, sondern ein offener Punkt.

### Konflikt B — Dauer des Dual-Write [Q8.3]

Zwei Aussagen stehen im Protokoll und widersprechen sich. Beide werden hier wörtlich geführt.
Keine wird übernommen.

- Aussage 1 (Aussage · Engineering lead, internes Meeting 2026-08-05): "Dual-write can be operational in 4 weeks."
- Aussage 2 (Aussage · schriftliche Einschätzung des DBA-Teams 2026-08-12, ref DBA-2026-18): "Minimum 6 months for schema reconciliation under dual-write."
- Status: strittig [Q8.3]. Die Dauer ist für diesen Brief keine Zahl, sondern ein offener Punkt.

## To-Verify-Register

| # | Item | Quelle nötig | Status |
|---|---|---|---|
| 1 | Bindende Entscheidungsfrist [Q2.5] | schriftliche Klärung zwischen CTO und CFO | offen — strittig |
| 2 | Operative Dauer des Dual-Write [Q8.3] | gemeinsame technische Bewertung von Engineering und DBA-Team | offen — strittig |
| 3 | Durchgeführter Restore-Test für den Settlement-Store [Q10.2] | Restore-Probe | offen |
| 4 | Rückweg für die Phase nach dem Cut-over [Q8.4] | dokumentierter und geprobter Rollback | offen |
| 5 | Akzeptanzbefugnis für den Merchant-Portal-Read [Q5.5] | Merchant Services | offen |

## Sign-Off

Discovery-Brief, keine Empfehlung; alle Richtungsformulierungen mit offenen to-verify-IDs sind nicht entscheidungsreif. Gesehen: ___

---

intake_version: v1.0 · prompt_version: — · model: hand-authored reference
