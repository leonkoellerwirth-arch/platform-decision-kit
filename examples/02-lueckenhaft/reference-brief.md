<!-- hand-authored reference output — the target shape for an agent brief, written by a human -->
# Discovery-Brief — LegacyHR

Fiktives Szenario. Grundlage ist ausschließlich `intake-filled.md`. Wo das Intake eine Lücke
zeigt, bleibt die Lücke stehen: aus einem leeren Feld wird in diesem Brief kein Wert abgeleitet.

## Lagebild

- Die monatlichen Payroll-Läufe erfordern nahezu jedes Mal manuelle Korrekturen, ohne dass vorab absehbar ist, welche Fälle scheitern [Q1.1] (Aussage · IT-Lead, Interview 2026-08-19).
- Auslöser des Reviews ist regulatorischer Modernisierungsdruck, kein konkreter Vorfall [Q1.2] (Aussage · IT-Lead, Interview 2026-08-19).
- Die Kosten der Untätigkeit sind nicht geschätzt; der manuelle Korrekturaufwand wurde nie gemessen [Q1.5] (unbekannt · keine Quelle).
- Der Bestand besteht aus einer Java-Weboberfläche von 2014, einer Oracle-Datenbank und einem älteren COBOL-Payroll-Modul [Q4.1] (Aussage · IT-Lead, Interview 2026-08-19).
- Die Verzweigungslogik des COBOL-Payroll-Moduls versteht derzeit niemand im Team; die letzte Person mit diesem Wissen hat das Unternehmen 2024 verlassen [Q4.3] (unbekannt · keine Quelle).
- Die Dokumentation stammt aus dem Projekt von 2014 und wurde seither nicht gegen das laufende System verifiziert [Q4.2] (Aussage · IT-Lead, Interview 2026-08-19).
- Eine automatisierte Testsuite existiert nicht; Payroll-Änderungen werden gegen den Vormonatslauf verglichen [Q4.6] (Aussage · IT-Lead, Interview 2026-08-19).
- Stammdaten liegen in der Oracle-Datenbank und zusätzlich in der Zeiterfassung; ein Abgleichprozess ist nicht dokumentiert [Q4.4] (Aussage · IT-Lead, Interview 2026-08-19).
- Für HR-Daten existiert keine formale Klassifizierung und niemand hat eine validiert [Q6.1] (unbekannt · keine Quelle).
- Eine dokumentierte Aufbewahrungsrichtlinie für HR-Datensätze liegt nicht vor; die Anfrage an Legal ist offen [Q6.4] (unbekannt · keine Quelle).
- Ein benannter Dateneigner existiert für keine HR-Datendomäne [Q6.3] (unbekannt · keine Quelle).
- Welche regulatorischen Rahmenbedingungen gelten und wann dies zuletzt geprüft wurde, ist nicht festgestellt [Q7.1] (unbekannt · keine Quelle).
- KI/ML ist nicht im Entscheidungsgegenstand; KI wird ausschließlich im Autorenprozess dieser Analyse eingesetzt [Q7.3] (Aussage · Scoping-Statement, Interview 2026-08-19).
- Ein SLO existiert nicht; die Verfügbarkeit wurde nie formal gemessen [Q10.1] (unbekannt · keine Quelle).
- RTO- und RPO-Ziele sind nicht definiert, ein Restore wurde nie getestet [Q10.2] (unbekannt · keine Quelle).
- Es gibt kein dokumentiertes oder geprüftes Berechtigungsmodell; vier Personen halten Datenbank-Zugangsdaten [Q10.5] (unbekannt · keine Quelle).
- Ob Daten im Ruhezustand verschlüsselt sind und wo Schlüssel liegen, ist nicht festgestellt [Q10.6] (unbekannt · keine Quelle).
- Der Betriebsrat hat faktische Vetomacht über jede Änderung an HR-Systemen [Q9.5] (Aussage · HR-Operations-Lead, Interview 2026-08-19).

## Hypothesen

