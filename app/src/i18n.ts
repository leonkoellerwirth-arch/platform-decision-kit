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
    en: "Work in progress: the questions below are the triage subset. The full discovery set is generated from intake/themes/ once that canonical source lands.",
    de: "In Arbeit: die Fragen unten sind der Triage-Satz. Der volle Discovery-Satz wird aus intake/themes/ generiert, sobald diese kanonische Quelle steht.",
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
} as const;

/** Look up a UI string in the active language. */
export function t(entry: { en: string; de: string }, lang: Lang): string {
  return entry[lang];
}
