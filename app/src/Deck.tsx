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

import { Children, createContext, Fragment, useCallback, useContext, useEffect, useRef, useState } from "react";

import { Button } from "@heroui/react";

import { HelpPanel } from "./HelpPanel";
import { SLIDE_HELP } from "./help";
import { t, UI } from "./i18n";
import {
  DECISION_HEAD_FIELDS,
  pick,
  hydrate,
  type Answer,
  type Basis,
  type Verification,
  type DecisionHead,
  type Direction,
  type Lang,
  type Mode,
  type Text,
  type Theme,
} from "./themes";

/**
 * The slides are built before the presenter exists, so the corner button cannot be handed a
 * callback as a prop. A context is the smaller of the two evils: the presenter provides the
 * opener, every slide picks it up, and nothing has to be threaded through seven call sites.
 */
const OpenSlideHelp = createContext<((n: number) => void) | null>(null);

interface DeckProps {
  lang: Lang;
  mode: Mode;
  themes: Theme[];
  answers: Record<string, Answer>;
  head: DecisionHead;
  rows: string[][];
  directions: Direction[];
}

/** One answered question, flattened to what a slide needs. */
interface Item {
  id: string;
  question: Text;
  text: string;
  /** The translated word, for reading. */
  basis: string | null;
  /** The raw key, for the shape and the colour. A slide that only had the word could
      write "Annahme" but not draw a triangle in brass. */
  basisKey: Basis | null;
  verification: Verification;
  /** The attribution, already assembled for reading: a slide has no room for four labels. */
  source: string;
  /** The follow-up, for the register on the last slide. Empty means nobody owes it. */
  owner: string;
  due: string;
  evidence: string;
  open: boolean;
}

/**
 * The four attribution fields as one readable string.
 *
 * A slide cannot carry four labelled fields per row, and it does not have to: what a reader
 * needs from a source line is who or what, and when. The parts that are empty are left out
 * rather than printed as dashes, so a well-sourced line reads as a citation and a thin one
 * reads as thin.
 */
function attribution(a: Answer): string {
  return [a.artifact, a.speaker, a.sourceDate, a.source]
    .map((v) => v.trim())
    .filter((v) => v !== "")
    .join(" · ");
}

