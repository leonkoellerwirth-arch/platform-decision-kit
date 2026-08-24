# Intake — Discovery

> Gesprächsnotiz, keine autoritative Quelle. Eine Aussage mit offener Verifikation bleibt eine Aussage — sie wird nicht zum Fakt, weil sie aufgeschrieben wurde.
> Sprache: Deutsch (Übersetzung; verbindlich ist die englische Fassung). Die Frage-IDs sind sprachneutral.

## 1. Schmerz & Anlass

### Q1.1  Was ist das vordergründige Problem in einem Satz?
Antwort: Änderungen an der Zähler- und Marktdatenplattform brauchen sechs bis neun Monate, weil niemand die Auswirkung auf die elf angeschlossenen Systeme vorhersagen kann.
Basis: Fakt
Beleg/Quelle: Änderungsstatistik ZMP 2024–2026 · Betriebsbericht Q1/2026
Verifikation: keine

### Q1.2  Wie lange besteht diese Situation, und was hat sich verändert, sodass das Review jetzt stattfindet?
Antwort: Der Zustand besteht seit der Zusammenführung von Netz- und Vertriebsdaten 2019. Ausgelöst hat das Review das Wartungsende der Bestandsversion zum 31.12.2027 und die für Q4/2026 angekündigte Prüfung nach §8a BSIG.
Basis: Fakt
Beleg/Quelle: Herstellermitteilung Wartungsende · Regulierungsmanagement
Verifikation: offen

### Q1.3  Wer hat dies als Problem benannt — und wer stimmt zu, wer nicht?
Antwort: Benannt hat es der Leiter Messstellenbetrieb. Netzbetrieb und Vertrieb stimmen zu; das Bilanzkreismanagement sieht kein Problem, weil seine Auswertungen aus dem Data Warehouse kommen.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q1.4  Was wurde bisher unternommen, um diese Situation zu adressieren, und was war das Ergebnis?
Antwort: 2023 wurde ein API-Gateway davorgesetzt. Ergebnis: die Fassade steht, drei Konsumenten greifen weiterhin direkt auf die Datenbank zu.
Basis: Fakt
Beleg/Quelle: Architekturreview 2023 · Anhang C
Verifikation: offen

### Q1.5  Was sind die geschätzten Kosten der Untätigkeit über 12 Monate — quantifiziert oder explizit als unquantifiziert benannt?
Antwort: Nicht quantifiziert. Genannt wurde „ein zweistelliger Millionenbetrag über drei Jahre“, ohne Herleitung.
Basis: Annahme
Beleg/Quelle: —
Verifikation: blockiert

## 2. Erfolg & Messlatte

### Q2.1  Was ist die primäre Entscheidungsfrage — als Frage formuliert, die mit Ja/Nein oder einer Optionswahl beantwortet werden kann?
Antwort: Wird die Datenhaltung der Zähler- und Marktdatenplattform bis Q2/2027 abgelöst, oder wird die Wartung der Bestandsversion kostenpflichtig verlängert?
Basis: Fakt
Beleg/Quelle: Geschäftsführungsvorlage IT 2026-04
Verifikation: keine

### Q2.2  Wer ist der Entscheidungseigner — die einzelne benannte Person, die für das Ergebnis verantwortlich ist?
Antwort: Bereichsleiter IT-Anwendungen Netz. Formal benannt, aber nicht schriftlich mit Entscheidungsbefugnis hinterlegt.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q2.3  Was liegt explizit im Scope dieser Entscheidung?
Antwort: Datenhaltung und Zugriffsschicht der ZMP.
Basis: Fakt
Beleg/Quelle: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2
Verifikation: keine

### Q2.4  Was liegt explizit außerhalb des Scope dieser Entscheidung?
Antwort: Das Abrechnungssystem selbst, das Netzleitsystem und das Data Warehouse.
Basis: Fakt
Beleg/Quelle: Geschäftsführungsvorlage IT 2026-04, Abschnitt 2
Verifikation: keine

