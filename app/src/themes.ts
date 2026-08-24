// The ten theme blocks — bilingual throughout.
//
// PROVISIONAL SOURCE. From v0.1.0 on this file is GENERATED from `intake/themes/tNN-*.yaml`
// via `intake/themes.json`, the same canonical source the Markdown intake forms are rendered
// from. The shape below mirrors that schema field for field ({en, de} on every text), so the
// swap is a change of loader, not of components.
//
// What is in here today is the TRIAGE subset: the ten core questions, one per block, which is
// this mode's entire budget (20 minutes, one counterpart). The Q-IDs are the canonical ones —
// they are language-neutral and stable across both languages.
//
// English is the binding language of this repository. The German text is a translation and is
// labelled as one wherever it is shown; it is never the source of record.

export type Basis = "fact" | "statement" | "assumption" | "unknown";
export type Verification = "none" | "open" | "blocked";
export type Mode = "triage" | "discovery";
export type Lang = "en" | "de";

/** Every human-readable string in the canonical source carries both languages. */
export interface Text {
  en: string;
  de: string;
}

export const pick = (t: Text, lang: Lang): string => t[lang];

export interface Question {
  id: string;
  text: Text;
  /** Security, data protection, regulation, cost, irreversibility: unknown stays unknown. */
  noDefaults?: boolean;
  modes: Mode[];
}

export interface Theme {
  id: number;
  slug: string;
  title: Text;
  /** Two sentences: why this block exists at all. */
  why: Text;
  redFlags: Text[];
  questions: Question[];
}

