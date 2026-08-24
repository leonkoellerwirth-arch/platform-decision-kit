# Intake — Discovery

> Conversation note, not an authoritative source. A statement with an open verification stays a statement — it never becomes a fact by being written down.
> Language: English (canonical).

## 1. Pain & Occasion

### Q1.1  What is the presenting problem in one sentence?
Answer: Änderungen an der Zähler- und Marktdatenplattform brauchen sechs bis neun Monate, weil niemand die Auswirkung auf die elf angeschlossenen Systeme vorhersagen kann.
Basis: fact
Source: Änderungsstatistik ZMP 2024–2026 · Betriebsbericht Q1/2026
Verification: none

### Q1.2  How long has this situation existed, and what changed to trigger a review now?
Answer: Der Zustand besteht seit der Zusammenführung von Netz- und Vertriebsdaten 2019. Ausgelöst hat das Review das Wartungsende der Bestandsversion zum 31.12.2027 und die für Q4/2026 angekündigte Prüfung nach §8a BSIG.
Basis: fact
Source: Herstellermitteilung Wartungsende · Regulierungsmanagement
Verification: open

### Q1.3  Who named this a problem — and who agrees, who does not?
Answer: Benannt hat es der Leiter Messstellenbetrieb. Netzbetrieb und Vertrieb stimmen zu; das Bilanzkreismanagement sieht kein Problem, weil seine Auswertungen aus dem Data Warehouse kommen.
Basis: statement
Source: —
Verification: open

### Q1.4  What has already been attempted to address this situation, and what was the outcome?
Answer: 2023 wurde ein API-Gateway davorgesetzt. Ergebnis: die Fassade steht, drei Konsumenten greifen weiterhin direkt auf die Datenbank zu.
Basis: fact
Source: Architekturreview 2023 · Anhang C
Verification: open

### Q1.5  What is the estimated cost of inaction over 12 months — quantified, or explicitly stated as unquantified?
Answer: Nicht quantifiziert. Genannt wurde „ein zweistelliger Millionenbetrag über drei Jahre“, ohne Herleitung.
Basis: assumption
Source: —
Verification: blocked

## 2. Success & Benchmark

### Q2.1  What is the primary decision question — stated as a question with a yes/no or option-selecting answer?
Answer: Wird die Datenhaltung der Zähler- und Marktdatenplattform bis Q2/2027 abgelöst, oder wird die Wartung der Bestandsversion kostenpflichtig verlängert?
Basis: fact
Source: Geschäftsführungsvorlage IT 2026-04
Verification: none

### Q2.2  Who is the decision owner — the single named person accountable for the outcome?
Answer: Bereichsleiter IT-Anwendungen Netz. Formal benannt, aber nicht schriftlich mit Entscheidungsbefugnis hinterlegt.
Basis: statement
Source: —
Verification: open

### Q2.3  What is explicitly in scope for this decision?
Answer: Datenhaltung und Zugriffsschicht der ZMP.
Basis: fact
Source: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2
Verification: none

### Q2.4  What is explicitly out of scope for this decision?
Answer: Das Abrechnungssystem selbst, das Netzleitsystem und das Data Warehouse.
Basis: fact
Source: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2
Verification: none

### Q2.5  What is the decision deadline, and what happens — explicitly — if it passes without a decision?
Answer: 31.12.2027, Wartungsende der Bestandsversion. Was bei Verstreichen passiert, ist nicht festgelegt — im Gespräch wurde vermutet, dass die kostenpflichtige Verlängerung automatisch gezogen wird.
Basis: assumption
Source: —
Verification: open

### Q2.6  What does success look like in 12 months — in terms that a neutral observer could verify?
Answer: Kein Konsument greift mehr direkt auf die Datenbank zu, und eine Schemaänderung ist in unter vier Wochen produktiv.
Basis: statement
Source: —
Verification: open

### Q2.7  Who must be satisfied for this to be considered a good outcome, and by what criteria do they judge it?
Answer: Die Interne Revision, der Datenschutzbeauftragte und die elf Konsumenten. Kriterien liegen nur für die Revision vor.
Basis: statement
Source: —
Verification: open

## 3. Constraints & Phase

### Q3.1  What architecture or technology mandates are fixed — i.e., not open for discussion in this decision?
Answer: Fest: Betrieb im konzerneigenen Rechenzentrum, Java als Zielsprache, Keycloak als Identitätsanbieter.
Basis: fact
Source: Konzern-Architekturvorgaben v7, Kapitel 3
Verification: none