### Q2.5  Was ist die Entscheidungsfrist, und was passiert — explizit — wenn sie ohne Entscheidung verstreicht?
Antwort: 31.12.2027, Wartungsende der Bestandsversion. Was bei Verstreichen passiert, ist nicht festgelegt — im Gespräch wurde vermutet, dass die kostenpflichtige Verlängerung automatisch gezogen wird.
Basis: Annahme
Beleg/Quelle: —
Verifikation: offen

### Q2.6  Wie sieht Erfolg in 12 Monaten aus — in Begriffen, die ein neutraler Beobachter verifizieren könnte?
Antwort: Kein Konsument greift mehr direkt auf die Datenbank zu, und eine Schemaänderung ist in unter vier Wochen produktiv.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q2.7  Wer muss mit dem Ergebnis zufrieden sein, und nach welchen Kriterien beurteilt er es?
Antwort: Die Interne Revision, der Datenschutzbeauftragte und die elf Konsumenten. Kriterien liegen nur für die Revision vor.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

## 3. Vorgaben & Phase

### Q3.1  Welche Architektur- oder Technologievorgaben sind fest — d.h. in dieser Entscheidung nicht zur Diskussion gestellt?
Antwort: Fest: Betrieb im konzerneigenen Rechenzentrum, Java als Zielsprache, Keycloak als Identitätsanbieter.
Basis: Fakt
Beleg/Quelle: Konzern-Architekturvorgaben v7, Kapitel 3
Verifikation: keine

### Q3.2  Welchen Budgetrahmen gibt es für diese Initiative — oder ist keiner definiert?
Antwort: Kein eigener Rahmen. Die Mittel liegen im Topf „Digitalisierung Netz“ und sind der ZMP nicht zugeordnet.
Basis: Fakt
Beleg/Quelle: Mittelfristplanung IT 2026–2029
Verifikation: offen

### Q3.3  Was ist die aktuelle Reifephase der Plattform — wie lange ist sie in Produktion, und wie häufig wird sie geändert?
Antwort: Seit 2011 in Produktion, vier Releases pro Jahr, zwei davon reine Wartung.
Basis: Fakt
Beleg/Quelle: Release-Kalender ZMP
Verifikation: keine

### Q3.4  Welche regulatorischen oder Audit-Verpflichtungen schränken den Zeitplan einer Änderung ein?
Antwort: EnWG und MsbG gelten laufend. Die Prüfung nach §8a BSIG ist für Q4/2026 angekündigt, und der IT-Sicherheitskatalog nach §11 Abs. 1a EnWG verlangt ein zertifiziertes ISMS.
Basis: Fakt
Beleg/Quelle: Mitteilung Regulierungsmanagement 2026-02
Verifikation: offen

### Q3.5  Welchen Governance-Prozess muss eine bedeutende Plattformentscheidung durchlaufen, und wie lange dauert er?
Antwort: Architekturboard, dann IT-Lenkungsausschuss. Laut Verfahrensanweisung acht Wochen, erfahrungsgemäß ein Quartal.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

## 4. Bestand & Wissen

### Q4.1  Was existiert heute — Liste der Kernkomponenten, ihr ungefähres Produktionsalter und ihr Technologie-Stack?
Antwort: Oracle 19c, ein Java-EE-Monolith aus 2011, ein API-Gateway aus 2023, zwei Batch-Strecken für Marktkommunikation und Netzabrechnung.
Basis: Fakt
Beleg/Quelle: CMDB-Auszug 2026-08
Verifikation: keine

### Q4.2  Wo lebt die maßgebliche technische Dokumentation, und wann wurde sie zuletzt gegen das System verifiziert?
Antwort: Confluence-Raum „ZMP“. Letzter Abgleich gegen das laufende System unbekannt, letzte Seitenänderung 2022.
Basis: Fakt
Beleg/Quelle: Confluence · Raum ZMP
Verifikation: offen

### Q4.3  Welche Teile des Systems versteht niemand aktuell gut genug, um die Auswirkung einer Änderung vorherzusagen?
Antwort: Die nächtliche Abgleichstrecke zwischen ZMP und dem Abrechnungssystem. Der Entwickler, der sie gebaut hat, ist 2024 in Rente gegangen.
Basis: Fakt
Beleg/Quelle: Betrieb · Übergabeprotokoll 2024
Verifikation: blockiert