export const THEMES: Theme[] = [
  {
    id: 1,
    slug: "pain-occasion",
    title: { en: "Pain & occasion", de: "Schmerz & Anlass" },
    why: {
      en: "Every platform intervention begins with a presenting problem that may or may not be the real problem. This block surfaces who names the pain, what triggered the review now, and what inaction actually costs — separating the real driver from the stated one before any technical assessment begins.",
      de: "Jede Plattformintervention beginnt mit einem vordergründigen Problem, das nicht unbedingt das eigentliche Problem ist. Dieser Block legt offen, wer den Schmerz benennt, was das Review jetzt ausgelöst hat und was Untätigkeit kostet.",
    },
    redFlags: [
      {
        en: "Pain described only from one stakeholder group, not cross-checked with consumers or operators.",
        de: "Der Schmerz wird nur aus einer Stakeholder-Gruppe beschrieben, ohne Gegenprobe bei Konsumenten oder Betrieb.",
      },
      {
        en: "No one has tried to fix this before — or no one knows whether it was tried.",
        de: "Niemand hat das je zu beheben versucht — oder niemand weiß, ob es versucht wurde.",
      },
    ],
    questions: [
      {
        id: "Q1.1",
        text: {
          en: "What is the presenting problem in one sentence?",
          de: "Was ist das vordergründige Problem in einem Satz?",
        },
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 2,
    slug: "success-benchmark",
    title: { en: "Success & benchmark", de: "Erfolg & Messlatte" },
    why: {
      en: "A platform decision without a measurable success criterion is a preference, not a decision. This block captures the decision head — the decision question, its owner, its explicit scope boundary, and its deadline — alongside the criteria by which any outcome will be judged.",
      de: "Eine Plattformentscheidung ohne messbares Erfolgskriterium ist eine Präferenz, keine Entscheidung. Dieser Block erfasst den Entscheidungskopf sowie die Kriterien, nach denen jedes Ergebnis beurteilt wird.",
    },
    redFlags: [
      {
        en: "No named decision owner — the decision belongs to a committee, i.e. to nobody.",
        de: "Kein benannter Entscheidungseigner — die Entscheidung gehört einem Gremium, also niemandem.",
      },
    ],
    questions: [
      {
        id: "Q2.1",
        text: {
          en: "What is the primary decision question — stated as a question with a yes/no or option-selecting answer?",
          de: "Was ist die primäre Entscheidungsfrage — als Frage formuliert, die mit Ja/Nein oder einer Optionswahl beantwortet werden kann?",
        },
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 3,
    slug: "constraints-phase",
    title: { en: "Constraints & phase", de: "Vorgaben & Phase" },
    why: {
      en: "Fixed constraints collapse the option space before analysis begins. Discovering a hard mandate late — a vendor lock-in, a budget ceiling, a regulatory timeline — invalidates work already done. This block captures what cannot be changed.",
      de: "Feste Vorgaben reduzieren den Optionsraum, bevor die Analyse beginnt. Eine spät entdeckte harte Vorgabe — ein Vendor-Lock-in, eine Budgetobergrenze, eine regulatorische Frist — macht bereits geleistete Arbeit ungültig.",
    },
    redFlags: [
      {
        en: "A mandate everyone repeats but nobody can point to in writing.",
        de: "Eine Vorgabe, die alle wiederholen, die aber niemand schriftlich vorzeigen kann.",
      },
    ],
    questions: [
      {
        id: "Q3.1",
        text: {
          en: "What architecture or technology mandates are fixed — i.e. not open for discussion in this decision?",
          de: "Welche Architektur- oder Technologievorgaben sind fest — d. h. in dieser Entscheidung nicht zur Diskussion gestellt?",
        },
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 4,
    slug: "inventory-knowledge",
    title: { en: "Inventory & knowledge", de: "Bestand & Wissen" },
    why: {
      en: "Brownfield platforms accumulate components that no one fully understands. Dark zones — parts of the system whose behaviour is known only through observation, not documentation — are the primary source of architectural surprise. This block maps what exists and who knows it.",
      de: "Brownfield-Plattformen akkumulieren Komponenten, die niemand mehr vollständig versteht. Dunkle Zonen — Teile des Systems, deren Verhalten nur durch Beobachtung, nicht durch Dokumentation bekannt ist — sind die Hauptquelle architektonischer Überraschungen.",
    },
    redFlags: [
      {
        en: "The only person who understands a component has a leaving date.",
        de: "Die einzige Person, die eine Komponente versteht, hat ein Austrittsdatum.",
      },
    ],
    questions: [
      {
        id: "Q4.3",
        text: {
          en: "Which parts of the system does no one currently understand well enough to predict the effect of a change?",
          de: "Welche Teile des Systems versteht niemand aktuell gut genug, um die Auswirkung einer Änderung vorherzusagen?",
        },
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 5,
    slug: "consumers-interfaces",
    title: { en: "Consumers & interfaces", de: "Konsumenten & Schnittstellen" },
    why: {
      en: "A platform migration that breaks a consumer is not a platform migration — it is an incident. This block maps who depends on what, which dependencies are formally contracted versus informally assumed, and who has the authority to accept a breaking change.",
      de: "Eine Plattformmigration, die einen Konsumenten bricht, ist keine Migration, sondern ein Vorfall. Dieser Block bildet ab, wer wovon abhängt, welche Abhängigkeiten formal vertraglich vereinbart und welche informell angenommen sind, und wer einer brechenden Änderung zustimmen muss.",
    },
    redFlags: [
      {
        en: "The number of consumers is given as a range.",
        de: "Die Zahl der Konsumenten wird als Spanne angegeben.",
      },
    ],
    questions: [
      {
        id: "Q5.2",
        text: {
          en: "Which consumers are business-critical, and what availability or latency do they require?",
          de: "Welche Konsumenten sind geschäftskritisch, und welche Verfügbarkeit oder Latenz erwarten sie?",
        },
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 6,
    slug: "data-sovereignty",
    title: { en: "Data & sovereignty", de: "Daten & Souveränität" },
    why: {
      en: "Data classification determines which options are legally available. Missing retention schedules and erasure paths are not implementation details — they are blocking constraints that invalidate entire migration options. This block surfaces the data layer before options are evaluated.",
      de: "Die Datenklassifizierung bestimmt, welche Optionen rechtlich verfügbar sind. Fehlende Aufbewahrungsfristen und Löschpfade sind keine Implementierungsdetails — sie sind blockierende Vorgaben, die ganze Migrationsoptionen ausschließen.",
    },
    redFlags: [
      {
        en: "A classification exists on paper and no one can name who validated it.",
        de: "Eine Klassifizierung existiert auf dem Papier, und niemand kann benennen, wer sie validiert hat.",
      },
    ],
    questions: [
      {
        id: "Q6.1",
        text: {
          en: "What data classifications apply to data this platform stores or processes — and who validated that classification?",
          de: "Welche Datenklassifizierungen gelten für Daten, die diese Plattform speichert oder verarbeitet — und wer hat sie validiert?",
        },
        noDefaults: true,
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 7,
    slug: "regulation-trust",
    title: { en: "Regulation & trust", de: "Regulatorik & Vertrauen" },
    why: {
      en: "Regulatory obligations are not architectural inputs — they are constraints that determine which options are available at all. The AI scoping question is a scoping decision, not a checklist. This block surfaces what applies, what is uncertain, and what Legal has said.",
      de: "Regulatorische Verpflichtungen sind keine architektonischen Eingaben — sie sind Vorgaben, die bestimmen, welche Optionen überhaupt verfügbar sind. Die KI-Scopingfrage ist eine Scopingentscheidung, keine Checkliste.",
    },
    redFlags: [
      {
        en: "Legal has been invited to review, not to scope.",
        de: "Legal wurde zum Review eingeladen, nicht zum Scoping.",
      },
    ],
    questions: [
      {
        id: "Q7.3",
        text: {
          en: "Is AI/ML in the decision subject itself — in a production system or workflow — or only in the authoring process of this analysis?",
          de: "Ist KI/ML im Entscheidungsgegenstand selbst — in einem Produktivsystem oder -workflow — oder nur im Autorenprozess dieser Analyse?",
        },
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 8,
    slug: "migration-reversibility",
    title: { en: "Migration & reversibility", de: "Migration & Reversibilität" },
    why: {
      en: "Every migration path has at least one step from which return is difficult or impossible. “Return is impossible” is a valid, documentable answer — pretending otherwise creates options that do not exist. This block forces irreversibility to be named explicitly.",
      de: "Jeder Migrationspfad hat mindestens einen Schritt, von dem die Rückkehr schwierig oder unmöglich ist. „Rückkehr ist unmöglich“ ist eine gültige, dokumentierbare Antwort — so zu tun, als wäre es anders, erzeugt Optionen, die nicht existieren.",
    },
    redFlags: [
      {
        en: "The rollback plan says “restore from backup” and nobody has restored from that backup.",
        de: "Der Rückfallplan sagt „aus dem Backup wiederherstellen“, und niemand hat je aus diesem Backup wiederhergestellt.",
      },
    ],
    questions: [
      {
        id: "Q8.2",
        text: {
          en: "Which steps in any migration path under consideration are irreversible — once taken, the previous state cannot be restored?",
          de: "Welche Schritte in einem erwogenen Migrationspfad sind irreversibel — einmal vollzogen, kann der vorherige Zustand nicht wiederhergestellt werden?",
        },
        noDefaults: true,
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 9,
    slug: "organisation-team",
    title: { en: "Organisation & team", de: "Organisation & Team-Schnitt" },
    why: {
      en: "Platform decisions are also team decisions. The way work is structured, where knowledge lives, and who talks to whom determine what is achievable — and on what timeline. This block surfaces the organisational reality before any delivery estimate is formed.",
      de: "Plattformentscheidungen sind auch Teamentscheidungen. Wie Arbeit strukturiert ist, wo Wissen liegt und wer mit wem spricht, bestimmt, was erreichbar ist — und in welchem Zeitrahmen.",
    },
    redFlags: [
      {
        en: "The design's critical path crosses a budget boundary.",
        de: "Der kritische Pfad des Entwurfs kreuzt eine Budgetgrenze.",
      },
    ],
    questions: [
      {
        id: "Q9.1",
        text: {
          en: "Who owns this platform — the single named person or team with accountability for its availability and evolution?",
          de: "Wer besitzt diese Plattform — die einzelne benannte Person oder das Team mit Verantwortung für Verfügbarkeit und Weiterentwicklung?",
        },
        modes: ["triage", "discovery"],
      },
    ],
  },
  {
    id: 10,
    slug: "operations-security-resilience",
    title: { en: "Operations, security & resilience", de: "Betrieb, Sicherheit & Resilienz" },
    why: {
      en: "A platform that cannot describe its own operational posture cannot safely migrate. This block captures the minimum operational and security facts that any migration option depends on. If the whole block is unknown, the stop condition applies.",
      de: "Eine Plattform, die ihre eigene Betriebslage nicht beschreiben kann, kann nicht sicher migrieren. Dieser Block erfasst die minimalen Betriebs- und Sicherheitsfakten, von denen jede Migrationsoption abhängt.",
    },
    redFlags: [
      {
        en: "Everyone can describe the architecture and no one can describe the on-call rotation.",
        de: "Alle können die Architektur beschreiben, niemand die Rufbereitschaft.",
      },
    ],
    questions: [
      {
        id: "Q10.1",
        text: {
          en: "What are the current SLO/availability targets — and are they being met? If no SLO exists, state that explicitly.",
          de: "Was sind die aktuellen SLO/Verfügbarkeitsziele — und werden sie eingehalten? Falls kein SLO existiert, explizit benennen.",
        },
        noDefaults: true,
        modes: ["triage", "discovery"],
      },
    ],
  },
];
