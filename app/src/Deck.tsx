// The presentation skeleton — Output B of the agent specification, rendered in the browser.
//
// This is a PROJECTION, not a generation. Every line on every slide is an answer the user typed,
// carried over verbatim with its Basis and Verification tags. Nothing is summarised, ranked,
// averaged, or inferred, because INV-7 does not stop applying just because the renderer is a
// React component instead of a model. The one thing this file adds is *structure*: the seven
// slides in the order the briefing fixes, with "Weiter wie bisher" always first among the
// options and "Entscheidung vertagen" always present.
//
// Layout vocabulary follows Presenton's "Executive" template family (Apache-2.0): a bold display
// heading, rounded content cards, a footer pagination marker, and soft corner accents. Nothing is
// copied from it — no code, no assets, no fonts. System font stacks only, so the page still makes
// no network call.
//
// PDF export is the browser's own print dialogue against the @media print rules. No library.

import { t, UI } from "./i18n";
import {
  DECISION_HEAD_FIELDS,
  pick,
  type Answer,
  type DecisionHead,
  type Lang,
  type Mode,
  type Text,
  type Theme,
} from "./themes";

interface DeckProps {
  lang: Lang;
  mode: Mode;
  themes: Theme[];
  answers: Record<string, Answer>;
  head: DecisionHead;
  rows: string[][];
}

/** One answered question, flattened to what a slide needs. */
interface Item {
  id: string;
  question: Text;
  text: string;
  basis: string | null;
  source: string;
  open: boolean;
}