### Q4.4  Welche Daten verwaltet die Plattform — und wie ist die Stammdatenlage (Einzelquelle, Duplikate, Eigentümerschaft)?
Antwort: Zählpunkt-, Zählwert- und Vertragsdaten sowie Bankverbindungen für den Lastschrifteinzug. Zählpunktbezeichnungen liegen dreifach vor — ZMP, CRM und Abrechnung — ohne führende Quelle.
Basis: Fakt
Beleg/Quelle: Datenlandkarte 2025
Verifikation: offen

### Q4.5  Welche Integrationen existieren — dokumentiert oder nicht — und wer kennt sie?
Antwort: Elf dokumentierte Integrationen. Drei weitere wurden im Gespräch genannt und stehen in keiner Liste.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q4.6  Wie ist die aktuelle automatisierte Testabdeckung, und wann wurde der letzte vollständige Regressionstest durchgeführt?
Antwort: —
Basis: unbekannt
Beleg/Quelle: —
Verifikation: offen

## 5. Konsumenten & Schnittstellen

### Q5.1  Wer sind die aktuellen Konsumenten dieser Plattform — Liste und Beschreibung der Integration (sync, async, Batch, Event)?
Antwort: Elf: CRM, Abrechnung, Marktkommunikation (EDIFACT/AS4), Netzleitsystem (lesend), Data Warehouse, Kundenportal, Lieferantenwechsel, Redispatch-Meldung, Zählerfernauslesung, Inkasso, Bilanzkreismanagement.
Basis: Fakt
Beleg/Quelle: API-Gateway · Routing-Tabelle
Verifikation: keine

### Q5.2  Welche Konsumenten sind geschäftskritisch, und welche Verfügbarkeit oder Latenz erwarten sie?
Antwort: Geschäftskritisch sind Marktkommunikation, Redispatch-Meldung und Abrechnung. Erwartet werden 99,9 % und unter 300 ms — verabredet ist nichts davon.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q5.3  Gibt es Konsumenten, die Workarounds, undokumentierte Integrationen oder Schattenkopien von Plattformdaten angelegt haben?
Antwort: Ja. Das Kundenportal hält eine nächtliche Kopie der Zählwerte, weil die Antwortzeit früher nicht gereicht hat.
Basis: Fakt
Beleg/Quelle: Betrieb · Ticket INC-2019-4471
Verifikation: offen

### Q5.4  Welche Schnittstellen sind formal vertraglich vereinbart oder durch SLAs abgedeckt — und welche werden informell genutzt?
Antwort: Kein einziges Interface ist durch ein SLA abgedeckt.
Basis: Fakt
Beleg/Quelle: Vertragsdatenbank Dienstleister
Verifikation: keine

### Q5.5  Wer hat die Befugnis, im Namen jedes Konsumenten eine brechende Schnittstellenänderung zu akzeptieren — und ist diese Person erreichbar?
Antwort: —
Basis: unbekannt
Beleg/Quelle: —
Verifikation: offen

## 6. Daten & Souveränität

### Q6.1  Welche Datenklassifizierungen gelten für Daten, die diese Plattform speichert oder verarbeitet — und wer hat sie validiert?
Antwort: Personenbezogene Zählwerte und Bankverbindungen, Klassifizierung „vertraulich“. Festgestellt vom Datenschutzbeauftragten 2021.
Basis: Fakt
Beleg/Quelle: Schutzbedarfsfeststellung 2021
Verifikation: keine

### Q6.2  Wo treten personenbezogene Daten in die Plattform ein, und unter welcher Rechtsgrundlage werden sie verarbeitet?
Antwort: Über das Kundenportal, den Lieferantenwechsel und die Zählerfernauslesung. Rechtsgrundlage: Vertragserfüllung nach Art. 6 Abs. 1 lit. b DSGVO, für die Messdaten zusätzlich die Bestimmungen des MsbG.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q6.3  Wer ist der benannte Dateneigner für jede wesentliche Datendomäne, die von dieser Plattform verarbeitet wird?
Antwort: Für Zählpunktdaten benannt. Für Vertrags- und Bankverbindungsdaten nicht.
Basis: Fakt
Beleg/Quelle: Verzeichnis der Verarbeitungstätigkeiten
Verifikation: offen

