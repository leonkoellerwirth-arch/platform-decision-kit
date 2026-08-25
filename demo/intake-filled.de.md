# Intake — Discovery

> Gesprächsnotiz, keine autoritative Quelle. Eine Aussage mit offener Verifikation bleibt eine Aussage. Sie wird nicht zum Fakt, weil sie aufgeschrieben wurde.
> Sprache: Deutsch (Übersetzung; verbindlich ist die englische Fassung). Die Frage-IDs sind sprachneutral.

## Entscheidungskopf

- Entscheidungsfrage: Wird die Datenhaltung der Zähler- und Marktdatenplattform bis Q2/2027 abgelöst, oder wird die Wartung der Bestandsversion verlängert?
- Entscheidungseigner: Bereichsleiter IT-Anwendungen Netz (benannt, Befugnis nicht schriftlich)
- Im Scope: Datenhaltung und Zugriffsschicht der ZMP
- Außerhalb des Scope: Abrechnungssystem, Netzleitsystem, Data Warehouse
- Frist: 31.12.2027 — Wartungsende der Bestandsversion

## 1. Schmerz & Anlass

### Q1.1  Was ist das vordergründige Problem in einem Satz?
Antwort: Änderungen an der Zähler- und Marktdatenplattform brauchen sechs bis neun Monate, weil niemand die Auswirkung auf die elf angeschlossenen Systeme vorhersagen kann.
Basis: Fakt
Woher es stammt: Dokument oder System: Änderungsstatistik ZMP 2024–2026 · Betriebsbericht Q1/2026 · Datum: 2026-04-30
Verifikation: keine

### Q1.2  Wie lange besteht diese Situation, und was hat sich verändert, sodass das Review jetzt stattfindet?
Antwort: Der Zustand besteht seit der Zusammenführung von Netz- und Vertriebsdaten 2019. Ausgelöst hat das Review das Wartungsende der Bestandsversion zum 31.12.2027 und die für Q4/2026 angekündigte Prüfung nach §8a BSIG.
Basis: Fakt
Woher es stammt: Dokument oder System: Herstellermitteilung Wartungsende · Regulierungsmanagement · Wer es gesagt hat: Regulierungsmanagement · Datum: 2026-02-19
Verifikation: offen
Was es schließt: Verantwortlich: Regulierungsmanagement · Benötigter Nachweis: Herstellerbestätigung des Wartungsendes und der Verlängerungskonditionen, schriftlich · Bis: 2026-09-30

### Q1.3  Wer hat dies als Problem benannt — und wer stimmt zu, wer nicht?
Antwort: Benannt hat es der Leiter Messstellenbetrieb. Netzbetrieb und Vertrieb stimmen zu; das Bilanzkreismanagement sieht kein Problem, weil seine Auswertungen aus dem Data Warehouse kommen.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Leiter Messstellenbetrieb · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Leiter Messstellenbetrieb · Benötigter Nachweis: Stellungnahme des Bilanzkreismanagements zur Abhängigkeit seiner Auswertungen · Bis: 2026-10-15

### Q1.4  Was wurde bisher unternommen, um diese Situation zu adressieren, und was war das Ergebnis?
Antwort: 2023 wurde ein API-Gateway davorgesetzt. Ergebnis: die Fassade steht, drei Konsumenten greifen weiterhin direkt auf die Datenbank zu.
Basis: Fakt
Woher es stammt: Dokument oder System: Architekturreview 2023 · Anhang C · Datum: 2023-10-05
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Zugriffsprotokoll der Datenbank über 90 Tage, das die drei Direktzugriffe belegt · Bis: 2026-09-30

### Q1.5  Was sind die geschätzten Kosten der Untätigkeit über 12 Monate — quantifiziert oder explizit als unquantifiziert benannt?
Antwort: Nicht quantifiziert. Genannt wurde „ein zweistelliger Millionenbetrag über drei Jahre“, ohne Herleitung.
Basis: Annahme
Woher es stammt: Wer es gesagt hat: Bereichsleiter IT-Anwendungen Netz · Datum: 2026-08-13
Verifikation: blockiert
Was es schließt: Benötigter Nachweis: Herleitung der genannten Kostenschätzung, oder eine Rechnung, die sie ersetzt · Blockiert durch: Es existiert keine Herleitung; die Zahl wurde mündlich genannt

## 2. Erfolg & Messlatte

### Q2.1  Was ist die primäre Entscheidungsfrage — als Frage formuliert, die mit Ja/Nein oder einer Optionswahl beantwortet werden kann?
Antwort: Wird die Datenhaltung der Zähler- und Marktdatenplattform bis Q2/2027 abgelöst, oder wird die Wartung der Bestandsversion kostenpflichtig verlängert?
Basis: Fakt
Woher es stammt: Dokument oder System: Geschäftsführungsvorlage IT 2026-04 · Datum: 2026-04-21
Verifikation: keine

### Q2.2  Wer ist der Entscheidungseigner — die einzelne benannte Person, die für das Ergebnis verantwortlich ist?
Antwort: Bereichsleiter IT-Anwendungen Netz. Formal benannt, aber nicht schriftlich mit Entscheidungsbefugnis hinterlegt.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Bereichsleiter IT-Anwendungen Netz · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Bereichsleiter IT-Anwendungen Netz · Benötigter Nachweis: Schriftlich hinterlegte Entscheidungsbefugnis · Bis: 2026-09-30

### Q2.3  Was liegt explizit im Scope dieser Entscheidung?
Antwort: Datenhaltung und Zugriffsschicht der ZMP.
Basis: Fakt
Woher es stammt: Dokument oder System: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2 · Datum: 2026-04-21
Verifikation: keine

### Q2.4  Was liegt explizit außerhalb des Scope dieser Entscheidung?
Antwort: Das Abrechnungssystem selbst, das Netzleitsystem und das Data Warehouse.
Basis: Fakt
Woher es stammt: Dokument oder System: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2 · Datum: 2026-04-21
Verifikation: keine

### Q2.5  Was ist die Entscheidungsfrist, und was passiert — explizit — wenn sie ohne Entscheidung verstreicht?
Antwort: 31.12.2027, Wartungsende der Bestandsversion. Was bei Verstreichen passiert, ist nicht festgelegt — im Gespräch wurde vermutet, dass die kostenpflichtige Verlängerung automatisch gezogen wird.
Basis: Annahme
Woher es stammt: Wer es gesagt hat: Bereichsleiter IT-Anwendungen Netz · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Bereichsleiter IT-Anwendungen Netz · Benötigter Nachweis: Festlegung, was am 01.01.2028 geschieht, schriftlich · Bis: 2026-10-31

