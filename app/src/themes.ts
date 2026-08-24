// The ten theme blocks.
//
// PROVISIONAL SOURCE. From v0.1.0 on this file is GENERATED from `intake/themes/`, the same
// canonical source the Markdown intake forms are rendered from — that is the whole point of
// having a canonical source, and hand-editing it here would reintroduce exactly the drift the
// repository is built to prevent. What is in here today is the TRIAGE subset: one core question
// per block, which is the mode's entire budget (20 minutes, one counterpart).

export type Basis = "fact" | "statement" | "assumption" | "unknown";
export type Verification = "none" | "open" | "blocked";
export type Mode = "triage" | "discovery";

export interface Question {
  id: string;
  /** Canonical text. English is the binding language of this repository. */
  en: string;
  /** Translation, marked as such — never the source of record. */
  de: string;
  /** Security, data protection, regulation, cost, irreversibility: unknown stays unknown. */
  noDefaults?: boolean;
  modes: Mode[];
}

export interface Theme {
  id: number;
  en: string;
  de: string;
  /** Two sentences: why this block exists at all. */
  why: string;
  questions: Question[];
}

export const THEMES: Theme[] = [
  {
    id: 1,
    en: "Pain & trigger",
    de: "Schmerz & Anlass",
    why: "A platform decision is almost never caused by the architecture; it is caused by an event. Naming the event tells you who is actually under pressure, and therefore what a solution has to relieve.",
    questions: [
      {
        id: "Q1.1",
        en: "What happened that makes this a decision now, and not a year ago?",
        de: "Was ist passiert, das dies jetzt zu einer Entscheidung macht und nicht vor einem Jahr?",
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 2,
    en: "Success & the yardstick",
    de: "Erfolg & Messlatte",
    why: "Without a decision question there is no decision, only a discussion. This block fixes what is being decided, by whom, within which boundary, and by when.",
    questions: [
      {
        id: "Q2.1",
        en: "What exactly is the decision question, who owns it, and by when must it be answered?",
        de: "Wie lautet die Entscheidungsfrage genau, wer ist Entscheidungseigner, und bis wann muss sie beantwortet sein?",
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 3,
    en: "Constraints & phase",
    de: "Vorgaben & Phase",
    why: "Some decisions were made before you arrived and are not up for renegotiation. Knowing which ones keeps the discovery from producing an option nobody is allowed to choose.",
    questions: [
      {
        id: "Q3.1",
        en: "Which decisions are already fixed and cannot be reopened inside this project?",
        de: "Welche Entscheidungen sind bereits gesetzt und können in diesem Projekt nicht neu verhandelt werden?",
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 4,
    en: "Estate & knowledge about it",
    de: "Bestand & Wissen",
    why: "In a brownfield the schema is documented and the data is not. This block separates what the system claims from what anyone has actually verified.",
    questions: [
      {
        id: "Q4.1",
        en: "Which system is the source of truth for the master data today — and who last verified that it is?",
        de: "Welches System ist heute die führende Quelle für die Stammdaten — und wer hat zuletzt geprüft, dass es das ist?",
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 5,
    en: "Consumers & interfaces",
    de: "Konsumenten & Schnittstellen",
    why: "The consumers are never in the room and are usually the reason the old semantics exist. An incomplete list is itself a finding, not a footnote.",
    questions: [
      {
        id: "Q5.1",
        en: "How many systems read from it, and which one would notice within an hour if it stopped?",
        de: "Wie viele Systeme lesen daraus, und welches würde es innerhalb einer Stunde merken, wenn es ausfiele?",
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 6,
    en: "Data & sovereignty",
    de: "Daten & Souveränität",
    why: "Data classes decide where a system may run and how long it must keep what it holds. This is the block where a guess costs the most later.",
    questions: [
      {
        id: "Q6.1",
        en: "Which data classes are in scope, and for which of them does a retention or erasure duty exist?",
        de: "Welche Datenklassen sind im Geltungsbereich, und für welche davon besteht eine Aufbewahrungs- oder Löschpflicht?",
        noDefaults: true,
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 7,
    en: "Regulation & trust",
    de: "Regulatorik & Vertrauen",
    why: "Regulation is a constraint to discover, not an approval to obtain at the end. On AI the block scopes only: where it sits, and who still has to classify it.",
    questions: [
      {
        id: "Q7.1",
        en: "Is AI in the object of the decision, or only in the authoring process? (Role and risk class remain open with legal.)",
        de: "Ist KI im Entscheidungsgegenstand oder nur im Autorenprozess? (Rolle und Risikoklasse bleiben bei Legal offen.)",
        noDefaults: true,
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 8,
    en: "Migration & reversibility",
    de: "Migration & Reversibilität",
    why: "Every plan has a step from which there is no way back, and it is usually discovered at the moment it fails. \"No way back\" is a valid answer here — it just has to be written down.",
    questions: [
      {
        id: "Q8.1",
        en: "Which step in the plan cannot be undone once it has been taken?",
        de: "Welcher Schritt im Plan lässt sich nicht mehr rückgängig machen, wenn er einmal getan ist?",
        noDefaults: true,
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 9,
    en: "Organisation & team cut",
    de: "Organisation & Team-Schnitt",
    why: "For the duration of a project the reporting lines are fixed and the architecture is not. A design whose critical path crosses a budget boundary is a design with a schedule problem.",
    questions: [
      {
        id: "Q9.1",
        en: "Who decides, who builds, who operates — and are those the same reporting line?",
        de: "Wer entscheidet, wer baut, wer betreibt — und ist das dieselbe Berichtslinie?",
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 10,
    en: "Operations, security & resilience",
    de: "Betrieb, Sicherheit & Resilienz",
    why: "Operations inherits the result of a design decision without having had a seat in it. The minimum this block asks for is the target, the tested way back, and who is called at night.",
    questions: [
      {
        id: "Q10.1",
        en: "What is the agreed availability target — and when was a restore last actually tested?",
        de: "Welches Verfügbarkeitsziel ist vereinbart — und wann wurde ein Restore zuletzt tatsächlich getestet?",
        noDefaults: true,
        modes: ["triage", "discovery"],
      },
    ],
  },
];