export function Deck({ lang, mode, themes, answers, head, rows, directions }: DeckProps) {
  const items: Item[] = themes.flatMap((th) =>
    th.questions.map((q) => {
      const a = hydrate(answers[q.id]);
      return {
        id: q.id,
        question: q.text,
        text: a.text.trim(),
        basis: a.basis ? t(UI.basisLabels[a.basis], lang) : null,
        basisKey: a.basis,
        verification: a.verification,
        source: attribution(a),
        owner: a.owner.trim(),
        due: a.due.trim(),
        evidence: a.evidence.trim(),
        open: a.verification === "open" || a.verification === "blocked",
      };
    }),
  );

  /**
   * Answered and with nothing outstanding.
   *
   * These were falling off the deck entirely. A slide reaches for an ID by name, or an answer
   * arrives because it is open or an assumption; an answer that is documented, sourced and
   * settled matched none of those, so the eleven best-evidenced lines of the intake, the stack,
   * the eleven consumers, "no interface has an SLA", the data classification and the regulatory
   * frame, appeared nowhere. A room got the doubts without the ground they stand on.
   */
  const settled = items.filter(
    (i) => (i.text !== "" || i.basis !== null) && !i.open && i.basisKey !== "unknown",
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

  /** Only the directions somebody actually wrote. An empty box is not a direction. */
  const written = directions.filter((d) => d.text.trim() !== "");

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
          <Card label={t(UI.gridTitle, lang)}>
            <DeckGrid items={items} lang={lang} />
          </Card>
          {/* A slide holds what a slide holds. Beyond four the card runs off the canvas, so
              it says how many are left and where they are in full. The order is the question
              order, not a judgement about which assumption matters more. */}
          <Card label={t(UI.basisLabels.assumption, lang)}>
            {assumptions.length === 0 ? (
              <p className="muted">—</p>
            ) : (
              <>
                {assumptions.slice(0, 3).map((a) => (
                  <Quote key={a.id} item={a} lang={lang} />
                ))}
                {assumptions.length > 3 && (
                  <p className="more">
                    +{assumptions.length - 3} {t(UI.andMore, lang)}
                  </p>
                )}
              </>
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
          {/* What happens if the deadline passes undecided is a decision criterion, and it
              was on no slide at all. */}
          <Card
            label={t(UI.cardDeadline, lang)}
            blocked={have("Q2.5")?.verification === "blocked"}
          >
            <Quote item={have("Q2.5")} lang={lang} />
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
              <>
                {/* Thirty-nine numbered chips is a texture, not a message. The count is the
                    message; the chips stay for the reader who wants to see that they are all
                    there, and the rest are on the last slide. */}
                <p className="optcount">
                  <b>{openItems.length}</b> {t(UI.openPoints, lang)}
                </p>
                <ul className="ids">
                  {openItems.slice(0, 8).map((i) => (
                    <li key={i.id}>
                      <code>{i.id}</code>
                    </li>
                  ))}
                </ul>
                {openItems.length > 8 && (
                  <p className="more">
                    +{openItems.length - 8} {t(UI.andMore, lang)}
                  </p>
                )}
              </>
            )}
          </Card>
        </Cards>
      </Slide>

      {/* The specification asks this slide for directions stated conditionally — "diese
          Richtung ist abhängig von [Q…]" — and for a long time it could not deliver them,
          because nothing in the intake held a direction. It showed the open points by theme
          instead: true, and not the slide that was specified. Now it shows the directions
          the architect wrote down, each with the points it waits on, and keeps the theme map
          underneath as the ground they stand on. Where nothing was written, the map is the
          whole slide, as before — the instrument invents no direction of its own. */}
      <Slide n={4} lang={lang} title={t(UI.deckTitles.s4, lang)}>
        {written.length > 0 && (
          <ul className="dirs">
            {written.map((d, i) => (
              // eslint-disable-next-line react/no-array-index-key -- directions have no id
              <li key={i} className={d.dependsOn.length === 0 ? "dir unconditioned" : "dir"}>
                <p className="dir-text">{d.text.trim()}</p>
                <p className="dir-dep">
                  {t(UI.conditionalOn, lang)}
                  {d.dependsOn.length === 0 ? (
                    <span className="dir-none"> — {t(UI.directionUnconditioned, lang)}</span>
                  ) : (
                    d.dependsOn.map((id) => (
                      <code key={id} className="dir-qid">
                        {id}
                      </code>
                    ))
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}

        {openItems.length === 0 ? (
          <p className="muted">{t(UI.noOpenDirections, lang)}</p>
        ) : (
          <>
            <p className="lead muted tmap-lead">
              {t(UI.openByTheme, lang)}
            </p>
            <ThemeMap
              themes={themes}
              open={new Set(openItems.map((i) => i.id))}
              lang={lang}
            />
          </>
        )}
      </Slide>

      <Slide n={5} lang={lang} title={t(UI.deckTitles.s5, lang)}>
        <Cards>
          <Card label={t(UI.irreversible, lang)} flag>
            <Quote item={have("Q8.2")} lang={lang} />
          </Card>
          <Card label={t(UI.cardWayBack, lang)} blocked={have("Q8.4")?.verification === "blocked"}>
            <Quote item={have("Q8.4")} lang={lang} />
          </Card>
          <Card
            label={t(UI.cardIrreversibilityAssessed, lang)}
            blocked={have("Q8.5")?.verification === "blocked"}
          >
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
            <Card key={id} label={t(label, lang)} blocked={have(id)?.verification === "blocked"}>
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
        <p className="readout-line">
          <span className="readout-chip">{t(UI.readOut, lang)}</span>
          {t(UI.readOutNote, lang)}
        </p>
        {openItems.length === 0 ? (
          <p className="muted">{t(UI.noOpenDirections, lang)}</p>
        ) : (
          /* Four columns now, not three. An open point that leaves the room without a name
             and a date on it comes back in the next workshop unchanged, so the two fields
             that make it work somebody owes are on the sheet the room takes away — and where
             they are missing, the cell says so rather than staying blank. */
          <table className="reg reg-owned">
            <tbody>
              {openItems.map((i) => (
                <tr key={i.id}>
                  <td>
                    <code>{i.id}</code>
                  </td>
                  <td>{pick(i.question, lang)}</td>
                  <td className="muted">
                    {i.text || "—"}
                    {i.evidence && <span className="reg-ev"> · {i.evidence}</span>}
                  </td>
                  <td className={i.owner ? "reg-owner" : "reg-owner none"}>
                    {i.owner || t(UI.decisionHeadEmptyField, lang)}
                  </td>
                  <td className={i.due ? "reg-due" : "reg-due none"}>
                    {i.due || t(UI.decisionHeadEmptyField, lang)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* The appendix is the record, so it carries the settled answers too. They are not
            open points and are not mixed into that list: they sit under their own heading,
            after it, with their tags. Nothing typed into the intake leaves the deck. */}
        {settled.length > 0 && (
          <>
            <h4 className="reg-sub">
              {t(UI.settledTitle, lang)} <b>{settled.length}</b>
            </h4>
            <p className="reg-sub-note">{t(UI.settledNote, lang)}</p>
            <table className="reg settled">
              <tbody>
                {settled.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <code>{i.id}</code>
                    </td>
                    <td>{pick(i.question, lang)}</td>
                    <td className="muted">
                      {i.text || "—"}
                      <Tag item={i} />
                      {i.source && <span className="src"> · {i.source}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
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
  const [help, setHelp] = useState<number | null>(null);
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
    <OpenSlideHelp.Provider value={setHelp}>
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

      {/* The chip only. The sentence itself stands on the last slide, beside the sign-off,
          because that is the sheet the room takes away — repeating it here put the same two
          lines twice within a hand's width on screen. */}
      <p className="deck-readout">
        <span className="readout-chip">{t(UI.readOut, lang)}</span>
        {t(UI.deckNote, lang)}
      </p>

      {/* Hidden on screen, printed on paper. */}
      <div className="deck-stack">{slides}</div>

      <p className="credit">
        {t(UI.deckDesignCredit, lang)} · {mode === "triage" ? "TRIAGE" : "DISCOVERY"}
      </p>

      {help !== null && SLIDE_HELP[help] && (
        <HelpPanel help={SLIDE_HELP[help]} lang={lang} onClose={() => setHelp(null)} />
      )}
    </section>
    </OpenSlideHelp.Provider>
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
      <SlideHelpButton n={n} lang={lang} />
      <h3>{title}</h3>
      <div className="slide-body">{children}</div>
      <span className="marker">
        {t(UI.slide, lang)} {n} / 7
      </span>
    </article>
  );
}

/** The ⓘ in the corner of a slide. Hidden in print: a sheet has nothing to open. */
function SlideHelpButton({ n, lang }: { n: number; lang: Lang }) {
  const open = useContext(OpenSlideHelp);
  if (!open || !SLIDE_HELP[n]) return null;
  return (
    <button
      type="button"
      className="slide-help"
      aria-label={t(UI.helpForSlide, lang)}
      onClick={() => open(n)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.2 9.2a2.8 2.8 0 1 1 3.8 2.6c-.7.3-1 .9-1 1.6v.4" />
        <line x1="12" y1="17.6" x2="12.01" y2="17.6" />
      </svg>
    </button>
  );
}

const Cards = ({ children }: { children: React.ReactNode }) => (
  <div className="cards">{children}</div>
);

function Card({
  label,
  accent,
  flag,
  blocked,
  children,
}: {
  label: string;
  accent?: boolean;
  flag?: boolean;
  /** Work on this answer is blocked. One red edge, so the hard items are found before
      they are read. Never a fill: signal red is the focal pop, not an area. */
  blocked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`card${accent ? " accent" : ""}${flag ? " flagcard" : ""}${blocked ? " blockedcard" : ""}`}
    >
      <span className="card-label">{label}</span>
      {children}
    </div>
  );
}

/**
 * The tag, as a shape and a colour rather than a grey word.
 *
 * The four bases had one appearance between them, so a slide told you *that* something was
 * tagged and never *what*. The glyph is the one the grid already uses, so the mark a person
 * clicked in the intake is the mark they see on the slide: filled circle for a fact, hollow
 * for a statement, triangle for an assumption, dash for an unknown. Colour follows the same
 * split the house palette already makes — mint for what can be verified, blue for what was
 * said, brass for what was assumed, a dashed grey for what nobody knows.
 *
 * This is not a ranking. A statement is not a lesser fact, and the colours are four different
 * hues rather than four steps of one.
 */
function Tag({ item }: { item: Item }) {
  if (!item.basisKey || !item.basis) return null;
  return (
    <span className={`tagpill tagpill--${item.basisKey}`}>
      <i className={`mark m-${item.basisKey}`} aria-hidden="true" />
      {item.basis}
    </span>
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
      <Tag item={item} />
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
      <Tag item={item} />
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

/**
 * The board, at slide size.
 *
 * The instrument's own signature picture: four kinds of knowledge across, three states of
 * outstanding work down, and every answer of this intake sitting on the cell it was tagged
 * with. One look says what kind of conversation this was — a heavy left column is a
 * well-evidenced one, a lit bottom right is a room that admitted a lot.
 *
 * It counts and it does not weigh. A count is the same statement as the list it comes from,
 * only shorter to look at; nothing here is ranked, scored or inferred, and no cell means
 * "better" than another. The picture is generated from the tags for any intake, which is the
 * condition for it being in the tool at all: a slide that has to be drawn by hand per client
 * is a template, not an instrument.
 */
const BASES: Basis[] = ["fact", "statement", "assumption", "unknown"];
const VERIFICATIONS: Verification[] = ["none", "open", "blocked"];

function DeckGrid({ items, lang }: { items: Item[]; lang: Lang }) {
  const counts = new Map<string, number>();
  for (const i of items) {
    if (!i.basisKey) continue;
    const k = `${i.basisKey}/${i.verification}`;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  const max = Math.max(1, ...counts.values());
  const total = [...counts.values()].reduce((a, b) => a + b, 0);

  return (
    <div className="dgrid">
      <div className="dgrid-board">
        <span className="dgrid-corner" />
        {BASES.map((b) => (
          <span key={b} className="dgrid-col">
            <i className={`mark m-${b}`} aria-hidden="true" />
            {t(UI.basisLabels[b], lang)}
          </span>
        ))}

        {VERIFICATIONS.map((v) => (
          <Fragment key={v}>
            <span className={`dgrid-row v-${v}`}>
              <i className="dgrid-bar" aria-hidden="true" />
              {t(UI.verificationLabels[v], lang)}
            </span>
            {BASES.map((b) => {
              const n = counts.get(`${b}/${v}`) ?? 0;
              const off = b === "unknown" && v !== "open";
              return (
                <span key={b} className={`dgrid-cell v-${v}${off ? " off" : ""}`}>
                  {n > 0 && (
                    <i
                      className={`dgrid-dot m-${b}`}
                      style={{ transform: `scale(${0.5 + 0.5 * (n / max)})` }}
                      aria-hidden="true"
                    />
                  )}
                  {n > 0 && <b>{n}</b>}
                </span>
              );
            })}
          </Fragment>
        ))}
      </div>
      <p className="dgrid-note">
        {total} {t(UI.gridTagged, lang)}
      </p>
    </div>
  );
}

/**
 * The open points, arranged by the theme they came from.
 *
 * Thirty-nine one-line entries is a list nobody reads in a room; ten blocks with their
 * question IDs is a shape. The grouping is not editorial: the blocks are the intake's own
 * theme structure from `intake/themes.json` (INV-5), the same headings the form is printed
 * under. Nothing is summarised and nothing is dropped — every ID stays visible, and the full
 * question and answer for each of them is on the last slide.
 */
function ThemeMap({
  themes,
  open,
  lang,
}: {
  themes: Theme[];
  open: Set<string>;
  lang: Lang;
}) {
  const blocks = themes
    .map((th) => ({
      id: th.id,
      title: pick(th.title, lang),
      ids: th.questions.map((q) => q.id).filter((id) => open.has(id)),
    }))
    .filter((b) => b.ids.length > 0);

  return (
    <div className="tmap">
      {blocks.map((b) => (
        <div className="tmap-block" key={b.id}>
          <span className="tmap-head">
            <span className="tmap-num">{b.id}</span>
            {b.title}
            <b className="tmap-count">{b.ids.length}</b>
          </span>
          <span className="tmap-ids">
            {b.ids.map((id) => (
              <code key={id}>{id}</code>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