export function Deck({ lang, mode, themes, answers, head, rows }: DeckProps) {
  const items: Item[] = themes.flatMap((th) =>
    th.questions.map((q) => {
      const a = answers[q.id];
      return {
        id: q.id,
        question: q.text,
        text: a?.text.trim() ?? "",
        basis: a?.basis ? t(UI.basisLabels[a.basis], lang) : null,
        source: a?.source.trim() ?? "",
        open: a?.verification === "open" || a?.verification === "blocked",
      };
    }),
  );

  const byId = new Map(items.map((i) => [i.id, i]));
  const have = (id: string) => {
    const i = byId.get(id);
    return i && (i.text !== "" || i.basis !== null) ? i : null;
  };
  const openItems = items.filter((i) => i.open);
  const assumptions = items.filter(
    (i) => i.basis === t(UI.basisLabels.assumption, lang) && i.text !== "",
  );
  const anything =
    items.some((i) => i.text !== "" || i.basis !== null) ||
    Object.values(head).some((v) => v.trim() !== "");

  if (!anything) {
    return (
      <section className="deck">
        <p className="deck-note">{t(UI.deckNote, lang)}</p>
        <p className="empty">{t(UI.deckEmpty, lang)}</p>
      </section>
    );
  }

  /** Cost is quoted from the intake or declared unquoted. It is never computed here. */
  const cost = (id: string): string => {
    const i = have(id);
    return i && i.text !== "" ? i.text : t(UI.notEstimated, lang);
  };

  return (
    <section className="deck">
      <p className="deck-note">{t(UI.deckNote, lang)}</p>
      <div className="deck-actions">
        <button onClick={() => window.print()}>{t(UI.print, lang)}</button>
      </div>

      <Slide n={1} lang={lang} title={t(UI.deckTitles.s1, lang)}>
        <Lead item={have("Q1.1")} lang={lang} />
        <Cards>
          <Card label={t(UI.decisionHead, lang)}>
            {DECISION_HEAD_FIELDS.map((f) => (
              <Line key={f.key} label={pick(f.label, lang)} value={head[f.key] ?? ""} lang={lang} />
            ))}
          </Card>
          <Card label={t(UI.basisLabels.assumption, lang)}>
            {assumptions.length === 0 ? (
              <p className="muted">—</p>
            ) : (
              assumptions.map((a) => <Quote key={a.id} item={a} lang={lang} />)
            )}
          </Card>
        </Cards>
      </Slide>

      <Slide n={2} lang={lang} title={t(UI.deckTitles.s2, lang)}>
        <Cards>
          <Card label="Q2.6">
            <Quote item={have("Q2.6")} lang={lang} />
          </Card>
          <Card label="Q2.7">
            <Quote item={have("Q2.7")} lang={lang} />
          </Card>
        </Cards>
        <Cards>
          <Card label="Q2.3">
            <Quote item={have("Q2.3")} lang={lang} />
          </Card>
          <Card label="Q2.4">
            <Quote item={have("Q2.4")} lang={lang} />
          </Card>
        </Cards>
      </Slide>

      <Slide n={3} lang={lang} title={t(UI.deckTitles.s3, lang)}>
        <Cards>
          <Card label="0" accent>
            <h4>{t(UI.optionBaseline, lang)}</h4>
            <p className="muted">{t(UI.optionBaselineBody, lang)}</p>
            <Line label={t(UI.costRunning, lang)} value={cost("Q1.5")} lang={lang} raw />
          </Card>
          <Card label="1">
            <h4>{t(UI.optionConsidered, lang)}</h4>
            <Quote item={have("Q8.1")} lang={lang} />
            <Line label={t(UI.costOneOff, lang)} value={cost("Q3.2")} lang={lang} raw />
            <Line label={t(UI.costParallel, lang)} value={cost("Q8.3")} lang={lang} raw />
            <Line label={t(UI.costRisk, lang)} value={cost("Q8.2")} lang={lang} raw />
          </Card>
          <Card label="2" accent>
            <h4>{t(UI.optionDefer, lang)}</h4>
            <p className="muted">{t(UI.optionDeferBody, lang)}</p>
            {openItems.length === 0 ? (
              <p className="muted">—</p>
            ) : (
              <ul className="ids">
                {openItems.map((i) => (
                  <li key={i.id}>
                    <code>{i.id}</code>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Cards>
      </Slide>

      <Slide n={4} lang={lang} title={t(UI.deckTitles.s4, lang)}>
        {openItems.length === 0 ? (
          <p className="muted">{t(UI.noOpenDirections, lang)}</p>
        ) : (
          <ul className="conditions">
            {openItems.map((i) => (
              <li key={i.id}>
                <span className="cond">
                  {t(UI.conditionalOn, lang)} <code>{i.id}</code>
                </span>
                <span className="cond-q">{pick(i.question, lang)}</span>
              </li>
            ))}
          </ul>
        )}
      </Slide>

      <Slide n={5} lang={lang} title={t(UI.deckTitles.s5, lang)}>
        <Cards>
          <Card label={t(UI.irreversible, lang)} flag>
            <Quote item={have("Q8.2")} lang={lang} />
          </Card>
          <Card label="Q8.4">
            <Quote item={have("Q8.4")} lang={lang} />
          </Card>
          <Card label="Q8.5">
            <Quote item={have("Q8.5")} lang={lang} />
          </Card>
        </Cards>
      </Slide>

      <Slide n={6} lang={lang} title={t(UI.deckTitles.s6, lang)}>
        <Cards>
          {["Q9.1", "Q9.3", "Q9.5"].map((id) => (
            <Card key={id} label={id}>
              <Quote item={have(id)} lang={lang} />
            </Card>
          ))}
        </Cards>
        {rows.length > 0 && (
          <p className="muted">
            {t(UI.dataInventory, lang)}: {rows.length}
          </p>
        )}
      </Slide>

      <Slide n={7} lang={lang} title={t(UI.deckTitles.s7, lang)} last>
        {openItems.length === 0 ? (
          <p className="muted">{t(UI.noOpenDirections, lang)}</p>
        ) : (
          <table className="reg">
            <tbody>
              {openItems.map((i) => (
                <tr key={i.id}>
                  <td>
                    <code>{i.id}</code>
                  </td>
                  <td>{pick(i.question, lang)}</td>
                  <td className="muted">{i.text || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="signoff">{t(UI.deckSignoff, lang)}</p>
      </Slide>

      <p className="credit">
        {t(UI.deckDesignCredit, lang)} · {mode === "triage" ? "TRIAGE" : "DISCOVERY"}
      </p>
    </section>
  );
}

function Slide({
  n,
  lang,
  title,
  last,
  children,
}: {
  n: number;
  lang: Lang;
  title: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className={`slide${last ? " last" : ""}`}>
      <span className="corner" aria-hidden="true" />
      <h3>{title}</h3>
      <div className="slide-body">{children}</div>
      <span className="marker">
        {t(UI.slide, lang)} {n} / 7
      </span>
    </article>
  );
}

const Cards = ({ children }: { children: React.ReactNode }) => (
  <div className="cards">{children}</div>
);

function Card({
  label,
  accent,
  flag,
  children,
}: {
  label: string;
  accent?: boolean;
  flag?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`card${accent ? " accent" : ""}${flag ? " flagcard" : ""}`}>
      <span className="card-label">{label}</span>
      {children}
    </div>
  );
}

/** The headline answer of a slide, large — still verbatim. */
function Lead({ item, lang }: { item: Item | null; lang: Lang }) {
  if (!item || item.text === "") {
    return <p className="lead muted">{t(UI.notAnswered, lang)}</p>;
  }
  return (
    <p className="lead">
      {item.text} <code>[{item.id}]</code>
      {item.basis && <span className="tagpill">{item.basis}</span>}
    </p>
  );
}

/** An answer with its tag and source, exactly as it was entered. */
function Quote({ item, lang }: { item: Item | null; lang: Lang }) {
  if (!item || (item.text === "" && !item.basis)) {
    return <p className="muted">{t(UI.notAnswered, lang)}</p>;
  }
  return (
    <p className="quote">
      {item.text || "—"} <code>[{item.id}]</code>
      {item.basis && <span className="tagpill">{item.basis}</span>}
      {item.source && <span className="src">· {item.source}</span>}
    </p>
  );
}

function Line({
  label,
  value,
  lang,
  raw,
}: {
  label: string;
  value: string;
  lang: Lang;
  raw?: boolean;
}) {
  const shown = value.trim() === "" ? (raw ? value : t(UI.notAnswered, lang)) : value;
  return (
    <p className="kv">
      <span className="k">{label}</span>
      <span className={value.trim() === "" && !raw ? "v muted" : "v"}>{shown || "—"}</span>
    </p>
  );
}