### Q6.4  Was sind die dokumentierten Aufbewahrungsanforderungen, und gibt es einen funktionierenden Löschpfad, der getestet wurde?
Antwort: Zehn Jahre nach Vertragsende, Zählwerte nach den Fristen des MsbG. Ein funktionierender Löschweg existiert nicht — Löschungen werden als Sperrkennzeichen abgebildet.
Basis: Fakt
Beleg/Quelle: Löschkonzept 2022, Abschnitt 4
Verifikation: blockiert

### Q6.5  Überqueren von dieser Plattform verarbeitete Daten Jurisdiktionen oder verlassen sie die direkte Kontrolle der Organisation?
Antwort: Laut Betrieb bleibt alles im konzerneigenen Rechenzentrum. Für die Backup-Strecke konnte das im Gespräch niemand bestätigen.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

## 7. Regulatorik & Vertrauen

### Q7.1  Welche regulatorischen Rahmenbedingungen gelten für diese Plattform — von wem festgestellt, und wann zuletzt geprüft?
Antwort: EnWG, MsbG, DSGVO und das BSIG (KRITIS). Festgestellt vom Regulierungsmanagement, zuletzt bestätigt 02/2026.
Basis: Fakt
Beleg/Quelle: Mitteilung Regulierungsmanagement 2026-02
Verifikation: keine

### Q7.2  Wann war das letzte externe oder interne Audit, das diese Plattform abdeckte, und was waren die offenen Feststellungen?
Antwort: Interne Revision 03/2025. Zwei Feststellungen zur Zugriffsverwaltung sind offen.
Basis: Fakt
Beleg/Quelle: Revisionsbericht 2025-03
Verifikation: offen

### Q7.3  Ist KI/ML im Entscheidungsgegenstand selbst — in einem Produktivsystem oder -workflow — oder nur im Autorenprozess dieser Analyse?
Antwort: Nein. KI ist nicht im Entscheidungsgegenstand. Eine Lastprognose läuft im Vertriebssystem, nicht in der ZMP.
Basis: Fakt
Beleg/Quelle: Architekturreview 2023
Verifikation: keine

### Q7.4  Falls KI/ML im Entscheidungsgegenstand: Was ist die Rolle und Risikoklasse laut Legal — oder ist dies explizit offen?
Antwort: Entfällt, da kein KI/ML im Entscheidungsgegenstand. Die Rechtsabteilung wurde dazu nicht befragt.
Basis: Aussage
Beleg/Quelle: —
Verifikation: keine

### Q7.5  Welche Vertrauens- oder Zertifizierungsanforderungen stellen Kunden, Partner oder Behörden an diese Plattform?
Antwort: Der IT-Sicherheitskatalog verlangt ein nach ISO 27001 zertifiziertes ISMS. Das Zertifikat deckt das Rechenzentrum ab, nicht die Anwendung.
Basis: Fakt
Beleg/Quelle: Zertifikat ISO 27001 · Geltungsbereich
Verifikation: offen

## 8. Migration & Reversibilität

### Q8.1  Welche Migrationspfade wurden erwogen — auch informell — und was war die Begründung für oder gegen jeden?
Antwort: Zwei: Ablösung der Datenhaltung auf PostgreSQL im eigenen Rechenzentrum, oder Neubau als Datenprodukt. Die Begründungen wurden mündlich ausgetauscht und nirgends festgehalten.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q8.2  Welche Schritte in einem erwogenen Migrationspfad sind irreversibel — einmal vollzogen, kann der vorherige Zustand nicht wiederhergestellt werden?
Antwort: Die Umstellung der Bankverbindungsdaten auf ein neues Verschlüsselungsverfahren — die Altbestände sind danach im Altsystem nicht mehr lesbar.
Basis: Annahme
Beleg/Quelle: —
Verifikation: blockiert

