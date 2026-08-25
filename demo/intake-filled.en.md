# Intake — Discovery

> Conversation note, not an authoritative source. A statement with an open verification stays a statement. It never becomes a fact by being written down.
> Language: English (canonical).

## Decision head

- Decision question: Wird die Datenhaltung der Zähler- und Marktdatenplattform bis Q2/2027 abgelöst, oder wird die Wartung der Bestandsversion verlängert?
- Decision owner: Bereichsleiter IT-Anwendungen Netz (benannt, Befugnis nicht schriftlich)
- In scope: Datenhaltung und Zugriffsschicht der ZMP
- Out of scope: Abrechnungssystem, Netzleitsystem, Data Warehouse
- Deadline: 31.12.2027 — Wartungsende der Bestandsversion

## 1. Pain & Occasion

### Q1.1  What is the presenting problem in one sentence?
Answer: Änderungen an der Zähler- und Marktdatenplattform brauchen sechs bis neun Monate, weil niemand die Auswirkung auf die elf angeschlossenen Systeme vorhersagen kann.
Basis: fact
Where it came from: Document or system: Änderungsstatistik ZMP 2024–2026 · Betriebsbericht Q1/2026 · Date: 2026-04-30
Verification: none

### Q1.2  How long has this situation existed, and what changed to trigger a review now?
Answer: Der Zustand besteht seit der Zusammenführung von Netz- und Vertriebsdaten 2019. Ausgelöst hat das Review das Wartungsende der Bestandsversion zum 31.12.2027 und die für Q4/2026 angekündigte Prüfung nach §8a BSIG.
Basis: fact
Where it came from: Document or system: Herstellermitteilung Wartungsende · Regulierungsmanagement · Who said it: Regulierungsmanagement · Date: 2026-02-19
Verification: open
What closes it: Owed by: Regulierungsmanagement · Proof needed: Herstellerbestätigung des Wartungsendes und der Verlängerungskonditionen, schriftlich · By: 2026-09-30

### Q1.3  Who named this a problem — and who agrees, who does not?
Answer: Benannt hat es der Leiter Messstellenbetrieb. Netzbetrieb und Vertrieb stimmen zu; das Bilanzkreismanagement sieht kein Problem, weil seine Auswertungen aus dem Data Warehouse kommen.
Basis: statement
Where it came from: Who said it: Leiter Messstellenbetrieb · Date: 2026-08-13
Verification: open
What closes it: Owed by: Leiter Messstellenbetrieb · Proof needed: Stellungnahme des Bilanzkreismanagements zur Abhängigkeit seiner Auswertungen · By: 2026-10-15

### Q1.4  What has already been attempted to address this situation, and what was the outcome?
Answer: 2023 wurde ein API-Gateway davorgesetzt. Ergebnis: die Fassade steht, drei Konsumenten greifen weiterhin direkt auf die Datenbank zu.
Basis: fact
Where it came from: Document or system: Architekturreview 2023 · Anhang C · Date: 2023-10-05
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Zugriffsprotokoll der Datenbank über 90 Tage, das die drei Direktzugriffe belegt · By: 2026-09-30

### Q1.5  What is the estimated cost of inaction over 12 months — quantified, or explicitly stated as unquantified?
Answer: Nicht quantifiziert. Genannt wurde „ein zweistelliger Millionenbetrag über drei Jahre“, ohne Herleitung.
Basis: assumption
Where it came from: Who said it: Bereichsleiter IT-Anwendungen Netz · Date: 2026-08-13
Verification: blocked
What closes it: Proof needed: Herleitung der genannten Kostenschätzung, oder eine Rechnung, die sie ersetzt · Blocked by: Es existiert keine Herleitung; die Zahl wurde mündlich genannt

## 2. Success & Benchmark

### Q2.1  What is the primary decision question — stated as a question with a yes/no or option-selecting answer?
Answer: Wird die Datenhaltung der Zähler- und Marktdatenplattform bis Q2/2027 abgelöst, oder wird die Wartung der Bestandsversion kostenpflichtig verlängert?
Basis: fact
Where it came from: Document or system: Geschäftsführungsvorlage IT 2026-04 · Date: 2026-04-21
Verification: none

### Q2.2  Who is the decision owner — the single named person accountable for the outcome?
Answer: Bereichsleiter IT-Anwendungen Netz. Formal benannt, aber nicht schriftlich mit Entscheidungsbefugnis hinterlegt.
Basis: statement
Where it came from: Who said it: Bereichsleiter IT-Anwendungen Netz · Date: 2026-08-13
Verification: open
What closes it: Owed by: Bereichsleiter IT-Anwendungen Netz · Proof needed: Schriftlich hinterlegte Entscheidungsbefugnis · By: 2026-09-30

### Q2.3  What is explicitly in scope for this decision?
Answer: Datenhaltung und Zugriffsschicht der ZMP.
Basis: fact
Where it came from: Document or system: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2 · Date: 2026-04-21
Verification: none

### Q2.4  What is explicitly out of scope for this decision?
Answer: Das Abrechnungssystem selbst, das Netzleitsystem und das Data Warehouse.
Basis: fact
Where it came from: Document or system: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2 · Date: 2026-04-21
Verification: none

### Q2.5  What is the decision deadline, and what happens — explicitly — if it passes without a decision?
Answer: 31.12.2027, Wartungsende der Bestandsversion. Was bei Verstreichen passiert, ist nicht festgelegt — im Gespräch wurde vermutet, dass die kostenpflichtige Verlängerung automatisch gezogen wird.
Basis: assumption
Where it came from: Who said it: Bereichsleiter IT-Anwendungen Netz · Date: 2026-08-13
Verification: open
What closes it: Owed by: Bereichsleiter IT-Anwendungen Netz · Proof needed: Festlegung, was am 01.01.2028 geschieht, schriftlich · By: 2026-10-31