- Die dunkle Zone ist konzentriert, nicht verteilt. Geltungsbereich: Die am wenigsten verstandene Komponente ist ein Altmodul, dessen letzter Kenner das Unternehmen verlassen hat [Q4.3] (unbekannt · keine Quelle). Widerlegt durch: mehrere Teammitglieder, die das Verhalten unabhängig und übereinstimmend beschreiben können.
- Die Dokumentation beschreibt das gedachte, nicht das laufende System. Geltungsbereich: Ein System von zwölf Jahren ohne dokumentierten Verifikationsprozess [Q4.2] (Aussage · IT-Lead, Interview 2026-08-19). Widerlegt durch: ein dokumentiertes Audit, das Spezifikation gegen beobachtetes Laufzeitverhalten geprüft hat.
- Der Löschpfad existiert auf dem Papier, nicht in der Praxis. Geltungsbereich: eine Plattform, die nie eine Löschanfrage erhalten hat [Q6.4] (unbekannt · keine Quelle). Widerlegt durch: eine protokollierte, getestete Ende-zu-Ende-Löschung über alle Speicherschichten.
- Die kognitive Last des Betreuers blockiert die Migration, nicht die technische Komplexität. Geltungsbereich: Das Wissen zur Java-Schicht liegt bei einer einzigen Person, zum COBOL-Modul bei niemandem [Q9.3] (Aussage · IT-Lead, Interview 2026-08-19). Widerlegt durch: eine Kapazitätsanalyse, die verfügbare Bandbreite gegen den Migrationsaufwand stellt.

## Options-Raum

Optionen, keine Rangfolge. Jede Option, die von einem offenen Punkt abhängt, ist als bedingt
markiert und trägt die blockierende Q-ID. Kostendimensionen sind im Intake nicht geschätzt.

- Option 0 — weiter wie bisher: Betrieb ohne Änderung. Der manuelle Korrekturaufwand bleibt bestehen [Q1.1] (Aussage · IT-Lead, Interview 2026-08-19); die Kosten dieses Zustands sind nicht geschätzt [Q1.5] (unbekannt · keine Quelle).
- Option 1 — vollständige SaaS-Ablösung: informell diskutiert [Q8.1] (Aussage · IT-Lead, Interview 2026-08-19). Bedingt — blockiert durch [Q4.3]: Ohne Verständnis der Verzweigungslogik des Payroll-Moduls ist nicht feststellbar, was abzulösen ist. Zusätzlich bedingt durch [Q6.4]: ohne dokumentierte Aufbewahrungsanforderung ist die Datenübernahme rechtlich nicht bewertbar. Aufwand nicht geschätzt [Q3.2] (unbekannt · keine Quelle).
- Option 2 — alles ersetzen außer dem COBOL-Payroll-Modul: informell diskutiert [Q8.1] (Aussage · IT-Lead, Interview 2026-08-19). Bedingt — blockiert durch [Q4.3]: Der Schnitt zwischen Bleibendem und Abzulösendem verläuft durch die nicht verstandene Komponente. Zusätzlich bedingt durch [Q8.2]: Die Machbarkeit der Datenübernahme ist eine Annahme, nicht validiert.
- Option 3 — Parallelbetrieb über zwei Payroll-Zyklen: erwähnt, aber weder geplant noch kalkuliert [Q8.3] (Aussage · IT-Lead, Interview 2026-08-19). Bedingt — blockiert durch [Q10.2]: Ohne RTO/RPO und ohne je getesteten Restore ist der Parallelbetrieb betrieblich nicht abgesichert.
- Option 4 — Entscheidung vertagen und Discovery abschließen: Diese Option löst die konkreten offenen Punkte auf, die alle übrigen Optionen bedingen — die Verzweigungslogik des Payroll-Moduls [Q4.3], die Aufbewahrungsanforderung und den Löschpfad [Q6.4], RTO/RPO samt Restore-Test [Q10.2] und die Machbarkeit der Datenübernahme [Q8.2]. Eine Folge des Vertagens ist nicht dokumentiert, da für die Frist keine Konsequenz definiert wurde [Q2.5] (Aussage · Modernisierungs-Kickoff-Notiz 2026-08-01).