### Q3.2  What budget envelope exists for this initiative — or is there none defined?
Answer: Kein eigener Rahmen. Die Mittel liegen im Topf „Digitalisierung Netz“ und sind der ZMP nicht zugeordnet.
Basis: fact
Source: Mittelfristplanung IT 2026–2029
Verification: open

### Q3.3  What is the current maturity phase of this platform — how long has it been in production, and what is the cadence of changes?
Answer: Seit 2011 in Produktion, vier Releases pro Jahr, zwei davon reine Wartung.
Basis: fact
Source: Release-Kalender ZMP
Verification: none

### Q3.4  What regulatory or audit commitments constrain the timeline of any change?
Answer: EnWG und MsbG gelten laufend. Die Prüfung nach §8a BSIG ist für Q4/2026 angekündigt, und der IT-Sicherheitskatalog nach §11 Abs. 1a EnWG verlangt ein zertifiziertes ISMS.
Basis: fact
Source: Mitteilung Regulierungsmanagement 2026-02
Verification: open

### Q3.5  What governance process must any significant platform decision pass through, and how long does it take?
Answer: Architekturboard, dann IT-Lenkungsausschuss. Laut Verfahrensanweisung acht Wochen, erfahrungsgemäß ein Quartal.
Basis: statement
Source: —
Verification: open

## 4. Inventory & Knowledge

### Q4.1  What exists today — list the core components, their approximate production age, and their technology stack?
Answer: Oracle 19c, ein Java-EE-Monolith aus 2011, ein API-Gateway aus 2023, zwei Batch-Strecken für Marktkommunikation und Netzabrechnung.
Basis: fact
Source: CMDB-Auszug 2026-08
Verification: none

### Q4.2  Where does the definitive technical documentation live, and when was it last verified against the system?
Answer: Confluence-Raum „ZMP“. Letzter Abgleich gegen das laufende System unbekannt, letzte Seitenänderung 2022.
Basis: fact
Source: Confluence · Raum ZMP
Verification: open

### Q4.3  Which parts of the system does no one currently understand well enough to predict the effect of a change?
Answer: Die nächtliche Abgleichstrecke zwischen ZMP und dem Abrechnungssystem. Der Entwickler, der sie gebaut hat, ist 2024 in Rente gegangen.
Basis: fact
Source: Betrieb · Übergabeprotokoll 2024
Verification: blocked

### Q4.4  What data does the platform manage — and what is the master data situation (single source, duplicates, ownership)?
Answer: Zählpunkt-, Zählwert- und Vertragsdaten sowie Bankverbindungen für den Lastschrifteinzug. Zählpunktbezeichnungen liegen dreifach vor — ZMP, CRM und Abrechnung — ohne führende Quelle.
Basis: fact
Source: Datenlandkarte 2025
Verification: open

### Q4.5  What integrations exist — documented or not — and who knows about them?
Answer: Elf dokumentierte Integrationen. Drei weitere wurden im Gespräch genannt und stehen in keiner Liste.
Basis: statement
Source: —
Verification: open

### Q4.6  What is the current automated test coverage, and when was the last full regression run conducted?
Answer: —
Basis: unknown
Source: —
Verification: open

## 5. Consumers & Interfaces

### Q5.1  Who are the current consumers of this platform — list them and describe how they integrate (sync, async, batch, event)?
Answer: Elf: CRM, Abrechnung, Marktkommunikation (EDIFACT/AS4), Netzleitsystem (lesend), Data Warehouse, Kundenportal, Lieferantenwechsel, Redispatch-Meldung, Zählerfernauslesung, Inkasso, Bilanzkreismanagement.
Basis: fact
Source: API-Gateway · Routing-Tabelle
Verification: none

### Q5.2  Which consumers are business-critical, and what availability or latency do they require?
Answer: Geschäftskritisch sind Marktkommunikation, Redispatch-Meldung und Abrechnung. Erwartet werden 99,9 % und unter 300 ms — verabredet ist nichts davon.
Basis: statement
Source: —
Verification: open

### Q5.3  Are there consumers who have built workarounds, undocumented integrations, or shadow copies of platform data?
Answer: Ja. Das Kundenportal hält eine nächtliche Kopie der Zählwerte, weil die Antwortzeit früher nicht gereicht hat.
Basis: fact
Source: Betrieb · Ticket INC-2019-4471
Verification: open