### Q2.6  What does success look like in 12 months — in terms that a neutral observer could verify?
Answer: Kein Konsument greift mehr direkt auf die Datenbank zu, und eine Schemaänderung ist in unter vier Wochen produktiv.
Basis: statement
Where it came from: Who said it: Leiter Messstellenbetrieb · Date: 2026-08-13
Verification: open
What closes it: Owed by: Leiter Messstellenbetrieb · Proof needed: Erfolgsdefinition mit messbarem Kriterium, von den Urteilenden abgenommen · By: 2026-10-15

### Q2.7  Who must be satisfied for this to be considered a good outcome, and by what criteria do they judge it?
Answer: Die Interne Revision, der Datenschutzbeauftragte und die elf Konsumenten. Kriterien liegen nur für die Revision vor.
Basis: statement
Where it came from: Who said it: Bereichsleiter IT-Anwendungen Netz · Date: 2026-08-13
Verification: open
What closes it: Proof needed: Abnahmekriterien der elf Konsumenten und des Datenschutzbeauftragten · Blocked by: Kriterien liegen nur für die Revision vor

## 3. Constraints & Phase

### Q3.1  What architecture or technology mandates are fixed — i.e., not open for discussion in this decision?
Answer: Fest: Betrieb im konzerneigenen Rechenzentrum, Java als Zielsprache, Keycloak als Identitätsanbieter.
Basis: fact
Where it came from: Document or system: Konzern-Architekturvorgaben v7, Kapitel 3 · Date: 2025-11-01
Verification: none

### Q3.2  What budget envelope exists for this initiative — or is there none defined?
Answer: Kein eigener Rahmen. Die Mittel liegen im Topf „Digitalisierung Netz“ und sind der ZMP nicht zugeordnet.
Basis: fact
Where it came from: Document or system: Mittelfristplanung IT 2026–2029 · Date: 2025-12-10
Verification: open
What closes it: Owed by: Bereichsleiter IT-Anwendungen Netz · Proof needed: Mittelzuordnung zur ZMP im Topf „Digitalisierung Netz“ · By: 2026-11-30

### Q3.3  What is the current maturity phase of this platform — how long has it been in production, and what is the cadence of changes?
Answer: Seit 2011 in Produktion, vier Releases pro Jahr, zwei davon reine Wartung.
Basis: fact
Where it came from: Document or system: Release-Kalender ZMP · Date: 2026-07-01
Verification: none

### Q3.4  What regulatory or audit commitments constrain the timeline of any change?
Answer: EnWG und MsbG gelten laufend. Die Prüfung nach §8a BSIG ist für Q4/2026 angekündigt, und der IT-Sicherheitskatalog nach §11 Abs. 1a EnWG verlangt ein zertifiziertes ISMS.
Basis: fact
Where it came from: Document or system: Mitteilung Regulierungsmanagement 2026-02 · Who said it: Regulierungsmanagement · Date: 2026-02-19
Verification: open
What closes it: Owed by: Regulierungsmanagement · Proof needed: Prüfungsankündigung §8a BSIG mit Termin und Prüfumfang · By: 2026-09-15

### Q3.5  What governance process must any significant platform decision pass through, and how long does it take?
Answer: Architekturboard, dann IT-Lenkungsausschuss. Laut Verfahrensanweisung acht Wochen, erfahrungsgemäß ein Quartal.
Basis: statement
Where it came from: Who said it: Bereichsleiter IT-Anwendungen Netz · Date: 2026-08-13
Verification: open
What closes it: Owed by: Bereichsleiter IT-Anwendungen Netz · Proof needed: Verfahrensanweisung und die Durchlaufzeiten der letzten vier Vorlagen · By: 2026-10-15

## 4. Inventory & Knowledge

### Q4.1  What exists today — list the core components, their approximate production age, and their technology stack?
Answer: Oracle 19c, ein Java-EE-Monolith aus 2011, ein API-Gateway aus 2023, zwei Batch-Strecken für Marktkommunikation und Netzabrechnung.
Basis: fact
Where it came from: Document or system: CMDB-Auszug 2026-08 · Date: 2026-08-04
Verification: none

### Q4.2  Where does the definitive technical documentation live, and when was it last verified against the system?
Answer: Confluence-Raum „ZMP“. Letzter Abgleich gegen das laufende System unbekannt, letzte Seitenänderung 2022.
Basis: fact
Where it came from: Document or system: Confluence · Raum ZMP · Date: 2022-11-08
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Abgleich des Confluence-Raums gegen das laufende System, mit Datum · By: 2026-11-30

### Q4.3  Which parts of the system does no one currently understand well enough to predict the effect of a change?
Answer: Die nächtliche Abgleichstrecke zwischen ZMP und dem Abrechnungssystem. Der Entwickler, der sie gebaut hat, ist 2024 in Rente gegangen.
Basis: fact
Where it came from: Document or system: Betrieb · Übergabeprotokoll 2024 · Who said it: Teamleitung Betrieb · Date: 2024-09-30
Verification: blocked
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Ablaufbeschreibung der nächtlichen Abgleichstrecke, gegen den laufenden Job geprüft · By: 2026-11-30 · Blocked by: Niemand im Haus kennt die Strecke; ohne externe Rekonstruktion nicht zu belegen

### Q4.4  What data does the platform manage — and what is the master data situation (single source, duplicates, ownership)?
Answer: Zählpunkt-, Zählwert- und Vertragsdaten sowie Bankverbindungen für den Lastschrifteinzug. Zählpunktbezeichnungen liegen dreifach vor — ZMP, CRM und Abrechnung — ohne führende Quelle.
Basis: fact
Where it came from: Document or system: Datenlandkarte 2025 · Date: 2025-03-20
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Benennung der führenden Quelle je Datendomäne, schriftlich · By: 2026-11-15