### Q2.6  Wie sieht Erfolg in 12 Monaten aus — in Begriffen, die ein neutraler Beobachter verifizieren könnte?
Antwort: Kein Konsument greift mehr direkt auf die Datenbank zu, und eine Schemaänderung ist in unter vier Wochen produktiv.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Leiter Messstellenbetrieb · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Leiter Messstellenbetrieb · Benötigter Nachweis: Erfolgsdefinition mit messbarem Kriterium, von den Urteilenden abgenommen · Bis: 2026-10-15

### Q2.7  Wer muss mit dem Ergebnis zufrieden sein, und nach welchen Kriterien beurteilt er es?
Antwort: Die Interne Revision, der Datenschutzbeauftragte und die elf Konsumenten. Kriterien liegen nur für die Revision vor.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Bereichsleiter IT-Anwendungen Netz · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Benötigter Nachweis: Abnahmekriterien der elf Konsumenten und des Datenschutzbeauftragten · Blockiert durch: Kriterien liegen nur für die Revision vor

## 3. Vorgaben & Phase

### Q3.1  Welche Architektur- oder Technologievorgaben sind fest — d.h. in dieser Entscheidung nicht zur Diskussion gestellt?
Antwort: Fest: Betrieb im konzerneigenen Rechenzentrum, Java als Zielsprache, Keycloak als Identitätsanbieter.
Basis: Fakt
Woher es stammt: Dokument oder System: Konzern-Architekturvorgaben v7, Kapitel 3 · Datum: 2025-11-01
Verifikation: keine

### Q3.2  Welchen Budgetrahmen gibt es für diese Initiative — oder ist keiner definiert?
Antwort: Kein eigener Rahmen. Die Mittel liegen im Topf „Digitalisierung Netz“ und sind der ZMP nicht zugeordnet.
Basis: Fakt
Woher es stammt: Dokument oder System: Mittelfristplanung IT 2026–2029 · Datum: 2025-12-10
Verifikation: offen
Was es schließt: Verantwortlich: Bereichsleiter IT-Anwendungen Netz · Benötigter Nachweis: Mittelzuordnung zur ZMP im Topf „Digitalisierung Netz“ · Bis: 2026-11-30

### Q3.3  Was ist die aktuelle Reifephase der Plattform — wie lange ist sie in Produktion, und wie häufig wird sie geändert?
Antwort: Seit 2011 in Produktion, vier Releases pro Jahr, zwei davon reine Wartung.
Basis: Fakt
Woher es stammt: Dokument oder System: Release-Kalender ZMP · Datum: 2026-07-01
Verifikation: keine

### Q3.4  Welche regulatorischen oder Audit-Verpflichtungen schränken den Zeitplan einer Änderung ein?
Antwort: EnWG und MsbG gelten laufend. Die Prüfung nach §8a BSIG ist für Q4/2026 angekündigt, und der IT-Sicherheitskatalog nach §11 Abs. 1a EnWG verlangt ein zertifiziertes ISMS.
Basis: Fakt
Woher es stammt: Dokument oder System: Mitteilung Regulierungsmanagement 2026-02 · Wer es gesagt hat: Regulierungsmanagement · Datum: 2026-02-19
Verifikation: offen
Was es schließt: Verantwortlich: Regulierungsmanagement · Benötigter Nachweis: Prüfungsankündigung §8a BSIG mit Termin und Prüfumfang · Bis: 2026-09-15

### Q3.5  Welchen Governance-Prozess muss eine bedeutende Plattformentscheidung durchlaufen, und wie lange dauert er?
Antwort: Architekturboard, dann IT-Lenkungsausschuss. Laut Verfahrensanweisung acht Wochen, erfahrungsgemäß ein Quartal.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Bereichsleiter IT-Anwendungen Netz · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Bereichsleiter IT-Anwendungen Netz · Benötigter Nachweis: Verfahrensanweisung und die Durchlaufzeiten der letzten vier Vorlagen · Bis: 2026-10-15

## 4. Bestand & Wissen

### Q4.1  Was existiert heute — Liste der Kernkomponenten, ihr ungefähres Produktionsalter und ihr Technologie-Stack?
Antwort: Oracle 19c, ein Java-EE-Monolith aus 2011, ein API-Gateway aus 2023, zwei Batch-Strecken für Marktkommunikation und Netzabrechnung.
Basis: Fakt
Woher es stammt: Dokument oder System: CMDB-Auszug 2026-08 · Datum: 2026-08-04
Verifikation: keine

### Q4.2  Wo lebt die maßgebliche technische Dokumentation, und wann wurde sie zuletzt gegen das System verifiziert?
Antwort: Confluence-Raum „ZMP“. Letzter Abgleich gegen das laufende System unbekannt, letzte Seitenänderung 2022.
Basis: Fakt
Woher es stammt: Dokument oder System: Confluence · Raum ZMP · Datum: 2022-11-08
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Abgleich des Confluence-Raums gegen das laufende System, mit Datum · Bis: 2026-11-30

### Q4.3  Welche Teile des Systems versteht niemand aktuell gut genug, um die Auswirkung einer Änderung vorherzusagen?
Antwort: Die nächtliche Abgleichstrecke zwischen ZMP und dem Abrechnungssystem. Der Entwickler, der sie gebaut hat, ist 2024 in Rente gegangen.
Basis: Fakt
Woher es stammt: Dokument oder System: Betrieb · Übergabeprotokoll 2024 · Wer es gesagt hat: Teamleitung Betrieb · Datum: 2024-09-30
Verifikation: blockiert
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Ablaufbeschreibung der nächtlichen Abgleichstrecke, gegen den laufenden Job geprüft · Bis: 2026-11-30 · Blockiert durch: Niemand im Haus kennt die Strecke; ohne externe Rekonstruktion nicht zu belegen

