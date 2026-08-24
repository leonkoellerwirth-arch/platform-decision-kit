<!-- hand-authored reference output — the target shape for an agent brief, written by a human -->
# Discovery-Brief — RetailCore OMS

Fiktives Szenario. Grundlage ist ausschließlich `intake-filled.md`. Jede Aussage trägt die
Q-ID der Frage, aus der sie stammt, und den Tag, mit dem sie im Intake erfasst wurde.

## Lagebild

- Die Auftragsverarbeitung hat sich in sechs Monaten von durchschnittlich 120ms auf 950ms verschlechtert [Q1.1] (Fakt · Monitoring-Dashboard, Export 2026-08-01).
- Auslöser des Reviews war das Überschreiten von 12 SLA-Verletzungen im Juli 2026 [Q1.2] (Fakt · SLA-Breach-Log Fulfilment, Juli 2026).
- Zwei frühere Eingriffe sind dokumentiert: Connection-Pool-Tuning mit dreiwöchiger Teilentlastung und ein Read-Replica für den Analytics-Export, das hält [Q1.4] (Fakt · CHG-2026-0212, CHG-2026-0517).
- Die Plattform läuft seit acht Jahren in Produktion, rund zwei Releases pro Monat, Freeze zur Hochsaison [Q3.3] (Fakt · Release-Log 2018–2026).
- Der Bestand ist inventarisiert: Java-Monolith, PostgreSQL 14, Batch-Export, internes Admin-UI, verifiziert am 2026-06-30 [Q4.1] (Fakt · ARC-INV-2026-05).
- Dunkle Zonen bestehen nicht mehr; die letzte nicht zugeordnete Komponente wurde im Juni-Inventar dokumentiert und mit Tests abgedeckt [Q4.3] (Fakt · ARC-INV-2026-05, Abschnitt 4).
- Drei Konsumenten sind erfasst: Fulfilment und Customer Service synchron über REST, Analytics als nächtlicher Batch [Q5.1] (Fakt · Integrationsregister ARC-INV-2026-05).
- Fulfilment ist geschäftskritisch mit 99,5 % Verfügbarkeit und p95 unter 400ms; Customer Service toleriert Degradation, Analytics hat keine Latenzanforderung [Q5.2] (Fakt · SLA-2025-03).
- Schattenintegrationen wurden nicht gefunden; 90 Tage API-Zugriffslogs wurden gegen das Integrationsregister abgeglichen [Q5.3] (Fakt · ARC-INV-2026-05, Anhang B).
- Auftragsdaten sind als Internal, Kundenreferenzdaten als Confidential klassifiziert, geprüft durch den Datenschutzbeauftragten [Q6.1] (Fakt · CLS-2026-01, 2026-03-11).
- Die Aufbewahrung beträgt sieben Jahre ab letzter Transaktion; der Löschpfad wurde am 2026-04-22 Ende-zu-Ende getestet [Q6.4] (Fakt · RET-2025-01, ERT-2026-04).
- KI/ML ist nicht im Entscheidungsgegenstand; KI wird ausschließlich im Autorenprozess dieser Analyse eingesetzt [Q7.3] (Fakt · Scoping-Statement, Architektur-Review 2026-08-10).
- Die Plattform gehört dem Platform-Engineering-Team; ein verantwortlicher Lead ist benannt [Q9.1] (Fakt · Org-Chart 2026-07, SVC-014).
- Das SLO von 99,5 % monatlicher Verfügbarkeit wird eingehalten; die letzten zwölf Monate lagen bei 99,7 % [Q10.1] (Fakt · SRE-Runbook v3).
- RTO 4 Stunden und RPO 15 Minuten wurden im Restore-Test am 2026-02-19 erreicht [Q10.2] (Fakt · RST-2026-02).
- Produktionszugriff ist rollenbasiert über den zentralen Identity-Provider geregelt und wurde zuletzt am 2026-07-01 geprüft [Q10.5] (Fakt · AR-2026-Q2).

## Hypothesen

Die folgenden Sätze sind Hypothesen, keine Feststellungen. Jede trägt ihren Geltungsbereich
und die Bedingung, unter der sie widerlegt wäre.

- Der benannte Schmerz ist ein Symptom und nicht die Ursache. Geltungsbereich: Der Schmerz wird primär aus einer Stakeholder-Perspektive beschrieben — Analytics hält die Latenz für nachrangig [Q1.3] (Aussage · Architektur-Review-Protokoll 2026-08-10). Widerlegt durch: ein dokumentiertes technisches Einzelereignis als nachvollziehbare Ursache.
- Die Entscheidungsfrist ist finanziell und nicht technisch bestimmt. Geltungsbereich: Die Frist 2026-11-30 fällt mit der Capex-Zuteilung zusammen [Q2.5] (Aussage · CFO-Memo 2026-07-15, FIN-2026-4412). Widerlegt durch: eine technische Abhängigkeit, die dieselbe Frist unabhängig begründet.
- Informelle Vetomacht liegt außerhalb der formalen Entscheidungskette. Geltungsbereich: Bisher ist keine OMS-Änderung gegen den Einspruch des Head of Fulfillment fortgeführt worden [Q9.5] (Aussage · Architektur-Review-Protokoll 2026-08-10). Widerlegt durch: eine dokumentierte Änderung, die trotz Einspruch umgesetzt wurde.
- Das Dual-Run-Fenster ist knapper kalkuliert, als der Abgleich der Stammdaten erlaubt. Geltungsbereich: Ein Quartal Parallelbetrieb inklusive Hochsaison ist erwogen und kalkuliert, aber nicht unter Produktionslast gemessen [Q8.3] (Aussage · MIG-2026-02, Abschnitt 3). Widerlegt durch: ein Lasttest, der die tatsächliche Synchronisationslatenz unter produktionsnahen Bedingungen misst.