### Q4.5  What integrations exist — documented or not — and who knows about them?
Answer: Elf dokumentierte Integrationen. Drei weitere wurden im Gespräch genannt und stehen in keiner Liste.
Basis: statement
Where it came from: Who said it: Teamleitung Marktdaten · Date: 2026-08-13
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Vollständige Integrationsliste aus dem Zugriffsprotokoll, nicht aus der Dokumentation · By: 2026-09-30

### Q4.6  What is the current automated test coverage, and when was the last full regression run conducted?
Answer: —
Basis: unknown
Where it came from: —
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Coverage-Bericht des letzten Builds und das Datum des letzten Vollregressionslaufs · By: 2026-09-30

### Q4.7  Which external services or systems must be reachable at runtime for the platform to function — and what happens to it when each one is unavailable?
Answer: Keycloak für die Anmeldung, der EDIFACT/AS4-Konnektor für die Marktkommunikation, und der Zeitdienst des Rechenzentrums. Fällt Keycloak aus, ist die Plattform ohne Anmeldung; fällt der Konnektor aus, puffert die Marktkommunikation 24 Stunden. Für den Zeitdienst hat das niemand geprüft.
Basis: statement
Where it came from: Who said it: Teamleitung Betrieb · Date: 2026-08-13
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Ausfallverhalten je Laufzeitabhängigkeit, getestet und protokolliert · By: 2026-11-30

## 5. Consumers & Interfaces

### Q5.1  Who are the current consumers of this platform — list them and describe how they integrate (sync, async, batch, event)?
Answer: Elf: CRM, Abrechnung, Marktkommunikation (EDIFACT/AS4), Netzleitsystem (lesend), Data Warehouse, Kundenportal, Lieferantenwechsel, Redispatch-Meldung, Zählerfernauslesung, Inkasso, Bilanzkreismanagement.
Basis: fact
Where it came from: Document or system: API-Gateway · Routing-Tabelle · Date: 2026-08-04
Verification: none

### Q5.2  Which consumers are business-critical, and what availability or latency do they require?
Answer: Geschäftskritisch sind Marktkommunikation, Redispatch-Meldung und Abrechnung. Erwartet werden 99,9 % und unter 300 ms — verabredet ist nichts davon.
Basis: statement
Where it came from: Who said it: Leiter Messstellenbetrieb · Date: 2026-08-13
Verification: open
What closes it: Owed by: Leiter Messstellenbetrieb · Proof needed: Schriftliche Verfügbarkeits- und Latenzanforderung je geschäftskritischem Konsumenten · By: 2026-10-15

### Q5.3  Are there consumers who have built workarounds, undocumented integrations, or shadow copies of platform data?
Answer: Ja. Das Kundenportal hält eine nächtliche Kopie der Zählwerte, weil die Antwortzeit früher nicht gereicht hat.
Basis: fact
Where it came from: Document or system: Betrieb · Ticket INC-2019-4471 · Date: 2019-07-22
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Liste der Schattenkopien mit Alter und Zweck · By: 2026-10-31

### Q5.4  Which interfaces are formally contracted or covered by an SLA — and which are informally used?
Answer: Kein einziges Interface ist durch ein SLA abgedeckt.
Basis: fact
Where it came from: Document or system: Vertragsdatenbank Dienstleister · Date: 2026-06-30
Verification: none

### Q5.5  Who has the authority to accept a breaking interface change on behalf of each consumer — and is that person reachable?
Answer: —
Basis: unknown
Where it came from: —
Verification: open
What closes it: Owed by: Leiter Messstellenbetrieb · Proof needed: Je Konsument eine benannte, erreichbare Person mit Zustimmungsbefugnis · By: 2026-10-31

### Q5.6  What load does the platform actually carry today — volume per day, the peak and when it occurs — and what growth is expected over the horizon of this decision?
Answer: Rund 1,4 Mio. Zählwerte pro Tag, Spitze zwischen 02:00 und 04:00 beim nächtlichen Abgleich. Zum Monatswechsel das Dreifache. Erwartet wird eine Verdopplung bis 2029 durch den Smart-Meter-Rollout.
Basis: fact
Where it came from: Document or system: Monitoring-Auswertung 08/2025–07/2026 · Date: 2026-08-01 · Source: Auswertung Lastprofil, 12 Monate
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Wachstumsannahme des Smart-Meter-Rollouts, schriftlich bestätigt · By: 2026-10-31

## 6. Data & Sovereignty

### Q6.1  What data classifications apply to data this platform stores or processes — and who validated that classification?
Answer: Personenbezogene Zählwerte und Bankverbindungen, Klassifizierung „vertraulich“. Festgestellt vom Datenschutzbeauftragten 2021.
Basis: fact
Where it came from: Document or system: Schutzbedarfsfeststellung 2021 · Who said it: Datenschutzbeauftragter · Date: 2021-06-15
Verification: none

### Q6.2  Where does personal data enter the platform, and under what legal basis is it processed?
Answer: Über das Kundenportal, den Lieferantenwechsel und die Zählerfernauslesung. Rechtsgrundlage: Vertragserfüllung nach Art. 6 Abs. 1 lit. b DSGVO, für die Messdaten zusätzlich die Bestimmungen des MsbG.
Basis: statement
Where it came from: Who said it: Datenschutzbeauftragter · Date: 2026-08-13
Verification: open
What closes it: Owed by: Datenschutzbeauftragter · Proof needed: Verzeichnis der Verarbeitungstätigkeiten im aktuellen Stand · By: 2026-10-15