### Q4.4  Welche Daten verwaltet die Plattform — und wie ist die Stammdatenlage (Einzelquelle, Duplikate, Eigentümerschaft)?
Antwort: Zählpunkt-, Zählwert- und Vertragsdaten sowie Bankverbindungen für den Lastschrifteinzug. Zählpunktbezeichnungen liegen dreifach vor — ZMP, CRM und Abrechnung — ohne führende Quelle.
Basis: Fakt
Woher es stammt: Dokument oder System: Datenlandkarte 2025 · Datum: 2025-03-20
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Benennung der führenden Quelle je Datendomäne, schriftlich · Bis: 2026-11-15

### Q4.5  Welche Integrationen existieren — dokumentiert oder nicht — und wer kennt sie?
Antwort: Elf dokumentierte Integrationen. Drei weitere wurden im Gespräch genannt und stehen in keiner Liste.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Teamleitung Marktdaten · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Vollständige Integrationsliste aus dem Zugriffsprotokoll, nicht aus der Dokumentation · Bis: 2026-09-30

### Q4.6  Wie ist die aktuelle automatisierte Testabdeckung, und wann wurde der letzte vollständige Regressionstest durchgeführt?
Antwort: —
Basis: unbekannt
Woher es stammt: —
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Coverage-Bericht des letzten Builds und das Datum des letzten Vollregressionslaufs · Bis: 2026-09-30

### Q4.7  Welche externen Dienste oder Systeme müssen zur Laufzeit erreichbar sein, damit die Plattform funktioniert — und was passiert mit ihr, wenn eines davon ausfällt?
Antwort: Keycloak für die Anmeldung, der EDIFACT/AS4-Konnektor für die Marktkommunikation, und der Zeitdienst des Rechenzentrums. Fällt Keycloak aus, ist die Plattform ohne Anmeldung; fällt der Konnektor aus, puffert die Marktkommunikation 24 Stunden. Für den Zeitdienst hat das niemand geprüft.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Teamleitung Betrieb · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Ausfallverhalten je Laufzeitabhängigkeit, getestet und protokolliert · Bis: 2026-11-30

## 5. Konsumenten & Schnittstellen

### Q5.1  Wer sind die aktuellen Konsumenten dieser Plattform — Liste und Beschreibung der Integration (sync, async, Batch, Event)?
Antwort: Elf: CRM, Abrechnung, Marktkommunikation (EDIFACT/AS4), Netzleitsystem (lesend), Data Warehouse, Kundenportal, Lieferantenwechsel, Redispatch-Meldung, Zählerfernauslesung, Inkasso, Bilanzkreismanagement.
Basis: Fakt
Woher es stammt: Dokument oder System: API-Gateway · Routing-Tabelle · Datum: 2026-08-04
Verifikation: keine

### Q5.2  Welche Konsumenten sind geschäftskritisch, und welche Verfügbarkeit oder Latenz erwarten sie?
Antwort: Geschäftskritisch sind Marktkommunikation, Redispatch-Meldung und Abrechnung. Erwartet werden 99,9 % und unter 300 ms — verabredet ist nichts davon.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Leiter Messstellenbetrieb · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Leiter Messstellenbetrieb · Benötigter Nachweis: Schriftliche Verfügbarkeits- und Latenzanforderung je geschäftskritischem Konsumenten · Bis: 2026-10-15

### Q5.3  Gibt es Konsumenten, die Workarounds, undokumentierte Integrationen oder Schattenkopien von Plattformdaten angelegt haben?
Antwort: Ja. Das Kundenportal hält eine nächtliche Kopie der Zählwerte, weil die Antwortzeit früher nicht gereicht hat.
Basis: Fakt
Woher es stammt: Dokument oder System: Betrieb · Ticket INC-2019-4471 · Datum: 2019-07-22
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Liste der Schattenkopien mit Alter und Zweck · Bis: 2026-10-31

### Q5.4  Welche Schnittstellen sind formal vertraglich vereinbart oder durch SLAs abgedeckt — und welche werden informell genutzt?
Antwort: Kein einziges Interface ist durch ein SLA abgedeckt.
Basis: Fakt
Woher es stammt: Dokument oder System: Vertragsdatenbank Dienstleister · Datum: 2026-06-30
Verifikation: keine

### Q5.5  Wer hat die Befugnis, im Namen jedes Konsumenten eine brechende Schnittstellenänderung zu akzeptieren — und ist diese Person erreichbar?
Antwort: —
Basis: unbekannt
Woher es stammt: —
Verifikation: offen
Was es schließt: Verantwortlich: Leiter Messstellenbetrieb · Benötigter Nachweis: Je Konsument eine benannte, erreichbare Person mit Zustimmungsbefugnis · Bis: 2026-10-31

### Q5.6  Welche Last trägt die Plattform heute tatsächlich — Volumen pro Tag, die Spitze und wann sie auftritt — und welches Wachstum wird über den Horizont dieser Entscheidung erwartet?
Antwort: Rund 1,4 Mio. Zählwerte pro Tag, Spitze zwischen 02:00 und 04:00 beim nächtlichen Abgleich. Zum Monatswechsel das Dreifache. Erwartet wird eine Verdopplung bis 2029 durch den Smart-Meter-Rollout.
Basis: Fakt
Woher es stammt: Dokument oder System: Monitoring-Auswertung 08/2025–07/2026 · Datum: 2026-08-01 · Beleg/Quelle: Auswertung Lastprofil, 12 Monate
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Wachstumsannahme des Smart-Meter-Rollouts, schriftlich bestätigt · Bis: 2026-10-31

## 6. Daten & Souveränität

### Q6.1  Welche Datenklassifizierungen gelten für Daten, die diese Plattform speichert oder verarbeitet — und wer hat sie validiert?
Antwort: Personenbezogene Zählwerte und Bankverbindungen, Klassifizierung „vertraulich“. Festgestellt vom Datenschutzbeauftragten 2021.
Basis: Fakt
Woher es stammt: Dokument oder System: Schutzbedarfsfeststellung 2021 · Wer es gesagt hat: Datenschutzbeauftragter · Datum: 2021-06-15
Verifikation: keine

### Q6.2  Wo treten personenbezogene Daten in die Plattform ein, und unter welcher Rechtsgrundlage werden sie verarbeitet?
Antwort: Über das Kundenportal, den Lieferantenwechsel und die Zählerfernauslesung. Rechtsgrundlage: Vertragserfüllung nach Art. 6 Abs. 1 lit. b DSGVO, für die Messdaten zusätzlich die Bestimmungen des MsbG.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Datenschutzbeauftragter · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Datenschutzbeauftragter · Benötigter Nachweis: Verzeichnis der Verarbeitungstätigkeiten im aktuellen Stand · Bis: 2026-10-15