## Options-Raum

Optionen, keine Rangfolge. Die Kostenangaben sind Dimensionen aus dem Intake, keine Kalkulation
dieses Briefs.

- Option 0 — weiter wie bisher: Betrieb ohne Architekturänderung. Die Kosten der Untätigkeit sind mit 240.000 EUR über zwölf Monate beziffert [Q1.5] (Fakt · FIN-2026-4390). Der Betrieb erfüllt sein SLO [Q10.1] (Fakt · SRE-Runbook v3); die Latenzverschlechterung bleibt bestehen [Q1.1] (Fakt · Monitoring-Dashboard).
- Option 1 — In-Place-Optimierung: erwogen und im Architektur-Review dokumentiert [Q8.1] (Aussage · ARC-2026-31). Zwei frühere Eingriffe dieser Art sind dokumentiert, einer mit dauerhaftem Effekt [Q1.4] (Fakt · CHG-2026-0517). Aufwandsdimension im Intake nicht geschätzt [Q8.1] (Aussage · ARC-2026-31).
- Option 2 — ereignisgetriebener Umbau mit Strangler-Schnitt: erwogen und dokumentiert [Q8.1] (Aussage · ARC-2026-31). Einmalig: bis zu 800.000 EUR Capex [Q3.2] (Aussage · CFO-Memo 2026-07-15). Laufend: 120.000 EUR p.a. Opex-Aufschlag [Q3.2] (Aussage · CFO-Memo 2026-07-15). Enthält einen irreversiblen Schritt, den Cut-over der Auftragszustandsmaschine [Q8.2] (Aussage · MIG-2026-02, Schritt 6).
- Option 3 — vollständiger Rewrite: erwogen und wegen Lieferrisiko zurückgestellt [Q8.1] (Aussage · ARC-2026-31). Kostendimension im Intake nicht geschätzt [Q8.1] (Aussage · ARC-2026-31).
- Option 4 — Entscheidung vertagen und Discovery vertiefen: Die Discovery ist für dieses Intake abgeschlossen, das To-Verify-Register ist leer [Q4.3] (Fakt · ARC-INV-2026-05). Diese Option löst hier keine offenen Punkte auf; sie bleibt aufgeführt, weil das Vertagen bis zum 2026-11-30 die Capex-Zuteilung in den FY2027-Zyklus zurückgibt [Q2.5] (Aussage · CFO-Memo 2026-07-15).

## Risiken & Rückweg

- Der Cut-over der Auftragszustandsmaschine ist der einzige irreversible Schritt; danach ist der Schreibpfad des Monolithen stillgelegt [Q8.2] (Aussage · MIG-2026-02, Schritt 6).
- Vor dem Cut-over ist der Rückweg ein Konfigurationsschalter unter einer Stunde ohne Datenverlust; danach erfordert er einen Replay von rund zwölf Stunden bei erhaltener Datentreue [Q8.4] (Aussage · MIG-2026-02, Rollback-Abschnitt).
- Das Szenario "Rückkehr ist unmöglich" ist explizit bewertet und als datierter Entscheidungspunkt dokumentiert, nicht als Risikozeile [Q8.5] (Fakt · MIG-2026-02, DP-3).
- Historische Auftragsdaten unter Aufbewahrungspflicht werden vor dem Cut-over in einem verifizierten Bulk-Load migriert; das Sieben-Jahres-Fenster bleibt erhalten [Q8.6] (Aussage · MIG-2026-02, Datenabschnitt).
- Das Governance-Verfahren dauert erfahrungsgemäß sechs bis acht Wochen und liegt damit innerhalb der Frist, aber ohne Puffer [Q3.5] (Fakt · Governance-Handbuch v4).
- Der jährliche PCI-nahe Scope-Review im Januar schränkt Änderungen an Auftragsdatensätzen zeitlich ein [Q3.4] (Fakt · CMP-2026-02).

## Team & Verankerung

- Die Plattform gehört dem Platform-Engineering-Team; ein verantwortlicher Lead ist benannt [Q9.1] (Fakt · Org-Chart 2026-07, SVC-014).
- Arbeit erreicht das Team über den Service-Katalog, wird wöchentlich triagiert und von zwei Plattform-Ingenieuren geprüft; Übergaben stocken am häufigsten am Analytics-Export-Vertrag [Q9.2] (Fakt · Ticket-Flow-Analyse Q2 2026).
- Das Wissen zur Auftragszustandsmaschine liegt bei drei Ingenieuren; die frühere Einzelkonzentration wurde im Juni-Inventar aufgelöst [Q9.3] (Fakt · ARC-INV-2026-05, Wissenskarte).
- Eine Umstrukturierung ist nicht geplant; im Oktober 2026 kommt ein Ingenieur hinzu [Q9.4] (Fakt · Workforce-Plan 2026-H2).
- Der Head of Fulfillment hält informelle Vetomacht [Q9.5] (Aussage · Architektur-Review-Protokoll 2026-08-10).
- Das Governance-Verfahren verlangt Architektur-Board und CFO-Freigabe, erfahrungsgemäß sechs bis acht Wochen [Q3.5] (Fakt · Governance-Handbuch v4).

## Offene Punkte & Konflikte

Keine Widersprüche im Intake. Keine offenen Verifikationspunkte.

## To-Verify-Register

| # | Item | Quelle nötig | Status |
|---|---|---|---|
| — | (leer — alle Punkte im Intake aufgelöst) | — | geschlossen |

## Sign-Off

Discovery-Brief, keine Empfehlung; alle Richtungsformulierungen mit offenen to-verify-IDs sind nicht entscheidungsreif. Gesehen: ___

---

intake_version: v1.0 · prompt_version: — · model: hand-authored reference