## Risiken & Rückweg

- Ein Rückweg ist nicht beschrieben [Q8.4] (unbekannt · keine Quelle).
- Das Szenario "Rückkehr ist unmöglich" wurde nicht bewertet [Q8.5] (unbekannt · keine Quelle).
- Für historische Payroll-Datensätze existiert keine Migrationsstrategie [Q8.6] (unbekannt · keine Quelle).
- Die Stop-Bedingung aus Theme 10 greift: SLO, RTO/RPO, Berechtigungsmodell und Verschlüsselung im Ruhezustand sind sämtlich unbekannt [Q10.1] [Q10.2] [Q10.5] [Q10.6] (unbekannt · keine Quelle). Ein betrieblicher Vergleich zwischen Ist und Ziel ist auf dieser Grundlage nicht führbar.
- Die Dauer der Betriebsratskonsultation ist nicht dokumentiert, während ein Entscheidungsziel gesetzt ist [Q3.5] (Aussage · HR-Operations-Lead, Interview 2026-08-19).
- Die SaaS-first-Vorgabe ist einer Person zugeschrieben, nicht einem Richtliniendokument [Q3.1] (Aussage · IT-Lead, Interview 2026-08-19).

## Team & Verankerung

- Der IT-Lead ist faktischer Eigner; eine schriftliche Eigentümerschaft oder ein Service-Katalog-Eintrag existiert nicht [Q9.1] (Aussage · IT-Lead, Interview 2026-08-19).
- Anfragen kommen per E-Mail beim IT-Lead an; einen Prüfschritt gibt es nicht [Q9.2] (Aussage · IT-Lead, Interview 2026-08-19).
- Das Wissen zur Java-Schicht liegt bei einer einzigen Person, zum COBOL-Modul bei niemandem [Q9.3] (Aussage · IT-Lead, Interview 2026-08-19).
- Der Ruhestand des IT-Leads liegt innerhalb von fünf Jahren, ein Datum ist nicht gesetzt [Q9.4] (Aussage · IT-Lead, Interview 2026-08-19).
- Der Betriebsrat hält faktische Vetomacht über jede Änderung an HR-Systemen [Q9.5] (Aussage · HR-Operations-Lead, Interview 2026-08-19).
- Die Dauer der Betriebsratskonsultation ist nicht dokumentiert [Q3.5] (Aussage · HR-Operations-Lead, Interview 2026-08-19).

## Offene Punkte & Konflikte

Keine Widersprüche im Intake. Die offenen Punkte sind im Register geführt.

## To-Verify-Register

| # | Item | Quelle nötig | Status |
|---|---|---|---|
| 1 | Verzweigungslogik des COBOL-Payroll-Moduls [Q4.3] | Code-Analyse oder ehemaliger Betreuer | offen |
| 2 | Dokumentierte Aufbewahrungsanforderung und getesteter Löschpfad [Q6.4] | Aussage von Legal | offen |
| 3 | RTO/RPO-Ziele und ein Restore-Test [Q10.2] | Betrieb, Restore-Probe | offen |
| 4 | Machbarkeit der Datenübernahme aus dem COBOL-Modul [Q8.2] | technische Validierung | offen |
| 5 | Geltende regulatorische Rahmenbedingungen und Datum der letzten Prüfung [Q7.1] | Compliance-Aussage | offen |
| 6 | Benannte Dateneigner je HR-Datendomäne [Q6.3] | HR / Data Governance | offen |
| 7 | Berechtigungsmodell und Verschlüsselung im Ruhezustand [Q10.5] [Q10.6] | Betrieb / Security | offen |

## Sign-Off

Discovery-Brief, keine Empfehlung; alle Richtungsformulierungen mit offenen to-verify-IDs sind nicht entscheidungsreif. Gesehen: ___

---

intake_version: v1.0 · prompt_version: — · model: hand-authored reference