### Q6.3  Wer ist der benannte Dateneigner für jede wesentliche Datendomäne, die von dieser Plattform verarbeitet wird?
Antwort: Für Zählpunktdaten benannt. Für Vertrags- und Bankverbindungsdaten nicht.
Basis: Fakt
Woher es stammt: Dokument oder System: Verzeichnis der Verarbeitungstätigkeiten · Wer es gesagt hat: Datenschutzbeauftragter · Datum: 2025-09-01
Verifikation: offen
Was es schließt: Verantwortlich: Datenschutzbeauftragter · Benötigter Nachweis: Benannte Verantwortliche für Vertrags- und Bankverbindungsdaten · Bis: 2026-10-15

### Q6.4  Was sind die dokumentierten Aufbewahrungsanforderungen, und gibt es einen funktionierenden Löschpfad, der getestet wurde?
Antwort: Zehn Jahre nach Vertragsende, Zählwerte nach den Fristen des MsbG. Ein funktionierender Löschweg existiert nicht — Löschungen werden als Sperrkennzeichen abgebildet.
Basis: Fakt
Woher es stammt: Dokument oder System: Löschkonzept 2022, Abschnitt 4 · Datum: 2022-05-11
Verifikation: blockiert
Was es schließt: Verantwortlich: Datenschutzbeauftragter · Benötigter Nachweis: Getesteter Löschweg, mit Protokoll des Tests · Bis: 2026-12-15 · Blockiert durch: Ein Löschweg existiert nicht; er muss erst gebaut werden

### Q6.5  Überqueren von dieser Plattform verarbeitete Daten Jurisdiktionen oder verlassen sie die direkte Kontrolle der Organisation?
Antwort: Laut Betrieb bleibt alles im konzerneigenen Rechenzentrum. Für die Backup-Strecke konnte das im Gespräch niemand bestätigen.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Teamleitung Betrieb · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Bestätigung des Speicherorts der Backup-Strecke, schriftlich · Bis: 2026-09-30

## 7. Regulatorik & Vertrauen

### Q7.1  Welche regulatorischen Rahmenbedingungen gelten für diese Plattform — von wem festgestellt, und wann zuletzt geprüft?
Antwort: EnWG, MsbG, DSGVO und das BSIG (KRITIS). Festgestellt vom Regulierungsmanagement, zuletzt bestätigt 02/2026.
Basis: Fakt
Woher es stammt: Dokument oder System: Mitteilung Regulierungsmanagement 2026-02 · Wer es gesagt hat: Regulierungsmanagement · Datum: 2026-02-19
Verifikation: keine

### Q7.2  Wann war das letzte externe oder interne Audit, das diese Plattform abdeckte, und was waren die offenen Feststellungen?
Antwort: Interne Revision 03/2025. Zwei Feststellungen zur Zugriffsverwaltung sind offen.
Basis: Fakt
Woher es stammt: Dokument oder System: Revisionsbericht 2025-03 · Wer es gesagt hat: Interne Revision · Datum: 2025-03-27
Verifikation: offen
Was es schließt: Verantwortlich: Interne Revision · Benötigter Nachweis: Erledigungsnachweis der zwei offenen Feststellungen · Bis: 2026-11-30

### Q7.3  Ist KI/ML im Entscheidungsgegenstand selbst — in einem Produktivsystem oder -workflow — oder nur im Autorenprozess dieser Analyse?
Antwort: Nein. KI ist nicht im Entscheidungsgegenstand. Eine Lastprognose läuft im Vertriebssystem, nicht in der ZMP.
Basis: Fakt
Woher es stammt: Dokument oder System: Architekturreview 2023 · Datum: 2023-10-05
Verifikation: keine

### Q7.4  Falls KI/ML im Entscheidungsgegenstand: Was ist die Rolle und Risikoklasse laut Legal — oder ist dies explizit offen?
Antwort: Entfällt, da kein KI/ML im Entscheidungsgegenstand. Die Rechtsabteilung wurde dazu nicht befragt.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Regulierungsmanagement · Datum: 2026-08-13
Verifikation: keine

### Q7.5  Welche Vertrauens- oder Zertifizierungsanforderungen stellen Kunden, Partner oder Behörden an diese Plattform?
Antwort: Der IT-Sicherheitskatalog verlangt ein nach ISO 27001 zertifiziertes ISMS. Das Zertifikat deckt das Rechenzentrum ab, nicht die Anwendung.
Basis: Fakt
Woher es stammt: Dokument oder System: Zertifikat ISO 27001 · Geltungsbereich · Datum: 2024-10-01
Verifikation: offen
Was es schließt: Verantwortlich: Regulierungsmanagement · Benötigter Nachweis: Geltungsbereich des ISO-27001-Zertifikats, geprüft gegen die Anforderung des Sicherheitskatalogs · Bis: 2026-09-30

## 8. Migration & Reversibilität

### Q8.1  Welche Migrationspfade wurden erwogen — auch informell — und was war die Begründung für oder gegen jeden?
Antwort: Zwei: Ablösung der Datenhaltung auf PostgreSQL im eigenen Rechenzentrum, oder Neubau als Datenprodukt. Die Begründungen wurden mündlich ausgetauscht und nirgends festgehalten.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Teamleitung Marktdaten · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Die beiden Optionen schriftlich, mit ihren Begründungen · Bis: 2026-10-31

### Q8.2  Welche Schritte in einem erwogenen Migrationspfad sind irreversibel — einmal vollzogen, kann der vorherige Zustand nicht wiederhergestellt werden?
Antwort: Die Umstellung der Bankverbindungsdaten auf ein neues Verschlüsselungsverfahren — die Altbestände sind danach im Altsystem nicht mehr lesbar.
Basis: Annahme
Woher es stammt: Wer es gesagt hat: Teamleitung Marktdaten · Datum: 2026-08-13
Verifikation: blockiert
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Migrationsplan mit benannten irreversiblen Schritten, vom Datenschutzbeauftragten gegengezeichnet · Bis: 2026-12-15 · Blockiert durch: Setzt die Entscheidung über das Verschlüsselungsverfahren voraus