### Q8.3  Welcher Ansatz zum parallelen Betrieb von Alt und Neu — falls erwogen — wurde diskutiert, und für wie lange?
Antwort: Parallelbetrieb wurde als „ein paar Monate“ erwähnt. Wie lange die doppelte Schreiblast neben der Marktkommunikation tragbar ist, hat niemand geprüft.
Basis: Annahme
Beleg/Quelle: —
Verifikation: offen

### Q8.4  Wenn diese Migration schiefgeht, was ist der Rückweg — und was kostet er an Zeit und Datenintegrität?
Antwort: —
Basis: unbekannt
Beleg/Quelle: —
Verifikation: offen

### Q8.5  Wurde das Szenario "Rückkehr ist unmöglich" explizit bewertet und dokumentiert — nicht nur als Risiko notiert?
Antwort: Nein, nicht bewertet.
Basis: Fakt
Beleg/Quelle: Protokoll Architekturboard 2026-05
Verifikation: keine

### Q8.6  Welche Datenmigrationsstrategie gibt es für Stammdaten und historische Datensätze — insbesondere für solche mit Aufbewahrungspflichten?
Antwort: Für Stammdaten offen. Für historische Zählwerte wurde vorgeschlagen, sie im Altsystem zu belassen.
Basis: Annahme
Beleg/Quelle: —
Verifikation: offen

## 9. Organisation & Team-Schnitt

### Q9.1  Wer besitzt diese Plattform — die einzelne benannte Person oder das Team mit Verantwortung für Verfügbarkeit und Weiterentwicklung?
Antwort: Team „Marktdaten“, sieben Personen, Leitung benannt. Die Verfügbarkeitsverantwortung liegt formal beim Betrieb, nicht beim Team.
Basis: Fakt
Beleg/Quelle: Organigramm IT 2026
Verifikation: offen

### Q9.2  Wie gelangt Arbeit zu diesem Plattformteam — wer initiiert Änderungen, wer prüft sie, und wo stocken Übergaben?
Antwort: Über das Anforderungsboard des Bereichs. Es staut sich an der fachlichen Abnahme, nicht in der Entwicklung.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q9.3  Wo ist Wissen konzentriert — welche Personen wären, wenn sie fehlen, in der Lage, eine Migration zu verzögern oder zu blockieren?
Antwort: Zwei Personen. Beide sind zusätzlich im Smart-Meter-Rollout eingeplant.
Basis: Fakt
Beleg/Quelle: Ressourcenplanung 2026/2027
Verifikation: blockiert

### Q9.4  Welche Organisationsänderungen — Umstrukturierungen, wichtige Abgänge, Teamfusionen — sind geplant oder im Gange und betreffen diese Arbeit?
Antwort: Der Bereich wird zum 01.01.2027 mit der IT Vertrieb zusammengelegt.
Basis: Fakt
Beleg/Quelle: Mitteilung der Geschäftsführung 2026-06
Verifikation: offen

### Q9.5  Wer sind die informellen Entscheidungsträger, deren Einbindung notwendig ist — auch wenn sie keine formale Befugnis für diese Entscheidung haben?
Antwort: Der Leiter Marktkommunikation. Formal nicht beteiligt, faktisch hat noch keine Schemaänderung ohne seine Zustimmung stattgefunden.
Basis: Aussage
Beleg/Quelle: —
Verifikation: keine

## 10. Betrieb, Sicherheit & Resilienz

### Q10.1  Was sind die aktuellen SLO/Verfügbarkeitsziele — und werden sie eingehalten? Falls kein SLO existiert, explizit benennen.
Antwort: Kein SLO dokumentiert. Gemessene Verfügbarkeit der letzten zwölf Monate: 99,7 %.
Basis: Fakt
Beleg/Quelle: Monitoring-Auswertung 08/2025–07/2026
Verifikation: offen

### Q10.2  Was sind die RTO- und RPO-Ziele — und wann wurde der letzte Restore-Test durchgeführt?
Antwort: RTO vier Stunden, RPO 15 Minuten laut Notfallkonzept. Der letzte Restore-Test ist nicht belegt.
Basis: Fakt
Beleg/Quelle: Notfallkonzept IT 2023
Verifikation: blockiert