### Q5.4  Which interfaces are formally contracted or covered by an SLA — and which are informally used?
Answer: Kein einziges Interface ist durch ein SLA abgedeckt.
Basis: fact
Source: Vertragsdatenbank Dienstleister
Verification: none

### Q5.5  Who has the authority to accept a breaking interface change on behalf of each consumer — and is that person reachable?
Answer: —
Basis: unknown
Source: —
Verification: open

## 6. Data & Sovereignty

### Q6.1  What data classifications apply to data this platform stores or processes — and who validated that classification?
Answer: Personenbezogene Zählwerte und Bankverbindungen, Klassifizierung „vertraulich“. Festgestellt vom Datenschutzbeauftragten 2021.
Basis: fact
Source: Schutzbedarfsfeststellung 2021
Verification: none

### Q6.2  Where does personal data enter the platform, and under what legal basis is it processed?
Answer: Über das Kundenportal, den Lieferantenwechsel und die Zählerfernauslesung. Rechtsgrundlage: Vertragserfüllung nach Art. 6 Abs. 1 lit. b DSGVO, für die Messdaten zusätzlich die Bestimmungen des MsbG.
Basis: statement
Source: —
Verification: open

### Q6.3  Who is the named data owner for each major data domain processed by this platform?
Answer: Für Zählpunktdaten benannt. Für Vertrags- und Bankverbindungsdaten nicht.
Basis: fact
Source: Verzeichnis der Verarbeitungstätigkeiten
Verification: open

### Q6.4  What are the documented retention requirements, and is there a working erasure path that has been tested?
Answer: Zehn Jahre nach Vertragsende, Zählwerte nach den Fristen des MsbG. Ein funktionierender Löschweg existiert nicht — Löschungen werden als Sperrkennzeichen abgebildet.
Basis: fact
Source: Löschkonzept 2022, Abschnitt 4
Verification: blocked

### Q6.5  Does data processed by this platform cross jurisdictions or leave the organisation's direct control?
Answer: Laut Betrieb bleibt alles im konzerneigenen Rechenzentrum. Für die Backup-Strecke konnte das im Gespräch niemand bestätigen.
Basis: statement
Source: —
Verification: open

## 7. Regulation & Trust

### Q7.1  What regulatory frameworks apply to this platform — stated by whom, and when was this last reviewed?
Answer: EnWG, MsbG, DSGVO und das BSIG (KRITIS). Festgestellt vom Regulierungsmanagement, zuletzt bestätigt 02/2026.
Basis: fact
Source: Mitteilung Regulierungsmanagement 2026-02
Verification: none

### Q7.2  When was the last external or internal audit that covered this platform, and what were the open findings?
Answer: Interne Revision 03/2025. Zwei Feststellungen zur Zugriffsverwaltung sind offen.
Basis: fact
Source: Revisionsbericht 2025-03
Verification: open

### Q7.3  Is AI/ML in the decision subject itself — in a production system or workflow — or only in the authoring process of this analysis?
Answer: Nein. KI ist nicht im Entscheidungsgegenstand. Eine Lastprognose läuft im Vertriebssystem, nicht in der ZMP.
Basis: fact
Source: Architekturreview 2023
Verification: none

### Q7.4  If AI/ML is in the decision subject: what is the role and risk class per Legal — or is this explicitly open?
Answer: Entfällt, da kein KI/ML im Entscheidungsgegenstand. Die Rechtsabteilung wurde dazu nicht befragt.
Basis: statement
Source: —
Verification: none

### Q7.5  What trust or certification requirements do customers, partners, or regulators impose on this platform?
Answer: Der IT-Sicherheitskatalog verlangt ein nach ISO 27001 zertifiziertes ISMS. Das Zertifikat deckt das Rechenzentrum ab, nicht die Anwendung.
Basis: fact
Source: Zertifikat ISO 27001 · Geltungsbereich
Verification: open

## 8. Migration & Reversibility

### Q8.1  What migration paths have been considered — even informally — and what was the reasoning for or against each?
Answer: Zwei: Ablösung der Datenhaltung auf PostgreSQL im eigenen Rechenzentrum, oder Neubau als Datenprodukt. Die Begründungen wurden mündlich ausgetauscht und nirgends festgehalten.
Basis: statement
Source: —
Verification: open

### Q8.2  Which steps in any migration path under consideration are irreversible — once taken, the previous state cannot be restored?
Answer: Die Umstellung der Bankverbindungsdaten auf ein neues Verschlüsselungsverfahren — die Altbestände sind danach im Altsystem nicht mehr lesbar.
Basis: assumption
Source: —
Verification: blocked