### Q6.3  Who is the named data owner for each major data domain processed by this platform?
Answer: Für Zählpunktdaten benannt. Für Vertrags- und Bankverbindungsdaten nicht.
Basis: fact
Where it came from: Document or system: Verzeichnis der Verarbeitungstätigkeiten · Who said it: Datenschutzbeauftragter · Date: 2025-09-01
Verification: open
What closes it: Owed by: Datenschutzbeauftragter · Proof needed: Benannte Verantwortliche für Vertrags- und Bankverbindungsdaten · By: 2026-10-15

### Q6.4  What are the documented retention requirements, and is there a working erasure path that has been tested?
Answer: Zehn Jahre nach Vertragsende, Zählwerte nach den Fristen des MsbG. Ein funktionierender Löschweg existiert nicht — Löschungen werden als Sperrkennzeichen abgebildet.
Basis: fact
Where it came from: Document or system: Löschkonzept 2022, Abschnitt 4 · Date: 2022-05-11
Verification: blocked
What closes it: Owed by: Datenschutzbeauftragter · Proof needed: Getesteter Löschweg, mit Protokoll des Tests · By: 2026-12-15 · Blocked by: Ein Löschweg existiert nicht; er muss erst gebaut werden

### Q6.5  Does data processed by this platform cross jurisdictions or leave the organisation's direct control?
Answer: Laut Betrieb bleibt alles im konzerneigenen Rechenzentrum. Für die Backup-Strecke konnte das im Gespräch niemand bestätigen.
Basis: statement
Where it came from: Who said it: Teamleitung Betrieb · Date: 2026-08-13
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Bestätigung des Speicherorts der Backup-Strecke, schriftlich · By: 2026-09-30

## 7. Regulation & Trust

### Q7.1  What regulatory frameworks apply to this platform — stated by whom, and when was this last reviewed?
Answer: EnWG, MsbG, DSGVO und das BSIG (KRITIS). Festgestellt vom Regulierungsmanagement, zuletzt bestätigt 02/2026.
Basis: fact
Where it came from: Document or system: Mitteilung Regulierungsmanagement 2026-02 · Who said it: Regulierungsmanagement · Date: 2026-02-19
Verification: none

### Q7.2  When was the last external or internal audit that covered this platform, and what were the open findings?
Answer: Interne Revision 03/2025. Zwei Feststellungen zur Zugriffsverwaltung sind offen.
Basis: fact
Where it came from: Document or system: Revisionsbericht 2025-03 · Who said it: Interne Revision · Date: 2025-03-27
Verification: open
What closes it: Owed by: Interne Revision · Proof needed: Erledigungsnachweis der zwei offenen Feststellungen · By: 2026-11-30

### Q7.3  Is AI/ML in the decision subject itself — in a production system or workflow — or only in the authoring process of this analysis?
Answer: Nein. KI ist nicht im Entscheidungsgegenstand. Eine Lastprognose läuft im Vertriebssystem, nicht in der ZMP.
Basis: fact
Where it came from: Document or system: Architekturreview 2023 · Date: 2023-10-05
Verification: none

### Q7.4  If AI/ML is in the decision subject: what is the role and risk class per Legal — or is this explicitly open?
Answer: Entfällt, da kein KI/ML im Entscheidungsgegenstand. Die Rechtsabteilung wurde dazu nicht befragt.
Basis: statement
Where it came from: Who said it: Regulierungsmanagement · Date: 2026-08-13
Verification: none

### Q7.5  What trust or certification requirements do customers, partners, or regulators impose on this platform?
Answer: Der IT-Sicherheitskatalog verlangt ein nach ISO 27001 zertifiziertes ISMS. Das Zertifikat deckt das Rechenzentrum ab, nicht die Anwendung.
Basis: fact
Where it came from: Document or system: Zertifikat ISO 27001 · Geltungsbereich · Date: 2024-10-01
Verification: open
What closes it: Owed by: Regulierungsmanagement · Proof needed: Geltungsbereich des ISO-27001-Zertifikats, geprüft gegen die Anforderung des Sicherheitskatalogs · By: 2026-09-30

## 8. Migration & Reversibility

### Q8.1  What migration paths have been considered — even informally — and what was the reasoning for or against each?
Answer: Zwei: Ablösung der Datenhaltung auf PostgreSQL im eigenen Rechenzentrum, oder Neubau als Datenprodukt. Die Begründungen wurden mündlich ausgetauscht und nirgends festgehalten.
Basis: statement
Where it came from: Who said it: Teamleitung Marktdaten · Date: 2026-08-13
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Die beiden Optionen schriftlich, mit ihren Begründungen · By: 2026-10-31

### Q8.2  Which steps in any migration path under consideration are irreversible — once taken, the previous state cannot be restored?
Answer: Die Umstellung der Bankverbindungsdaten auf ein neues Verschlüsselungsverfahren — die Altbestände sind danach im Altsystem nicht mehr lesbar.
Basis: assumption
Where it came from: Who said it: Teamleitung Marktdaten · Date: 2026-08-13
Verification: blocked
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Migrationsplan mit benannten irreversiblen Schritten, vom Datenschutzbeauftragten gegengezeichnet · By: 2026-12-15 · Blocked by: Setzt die Entscheidung über das Verschlüsselungsverfahren voraus

### Q8.3  What approach for running old and new in parallel — if any — has been considered, and for how long?
Answer: Parallelbetrieb wurde als „ein paar Monate“ erwähnt. Wie lange die doppelte Schreiblast neben der Marktkommunikation tragbar ist, hat niemand geprüft.
Basis: assumption
Where it came from: Who said it: Teamleitung Betrieb · Date: 2026-08-13
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Lasttest des Parallelbetriebs neben der Marktkommunikation · By: 2026-12-15