### Q10.3  Welche Observability existiert — was wird protokolliert, was gemessen, was löst einen Alert aus?
Antwort: Protokolle in Splunk, Infrastrukturmetriken in Zabbix. Fachliche Alerts auf die Fristen der Marktkommunikation gibt es nicht.
Basis: Fakt
Beleg/Quelle: Betriebshandbuch ZMP
Verifikation: keine

### Q10.4  Was ist der Incident-Response-Prozess — und was ist der Change-Management-Prozess? Sind sie dokumentiert und werden sie eingehalten?
Antwort: Beide dokumentiert. Der Change-Prozess wird gelebt; die Incident-Nachbereitung endet regelmäßig ohne Maßnahme.
Basis: Aussage
Beleg/Quelle: —
Verifikation: offen

### Q10.5  Wer hat Zugang zu Produktivsystemen und -daten — und gibt es ein dokumentiertes, geprüftes Identitäts- und Berechtigungsmodell?
Antwort: Fünfzehn Personen mit produktivem Datenbankzugriff. Eine dokumentierte Rezertifizierung gibt es seit 2024 nicht.
Basis: Fakt
Beleg/Quelle: Revisionsbericht 2025-03, Feststellung 2
Verifikation: blockiert

### Q10.6  Welche Verschlüsselung ist im Ruhezustand und beim Transport vorhanden — und werden kryptografische Schlüssel separat von den Daten verwaltet, die sie schützen?
Antwort: Transportverschlüsselung ja, Verschlüsselung im Ruhezustand nur für Bankverbindungen. Eine Schlüsselrotation ist nicht definiert.
Basis: Fakt
Beleg/Quelle: Kryptokonzept 2021
Verifikation: offen

## To-Verify-Register