### Q8.3  Welcher Ansatz zum parallelen Betrieb von Alt und Neu — falls erwogen — wurde diskutiert, und für wie lange?
Antwort: Parallelbetrieb wurde als „ein paar Monate“ erwähnt. Wie lange die doppelte Schreiblast neben der Marktkommunikation tragbar ist, hat niemand geprüft.
Basis: Annahme
Woher es stammt: Wer es gesagt hat: Teamleitung Betrieb · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Lasttest des Parallelbetriebs neben der Marktkommunikation · Bis: 2026-12-15

### Q8.4  Wenn diese Migration schiefgeht, was ist der Rückweg — und was kostet er an Zeit und Datenintegrität?
Antwort: —
Basis: unbekannt
Woher es stammt: —
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Beschriebener und geprobter Rückweg je Migrationsschritt · Bis: 2026-12-15

### Q8.5  Wurde das Szenario "Rückkehr ist unmöglich" explizit bewertet und dokumentiert — nicht nur als Risiko notiert?
Antwort: Nein, nicht bewertet.
Basis: Fakt
Woher es stammt: Dokument oder System: Protokoll Architekturboard 2026-05 · Datum: 2026-05-12
Verifikation: keine

### Q8.6  Welche Datenmigrationsstrategie gibt es für Stammdaten und historische Datensätze — insbesondere für solche mit Aufbewahrungspflichten?
Antwort: Für Stammdaten offen. Für historische Zählwerte wurde vorgeschlagen, sie im Altsystem zu belassen.
Basis: Annahme
Woher es stammt: Wer es gesagt hat: Teamleitung Marktdaten · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Benötigter Nachweis: Festlegung, welche Daten mitgehen und welche im Altsystem bleiben

## 9. Organisation & Team-Schnitt

### Q9.1  Wer besitzt diese Plattform — die einzelne benannte Person oder das Team mit Verantwortung für Verfügbarkeit und Weiterentwicklung?
Antwort: Team „Marktdaten“, sieben Personen, Leitung benannt. Die Verfügbarkeitsverantwortung liegt formal beim Betrieb, nicht beim Team.
Basis: Fakt
Woher es stammt: Dokument oder System: Organigramm IT 2026 · Datum: 2026-01-01
Verifikation: offen
Was es schließt: Verantwortlich: Bereichsleiter IT-Anwendungen Netz · Benötigter Nachweis: Schriftliche Zuordnung der Verfügbarkeitsverantwortung zwischen Team und Betrieb · Bis: 2026-10-31

### Q9.2  Wie gelangt Arbeit zu diesem Plattformteam — wer initiiert Änderungen, wer prüft sie, und wo stocken Übergaben?
Antwort: Über das Anforderungsboard des Bereichs. Es staut sich an der fachlichen Abnahme, nicht in der Entwicklung.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Teamleitung Marktdaten · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Marktdaten · Benötigter Nachweis: Durchlaufzeiten der fachlichen Abnahme über die letzten zwölf Monate · Bis: 2026-10-31

### Q9.3  Wo ist Wissen konzentriert — welche Personen wären, wenn sie fehlen, in der Lage, eine Migration zu verzögern oder zu blockieren?
Antwort: Zwei Personen. Beide sind zusätzlich im Smart-Meter-Rollout eingeplant.
Basis: Fakt
Woher es stammt: Dokument oder System: Ressourcenplanung 2026/2027 · Datum: 2026-06-15
Verifikation: blockiert
Was es schließt: Verantwortlich: Bereichsleiter IT-Anwendungen Netz · Benötigter Nachweis: Verbindliche Kapazitätszusage für die beiden Schlüsselpersonen · Bis: 2026-11-30 · Blockiert durch: Beide sind bis Q3/2027 im Smart-Meter-Rollout verplant

### Q9.4  Welche Organisationsänderungen — Umstrukturierungen, wichtige Abgänge, Teamfusionen — sind geplant oder im Gange und betreffen diese Arbeit?
Antwort: Der Bereich wird zum 01.01.2027 mit der IT Vertrieb zusammengelegt.
Basis: Fakt
Woher es stammt: Dokument oder System: Mitteilung der Geschäftsführung 2026-06 · Datum: 2026-06-08
Verifikation: offen
Was es schließt: Verantwortlich: Bereichsleiter IT-Anwendungen Netz · Benötigter Nachweis: Zielorganisation zum 01.01.2027 mit benannter Plattformverantwortung · Bis: 2026-11-30

### Q9.5  Wer sind die informellen Entscheidungsträger, deren Einbindung notwendig ist — auch wenn sie keine formale Befugnis für diese Entscheidung haben?
Antwort: Der Leiter Marktkommunikation. Formal nicht beteiligt, faktisch hat noch keine Schemaänderung ohne seine Zustimmung stattgefunden.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Leiter Messstellenbetrieb · Datum: 2026-08-13
Verifikation: keine

## 10. Betrieb, Sicherheit & Resilienz

### Q10.1  Was sind die aktuellen SLO/Verfügbarkeitsziele — und werden sie eingehalten? Falls kein SLO existiert, explizit benennen.
Antwort: Kein SLO dokumentiert. Gemessene Verfügbarkeit der letzten zwölf Monate: 99,7 %.
Basis: Fakt
Woher es stammt: Dokument oder System: Monitoring-Auswertung 08/2025–07/2026 · Datum: 2026-08-01
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Dokumentiertes SLO mit Zustimmung der geschäftskritischen Konsumenten · Bis: 2026-11-15

### Q10.2  Was sind die RTO- und RPO-Ziele — und wann wurde der letzte Restore-Test durchgeführt?
Antwort: RTO vier Stunden, RPO 15 Minuten laut Notfallkonzept. Der letzte Restore-Test ist nicht belegt.
Basis: Fakt
Woher es stammt: Dokument oder System: Notfallkonzept IT 2023 · Datum: 2023-02-14
Verifikation: blockiert
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Protokoll eines durchgeführten Restore-Tests · Bis: 2026-12-15 · Blockiert durch: Ein Testfenster neben der Marktkommunikation ist nicht terminiert

