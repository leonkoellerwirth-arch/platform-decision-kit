// The Markdown export — one function, called by the app and by the demo build.
//
// It used to live inside `App`, closed over its state, and that made the published worked
// example a second implementation: a script beside the repository re-derived the same
// document from `demo/case.json` and its labels drifted from the app's the moment either
// side changed. The same argument as INV-5, one level up — the file the repository
// publishes and the file the button produces come out of one function or they come out
// differently.

import { t, UI } from "./i18n";
import {
  DECISION_HEAD_FIELDS as DECISION_HEAD_ORDER,
  hydrate,
  pick,
  type Answer,
  type DecisionHead,
  type Direction,
  type Lang,
  type Mode,
  type Theme,
} from "./themes";

export interface ExportInput {
  lang: Lang;
  mode: Mode;
  /** Already filtered to the questions this mode asks. */
  themes: Theme[];
  answers: Record<string, Answer>;
  head: DecisionHead;
  directions: Direction[];
}

const isOpen = (a: Answer) => a.verification === "open" || a.verification === "blocked";

/**
 * A group of labelled parts as one line, with the empty ones left out.
 *
 * A Markdown file a client reads should show what is known and stay quiet about the rest;
 * a labelled dash per missing field is noise. An em dash alone means the whole group is
 * empty, which is itself worth seeing.
 */
function joinParts(parts: [string, string][]): string {
  const filled = parts.filter(([, v]) => v.trim() !== "").map(([k, v]) => `${k}: ${v.trim()}`);
  return filled.length ? filled.join(" · ") : "—";
}

export const attributionLine = (a: Answer, lang: Lang): string =>
  joinParts([
    [t(UI.artifact, lang), a.artifact],
    [t(UI.speaker, lang), a.speaker],
    [t(UI.sourceDate, lang), a.sourceDate],
    [t(UI.source, lang), a.source],
  ]);

export const followUpLine = (a: Answer, lang: Lang): string =>
  joinParts([
    [t(UI.owner, lang), a.owner],
    [t(UI.evidenceNeeded, lang), a.evidence],
    [t(UI.due, lang), a.due],
    [t(UI.blocker, lang), a.blocker],
  ]);

export function exportMarkdown({
  lang,
  mode,
  themes,
  answers,
  head,
  directions,
}: ExportInput): string {
  const get = (id: string): Answer => hydrate(answers[id]);
  const modeName = mode === "triage" ? "Triage" : "Discovery";
  const lines: string[] = [
    `# ${t(UI.exportTitle, lang)} — ${modeName}`,
    "",
    `> ${t(UI.exportNote, lang)}`,
    `> ${t(UI.exportLangNote, lang)}`,
    "",
  ];

  // The decision head leads the document as it leads the intake: who decides, and by when.
  lines.push(`## ${t(UI.decisionHead, lang)}`, "");
  for (const f of DECISION_HEAD_ORDER) {
    lines.push(`- ${pick(f.label, lang)}: ${(head[f.key] ?? "").trim() || "—"}`);
  }
  lines.push("");

  for (const th of themes) {
    lines.push(`## ${th.id}. ${pick(th.title, lang)}`, "");
    for (const q of th.questions) {
      const a = get(q.id);
      lines.push(
        `### ${q.id}  ${pick(q.text, lang)}`,
        `${t(UI.exportAnswer, lang)}: ${a.text.trim() || "—"}`,
        `${t(UI.exportBasis, lang)}: ${a.basis ? t(UI.basisLabels[a.basis], lang) : "—"}`,
        `${t(UI.exportAttribution, lang)}: ${attributionLine(a, lang)}`,
        `${t(UI.exportVerification, lang)}: ${t(UI.verificationLabels[a.verification], lang)}`,
      );
      // Only for the points that are actually open: a closed answer's follow-up fields are
      // whatever was typed before it closed, and printing them would read as work still owed.
      if (isOpen(a)) lines.push(`${t(UI.exportFollowUp, lang)}: ${followUpLine(a, lang)}`);
      lines.push("");
    }
  }

  const register = themes.flatMap((th) => th.questions).filter((q) => isOpen(get(q.id)));
  lines.push(`## ${t(UI.registerTitle, lang)}`, "");
  if (register.length === 0) {
    lines.push(t(UI.exportRegisterEmpty, lang));
  } else {
    // A table now, not a list. The four columns are the whole point of the register: an
    // item that leaves the room without a name and a date on it is a note, not a task.
    const cell = (v: string) => (v.trim() ? v.trim().replace(/\|/g, "\\|") : "—");
    lines.push(
      `| Q-ID | ${t(UI.exportAnswer, lang)} | ${t(UI.owner, lang)} | ${t(
        UI.evidenceNeeded,
        lang,
      )} | ${t(UI.due, lang)} | ${t(UI.blocker, lang)} | ${t(UI.exportVerification, lang)} |`,
      "|---|---|---|---|---|---|---|",
    );
    for (const q of register) {
      const a = get(q.id);
      lines.push(
        `| [${q.id}] | ${cell(a.text || pick(q.text, lang))} | ${cell(a.owner)} | ${cell(
          a.evidence,
        )} | ${cell(a.due)} | ${cell(a.blocker)} | ${t(
          UI.verificationLabels[a.verification],
          lang,
        )} |`,
      );
    }
  }
  lines.push("");

  lines.push(`## ${t(UI.exportDirections, lang)}`, "");
  const written = directions.filter((d) => d.text.trim() !== "");
  if (written.length === 0) {
    lines.push(t(UI.exportDirectionsEmpty, lang));
  } else {
    for (const d of written) {
      const deps = d.dependsOn.map((id) => `[${id}]`).join(" ");
      lines.push(`- ${d.text.trim()} — ${t(UI.conditionalOn, lang)}: ${deps || "—"}`);
    }
  }
  lines.push("");

  return lines.join("\n");
}