- [Q1.2] Wie lange besteht diese Situation, und was hat sich verändert, sodass das Review jetzt stattfindet? — Verifikation: offen
- [Q1.3] Wer hat dies als Problem benannt — und wer stimmt zu, wer nicht? — Verifikation: offen
- [Q1.4] Was wurde bisher unternommen, um diese Situation zu adressieren, und was war das Ergebnis? — Verifikation: offen
- [Q1.5] Was sind die geschätzten Kosten der Untätigkeit über 12 Monate — quantifiziert oder explizit als unquantifiziert benannt? — Verifikation: blockiert
- [Q2.2] Wer ist der Entscheidungseigner — die einzelne benannte Person, die für das Ergebnis verantwortlich ist? — Verifikation: offen
- [Q2.5] Was ist die Entscheidungsfrist, und was passiert — explizit — wenn sie ohne Entscheidung verstreicht? — Verifikation: offen
- [Q2.6] Wie sieht Erfolg in 12 Monaten aus — in Begriffen, die ein neutraler Beobachter verifizieren könnte? — Verifikation: offen
- [Q2.7] Wer muss mit dem Ergebnis zufrieden sein, und nach welchen Kriterien beurteilt er es? — Verifikation: offen
- [Q3.2] Welchen Budgetrahmen gibt es für diese Initiative — oder ist keiner definiert? — Verifikation: offen
- [Q3.4] Welche regulatorischen oder Audit-Verpflichtungen schränken den Zeitplan einer Änderung ein? — Verifikation: offen
- [Q3.5] Welchen Governance-Prozess muss eine bedeutende Plattformentscheidung durchlaufen, und wie lange dauert er? — Verifikation: offen
- [Q4.2] Wo lebt die maßgebliche technische Dokumentation, und wann wurde sie zuletzt gegen das System verifiziert? — Verifikation: offen
- [Q4.3] Welche Teile des Systems versteht niemand aktuell gut genug, um die Auswirkung einer Änderung vorherzusagen? — Verifikation: blockiert
- [Q4.4] Welche Daten verwaltet die Plattform — und wie ist die Stammdatenlage (Einzelquelle, Duplikate, Eigentümerschaft)? — Verifikation: offen
- [Q4.5] Welche Integrationen existieren — dokumentiert oder nicht — und wer kennt sie? — Verifikation: offen
- [Q4.6] Wie ist die aktuelle automatisierte Testabdeckung, und wann wurde der letzte vollständige Regressionstest durchgeführt? — Verifikation: offen
- [Q5.2] Welche Konsumenten sind geschäftskritisch, und welche Verfügbarkeit oder Latenz erwarten sie? — Verifikation: offen
- [Q5.3] Gibt es Konsumenten, die Workarounds, undokumentierte Integrationen oder Schattenkopien von Plattformdaten angelegt haben? — Verifikation: offen
- [Q5.5] Wer hat die Befugnis, im Namen jedes Konsumenten eine brechende Schnittstellenänderung zu akzeptieren — und ist diese Person erreichbar? — Verifikation: offen
- [Q6.2] Wo treten personenbezogene Daten in die Plattform ein, und unter welcher Rechtsgrundlage werden sie verarbeitet? — Verifikation: offen
- [Q6.3] Wer ist der benannte Dateneigner für jede wesentliche Datendomäne, die von dieser Plattform verarbeitet wird? — Verifikation: offen
- [Q6.4] Was sind die dokumentierten Aufbewahrungsanforderungen, und gibt es einen funktionierenden Löschpfad, der getestet wurde? — Verifikation: blockiert
- [Q6.5] Überqueren von dieser Plattform verarbeitete Daten Jurisdiktionen oder verlassen sie die direkte Kontrolle der Organisation? — Verifikation: offen
- [Q7.2] Wann war das letzte externe oder interne Audit, das diese Plattform abdeckte, und was waren die offenen Feststellungen? — Verifikation: offen
- [Q7.5] Welche Vertrauens- oder Zertifizierungsanforderungen stellen Kunden, Partner oder Behörden an diese Plattform? — Verifikation: offen
- [Q8.1] Welche Migrationspfade wurden erwogen — auch informell — und was war die Begründung für oder gegen jeden? — Verifikation: offen
- [Q8.2] Welche Schritte in einem erwogenen Migrationspfad sind irreversibel — einmal vollzogen, kann der vorherige Zustand nicht wiederhergestellt werden? — Verifikation: blockiert
- [Q8.3] Welcher Ansatz zum parallelen Betrieb von Alt und Neu — falls erwogen — wurde diskutiert, und für wie lange? — Verifikation: offen
- [Q8.4] Wenn diese Migration schiefgeht, was ist der Rückweg — und was kostet er an Zeit und Datenintegrität? — Verifikation: offen
- [Q8.6] Welche Datenmigrationsstrategie gibt es für Stammdaten und historische Datensätze — insbesondere für solche mit Aufbewahrungspflichten? — Verifikation: offen
- [Q9.1] Wer besitzt diese Plattform — die einzelne benannte Person oder das Team mit Verantwortung für Verfügbarkeit und Weiterentwicklung? — Verifikation: offen
- [Q9.2] Wie gelangt Arbeit zu diesem Plattformteam — wer initiiert Änderungen, wer prüft sie, und wo stocken Übergaben? — Verifikation: offen
- [Q9.3] Wo ist Wissen konzentriert — welche Personen wären, wenn sie fehlen, in der Lage, eine Migration zu verzögern oder zu blockieren? — Verifikation: blockiert
- [Q9.4] Welche Organisationsänderungen — Umstrukturierungen, wichtige Abgänge, Teamfusionen — sind geplant oder im Gange und betreffen diese Arbeit? — Verifikation: offen
- [Q10.1] Was sind die aktuellen SLO/Verfügbarkeitsziele — und werden sie eingehalten? Falls kein SLO existiert, explizit benennen. — Verifikation: offen
- [Q10.2] Was sind die RTO- und RPO-Ziele — und wann wurde der letzte Restore-Test durchgeführt? — Verifikation: blockiert
- [Q10.4] Was ist der Incident-Response-Prozess — und was ist der Change-Management-Prozess? Sind sie dokumentiert und werden sie eingehalten? — Verifikation: offen
- [Q10.5] Wer hat Zugang zu Produktivsystemen und -daten — und gibt es ein dokumentiertes, geprüftes Identitäts- und Berechtigungsmodell? — Verifikation: blockiert
- [Q10.6] Welche Verschlüsselung ist im Ruhezustand und beim Transport vorhanden — und werden kryptografische Schlüssel separat von den Daten verwaltet, die sie schützen? — Verifikation: offen