### Q10.3  Welche Observability existiert — was wird protokolliert, was gemessen, was löst einen Alert aus?
Antwort: Protokolle in Splunk, Infrastrukturmetriken in Zabbix. Fachliche Alerts auf die Fristen der Marktkommunikation gibt es nicht.
Basis: Fakt
Woher es stammt: Dokument oder System: Betriebshandbuch ZMP · Datum: 2024-04-01
Verifikation: keine

### Q10.4  Was ist der Incident-Response-Prozess — und was ist der Change-Management-Prozess? Sind sie dokumentiert und werden sie eingehalten?
Antwort: Beide dokumentiert. Der Change-Prozess wird gelebt; die Incident-Nachbereitung endet regelmäßig ohne Maßnahme.
Basis: Aussage
Woher es stammt: Wer es gesagt hat: Teamleitung Betrieb · Datum: 2026-08-13
Verifikation: offen
Was es schließt: Benötigter Nachweis: Nachweis, dass Incident-Nachbereitungen zu Maßnahmen führen

### Q10.5  Wer hat Zugang zu Produktivsystemen und -daten — und gibt es ein dokumentiertes, geprüftes Identitäts- und Berechtigungsmodell?
Antwort: Fünfzehn Personen mit produktivem Datenbankzugriff. Eine dokumentierte Rezertifizierung gibt es seit 2024 nicht.
Basis: Fakt
Woher es stammt: Dokument oder System: Revisionsbericht 2025-03, Feststellung 2 · Wer es gesagt hat: Interne Revision · Datum: 2025-03-27
Verifikation: blockiert
Was es schließt: Verantwortlich: Interne Revision · Benötigter Nachweis: Durchgeführte Rezertifizierung der fünfzehn produktiven Zugriffe · Bis: 2026-11-30 · Blockiert durch: Ohne benanntes Berechtigungsmodell nicht rezertifizierbar

### Q10.6  Welche Verschlüsselung ist im Ruhezustand und beim Transport vorhanden — und werden kryptografische Schlüssel separat von den Daten verwaltet, die sie schützen?
Antwort: Transportverschlüsselung ja, Verschlüsselung im Ruhezustand nur für Bankverbindungen. Eine Schlüsselrotation ist nicht definiert.
Basis: Fakt
Woher es stammt: Dokument oder System: Kryptokonzept 2021 · Datum: 2021-09-30
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Definierte Schlüsselrotation und der Umfang der Verschlüsselung im Ruhezustand · Bis: 2026-11-30

### Q10.7  Wo läuft die Plattform tatsächlich — Deployment-Ziele, Netzzonen, und welche Zonengrenzen ihr Verkehr überschreitet?
Antwort: Betrieb im konzerneigenen Rechenzentrum, Anwendungszone. Die Datenbank steht in einer eigenen Zone; der Verkehr zu den elf Konsumenten überschreitet die Zonengrenze zur Bürozone, die Marktkommunikation zusätzlich die Grenze nach außen.
Basis: Fakt
Woher es stammt: Dokument oder System: Netzplan RZ v4 · Datum: 2025-05-20 · Beleg/Quelle: Netzplan, Abschnitt Anwendungszonen
Verifikation: offen
Was es schließt: Verantwortlich: Teamleitung Betrieb · Benötigter Nachweis: Aktueller Netzplan mit den drei Übergängen und ihren Regelwerken · Bis: 2026-10-15

## To-Verify-Register

