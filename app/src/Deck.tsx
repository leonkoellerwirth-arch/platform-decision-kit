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

import { Children, useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@heroui/react";

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

  // The seven slides are collected into an array rather than emitted straight into the
  // page, because the same slides have to serve three surfaces: the scrolling stack, the
  // presenter's full-screen stage, and the print sheet. Children.toArray keys them for us.
  const deck = (
    <>
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
          <Card label={t(UI.cardSuccess, lang)}>
            <Quote item={have("Q2.6")} lang={lang} />
          </Card>
          <Card label={t(UI.cardJudge, lang)}>
            <Quote item={have("Q2.7")} lang={lang} />
          </Card>
        </Cards>
        <Cards>
          <Card label={t(UI.cardInScope, lang)}>
            <Quote item={have("Q2.3")} lang={lang} />
          </Card>
          <Card label={t(UI.cardOutOfScope, lang)}>
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
          <Card label={t(UI.cardWayBack, lang)}>
            <Quote item={have("Q8.4")} lang={lang} />
          </Card>
          <Card label={t(UI.cardIrreversibilityAssessed, lang)}>
            <Quote item={have("Q8.5")} lang={lang} />
          </Card>
        </Cards>
      </Slide>

      <Slide n={6} lang={lang} title={t(UI.deckTitles.s6, lang)}>
        <Cards>
          {(
            [
              ["Q9.1", UI.cardPlatformOwner],
              ["Q9.3", UI.cardKeyPeople],
              ["Q9.5", UI.cardVetoChain],
            ] as const
          ).map(([id, label]) => (
            <Card key={id} label={t(label, lang)}>
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
        {/* The sign-off leads. It is the finding of the instrument — "this is a discovery
            brief, no recommendation, nothing here is decision-ready" — and it stood in
            grey italics after thirty-nine table rows, where nobody in the room ever read
            it. The wording is unchanged; the gate asserts it verbatim. */}
        <p className="signoff">{t(UI.deckSignoff, lang)}</p>
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
      </Slide>
    </>
  );
  const slides = Children.toArray(deck.props.children);

  return <Presenter lang={lang} mode={mode} slides={slides} />;
}

/**
 * The deck, as a deck.
 *
 * The first version of this view was a stack you scrolled, capped at the intake's reading
 * width. That is the wrong shape twice over: a slide is landscape and a deck is paged, and
 * a column of portrait cards is neither. The tab now *is* the presentation — one 16:9 slide
 * filling the width it has, arrow keys to move, and "Präsentieren" only asks the browser for
 * full screen. There is nothing to discover and nothing to scroll.
 *
 * The stack stays mounted but hidden, because printing prints the stack: seven slides, one
 * page each.
 */
function Presenter({
  lang,
  mode,
  slides,
}: {
  lang: Lang;
  mode: Mode;
  slides: React.ReactNode[];
}) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (d: number) => setI((prev) => Math.min(n - 1, Math.max(0, prev + d))),
    [n],
  );

  const fullscreen = useCallback(() => {
    const el = stageRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void el.requestFullscreen?.().catch(() => {});
  }, []);

  // The keys a presenter's hands already know. This component only exists while the
  // presentation tab is open, so nothing here can shadow the intake's own shortcuts.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          e.preventDefault();
          setI(0);
          break;
        case "End":
          e.preventDefault();
          setI(n - 1);
          break;
        case "f":
        case "F":
          e.preventDefault();
          fullscreen();
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, n, fullscreen]);

  return (
    <section className="deck">
      <div className="stage" ref={stageRef}>
        <div className="stage-frame">
          <Fit>{slides[i]}</Fit>
        </div>

        <div className="stage-bar">
          <Button variant="ghost" size="sm" isIconOnly isDisabled={i === 0}
                  aria-label={t(UI.presentPrev, lang)} onPress={() => go(-1)}>
            &#8592;
          </Button>
          <span className="stage-count">
            {t(UI.slide, lang)} {i + 1} / {n}
          </span>
          <Button variant="ghost" size="sm" isIconOnly isDisabled={i === n - 1}
                  aria-label={t(UI.presentNext, lang)} onPress={() => go(1)}>
            &#8594;
          </Button>

          <div className="stage-dots">
            {slides.map((_, k) => (
              <button
                key={k}
                type="button"
                className={`stage-dot${k === i ? " on" : ""}`}
                aria-label={`${t(UI.slide, lang)} ${k + 1}`}
                onClick={() => setI(k)}
              />
            ))}
          </div>

          <span className="stage-hint">{t(UI.presentHint, lang)}</span>

          <Button variant="primary" size="sm" onPress={fullscreen}>
            {t(UI.present, lang)}
          </Button>
          <Button variant="outline" size="sm" onPress={() => window.print()}>
            {t(UI.print, lang)}
          </Button>
        </div>
      </div>

      <p className="deck-note">{t(UI.deckNote, lang)}</p>

      {/* Hidden on screen, printed on paper. */}
      <div className="deck-stack">{slides}</div>

      <p className="credit">
        {t(UI.deckDesignCredit, lang)} · {mode === "triage" ? "TRIAGE" : "DISCOVERY"}
      </p>
    </section>
  );
}

/**
 * The slide canvas.
 *
 * A slide is 1280 × 720 — a fixed box, like the one a projector actually has — and the
 * whole box is scaled to whatever room the stage has. That is one multiplication, not a
 * measuring loop: the first version measured the content, scaled it, and thereby changed
 * the thing it had just measured, which settled at the shrink floor on every slide.
 *
 * Fixed also means honest. What the room sees is the same box the PDF prints, so a slide
 * that overflows here overflows there too — you find it while rehearsing, not on stage.
 * The open-points register is the one slide that does overflow, by nature: thirty-nine
 * items were never a projection surface. It scrolls inside its canvas rather than being
 * silently cropped.
 */
const CANVAS_W = 1280;
const CANVAS_H = 720;

function Fit({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const measure = () => {
      const b = box.current;
      if (!b) return;
      setScale(Math.min(b.clientWidth / CANVAS_W, b.clientHeight / CANVAS_H));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="fit" ref={box}>
      <div
        className="fit-canvas"
        style={{ width: CANVAS_W, height: CANVAS_H, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
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
