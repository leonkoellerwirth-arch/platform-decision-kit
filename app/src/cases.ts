// The example library — the cases the instrument can load into itself.
//
// One canonical source, as everywhere else in this repo: the three scenarios are the very
// fixtures `tools/check.py` holds the reference briefs against, converted by
// `tools/render_cases.py` and inlined at build time. The app has no second set of example
// data and cannot drift from the fixtures, because there is nothing to drift from — the
// gate re-renders them and diffs.
//
// They are a training aid. Between them they show the three shapes a first pass actually
// takes: one where the room knew its platform, one where it did not, and one where two
// records of the same fact disagree. Nothing here is a template to copy; the point is what
// the tag mechanic and the deck do with each.

import demoCase from "../../demo/case.json";
import legacyhr from "../../demo/cases/legacyhr.json";
import paymenthub from "../../demo/cases/paymenthub.json";
import retailcore from "../../demo/cases/retailcore.json";
import type { Answer, DecisionHead, Direction, Mode, Text } from "./themes";

export interface ExampleCase {
  id: string;
  title: Text;
  /** Two sentences: what this case is, and what it is worth looking at for. */
  note: Text;
  mode: Mode;
  head: DecisionHead;
  rows: string[][];
  /** Partial because the fixtures predate several fields; `hydrate` fills them on load. */
  answers: Record<string, Partial<Answer>>;
  directions: Direction[];
}

/** The worked example carries no id or titles in its file; it had none to carry. */
const DEMO: ExampleCase = {
  id: "demo-firma",
  title: {
    en: "Demo-Firma — the worked pass",
    de: "Demo-Firma — der ausgearbeitete Durchgang",
  },
  note: {
    en: "A regional energy utility's meter and market data platform, worked through with the attribution and follow-up fields filled. The one case that shows a register somebody owes.",
    de: "Die Zähler- und Marktdatenplattform eines regionalen Energieversorgers, mit ausgefüllter Zuordnung und Nacharbeit. Der eine Fall, der ein Register zeigt, das jemand schuldet.",
  },
  ...(demoCase as unknown as Omit<ExampleCase, "id" | "title" | "note">),
};

/**
 * Demo-Firma first: it is the only case carrying the fields the instrument gained last, so
 * it is the one that shows the instrument whole. The three fixtures follow in the order
 * their own numbering fixes — complete, gappy, contradictory — which is also the order of
 * increasing difficulty.
 */
export const CASES: ExampleCase[] = [
  DEMO,
  retailcore as unknown as ExampleCase,
  legacyhr as unknown as ExampleCase,
  paymenthub as unknown as ExampleCase,
];