### Q8.4  If this migration goes wrong, what is the rollback path — and what does it cost in time and data fidelity?
Answer: —
Basis: unknown
Where it came from: —
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Beschriebener und geprobter Rückweg je Migrationsschritt · By: 2026-12-15

### Q8.5  Has the scenario "return is impossible" been explicitly evaluated and documented — not just noted as a risk?
Answer: Nein, nicht bewertet.
Basis: fact
Where it came from: Document or system: Protokoll Architekturboard 2026-05 · Date: 2026-05-12
Verification: none

### Q8.6  What data migration strategy exists for master data and historical records — particularly records with retention obligations?
Answer: Für Stammdaten offen. Für historische Zählwerte wurde vorgeschlagen, sie im Altsystem zu belassen.
Basis: assumption
Where it came from: Who said it: Teamleitung Marktdaten · Date: 2026-08-13
Verification: open
What closes it: Proof needed: Festlegung, welche Daten mitgehen und welche im Altsystem bleiben

## 9. Organisation & Team

### Q9.1  Who owns this platform — the single named person or team with accountability for its availability and evolution?
Answer: Team „Marktdaten“, sieben Personen, Leitung benannt. Die Verfügbarkeitsverantwortung liegt formal beim Betrieb, nicht beim Team.
Basis: fact
Where it came from: Document or system: Organigramm IT 2026 · Date: 2026-01-01
Verification: open
What closes it: Owed by: Bereichsleiter IT-Anwendungen Netz · Proof needed: Schriftliche Zuordnung der Verfügbarkeitsverantwortung zwischen Team und Betrieb · By: 2026-10-31

### Q9.2  How does work reach this platform team — who initiates changes, who reviews them, and where do handoffs stall?
Answer: Über das Anforderungsboard des Bereichs. Es staut sich an der fachlichen Abnahme, nicht in der Entwicklung.
Basis: statement
Where it came from: Who said it: Teamleitung Marktdaten · Date: 2026-08-13
Verification: open
What closes it: Owed by: Teamleitung Marktdaten · Proof needed: Durchlaufzeiten der fachlichen Abnahme über die letzten zwölf Monate · By: 2026-10-31

### Q9.3  Where is knowledge concentrated — who are the individuals whose absence would delay or block a migration?
Answer: Zwei Personen. Beide sind zusätzlich im Smart-Meter-Rollout eingeplant.
Basis: fact
Where it came from: Document or system: Ressourcenplanung 2026/2027 · Date: 2026-06-15
Verification: blocked
What closes it: Owed by: Bereichsleiter IT-Anwendungen Netz · Proof needed: Verbindliche Kapazitätszusage für die beiden Schlüsselpersonen · By: 2026-11-30 · Blocked by: Beide sind bis Q3/2027 im Smart-Meter-Rollout verplant

### Q9.4  What organisational changes — restructuring, key departures, team mergers — are planned or underway that affect this work?
Answer: Der Bereich wird zum 01.01.2027 mit der IT Vertrieb zusammengelegt.
Basis: fact
Where it came from: Document or system: Mitteilung der Geschäftsführung 2026-06 · Date: 2026-06-08
Verification: open
What closes it: Owed by: Bereichsleiter IT-Anwendungen Netz · Proof needed: Zielorganisation zum 01.01.2027 mit benannter Plattformverantwortung · By: 2026-11-30

### Q9.5  Who are the informal decision-makers whose alignment is necessary — even if they have no formal authority over this decision?
Answer: Der Leiter Marktkommunikation. Formal nicht beteiligt, faktisch hat noch keine Schemaänderung ohne seine Zustimmung stattgefunden.
Basis: statement
Where it came from: Who said it: Leiter Messstellenbetrieb · Date: 2026-08-13
Verification: none

## 10. Operations, Security & Resilience

### Q10.1  What are the current SLO/availability targets — and are they being met? If no SLO exists, state that explicitly.
Answer: Kein SLO dokumentiert. Gemessene Verfügbarkeit der letzten zwölf Monate: 99,7 %.
Basis: fact
Where it came from: Document or system: Monitoring-Auswertung 08/2025–07/2026 · Date: 2026-08-01
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Dokumentiertes SLO mit Zustimmung der geschäftskritischen Konsumenten · By: 2026-11-15

### Q10.2  What are the RTO and RPO targets — and when was the last restore test conducted?
Answer: RTO vier Stunden, RPO 15 Minuten laut Notfallkonzept. Der letzte Restore-Test ist nicht belegt.
Basis: fact
Where it came from: Document or system: Notfallkonzept IT 2023 · Date: 2023-02-14
Verification: blocked
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Protokoll eines durchgeführten Restore-Tests · By: 2026-12-15 · Blocked by: Ein Testfenster neben der Marktkommunikation ist nicht terminiert

### Q10.3  What observability exists — what is logged, what is measured, what triggers an alert?
Answer: Protokolle in Splunk, Infrastrukturmetriken in Zabbix. Fachliche Alerts auf die Fristen der Marktkommunikation gibt es nicht.
Basis: fact
Where it came from: Document or system: Betriebshandbuch ZMP · Date: 2024-04-01
Verification: none

### Q10.4  What is the incident response process — and what is the change management process? Are they documented and followed?
Answer: Beide dokumentiert. Der Change-Prozess wird gelebt; die Incident-Nachbereitung endet regelmäßig ohne Maßnahme.
Basis: statement
Where it came from: Who said it: Teamleitung Betrieb · Date: 2026-08-13
Verification: open
What closes it: Proof needed: Nachweis, dass Incident-Nachbereitungen zu Maßnahmen führen