| Q-ID | Antwort | Verantwortlich | Benötigter Nachweis | Bis | Blockiert durch | Verifikation |
|---|---|---|---|---|---|---|
| [Q1.2] | Der Zustand besteht seit der Zusammenführung von Netz- und Vertriebsdaten 2019. Ausgelöst hat das Review das Wartungsende der Bestandsversion zum 31.12.2027 und die für Q4/2026 angekündigte Prüfung nach §8a BSIG. | Regulierungsmanagement | Herstellerbestätigung des Wartungsendes und der Verlängerungskonditionen, schriftlich | 2026-09-30 | — | offen |
| [Q1.3] | Benannt hat es der Leiter Messstellenbetrieb. Netzbetrieb und Vertrieb stimmen zu; das Bilanzkreismanagement sieht kein Problem, weil seine Auswertungen aus dem Data Warehouse kommen. | Leiter Messstellenbetrieb | Stellungnahme des Bilanzkreismanagements zur Abhängigkeit seiner Auswertungen | 2026-10-15 | — | offen |
| [Q1.4] | 2023 wurde ein API-Gateway davorgesetzt. Ergebnis: die Fassade steht, drei Konsumenten greifen weiterhin direkt auf die Datenbank zu. | Teamleitung Marktdaten | Zugriffsprotokoll der Datenbank über 90 Tage, das die drei Direktzugriffe belegt | 2026-09-30 | — | offen |
| [Q1.5] | Nicht quantifiziert. Genannt wurde „ein zweistelliger Millionenbetrag über drei Jahre“, ohne Herleitung. | — | Herleitung der genannten Kostenschätzung, oder eine Rechnung, die sie ersetzt | — | Es existiert keine Herleitung; die Zahl wurde mündlich genannt | blockiert |
| [Q2.2] | Bereichsleiter IT-Anwendungen Netz. Formal benannt, aber nicht schriftlich mit Entscheidungsbefugnis hinterlegt. | Bereichsleiter IT-Anwendungen Netz | Schriftlich hinterlegte Entscheidungsbefugnis | 2026-09-30 | — | offen |
| [Q2.5] | 31.12.2027, Wartungsende der Bestandsversion. Was bei Verstreichen passiert, ist nicht festgelegt — im Gespräch wurde vermutet, dass die kostenpflichtige Verlängerung automatisch gezogen wird. | Bereichsleiter IT-Anwendungen Netz | Festlegung, was am 01.01.2028 geschieht, schriftlich | 2026-10-31 | — | offen |
| [Q2.6] | Kein Konsument greift mehr direkt auf die Datenbank zu, und eine Schemaänderung ist in unter vier Wochen produktiv. | Leiter Messstellenbetrieb | Erfolgsdefinition mit messbarem Kriterium, von den Urteilenden abgenommen | 2026-10-15 | — | offen |
| [Q2.7] | Die Interne Revision, der Datenschutzbeauftragte und die elf Konsumenten. Kriterien liegen nur für die Revision vor. | — | Abnahmekriterien der elf Konsumenten und des Datenschutzbeauftragten | — | Kriterien liegen nur für die Revision vor | offen |
| [Q3.2] | Kein eigener Rahmen. Die Mittel liegen im Topf „Digitalisierung Netz“ und sind der ZMP nicht zugeordnet. | Bereichsleiter IT-Anwendungen Netz | Mittelzuordnung zur ZMP im Topf „Digitalisierung Netz“ | 2026-11-30 | — | offen |
| [Q3.4] | EnWG und MsbG gelten laufend. Die Prüfung nach §8a BSIG ist für Q4/2026 angekündigt, und der IT-Sicherheitskatalog nach §11 Abs. 1a EnWG verlangt ein zertifiziertes ISMS. | Regulierungsmanagement | Prüfungsankündigung §8a BSIG mit Termin und Prüfumfang | 2026-09-15 | — | offen |
| [Q3.5] | Architekturboard, dann IT-Lenkungsausschuss. Laut Verfahrensanweisung acht Wochen, erfahrungsgemäß ein Quartal. | Bereichsleiter IT-Anwendungen Netz | Verfahrensanweisung und die Durchlaufzeiten der letzten vier Vorlagen | 2026-10-15 | — | offen |
| [Q4.2] | Confluence-Raum „ZMP“. Letzter Abgleich gegen das laufende System unbekannt, letzte Seitenänderung 2022. | Teamleitung Marktdaten | Abgleich des Confluence-Raums gegen das laufende System, mit Datum | 2026-11-30 | — | offen |
| [Q4.3] | Die nächtliche Abgleichstrecke zwischen ZMP und dem Abrechnungssystem. Der Entwickler, der sie gebaut hat, ist 2024 in Rente gegangen. | Teamleitung Betrieb | Ablaufbeschreibung der nächtlichen Abgleichstrecke, gegen den laufenden Job geprüft | 2026-11-30 | Niemand im Haus kennt die Strecke; ohne externe Rekonstruktion nicht zu belegen | blockiert |
| [Q4.4] | Zählpunkt-, Zählwert- und Vertragsdaten sowie Bankverbindungen für den Lastschrifteinzug. Zählpunktbezeichnungen liegen dreifach vor — ZMP, CRM und Abrechnung — ohne führende Quelle. | Teamleitung Marktdaten | Benennung der führenden Quelle je Datendomäne, schriftlich | 2026-11-15 | — | offen |
| [Q4.5] | Elf dokumentierte Integrationen. Drei weitere wurden im Gespräch genannt und stehen in keiner Liste. | Teamleitung Marktdaten | Vollständige Integrationsliste aus dem Zugriffsprotokoll, nicht aus der Dokumentation | 2026-09-30 | — | offen |
| [Q4.6] | Wie ist die aktuelle automatisierte Testabdeckung, und wann wurde der letzte vollständige Regressionstest durchgeführt? | Teamleitung Marktdaten | Coverage-Bericht des letzten Builds und das Datum des letzten Vollregressionslaufs | 2026-09-30 | — | offen |
| [Q4.7] | Keycloak für die Anmeldung, der EDIFACT/AS4-Konnektor für die Marktkommunikation, und der Zeitdienst des Rechenzentrums. Fällt Keycloak aus, ist die Plattform ohne Anmeldung; fällt der Konnektor aus, puffert die Marktkommunikation 24 Stunden. Für den Zeitdienst hat das niemand geprüft. | Teamleitung Betrieb | Ausfallverhalten je Laufzeitabhängigkeit, getestet und protokolliert | 2026-11-30 | — | offen |
| [Q5.2] | Geschäftskritisch sind Marktkommunikation, Redispatch-Meldung und Abrechnung. Erwartet werden 99,9 % und unter 300 ms — verabredet ist nichts davon. | Leiter Messstellenbetrieb | Schriftliche Verfügbarkeits- und Latenzanforderung je geschäftskritischem Konsumenten | 2026-10-15 | — | offen |
| [Q5.3] | Ja. Das Kundenportal hält eine nächtliche Kopie der Zählwerte, weil die Antwortzeit früher nicht gereicht hat. | Teamleitung Betrieb | Liste der Schattenkopien mit Alter und Zweck | 2026-10-31 | — | offen |
| [Q5.5] | Wer hat die Befugnis, im Namen jedes Konsumenten eine brechende Schnittstellenänderung zu akzeptieren — und ist diese Person erreichbar? | Leiter Messstellenbetrieb | Je Konsument eine benannte, erreichbare Person mit Zustimmungsbefugnis | 2026-10-31 | — | offen |
| [Q5.6] | Rund 1,4 Mio. Zählwerte pro Tag, Spitze zwischen 02:00 und 04:00 beim nächtlichen Abgleich. Zum Monatswechsel das Dreifache. Erwartet wird eine Verdopplung bis 2029 durch den Smart-Meter-Rollout. | Teamleitung Betrieb | Wachstumsannahme des Smart-Meter-Rollouts, schriftlich bestätigt | 2026-10-31 | — | offen |
| [Q6.2] | Über das Kundenportal, den Lieferantenwechsel und die Zählerfernauslesung. Rechtsgrundlage: Vertragserfüllung nach Art. 6 Abs. 1 lit. b DSGVO, für die Messdaten zusätzlich die Bestimmungen des MsbG. | Datenschutzbeauftragter | Verzeichnis der Verarbeitungstätigkeiten im aktuellen Stand | 2026-10-15 | — | offen |
| [Q6.3] | Für Zählpunktdaten benannt. Für Vertrags- und Bankverbindungsdaten nicht. | Datenschutzbeauftragter | Benannte Verantwortliche für Vertrags- und Bankverbindungsdaten | 2026-10-15 | — | offen |
| [Q6.4] | Zehn Jahre nach Vertragsende, Zählwerte nach den Fristen des MsbG. Ein funktionierender Löschweg existiert nicht — Löschungen werden als Sperrkennzeichen abgebildet. | Datenschutzbeauftragter | Getesteter Löschweg, mit Protokoll des Tests | 2026-12-15 | Ein Löschweg existiert nicht; er muss erst gebaut werden | blockiert |
| [Q6.5] | Laut Betrieb bleibt alles im konzerneigenen Rechenzentrum. Für die Backup-Strecke konnte das im Gespräch niemand bestätigen. | Teamleitung Betrieb | Bestätigung des Speicherorts der Backup-Strecke, schriftlich | 2026-09-30 | — | offen |
| [Q7.2] | Interne Revision 03/2025. Zwei Feststellungen zur Zugriffsverwaltung sind offen. | Interne Revision | Erledigungsnachweis der zwei offenen Feststellungen | 2026-11-30 | — | offen |
| [Q7.5] | Der IT-Sicherheitskatalog verlangt ein nach ISO 27001 zertifiziertes ISMS. Das Zertifikat deckt das Rechenzentrum ab, nicht die Anwendung. | Regulierungsmanagement | Geltungsbereich des ISO-27001-Zertifikats, geprüft gegen die Anforderung des Sicherheitskatalogs | 2026-09-30 | — | offen |
| [Q8.1] | Zwei: Ablösung der Datenhaltung auf PostgreSQL im eigenen Rechenzentrum, oder Neubau als Datenprodukt. Die Begründungen wurden mündlich ausgetauscht und nirgends festgehalten. | Teamleitung Marktdaten | Die beiden Optionen schriftlich, mit ihren Begründungen | 2026-10-31 | — | offen |
| [Q8.2] | Die Umstellung der Bankverbindungsdaten auf ein neues Verschlüsselungsverfahren — die Altbestände sind danach im Altsystem nicht mehr lesbar. | Teamleitung Marktdaten | Migrationsplan mit benannten irreversiblen Schritten, vom Datenschutzbeauftragten gegengezeichnet | 2026-12-15 | Setzt die Entscheidung über das Verschlüsselungsverfahren voraus | blockiert |
| [Q8.3] | Parallelbetrieb wurde als „ein paar Monate“ erwähnt. Wie lange die doppelte Schreiblast neben der Marktkommunikation tragbar ist, hat niemand geprüft. | Teamleitung Betrieb | Lasttest des Parallelbetriebs neben der Marktkommunikation | 2026-12-15 | — | offen |
| [Q8.4] | Wenn diese Migration schiefgeht, was ist der Rückweg — und was kostet er an Zeit und Datenintegrität? | Teamleitung Marktdaten | Beschriebener und geprobter Rückweg je Migrationsschritt | 2026-12-15 | — | offen |
| [Q8.6] | Für Stammdaten offen. Für historische Zählwerte wurde vorgeschlagen, sie im Altsystem zu belassen. | — | Festlegung, welche Daten mitgehen und welche im Altsystem bleiben | — | — | offen |
| [Q9.1] | Team „Marktdaten“, sieben Personen, Leitung benannt. Die Verfügbarkeitsverantwortung liegt formal beim Betrieb, nicht beim Team. | Bereichsleiter IT-Anwendungen Netz | Schriftliche Zuordnung der Verfügbarkeitsverantwortung zwischen Team und Betrieb | 2026-10-31 | — | offen |
| [Q9.2] | Über das Anforderungsboard des Bereichs. Es staut sich an der fachlichen Abnahme, nicht in der Entwicklung. | Teamleitung Marktdaten | Durchlaufzeiten der fachlichen Abnahme über die letzten zwölf Monate | 2026-10-31 | — | offen |
| [Q9.3] | Zwei Personen. Beide sind zusätzlich im Smart-Meter-Rollout eingeplant. | Bereichsleiter IT-Anwendungen Netz | Verbindliche Kapazitätszusage für die beiden Schlüsselpersonen | 2026-11-30 | Beide sind bis Q3/2027 im Smart-Meter-Rollout verplant | blockiert |
| [Q9.4] | Der Bereich wird zum 01.01.2027 mit der IT Vertrieb zusammengelegt. | Bereichsleiter IT-Anwendungen Netz | Zielorganisation zum 01.01.2027 mit benannter Plattformverantwortung | 2026-11-30 | — | offen |
| [Q10.1] | Kein SLO dokumentiert. Gemessene Verfügbarkeit der letzten zwölf Monate: 99,7 %. | Teamleitung Betrieb | Dokumentiertes SLO mit Zustimmung der geschäftskritischen Konsumenten | 2026-11-15 | — | offen |
| [Q10.2] | RTO vier Stunden, RPO 15 Minuten laut Notfallkonzept. Der letzte Restore-Test ist nicht belegt. | Teamleitung Betrieb | Protokoll eines durchgeführten Restore-Tests | 2026-12-15 | Ein Testfenster neben der Marktkommunikation ist nicht terminiert | blockiert |
| [Q10.4] | Beide dokumentiert. Der Change-Prozess wird gelebt; die Incident-Nachbereitung endet regelmäßig ohne Maßnahme. | — | Nachweis, dass Incident-Nachbereitungen zu Maßnahmen führen | — | — | offen |
| [Q10.5] | Fünfzehn Personen mit produktivem Datenbankzugriff. Eine dokumentierte Rezertifizierung gibt es seit 2024 nicht. | Interne Revision | Durchgeführte Rezertifizierung der fünfzehn produktiven Zugriffe | 2026-11-30 | Ohne benanntes Berechtigungsmodell nicht rezertifizierbar | blockiert |
| [Q10.6] | Transportverschlüsselung ja, Verschlüsselung im Ruhezustand nur für Bankverbindungen. Eine Schlüsselrotation ist nicht definiert. | Teamleitung Betrieb | Definierte Schlüsselrotation und der Umfang der Verschlüsselung im Ruhezustand | 2026-11-30 | — | offen |
| [Q10.7] | Betrieb im konzerneigenen Rechenzentrum, Anwendungszone. Die Datenbank steht in einer eigenen Zone; der Verkehr zu den elf Konsumenten überschreitet die Zonengrenze zur Bürozone, die Marktkommunikation zusätzlich die Grenze nach außen. | Teamleitung Betrieb | Aktueller Netzplan mit den drei Übergängen und ihren Regelwerken | 2026-10-15 | — | offen |

## Richtungen, nicht entschieden

- Zuerst die Datenhaltung ablösen und die elf Konsumenten unverändert weiterbedienen, die Schnittstellen danach. — Diese Richtung ist abhängig von: [Q1.4] [Q4.5] [Q5.2] [Q5.5] [Q8.2] [Q8.4] [Q9.3]
- Die Wartung einmal kostenpflichtig verlängern und die Ablösung nach der KRITIS-Prüfung neu ansetzen. — Diese Richtung ist abhängig von: [Q1.2] [Q1.5] [Q3.2] [Q3.4] [Q7.5]

