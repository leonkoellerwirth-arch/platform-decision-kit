// Interface strings in both languages.
//
// The kit is bilingual in a specific, asymmetric way, and the asymmetry is deliberate: English
// is the binding language of the repository, German is a translation. Both are fully usable —
// you can run an entire intake in German — but the German surface says so, because a translated
// question that is silently treated as the source of record is exactly the kind of quiet
// substitution this instrument exists to prevent.
//
// No i18n library. Two languages, one flat dictionary, checked by the compiler.

import type { Lang } from "./themes";

export const UI = {
  title: {
    en: "Platform Decision Kit: a system architect’s triage and discovery instrument for brownfield platforms",
    de: "Platform Decision Kit: ein Triage- und Discovery-Instrument des Systemarchitekten für Brownfield-Plattformen",
  },
  claim: {
    en: "A conversation yields claims, not evidence. This instrument captures a platform situation as tagged hypotheses: fact, statement, assumption, unknown. It produces no recommendation. That boundary is the product.",
    de: "Ein Gespräch liefert Behauptungen, keine Belege. Dieses Instrument erfasst eine Plattformsituation als getaggte Hypothesen: Fakt, Aussage, Annahme, unbekannt. Es erzeugt keine Empfehlung. Diese Grenze ist das Produkt.",
  },
  trustLead: {
    en: "Everything you type stays in this browser.",
    de: "Alles, was Sie eintragen, bleibt in diesem Browser.",
  },
  trustRest: {
    en: "There is no backend, no account, and nothing is sent anywhere. The page makes no network call after it has loaded. Export writes a Markdown file you keep.",
    de: "Kein Backend, kein Konto, nichts wird irgendwohin gesendet. Die Seite macht nach dem Laden keinen einzigen Netzaufruf. Der Export erzeugt eine Markdown-Datei, die bei Ihnen bleibt.",
  },
  langNote: {
    en: "English is the binding language of this kit. The German texts are translations.",
    de: "Englisch ist die verbindliche Sprache dieses Kits. Die deutschen Texte sind Übersetzungen. Sie sind vollständig nutzbar, aber nicht die maßgebliche Fassung.",
  },
  triageMode: { en: "Triage · 20 min", de: "Triage · 20 Min" },
  discoveryMode: { en: "Discovery · 90+ min", de: "Discovery · 90+ Min" },
  triageNoteLead: {
    en: "Triage has no right of recommendation.",
    de: "Triage hat kein Empfehlungsrecht.",
  },
  triageNoteRest: {
    en: "Its output is a situation picture, open points and red flags, and nothing that reads as a direction.",
    de: "Ihr Ergebnis ist ein Lagebild, offene Punkte und Red Flags, und nichts, was sich wie eine Richtung liest.",
  },
  answered: { en: "answered", de: "beantwortet" },
  openInRegister: { en: "open in the register", de: "offen im Register" },
  factWithoutSource: { en: "fact without a source", de: "Fakt ohne Beleg" },
  block: { en: "Block", de: "Block" },
  translation: { en: "translation", de: "Übersetzung" },
  canonical: { en: "canonical", de: "kanonisch" },
  redFlags: { en: "Red flags to watch for", de: "Red Flags, auf die zu achten ist" },
  answerPlaceholder: { en: "What was observed?", de: "Was wurde beobachtet?" },
  forExample: { en: "e.g.", de: "z. B." },
  helpFor: { en: "How this view works", de: "Wie diese Ansicht funktioniert" },
  helpForSlide: { en: "About this slide", de: "Zu dieser Folie" },
  helpForQuestion: { en: "About this question", de: "Zu dieser Frage" },
  helpForBlock: { en: "About this block", de: "Zu diesem Block" },
  close: { en: "Close", de: "Schließen" },
  glossToggle: {
    en: "Show the canonical wording under each question",
    de: "Kanonischen Wortlaut unter jeder Frage zeigen",
  },
  unknownPlaceholder: {
    en: "Unknown, deliberately left empty.",
    de: "Unbekannt, bewusst leer gelassen.",
  },
  basis: { en: "Basis", de: "Basis" },
  source: { en: "Source", de: "Beleg/Quelle" },
  verification: { en: "Verification", de: "Verifikation" },
  sourcePlaceholder: {
    en: "The quotation, the page, the ticket line",
    de: "Das Zitat, die Seite, die Ticketzeile",
  },

  // --- Where an answer came from ---
  //
  // One free line used to carry all of it, and it could not: the field held a document
  // name, or a person, or nothing, and no reader could tell which of the three they were
  // looking at. The agent specification asks for "speaker and date" beside every statement,
  // so the three parts that make an answer traceable are captured as themselves and the
  // free line keeps its real job — the locator inside the source.
  attribution: { en: "Where this came from", de: "Woher das stammt" },
  artifact: { en: "Document or system", de: "Dokument oder System" },
  artifactPlaceholder: {
    en: "Runbook, ticket, dashboard, contract",
    de: "Runbook, Ticket, Dashboard, Vertrag",
  },
  speaker: { en: "Who said it", de: "Wer es gesagt hat" },
  speakerPlaceholder: { en: "Name and role", de: "Name und Rolle" },
  sourceDate: { en: "Date", de: "Datum" },
  sourceDatePlaceholder: { en: "2026-03-11", de: "11.03.2026" },
  untraceable: {
    en: "Not traceable yet: this needs a date, and a document or a person.",
    de: "Noch nicht nachvollziehbar: hier fehlt ein Datum und ein Dokument oder eine Person.",
  },
  untraceableCount: { en: "not traceable", de: "ohne Zuordnung" },

  // --- What would close an open point ---
  //
  // An open point with no owner and no date is a note, not a task; the register was a list
  // of doubts that nobody had agreed to resolve. These four fields are what make it work
  // somebody owes: who, what proof, by when, and what is in the way.
  followUp: { en: "What closes this", de: "Was das schließt" },
  owner: { en: "Owed by", de: "Verantwortlich" },
  ownerPlaceholder: { en: "Role, or a name", de: "Rolle, oder ein Name" },
  evidenceNeeded: { en: "Proof needed", de: "Benötigter Nachweis" },
  evidenceNeededPlaceholder: {
    en: "The document, log, test or written confirmation",
    de: "Das Dokument, Log, der Test oder die schriftliche Bestätigung",
  },
  due: { en: "By", de: "Bis" },
  duePlaceholder: { en: "2026-09-30", de: "30.09.2026" },
  blocker: { en: "Blocked by", de: "Blockiert durch" },
  blockerPlaceholder: {
    en: "What has to happen first, or who is in the way",
    de: "Was zuerst passieren muss, oder wer im Weg steht",
  },
  unsteerable: {
    en: "No owner and no date: this is a note, not a task.",
    de: "Ohne Verantwortliche und ohne Termin: das ist eine Notiz, keine Aufgabe.",
  },
  unsteerableCount: { en: "without an owner or a date", de: "ohne Eigner oder Termin" },
  missingSource: {
    en: "A fact needs a source reference. Without one this is a statement, not a fact.",
    de: "Ein Fakt braucht eine Beleg-Referenz. Ohne sie ist das eine Aussage, kein Fakt.",
  },
  unknownHint: {
    en: "Unknown. The verification is set to open, and it stays open.",
    de: "Unbekannt. Die Verifikation steht auf offen, und sie bleibt offen.",
  },
  noDefaultsHint: {
    en: "This block takes no defaults: do not fill this from experience.",
    de: "Dieser Block nimmt keine Defaults: hier nicht aus Erfahrung ergänzen.",
  },
  // --- Discovery mode: the parts of a theme block that are not questions ---
  stopConditions: {
    en: "Stop conditions: when to break off",
    de: "Stop-Bedingungen: wann abzubrechen ist",
  },
  hypotheses: {
    en: "Patterns and hypotheses, not questions",
    de: "Muster und Hypothesen, keine Fragen",
  },
  hypothesesNote: {
    en: "Testable patterns, each with the boundary inside which it holds. Never ask these as questions. That is what turns a pattern into a leading question.",
    de: "Prüfbare Muster, jeweils mit dem Bereich, in dem sie gelten. Diese nie als Frage stellen. Genau das macht aus einem Muster eine Suggestivfrage.",
  },
  hypothesesEnglish: {
    en: "canonical",
    de: "Englisch, die verbindliche Fassung; für Hypothesen gibt es bewusst keine Übersetzung",
  },
  scopeOfValidity: { en: "Holds when", de: "Gilt, wenn" },
  falsifiableBy: { en: "Refuted by", de: "Widerlegt durch" },
  decisionHead: { en: "Decision head", de: "Entscheidungskopf" },

  // --- The decision head as a standing header ---
  //
  // Owner and deadline were always in the instrument, but they sat inside block 2, which in
  // triage means four cards deep: a reader could work the whole twenty minutes and see the
  // situation clearly without ever knowing who has to decide, or by when. It is the frame
  // the other answers are measured against, so it stands above them and stays there,
  // folded to one line once it is filled.
  decisionHeadIncomplete: {
    en: "Who decides, and by when — this is still open.",
    de: "Wer entscheidet, und bis wann — das ist noch offen.",
  },
  decisionHeadOpen: { en: "Open the decision head", de: "Entscheidungskopf öffnen" },
  decisionHeadFold: { en: "Fold the decision head away", de: "Entscheidungskopf einklappen" },
  decisionHeadEmptyField: { en: "not stated", de: "nicht benannt" },

  // --- Directions, on slide 4 ---
  //
  // The fourth slide is specified as "Nicht entschiedene Richtungen", each stated
  // conditionally. Nothing in the intake could carry such a sentence, so the slide listed
  // open Q-IDs by theme instead. This is where a direction is written down — by the
  // architect, never by the instrument — together with the open points it hangs on.
  directionsTitle: { en: "Directions, not decided", de: "Richtungen, nicht entschieden" },
  directionsNote: {
    en: "A direction that came up in the room, written as it was said. It carries the open points it depends on, and it never becomes a recommendation: the instrument does not rank them, does not judge them, and does not add any of its own.",
    de: "Eine Richtung, die im Raum aufkam, so notiert, wie sie gesagt wurde. Sie trägt die offenen Punkte, von denen sie abhängt, und wird nie zur Empfehlung: das Instrument gewichtet nicht, urteilt nicht und fügt keine eigene hinzu.",
  },
  directionPlaceholder: {
    en: "e.g. Move the settlement path first and leave the partner interfaces where they are.",
    de: "z. B. Zuerst den Abrechnungspfad umziehen und die Partnerschnittstellen lassen, wo sie sind.",
  },
  directionAdd: { en: "Record a direction", de: "Richtung erfassen" },
  directionRemove: { en: "Remove this direction", de: "Diese Richtung entfernen" },
  directionDependsPick: {
    en: "Which open points does it depend on?",
    de: "Von welchen offenen Punkten hängt sie ab?",
  },
  directionUnconditioned: {
    en: "No open point named. A direction with no condition on it reads as a recommendation — name what it is waiting for, or leave it out.",
    de: "Kein offener Punkt benannt. Eine Richtung ohne Bedingung liest sich wie eine Empfehlung — benennen Sie, worauf sie wartet, oder lassen Sie sie weg.",
  },
  directionsEmpty: {
    en: "No direction recorded. The slide then shows the open points by theme, which is what is actually known.",
    de: "Keine Richtung erfasst. Die Folie zeigt dann die offenen Punkte nach Thema, also das, was tatsächlich bekannt ist.",
  },

  // --- What the deck is, said on the deck itself ---
  //
  // The reviewer's sharpest product point: the instrument is right to refuse a
  // recommendation, and that only becomes a problem when a room expects the deck to be the
  // paper the architecture board decides on. So the deck says what it is, in the room,
  // where the expectation is actually set.
  readOut: { en: "Workshop read-out", de: "Workshop-Read-out" },
  readOutNote: {
    en: "The state of discovery after this conversation, not a decision paper. A decision paper is the next step: a human curates it from this, after the open points are closed.",
    de: "Der Discovery-Stand nach diesem Gespräch, keine Entscheidungsvorlage. Die Entscheidungsvorlage ist der nächste Schritt: ein Mensch kuratiert sie hieraus, nachdem die offenen Punkte geschlossen sind.",
  },

  // --- Export ---
  exportAttribution: { en: "Where it came from", de: "Woher es stammt" },
  exportFollowUp: { en: "What closes it", de: "Was es schließt" },
  exportDirections: { en: "Directions, not decided", de: "Richtungen, nicht entschieden" },
  exportDirectionsEmpty: {
    en: "_No direction recorded._",
    de: "_Keine Richtung erfasst._",
  },
  decisionHeadNote: {
    en: "The frame the whole conversation hangs on. Fill it before the blocks, and revisit it if a block contradicts it.",
    de: "Der Rahmen, an dem das ganze Gespräch hängt. Vor den Blöcken ausfüllen, und erneut prüfen, wenn ein Block ihm widerspricht.",
  },
  dataInventory: { en: "Mini data inventory", de: "Mini-Dateninventar" },
  dataInventoryNote: {
    en: "One row per data domain. A blank cell here is a to-verify item, not a detail.",
    de: "Eine Zeile je Datendomäne. Eine leere Zelle ist hier ein To-Verify-Punkt, kein Detail.",
  },
  addRow: { en: "Add row", de: "Zeile hinzufügen" },
  removeRow: { en: "Remove", de: "Entfernen" },
  columnLabels: {
    domain: { en: "Domain", de: "Domäne" },
    classification: { en: "Classification", de: "Klassifikation" },
    owner: { en: "Owner", de: "Eigner" },
    retention: { en: "Retention", de: "Aufbewahrung" },
    erasure_path: { en: "Erasure path", de: "Löschweg" },
  },
  discoveryNoteLead: {
    en: "Discovery has no right of recommendation either.",
    de: "Auch Discovery hat kein Empfehlungsrecht.",
  },
  discoveryNoteRest: {
    en: "The full set produces a situation picture, hypotheses and a register of what is still unverified. A direction may only be formulated after those items are closed.",
    de: "Der volle Satz erzeugt ein Lagebild, Hypothesen und ein Register dessen, was unverifiziert ist. Eine Richtung darf erst formuliert werden, wenn diese Punkte geschlossen sind.",
  },

  // --- The presentation skeleton (Output B) ---
  viewIntake: { en: "Intake", de: "Erhebung" },
  viewDeck: { en: "Presentation", de: "Präsentation" },
  deckSubtitle: {
    en: "Presentation skeleton: Output B",
    de: "Präsentations-Skelett: Output B",
  },
  deckNote: {
    en: "Built from your answers alone, verbatim, with their tags. Nothing here is summarised, ranked, or inferred. No model runs in this page. Slide order is fixed by the specification.",
    de: "Ausschließlich aus Ihren Antworten gebaut, wörtlich, mit ihren Tags. Nichts hier ist zusammengefasst, gewichtet oder abgeleitet. In dieser Seite läuft kein Modell. Die Folienreihenfolge ist durch die Spezifikation festgelegt.",
  },
  deckEmpty: {
    en: "Nothing answered yet. Fill the intake and the slides fill themselves.",
    de: "Noch nichts beantwortet. Füllen Sie die Erhebung aus, die Folien füllen sich von selbst.",
  },
  print: { en: "Print / save as PDF", de: "Drucken / als PDF sichern" },
  slide: { en: "Slide", de: "Folie" },
  notAnswered: { en: "not answered", de: "nicht beantwortet" },
  notEstimated: { en: "nicht geschätzt", de: "nicht geschätzt" },
  deckTitles: {
    s1: { en: "Situation & assumptions", de: "Ausgangslage & Annahmen" },
    s2: { en: "Goals & decision criteria", de: "Ziele & Entscheidungskriterien" },
    s3: { en: "OPTIONS", de: "OPTIONEN" },
    s4: { en: "Directions not decided", de: "Nicht entschiedene Richtungen" },
    s5: { en: "Risks & the way back", de: "Risiken & Rückweg" },
    s6: { en: "Team & anchoring", de: "Team & Verankerung" },
    s7: { en: "Open points / next 90 days", de: "Offene Punkte / nächste 90 Tage" },
  },
  optionBaseline: { en: "Carry on as before", de: "Weiter wie bisher" },
  optionBaselineBody: {
    en: "The status quo is an option and is listed first, always. Its cost is the cost of inaction.",
    de: "Der Status quo ist eine Option und steht immer an erster Stelle. Sein Preis ist der Preis der Untätigkeit.",
  },
  optionDefer: {
    en: "Defer the decision + Discovery",
    de: "Entscheidung vertagen + Discovery",
  },
  optionDeferBody: {
    en: "Always present. These are the items it would close:",
    de: "Immer vorhanden. Diese Punkte würde sie schließen:",
  },
  optionConsidered: { en: "Paths considered", de: "Erwogene Pfade" },
  costOneOff: { en: "One-off", de: "Einmalig" },
  costRunning: { en: "Running", de: "Laufend" },
  costParallel: { en: "Parallel operation", de: "Parallelbetrieb" },
  costRisk: { en: "Risk", de: "Risiko" },
  conditionalOn: {
    en: "This direction depends on",
    de: "Diese Richtung ist abhängig von",
  },
  noOpenDirections: {
    en: "No open items. Nothing is pending, which is a finding rather than an absence.",
    de: "Keine offenen Punkte. Nichts steht aus, und das ist ein Befund, keine Leere.",
  },
  irreversible: { en: "Irreversible", de: "Irreversibel" },
  deckSignoff: {
    en: "Discovery brief, not a recommendation; all directional statements with open to-verify IDs are not decision-ready. Seen by: ___",
    de: "Discovery-Brief, keine Empfehlung; alle Richtungsformulierungen mit offenen to-verify-IDs sind nicht entscheidungsreif. Gesehen: ___",
  },
  deckDesignCredit: {
    en: "Slide layout vocabulary after Presenton (Apache-2.0). Rendered in this browser; no model, no backend.",
    de: "Folien-Layoutvokabular nach Presenton (Apache-2.0). In diesem Browser gerendert; kein Modell, kein Backend.",
  },
  registerTitle: { en: "To-verify register", de: "To-Verify-Register" },
  registerEmpty: {
    en: "Nothing open yet. On a first pass through a brownfield platform, an empty register is a finding about the conversation, not a result about the platform.",
    de: "Noch nichts offen. Bei einem ersten Durchgang durch eine Brownfield-Plattform ist ein leeres Register ein Befund über das Gespräch, kein Ergebnis über die Plattform.",
  },
  exportButton: { en: "Export as Markdown", de: "Als Markdown exportieren" },
  copyButton: { en: "Copy to clipboard", de: "In die Zwischenablage kopieren" },
  copied: { en: "Copied.", de: "Kopiert." },
  footer: {
    en: "Band 3 of the series, after the governance toolkit and the approval blueprint. The thread: verification instead of trust, here applied to the architect’s own work.",
    de: "Band 3 der Reihe, nach dem Governance-Toolkit und dem Freigabe-Blueprint. Der rote Faden: Verifikation statt Vertrauen, hier angewandt auf die Arbeit des Architekten selbst.",
  },
  wip: {
    en: "Both question sets are generated from intake/themes/, the same canonical source the Markdown forms are rendered from. Neither can drift from the other; the gate re-renders and diffs.",
    de: "Beide Fragensätze werden aus intake/themes/ erzeugt, derselben kanonischen Quelle, aus der auch die Markdown-Formulare gerendert werden. Keiner kann vom anderen abweichen; der Gate rendert neu und vergleicht.",
  },
  basisLabels: {
    fact: { en: "fact", de: "Fakt" },
    statement: { en: "statement", de: "Aussage" },
    assumption: { en: "assumption", de: "Annahme" },
    unknown: { en: "unknown", de: "unbekannt" },
  },
  verificationLabels: {
    none: { en: "none", de: "keine" },
    open: { en: "open", de: "offen" },
    blocked: { en: "blocked", de: "blockiert" },
  },
  // Export document
  exportTitle: { en: "Intake", de: "Intake" },
  exportNote: {
    en: "Conversation note, not an authoritative source. A statement with an open verification stays a statement. It never becomes a fact by being written down.",
    de: "Gesprächsnotiz, keine autoritative Quelle. Eine Aussage mit offener Verifikation bleibt eine Aussage. Sie wird nicht zum Fakt, weil sie aufgeschrieben wurde.",
  },
  exportLangNote: {
    en: "Language: English (canonical).",
    de: "Sprache: Deutsch (Übersetzung; verbindlich ist die englische Fassung). Die Frage-IDs sind sprachneutral.",
  },
  exportAnswer: { en: "Answer", de: "Antwort" },
  exportBasis: { en: "Basis", de: "Basis" },
  exportSource: { en: "Source", de: "Beleg/Quelle" },
  exportVerification: { en: "Verification", de: "Verifikation" },
  exportRegisterEmpty: {
    en: "_No open point recorded. On a first pass that is a finding, not a result._",
    de: "_Kein offener Punkt erfasst. Bei einem ersten Durchgang ist das ein Befund, kein Ergebnis._",
  },

  // --- EvidenceGrid and navigation ---
  evidenceGrid: {
    en: "Evidence grid: basis by verification",
    de: "Beleggitter: Basis mal Verifikation",
  },
  keyboardHint: {
    en: "1–4 basis · Q/W/E verification (outside text fields)",
    de: "1–4 Basis · Q/W/E Verifikation (außerhalb von Textfeldern)",
  },
  activeFor: {
    en: "active for",
    de: "aktiv für",
  },
  nextBlock: { en: "Next block", de: "Nächster Block" },
  prevBlock: { en: "Previous block", de: "Vorheriger Block" },
  viewRegister: { en: "Register", de: "Register" },
  blockNav: { en: "Block navigator", de: "Block-Navigation" },
  registerPayoff: {
    en: "These are the items that must be verified before any direction is decision-ready. Turn the screen and show this to the client.",
    de: "Das sind die Punkte, die verifiziert sein müssen, bevor eine Richtung entscheidungsreif ist. Den Bildschirm umdrehen und dem Kunden zeigen.",
  },
  themeToggle: { en: "Switch theme", de: "Theme wechseln" },
  versionLabel: { en: "Build", de: "Build" },
  infoToggle: { en: "About this page", de: "Hinweis zu dieser Seite" },
  loadDemo: { en: "Load the worked example", de: "Beispiel laden" },
  loadDemoHint: {
    en: "Nothing recorded yet. You can load the worked example, an invented energy utility, to see what a finished pass looks like.",
    de: "Noch nichts erfasst. Sie können das Beispiel laden, einen erfundenen Energieversorger, um zu sehen, wie ein fertiger Durchgang aussieht.",
  },
  clearAll: { en: "Clear everything", de: "Alles zurücksetzen" },
  clearAllConfirm: {
    en: "Delete every answer, the decision head and the data inventory? This cannot be undone.",
    de: "Alle Antworten, den Entscheidungskopf und das Dateninventar löschen? Das lässt sich nicht rückgängig machen.",
  },

  // --- Presenter mode ---
  present: { en: "Present", de: "Präsentieren" },
  presentExit: { en: "Exit", de: "Beenden" },
  presentPrev: { en: "Previous slide", de: "Vorherige Folie" },
  presentNext: { en: "Next slide", de: "Nächste Folie" },
  presentHint: {
    en: "← → or space to move · F for full screen · Esc to leave",
    de: "← → oder Leertaste zum Blättern · F für Vollbild · Esc zum Beenden",
  },
  fullscreen: { en: "Full screen", de: "Vollbild" },

  // --- Slide card labels ---
  //
  // A card used to be headed by the question it came from: "Q9.5". The Q-ID is what an
  // auditor needs to trace the line back to the intake, and it is the wrong thing to put
  // in front of a room — nobody knows what Q9.5 means, so the eye finds no anchor and the
  // slide reads as a table of numbers. The ID does not disappear; it stays inline in the
  // answer, in brackets, where tracing happens. Only the heading changes, from a locator
  // into a name. These are the concepts the specification already names in §5.
  cardSuccess: { en: "Success definition", de: "Erfolgsdefinition" },
  cardJudge: { en: "Who judges", de: "Wer urteilt" },
  cardInScope: { en: "In scope", de: "Im Scope" },
  cardOutOfScope: { en: "Out of scope", de: "Außerhalb des Scope" },
  cardWayBack: { en: "The way back", de: "Rückweg" },
  cardIrreversibilityAssessed: {
    en: "Irreversibility assessed",
    de: "Irreversibilitäts-Bewertung",
  },
  cardPlatformOwner: { en: "Platform ownership", de: "Plattformverantwortung" },
  cardKeyPeople: { en: "Key people", de: "Schlüsselpersonen" },
  cardVetoChain: { en: "Informal veto chain", de: "Informelle Veto-Kette" },
  cardDeadline: { en: "Deadline and what follows", de: "Frist und ihre Folgen" },
  gridTitle: { en: "Evidence at a glance", de: "Beleglage auf einen Blick" },
  gridTagged: { en: "answers tagged", de: "eingeordnete Antworten" },
  settledTitle: { en: "Settled, nothing outstanding:", de: "Belegt, nichts offen:" },
  settledNote: {
    en: "Answers with no open verification. They are not decisions and not a recommendation; they are the ground the open points are measured against.",
    de: "Antworten ohne offene Verifikation. Sie sind keine Entscheidungen und keine Empfehlung, sondern der Boden, an dem die offenen Punkte gemessen werden.",
  },
  openPoints: { en: "open points, by theme block", de: "offene Punkte, nach Themenblock" },
  openByTheme: {
    en: "Every directional statement hangs on these open points, grouped by the theme block they came from.",
    de: "Jede Richtungsaussage hängt an diesen offenen Punkten, gruppiert nach dem Themenblock, aus dem sie stammen.",
  },
  andMore: { en: "more, in full on the last slide", de: "weitere, vollständig auf der letzten Folie" },
  versionTitle: {
    en: "Version and commit this build came from. A trailing + means it was built from an uncommitted working tree.",
    de: "Version und Commit dieses Builds. Ein angehängtes + heißt: aus einem uncommitteten Arbeitsstand gebaut.",
  },

  // --- Classification panel ---
  classify: { en: "Classification", de: "Einordnung" },
  basisCaption: { en: "what kind of knowledge", de: "welche Art von Wissen" },
  verificationCaption: { en: "what work is outstanding", de: "was noch offen ist" },
  notClassified: { en: "not classified yet", de: "noch nicht eingeordnet" },
  clearCell: { en: "Clear", de: "Zurücksetzen" },
  ruleUnknown: {
    en: "An unknown carries no outstanding choice. It is open, and only open.",
    de: "Ein Unbekannt trägt keine offene Wahl. Es ist offen, und nur offen.",
  },
} as const;

/** Look up a UI string in the active language. */
export function t(entry: { en: string; de: string }, lang: Lang): string {
  return entry[lang];
}