### Q8.3  What approach for running old and new in parallel — if any — has been considered, and for how long?
Answer: Parallelbetrieb wurde als „ein paar Monate“ erwähnt. Wie lange die doppelte Schreiblast neben der Marktkommunikation tragbar ist, hat niemand geprüft.
Basis: assumption
Source: —
Verification: open

### Q8.4  If this migration goes wrong, what is the rollback path — and what does it cost in time and data fidelity?
Answer: —
Basis: unknown
Source: —
Verification: open

### Q8.5  Has the scenario "return is impossible" been explicitly evaluated and documented — not just noted as a risk?
Answer: Nein, nicht bewertet.
Basis: fact
Source: Protokoll Architekturboard 2026-05
Verification: none

### Q8.6  What data migration strategy exists for master data and historical records — particularly records with retention obligations?
Answer: Für Stammdaten offen. Für historische Zählwerte wurde vorgeschlagen, sie im Altsystem zu belassen.
Basis: assumption
Source: —
Verification: open

## 9. Organisation & Team

### Q9.1  Who owns this platform — the single named person or team with accountability for its availability and evolution?
Answer: Team „Marktdaten“, sieben Personen, Leitung benannt. Die Verfügbarkeitsverantwortung liegt formal beim Betrieb, nicht beim Team.
Basis: fact
Source: Organigramm IT 2026
Verification: open

### Q9.2  How does work reach this platform team — who initiates changes, who reviews them, and where do handoffs stall?
Answer: Über das Anforderungsboard des Bereichs. Es staut sich an der fachlichen Abnahme, nicht in der Entwicklung.
Basis: statement
Source: —
Verification: open

### Q9.3  Where is knowledge concentrated — who are the individuals whose absence would delay or block a migration?
Answer: Zwei Personen. Beide sind zusätzlich im Smart-Meter-Rollout eingeplant.
Basis: fact
Source: Ressourcenplanung 2026/2027
Verification: blocked

### Q9.4  What organisational changes — restructuring, key departures, team mergers — are planned or underway that affect this work?
Answer: Der Bereich wird zum 01.01.2027 mit der IT Vertrieb zusammengelegt.
Basis: fact
Source: Mitteilung der Geschäftsführung 2026-06
Verification: open

### Q9.5  Who are the informal decision-makers whose alignment is necessary — even if they have no formal authority over this decision?
Answer: Der Leiter Marktkommunikation. Formal nicht beteiligt, faktisch hat noch keine Schemaänderung ohne seine Zustimmung stattgefunden.
Basis: statement
Source: —
Verification: none

## 10. Operations, Security & Resilience

### Q10.1  What are the current SLO/availability targets — and are they being met? If no SLO exists, state that explicitly.
Answer: Kein SLO dokumentiert. Gemessene Verfügbarkeit der letzten zwölf Monate: 99,7 %.
Basis: fact
Source: Monitoring-Auswertung 08/2025–07/2026
Verification: open

### Q10.2  What are the RTO and RPO targets — and when was the last restore test conducted?
Answer: RTO vier Stunden, RPO 15 Minuten laut Notfallkonzept. Der letzte Restore-Test ist nicht belegt.
Basis: fact
Source: Notfallkonzept IT 2023
Verification: blocked

### Q10.3  What observability exists — what is logged, what is measured, what triggers an alert?
Answer: Protokolle in Splunk, Infrastrukturmetriken in Zabbix. Fachliche Alerts auf die Fristen der Marktkommunikation gibt es nicht.
Basis: fact
Source: Betriebshandbuch ZMP
Verification: none

### Q10.4  What is the incident response process — and what is the change management process? Are they documented and followed?
Answer: Beide dokumentiert. Der Change-Prozess wird gelebt; die Incident-Nachbereitung endet regelmäßig ohne Maßnahme.
Basis: statement
Source: —
Verification: open

### Q10.5  Who has access to production systems and data — and is there a documented, reviewed identity and permissions model?
Answer: Fünfzehn Personen mit produktivem Datenbankzugriff. Eine dokumentierte Rezertifizierung gibt es seit 2024 nicht.
Basis: fact
Source: Revisionsbericht 2025-03, Feststellung 2
Verification: blocked