### Q10.5  Who has access to production systems and data — and is there a documented, reviewed identity and permissions model?
Answer: Fünfzehn Personen mit produktivem Datenbankzugriff. Eine dokumentierte Rezertifizierung gibt es seit 2024 nicht.
Basis: fact
Where it came from: Document or system: Revisionsbericht 2025-03, Feststellung 2 · Who said it: Interne Revision · Date: 2025-03-27
Verification: blocked
What closes it: Owed by: Interne Revision · Proof needed: Durchgeführte Rezertifizierung der fünfzehn produktiven Zugriffe · By: 2026-11-30 · Blocked by: Ohne benanntes Berechtigungsmodell nicht rezertifizierbar

### Q10.6  What encryption is in place at rest and in transit — and are cryptographic keys managed separately from the data they protect?
Answer: Transportverschlüsselung ja, Verschlüsselung im Ruhezustand nur für Bankverbindungen. Eine Schlüsselrotation ist nicht definiert.
Basis: fact
Where it came from: Document or system: Kryptokonzept 2021 · Date: 2021-09-30
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Definierte Schlüsselrotation und der Umfang der Verschlüsselung im Ruhezustand · By: 2026-11-30

### Q10.7  Where does the platform actually run — deployment targets, network zones, and which zone boundaries its traffic crosses?
Answer: Betrieb im konzerneigenen Rechenzentrum, Anwendungszone. Die Datenbank steht in einer eigenen Zone; der Verkehr zu den elf Konsumenten überschreitet die Zonengrenze zur Bürozone, die Marktkommunikation zusätzlich die Grenze nach außen.
Basis: fact
Where it came from: Document or system: Netzplan RZ v4 · Date: 2025-05-20 · Source: Netzplan, Abschnitt Anwendungszonen
Verification: open
What closes it: Owed by: Teamleitung Betrieb · Proof needed: Aktueller Netzplan mit den drei Übergängen und ihren Regelwerken · By: 2026-10-15

## To-verify register

