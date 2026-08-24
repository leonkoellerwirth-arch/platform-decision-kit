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
    en: "Platform Decision Kit — a system architect’s triage & discovery instrument for brownfield platforms",
    de: "Platform Decision Kit — ein Triage- und Discovery-Instrument des Systemarchitekten für Brownfield-Plattformen",
  },
  claim: {
    en: "A conversation yields claims, not evidence. This instrument captures a platform situation in structured hypotheses — tagged fact / statement / assumption / to-verify. It produces no recommendation. That boundary is the product.",
    de: "Ein Gespräch liefert Behauptungen, keine Belege. Dieses Instrument erfasst eine Plattformsituation in strukturierten Hypothesen — getaggt als Fakt / Aussage / Annahme / zu verifizieren. Es erzeugt keine Empfehlung. Diese Grenze ist das Produkt.",
  },
  trustLead: {
    en: "Everything you type stays in this browser.",
    de: "Alles, was Sie eintragen, bleibt in diesem Browser.",
  },
  trustRest: {
    en: "There is no backend, no account, and nothing is sent anywhere — the page makes no network call after it has loaded. Export writes a Markdown file you keep.",
    de: "Kein Backend, kein Konto, nichts wird irgendwohin gesendet — die Seite macht nach dem Laden keinen einzigen Netzaufruf. Der Export erzeugt eine Markdown-Datei, die bei Ihnen bleibt.",
  },
  langNote: {
    en: "English is the binding language of this kit. The German texts are translations.",
    de: "Englisch ist die verbindliche Sprache dieses Kits. Die deutschen Texte sind Übersetzungen — sie sind vollständig nutzbar, aber nicht die maßgebliche Fassung.",
  },
  triageMode: { en: "Triage · 20 min", de: "Triage · 20 Min" },
  discoveryMode: { en: "Discovery · 90+ min", de: "Discovery · 90+ Min" },
  triageNoteLead: {
    en: "Triage has no right of recommendation.",
    de: "Triage hat kein Empfehlungsrecht.",
  },
  triageNoteRest: {
    en: "Its output is a situation picture, open points, and red flags — nothing that reads as a direction.",
    de: "Ihr Ergebnis ist ein Lagebild, offene Punkte und Red Flags — nichts, was sich wie eine Richtung liest.",
  },
  answered: { en: "answered", de: "beantwortet" },
  openInRegister: { en: "open in the register", de: "offen im Register" },
  factWithoutSource: { en: "fact without a source", de: "Fakt ohne Beleg" },
  block: { en: "Block", de: "Block" },
  translation: { en: "translation", de: "Übersetzung" },
  canonical: { en: "canonical", de: "kanonisch" },
  redFlags: { en: "Red flags to watch for", de: "Red Flags, auf die zu achten ist" },
  answerPlaceholder: { en: "What was observed?", de: "Was wurde beobachtet?" },
  unknownPlaceholder: {
    en: "Unknown — deliberately left empty.",
    de: "Unbekannt — bewusst leer gelassen.",
  },
  basis: { en: "Basis", de: "Basis" },
  source: { en: "Source", de: "Beleg/Quelle" },
  verification: { en: "Verification", de: "Verifikation" },
  sourcePlaceholder: {
    en: 'Link, document ID, or "name · date"',
    de: 'Link, Dok-ID oder „Name · Datum"',
  },
  missingSource: {
    en: "A fact needs a source reference. Without one this is a statement, not a fact.",
    de: "Ein Fakt braucht eine Beleg-Referenz. Ohne sie ist das eine Aussage, kein Fakt.",
  },
  unknownHint: {
    en: "Unknown — verification set to open, and it stays open.",
    de: "Unbekannt — Verifikation auf offen gesetzt, und sie bleibt offen.",
  },
  noDefaultsHint: {
    en: "This block takes no defaults: do not fill this from experience.",
    de: "Dieser Block nimmt keine Defaults: hier nicht aus Erfahrung ergänzen.",
  },
  // --- Discovery mode: the parts of a theme block that are not questions ---
  stopConditions: {
    en: "Stop conditions — when to break off",
    de: "Stop-Bedingungen — wann abzubrechen ist",
  },
  hypotheses: {
    en: "Patterns & hypotheses — not questions",
    de: "Muster & Hypothesen — keine Fragen",
  },
  hypothesesNote: {
    en: "Testable patterns, each with the boundary inside which it holds. Never ask these as questions — that is what turns a pattern into a leading question.",
    de: "Prüfbare Muster, jeweils mit dem Bereich, in dem sie gelten. Diese nie als Frage stellen — genau das macht aus einem Muster eine Suggestivfrage.",
  },
  hypothesesEnglish: {
    en: "canonical",
    de: "Englisch — die verbindliche Fassung; für Hypothesen gibt es bewusst keine Übersetzung",
  },
  scopeOfValidity: { en: "Holds when", de: "Gilt, wenn" },
  falsifiableBy: { en: "Refuted by", de: "Widerlegt durch" },
  decisionHead: { en: "Decision head", de: "Entscheidungskopf" },
  decisionHeadNote: {
    en: "The frame the whole conversation hangs on. Fill it before the blocks, and revisit it if a block contradicts it.",
    de: "Der Rahmen, an dem das ganze Gespräch hängt. Vor den Blöcken ausfüllen — und erneut prüfen, wenn ein Block ihm widerspricht.",
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
    en: "Presentation skeleton — Output B",
    de: "Präsentations-Skelett — Output B",
  },
  deckNote: {
    en: "Built from your answers alone, verbatim, with their tags. Nothing here is summarised, ranked, or inferred — there is no model in this page. Slide order is fixed by the specification.",
    de: "Ausschließlich aus Ihren Antworten gebaut, wörtlich, mit ihren Tags. Nichts hier ist zusammengefasst, gewichtet oder abgeleitet — in dieser Seite läuft kein Modell. Die Folienreihenfolge ist durch die Spezifikation festgelegt.",
  },
  deckEmpty: {
    en: "Nothing answered yet. Fill the intake and the slides fill themselves.",
    de: "Noch nichts beantwortet. Füllen Sie die Erhebung aus — die Folien füllen sich von selbst.",
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
    en: "No open items. Nothing is pending — which is a finding, not an absence.",
    de: "Keine offenen Punkte. Nichts steht aus — das ist ein Befund, keine Leere.",
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
    en: "Nothing open yet. On a first pass through a brownfield platform, an empty register is a finding about the conversation — not a result about the platform.",
    de: "Noch nichts offen. Bei einem ersten Durchgang durch eine Brownfield-Plattform ist ein leeres Register ein Befund über das Gespräch — kein Ergebnis über die Plattform.",
  },
  exportButton: { en: "Export as Markdown", de: "Als Markdown exportieren" },
  copyButton: { en: "Copy to clipboard", de: "In die Zwischenablage kopieren" },
  copied: { en: "Copied.", de: "Kopiert." },
  footer: {
    en: "Band 3 of the series, after the governance toolkit and the approval blueprint. The thread: verification instead of trust — here applied to the architect’s own work.",
    de: "Band 3 der Reihe, nach dem Governance-Toolkit und dem Freigabe-Blueprint. Der rote Faden: Verifikation statt Vertrauen — hier angewandt auf die Arbeit des Architekten selbst.",
  },
  wip: {
    en: "Both question sets are generated from intake/themes/ — the same canonical source the Markdown forms are rendered from. Neither can drift from the other; the gate re-renders and diffs.",
    de: "Beide Fragensätze werden aus intake/themes/ erzeugt — derselben kanonischen Quelle, aus der auch die Markdown-Formulare gerendert werden. Keiner kann vom anderen abweichen; der Gate rendert neu und vergleicht.",
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
    en: "Conversation note, not an authoritative source. A statement with an open verification stays a statement — it never becomes a fact by being written down.",
    de: "Gesprächsnotiz, keine autoritative Quelle. Eine Aussage mit offener Verifikation bleibt eine Aussage — sie wird nicht zum Fakt, weil sie aufgeschrieben wurde.",
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
    en: "Evidence grid — basis × verification",
    de: "Beleggitter — Basis × Verifikation",
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
    en: "An unknown carries no outstanding choice — it is open, and only open.",
    de: "Ein Unbekannt trägt keine offene Wahl — es ist offen, und nur offen.",
  },
} as const;

/** Look up a UI string in the active language. */
export function t(entry: { en: string; de: string }, lang: Lang): string {
  return entry[lang];
}