### Q10.6  What encryption is in place at rest and in transit — and are cryptographic keys managed separately from the data they protect?
Answer: Transportverschlüsselung ja, Verschlüsselung im Ruhezustand nur für Bankverbindungen. Eine Schlüsselrotation ist nicht definiert.
Basis: fact
Source: Kryptokonzept 2021
Verification: open

## To-verify register

- [Q1.2] How long has this situation existed, and what changed to trigger a review now? — Verification: open
- [Q1.3] Who named this a problem — and who agrees, who does not? — Verification: open
- [Q1.4] What has already been attempted to address this situation, and what was the outcome? — Verification: open
- [Q1.5] What is the estimated cost of inaction over 12 months — quantified, or explicitly stated as unquantified? — Verification: blocked
- [Q2.2] Who is the decision owner — the single named person accountable for the outcome? — Verification: open
- [Q2.5] What is the decision deadline, and what happens — explicitly — if it passes without a decision? — Verification: open
- [Q2.6] What does success look like in 12 months — in terms that a neutral observer could verify? — Verification: open
- [Q2.7] Who must be satisfied for this to be considered a good outcome, and by what criteria do they judge it? — Verification: open
- [Q3.2] What budget envelope exists for this initiative — or is there none defined? — Verification: open
- [Q3.4] What regulatory or audit commitments constrain the timeline of any change? — Verification: open
- [Q3.5] What governance process must any significant platform decision pass through, and how long does it take? — Verification: open
- [Q4.2] Where does the definitive technical documentation live, and when was it last verified against the system? — Verification: open
- [Q4.3] Which parts of the system does no one currently understand well enough to predict the effect of a change? — Verification: blocked
- [Q4.4] What data does the platform manage — and what is the master data situation (single source, duplicates, ownership)? — Verification: open
- [Q4.5] What integrations exist — documented or not — and who knows about them? — Verification: open
- [Q4.6] What is the current automated test coverage, and when was the last full regression run conducted? — Verification: open
- [Q5.2] Which consumers are business-critical, and what availability or latency do they require? — Verification: open
- [Q5.3] Are there consumers who have built workarounds, undocumented integrations, or shadow copies of platform data? — Verification: open
- [Q5.5] Who has the authority to accept a breaking interface change on behalf of each consumer — and is that person reachable? — Verification: open
- [Q6.2] Where does personal data enter the platform, and under what legal basis is it processed? — Verification: open
- [Q6.3] Who is the named data owner for each major data domain processed by this platform? — Verification: open
- [Q6.4] What are the documented retention requirements, and is there a working erasure path that has been tested? — Verification: blocked
- [Q6.5] Does data processed by this platform cross jurisdictions or leave the organisation's direct control? — Verification: open
- [Q7.2] When was the last external or internal audit that covered this platform, and what were the open findings? — Verification: open
- [Q7.5] What trust or certification requirements do customers, partners, or regulators impose on this platform? — Verification: open
- [Q8.1] What migration paths have been considered — even informally — and what was the reasoning for or against each? — Verification: open
- [Q8.2] Which steps in any migration path under consideration are irreversible — once taken, the previous state cannot be restored? — Verification: blocked
- [Q8.3] What approach for running old and new in parallel — if any — has been considered, and for how long? — Verification: open
- [Q8.4] If this migration goes wrong, what is the rollback path — and what does it cost in time and data fidelity? — Verification: open
- [Q8.6] What data migration strategy exists for master data and historical records — particularly records with retention obligations? — Verification: open
- [Q9.1] Who owns this platform — the single named person or team with accountability for its availability and evolution? — Verification: open
- [Q9.2] How does work reach this platform team — who initiates changes, who reviews them, and where do handoffs stall? — Verification: open
- [Q9.3] Where is knowledge concentrated — who are the individuals whose absence would delay or block a migration? — Verification: blocked
- [Q9.4] What organisational changes — restructuring, key departures, team mergers — are planned or underway that affect this work? — Verification: open
- [Q10.1] What are the current SLO/availability targets — and are they being met? If no SLO exists, state that explicitly. — Verification: open
- [Q10.2] What are the RTO and RPO targets — and when was the last restore test conducted? — Verification: blocked
- [Q10.4] What is the incident response process — and what is the change management process? Are they documented and followed? — Verification: open
- [Q10.5] Who has access to production systems and data — and is there a documented, reviewed identity and permissions model? — Verification: blocked
- [Q10.6] What encryption is in place at rest and in transit — and are cryptographic keys managed separately from the data they protect? — Verification: open