| Q-ID | Answer | Owed by | Proof needed | By | Blocked by | Verification |
|---|---|---|---|---|---|---|
| [Q1.2] | Der Zustand besteht seit der Zusammenführung von Netz- und Vertriebsdaten 2019. Ausgelöst hat das Review das Wartungsende der Bestandsversion zum 31.12.2027 und die für Q4/2026 angekündigte Prüfung nach §8a BSIG. | Regulierungsmanagement | Herstellerbestätigung des Wartungsendes und der Verlängerungskonditionen, schriftlich | 2026-09-30 | — | open |
| [Q1.3] | Benannt hat es der Leiter Messstellenbetrieb. Netzbetrieb und Vertrieb stimmen zu; das Bilanzkreismanagement sieht kein Problem, weil seine Auswertungen aus dem Data Warehouse kommen. | Leiter Messstellenbetrieb | Stellungnahme des Bilanzkreismanagements zur Abhängigkeit seiner Auswertungen | 2026-10-15 | — | open |
| [Q1.4] | 2023 wurde ein API-Gateway davorgesetzt. Ergebnis: die Fassade steht, drei Konsumenten greifen weiterhin direkt auf die Datenbank zu. | Teamleitung Marktdaten | Zugriffsprotokoll der Datenbank über 90 Tage, das die drei Direktzugriffe belegt | 2026-09-30 | — | open |
| [Q1.5] | Nicht quantifiziert. Genannt wurde „ein zweistelliger Millionenbetrag über drei Jahre“, ohne Herleitung. | — | Herleitung der genannten Kostenschätzung, oder eine Rechnung, die sie ersetzt | — | Es existiert keine Herleitung; die Zahl wurde mündlich genannt | blocked |
| [Q2.2] | Bereichsleiter IT-Anwendungen Netz. Formal benannt, aber nicht schriftlich mit Entscheidungsbefugnis hinterlegt. | Bereichsleiter IT-Anwendungen Netz | Schriftlich hinterlegte Entscheidungsbefugnis | 2026-09-30 | — | open |
| [Q2.5] | 31.12.2027, Wartungsende der Bestandsversion. Was bei Verstreichen passiert, ist nicht festgelegt — im Gespräch wurde vermutet, dass die kostenpflichtige Verlängerung automatisch gezogen wird. | Bereichsleiter IT-Anwendungen Netz | Festlegung, was am 01.01.2028 geschieht, schriftlich | 2026-10-31 | — | open |
| [Q2.6] | Kein Konsument greift mehr direkt auf die Datenbank zu, und eine Schemaänderung ist in unter vier Wochen produktiv. | Leiter Messstellenbetrieb | Erfolgsdefinition mit messbarem Kriterium, von den Urteilenden abgenommen | 2026-10-15 | — | open |
| [Q2.7] | Die Interne Revision, der Datenschutzbeauftragte und die elf Konsumenten. Kriterien liegen nur für die Revision vor. | — | Abnahmekriterien der elf Konsumenten und des Datenschutzbeauftragten | — | Kriterien liegen nur für die Revision vor | open |
| [Q3.2] | Kein eigener Rahmen. Die Mittel liegen im Topf „Digitalisierung Netz“ und sind der ZMP nicht zugeordnet. | Bereichsleiter IT-Anwendungen Netz | Mittelzuordnung zur ZMP im Topf „Digitalisierung Netz“ | 2026-11-30 | — | open |
| [Q3.4] | EnWG und MsbG gelten laufend. Die Prüfung nach §8a BSIG ist für Q4/2026 angekündigt, und der IT-Sicherheitskatalog nach §11 Abs. 1a EnWG verlangt ein zertifiziertes ISMS. | Regulierungsmanagement | Prüfungsankündigung §8a BSIG mit Termin und Prüfumfang | 2026-09-15 | — | open |
| [Q3.5] | Architekturboard, dann IT-Lenkungsausschuss. Laut Verfahrensanweisung acht Wochen, erfahrungsgemäß ein Quartal. | Bereichsleiter IT-Anwendungen Netz | Verfahrensanweisung und die Durchlaufzeiten der letzten vier Vorlagen | 2026-10-15 | — | open |
| [Q4.2] | Confluence-Raum „ZMP“. Letzter Abgleich gegen das laufende System unbekannt, letzte Seitenänderung 2022. | Teamleitung Marktdaten | Abgleich des Confluence-Raums gegen das laufende System, mit Datum | 2026-11-30 | — | open |
| [Q4.3] | Die nächtliche Abgleichstrecke zwischen ZMP und dem Abrechnungssystem. Der Entwickler, der sie gebaut hat, ist 2024 in Rente gegangen. | Teamleitung Betrieb | Ablaufbeschreibung der nächtlichen Abgleichstrecke, gegen den laufenden Job geprüft | 2026-11-30 | Niemand im Haus kennt die Strecke; ohne externe Rekonstruktion nicht zu belegen | blocked |
| [Q4.4] | Zählpunkt-, Zählwert- und Vertragsdaten sowie Bankverbindungen für den Lastschrifteinzug. Zählpunktbezeichnungen liegen dreifach vor — ZMP, CRM und Abrechnung — ohne führende Quelle. | Teamleitung Marktdaten | Benennung der führenden Quelle je Datendomäne, schriftlich | 2026-11-15 | — | open |
| [Q4.5] | Elf dokumentierte Integrationen. Drei weitere wurden im Gespräch genannt und stehen in keiner Liste. | Teamleitung Marktdaten | Vollständige Integrationsliste aus dem Zugriffsprotokoll, nicht aus der Dokumentation | 2026-09-30 | — | open |
| [Q4.6] | What is the current automated test coverage, and when was the last full regression run conducted? | Teamleitung Marktdaten | Coverage-Bericht des letzten Builds und das Datum des letzten Vollregressionslaufs | 2026-09-30 | — | open |
| [Q4.7] | Keycloak für die Anmeldung, der EDIFACT/AS4-Konnektor für die Marktkommunikation, und der Zeitdienst des Rechenzentrums. Fällt Keycloak aus, ist die Plattform ohne Anmeldung; fällt der Konnektor aus, puffert die Marktkommunikation 24 Stunden. Für den Zeitdienst hat das niemand geprüft. | Teamleitung Betrieb | Ausfallverhalten je Laufzeitabhängigkeit, getestet und protokolliert | 2026-11-30 | — | open |
| [Q5.2] | Geschäftskritisch sind Marktkommunikation, Redispatch-Meldung und Abrechnung. Erwartet werden 99,9 % und unter 300 ms — verabredet ist nichts davon. | Leiter Messstellenbetrieb | Schriftliche Verfügbarkeits- und Latenzanforderung je geschäftskritischem Konsumenten | 2026-10-15 | — | open |
| [Q5.3] | Ja. Das Kundenportal hält eine nächtliche Kopie der Zählwerte, weil die Antwortzeit früher nicht gereicht hat. | Teamleitung Betrieb | Liste der Schattenkopien mit Alter und Zweck | 2026-10-31 | — | open |
| [Q5.5] | Who has the authority to accept a breaking interface change on behalf of each consumer — and is that person reachable? | Leiter Messstellenbetrieb | Je Konsument eine benannte, erreichbare Person mit Zustimmungsbefugnis | 2026-10-31 | — | open |
| [Q5.6] | Rund 1,4 Mio. Zählwerte pro Tag, Spitze zwischen 02:00 und 04:00 beim nächtlichen Abgleich. Zum Monatswechsel das Dreifache. Erwartet wird eine Verdopplung bis 2029 durch den Smart-Meter-Rollout. | Teamleitung Betrieb | Wachstumsannahme des Smart-Meter-Rollouts, schriftlich bestätigt | 2026-10-31 | — | open |
| [Q6.2] | Über das Kundenportal, den Lieferantenwechsel und die Zählerfernauslesung. Rechtsgrundlage: Vertragserfüllung nach Art. 6 Abs. 1 lit. b DSGVO, für die Messdaten zusätzlich die Bestimmungen des MsbG. | Datenschutzbeauftragter | Verzeichnis der Verarbeitungstätigkeiten im aktuellen Stand | 2026-10-15 | — | open |
| [Q6.3] | Für Zählpunktdaten benannt. Für Vertrags- und Bankverbindungsdaten nicht. | Datenschutzbeauftragter | Benannte Verantwortliche für Vertrags- und Bankverbindungsdaten | 2026-10-15 | — | open |
| [Q6.4] | Zehn Jahre nach Vertragsende, Zählwerte nach den Fristen des MsbG. Ein funktionierender Löschweg existiert nicht — Löschungen werden als Sperrkennzeichen abgebildet. | Datenschutzbeauftragter | Getesteter Löschweg, mit Protokoll des Tests | 2026-12-15 | Ein Löschweg existiert nicht; er muss erst gebaut werden | blocked |
| [Q6.5] | Laut Betrieb bleibt alles im konzerneigenen Rechenzentrum. Für die Backup-Strecke konnte das im Gespräch niemand bestätigen. | Teamleitung Betrieb | Bestätigung des Speicherorts der Backup-Strecke, schriftlich | 2026-09-30 | — | open |
| [Q7.2] | Interne Revision 03/2025. Zwei Feststellungen zur Zugriffsverwaltung sind offen. | Interne Revision | Erledigungsnachweis der zwei offenen Feststellungen | 2026-11-30 | — | open |
| [Q7.5] | Der IT-Sicherheitskatalog verlangt ein nach ISO 27001 zertifiziertes ISMS. Das Zertifikat deckt das Rechenzentrum ab, nicht die Anwendung. | Regulierungsmanagement | Geltungsbereich des ISO-27001-Zertifikats, geprüft gegen die Anforderung des Sicherheitskatalogs | 2026-09-30 | — | open |
| [Q8.1] | Zwei: Ablösung der Datenhaltung auf PostgreSQL im eigenen Rechenzentrum, oder Neubau als Datenprodukt. Die Begründungen wurden mündlich ausgetauscht und nirgends festgehalten. | Teamleitung Marktdaten | Die beiden Optionen schriftlich, mit ihren Begründungen | 2026-10-31 | — | open |
| [Q8.2] | Die Umstellung der Bankverbindungsdaten auf ein neues Verschlüsselungsverfahren — die Altbestände sind danach im Altsystem nicht mehr lesbar. | Teamleitung Marktdaten | Migrationsplan mit benannten irreversiblen Schritten, vom Datenschutzbeauftragten gegengezeichnet | 2026-12-15 | Setzt die Entscheidung über das Verschlüsselungsverfahren voraus | blocked |
| [Q8.3] | Parallelbetrieb wurde als „ein paar Monate“ erwähnt. Wie lange die doppelte Schreiblast neben der Marktkommunikation tragbar ist, hat niemand geprüft. | Teamleitung Betrieb | Lasttest des Parallelbetriebs neben der Marktkommunikation | 2026-12-15 | — | open |
| [Q8.4] | If this migration goes wrong, what is the rollback path — and what does it cost in time and data fidelity? | Teamleitung Marktdaten | Beschriebener und geprobter Rückweg je Migrationsschritt | 2026-12-15 | — | open |
| [Q8.6] | Für Stammdaten offen. Für historische Zählwerte wurde vorgeschlagen, sie im Altsystem zu belassen. | — | Festlegung, welche Daten mitgehen und welche im Altsystem bleiben | — | — | open |
| [Q9.1] | Team „Marktdaten“, sieben Personen, Leitung benannt. Die Verfügbarkeitsverantwortung liegt formal beim Betrieb, nicht beim Team. | Bereichsleiter IT-Anwendungen Netz | Schriftliche Zuordnung der Verfügbarkeitsverantwortung zwischen Team und Betrieb | 2026-10-31 | — | open |
| [Q9.2] | Über das Anforderungsboard des Bereichs. Es staut sich an der fachlichen Abnahme, nicht in der Entwicklung. | Teamleitung Marktdaten | Durchlaufzeiten der fachlichen Abnahme über die letzten zwölf Monate | 2026-10-31 | — | open |
| [Q9.3] | Zwei Personen. Beide sind zusätzlich im Smart-Meter-Rollout eingeplant. | Bereichsleiter IT-Anwendungen Netz | Verbindliche Kapazitätszusage für die beiden Schlüsselpersonen | 2026-11-30 | Beide sind bis Q3/2027 im Smart-Meter-Rollout verplant | blocked |
| [Q9.4] | Der Bereich wird zum 01.01.2027 mit der IT Vertrieb zusammengelegt. | Bereichsleiter IT-Anwendungen Netz | Zielorganisation zum 01.01.2027 mit benannter Plattformverantwortung | 2026-11-30 | — | open |
| [Q10.1] | Kein SLO dokumentiert. Gemessene Verfügbarkeit der letzten zwölf Monate: 99,7 %. | Teamleitung Betrieb | Dokumentiertes SLO mit Zustimmung der geschäftskritischen Konsumenten | 2026-11-15 | — | open |
| [Q10.2] | RTO vier Stunden, RPO 15 Minuten laut Notfallkonzept. Der letzte Restore-Test ist nicht belegt. | Teamleitung Betrieb | Protokoll eines durchgeführten Restore-Tests | 2026-12-15 | Ein Testfenster neben der Marktkommunikation ist nicht terminiert | blocked |
| [Q10.4] | Beide dokumentiert. Der Change-Prozess wird gelebt; die Incident-Nachbereitung endet regelmäßig ohne Maßnahme. | — | Nachweis, dass Incident-Nachbereitungen zu Maßnahmen führen | — | — | open |
| [Q10.5] | Fünfzehn Personen mit produktivem Datenbankzugriff. Eine dokumentierte Rezertifizierung gibt es seit 2024 nicht. | Interne Revision | Durchgeführte Rezertifizierung der fünfzehn produktiven Zugriffe | 2026-11-30 | Ohne benanntes Berechtigungsmodell nicht rezertifizierbar | blocked |
| [Q10.6] | Transportverschlüsselung ja, Verschlüsselung im Ruhezustand nur für Bankverbindungen. Eine Schlüsselrotation ist nicht definiert. | Teamleitung Betrieb | Definierte Schlüsselrotation und der Umfang der Verschlüsselung im Ruhezustand | 2026-11-30 | — | open |
| [Q10.7] | Betrieb im konzerneigenen Rechenzentrum, Anwendungszone. Die Datenbank steht in einer eigenen Zone; der Verkehr zu den elf Konsumenten überschreitet die Zonengrenze zur Bürozone, die Marktkommunikation zusätzlich die Grenze nach außen. | Teamleitung Betrieb | Aktueller Netzplan mit den drei Übergängen und ihren Regelwerken | 2026-10-15 | — | open |

## Directions, not decided

- Zuerst die Datenhaltung ablösen und die elf Konsumenten unverändert weiterbedienen, die Schnittstellen danach. — This direction depends on: [Q1.4] [Q4.5] [Q5.2] [Q5.5] [Q8.2] [Q8.4] [Q9.3]
- Die Wartung einmal kostenpflichtig verlängern und die Ablösung nach der KRITIS-Prüfung neu ansetzen. — This direction depends on: [Q1.2] [Q1.5] [Q3.2] [Q3.4] [Q7.5]

