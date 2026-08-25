import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Deck } from "./Deck";
import { exportMarkdown } from "./export";
import { Button, Chip, Tabs, TextArea, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import { EvidenceGrid, GridSummary } from "./EvidenceGrid";
import { HELP, blockHelp, questionHelp } from "./help";
import { HelpPanel } from "./HelpPanel";
import { t, UI } from "./i18n";
import {
  COLUMN_HINTS,
  DECISION_HEAD_FIELDS,
  hydrate,
  pick,
  THEMES,
  type Answer,
  type Basis,
  type DecisionHead,
  type Direction,
  type Lang,
  type Mode,
  type Question,
  type Verification,
} from "./themes";

// ── Module-level constants ──────────────────────────────────────────────────

/** What this build is. Rendered in the bar and repeated in the footer. */
const VERSION = `v${__APP_VERSION__}${__APP_COMMIT__ ? ` · ${__APP_COMMIT__}` : ""}`;

/**
 * The worked example, as data.
 *
 * It sits in `demo/case.json` next to the prose that explains it, and is imported the same way
 * the question set is: inlined at build time, so loading it makes no network call. One source —
 * the file the repository publishes is the file the button loads.
 */
import demoCase from "../../demo/case.json";

type DemoCase = {
  mode: Mode;
  head: DecisionHead;
  rows: string[][];
  answers: Record<string, Partial<Answer>>;
  /** Optional: a case written before directions existed simply has none. */
  directions?: Direction[];
};

type View = "intake" | "register" | "deck";

const BASES: Basis[] = ["fact", "statement", "assumption", "unknown"];
const VERIFICATIONS: Verification[] = ["none", "open", "blocked"];

/**
 * The two dimensions never collapse (BIBLE INV-2): basis says what kind of knowledge this is;
 * verification says what work is still outstanding. They are set independently.
 *
 * Two mechanics are enforced here rather than merely asked for:
 *   - a "fact" without a source reference is not a fact (INV-3);
 *   - "unknown" drops the free text and forces verification to open (INV-4).
 */
function normalise(a: Answer): Answer {
  if (a.basis === "unknown")
    return {
      ...a,
      text: "",
      source: "",
      artifact: "",
      speaker: "",
      sourceDate: "",
      verification: "open",
    };
  return a;
}

const isOpen = (a: Answer) => a.verification === "open" || a.verification === "blocked";

/** Anything at all that says where the answer came from. */
const hasSource = (a: Answer) =>
  [a.source, a.artifact, a.speaker, a.sourceDate].some((v) => v.trim() !== "");

/**
 * INV-3, unchanged in substance: a fact with nothing behind it is not a fact.
 *
 * Deliberately satisfied by any of the four fields, including the old free line. Tightening
 * it to the structured ones would have turned every record written before them into a wall
 * of defects — which is exactly what the published worked example looked like the day its
 * sources went missing, and the reason that is a rule here rather than a preference.
 */
const missingSource = (a: Answer) => a.basis === "fact" && !hasSource(a);

/**
 * Traceable in the sense the agent specification means: a date, and something that names
 * where it came from. A softer rule than INV-3 and a separate one — a fact can have a source
 * and still be untraceable, because "the runbook" without a date cannot be checked against
 * the system a year later.
 */
const traceable = (a: Answer) =>
  a.sourceDate.trim() !== "" && (a.artifact.trim() !== "" || a.speaker.trim() !== "");

const untraceable = (a: Answer) =>
  (a.basis === "fact" || a.basis === "statement") && a.text.trim() !== "" && !traceable(a);

/** An open point that nobody owes by any date is a note. This is what counts them. */
const unsteerable = (a: Answer) =>
  isOpen(a) && (a.owner.trim() === "" || a.due.trim() === "");

/**
 * A field that grows with its answer.
 *
 * The answer box was a fixed 72px with its own scrollbar, and it cut sentences in half —
 * while 471px of the window below it sat empty. An intake note is one to five sentences and
 * nobody knows which in advance, so the field is the wrong place for a fixed height: it
 * takes the room the text needs and gives the rest back.
 */
function useAutoGrow(value: string) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    // scrollHeight excludes the border under border-box, hence the two pixels.
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);
  return ref;
}

/** Interface language — remembered per browser, not a record. */
function initialLang(): Lang {
  try {
    const stored = localStorage.getItem("pdk.lang");
    if (stored === "en" || stored === "de") return stored;
  } catch {
    /* private windows */
  }
  return navigator.language?.toLowerCase().startsWith("de") ? "de" : "en";
}

/**
 * The intake itself — answers, decision head, data inventory, mode.
 *
 * Read at state-initialisation time, not in a mount effect. The effect version had a
 * race that cost the whole intake: the persist effects fire on the first render too,
 * and they write the *initial empty* state over what the load effect just read. In
 * production the very next render wrote the restored data back, so it survived by
 * timing; under StrictMode's deliberate double-mount it did not — the second mount
 * read the `{}` the first mount had just persisted, and a reload emptied the form.
 * A lazy initialiser has no such window: the first value the component ever holds is
 * the stored one, and every persist after that writes something real.
 */
function stored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    /* private windows, or a value from an older shape */
  }
  return fallback;
}

function initialMode(): Mode {
  try {
    const m = localStorage.getItem("pdk.mode");
    if (m === "triage" || m === "discovery") return m;
  } catch {
    /* private windows */
  }
  return "triage";
}

type Theme = "paper" | "ink";

/**
 * Whether each question also shows its wording in the other language.
 *
 * It used to be always on, and that doubled every question on screen: the German text and the
 * English one below it, fifty-five times, for a reader who had already chosen a language. The
 * asymmetry the repository insists on (English binds, German translates) is stated once in the
 * footer notice and marked on the export; it does not need repeating under every line. Off by
 * default, one switch away for the moment a client asks what the binding wording is.
 */
function initialGloss(): boolean {
  try {
    return localStorage.getItem("pdk.gloss") === "1";
  } catch {
    return false;
  }
}

function initialTheme(): Theme {
  try {
    const stored = localStorage.getItem("pdk.theme");
    if (stored === "paper" || stored === "ink") return stored;
  } catch {
    /* private windows */
  }
  return "paper";
}

// ── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [gloss, setGloss] = useState<boolean>(initialGloss);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [view, setView] = useState<View>("intake");
  const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
    // Hydrated once, on the way in. A record written before the attribution and follow-up
    // fields existed parses without complaint and arrives with eight fields `undefined`,
    // which React turns into uncontrolled inputs and the export writes out as the word
    // "undefined". The compiler cannot see this — the value comes back from JSON.parse as
    // whatever the file says it is — so it is fixed at the one place the outside gets in.
    const raw = stored<Record<string, Partial<Answer>>>("pdk.answers", {});
    return Object.fromEntries(Object.entries(raw).map(([id, a]) => [id, hydrate(a)]));
  });
  const [head, setHead] = useState<DecisionHead>(() => stored<DecisionHead>("pdk.head", {}));
  const [rows, setRows] = useState<string[][]>(() => stored<string[][]>("pdk.rows", []));
  const [directions, setDirections] = useState<Direction[]>(() =>
    stored<Direction[]>("pdk.directions", []).map((d) => ({
      text: d?.text ?? "",
      dependsOn: Array.isArray(d?.dependsOn) ? d.dependsOn : [],
    })),
  );
  const [exported, setExported] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [info, setInfo] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [qHelp, setQHelp] = useState<string | null>(null);

  const [activeBlock, setActiveBlock] = useState(0);
  const [activeQId, setActiveQId] = useState<string | null>(null);

  /** Fill the instrument with the worked example. Replaces whatever is there. */
  const loadDemo = useCallback(() => {
    const c = demoCase as unknown as DemoCase;
    setAnswers(Object.fromEntries(Object.entries(c.answers).map(([id, a]) => [id, hydrate(a)])));
    setHead(c.head);
    setRows(c.rows);
    setDirections(c.directions ?? []);
    // The mode has to be persisted, not just set: a bare setMode left `pdk.mode` at
    // triage, and a reload dropped forty-five of the example's answers from view.
    setMode(c.mode);
    try {
      localStorage.setItem("pdk.mode", c.mode);
    } catch {
      /* private windows */
    }
    setActiveBlock(0);
    setActiveQId(null);
    setExported(null);
  }, []);

  /** Back to an empty instrument. Confirmed, because there is no undo. */
  const clearAll = useCallback(() => {
    if (!window.confirm(t(UI.clearAllConfirm, lang))) return;
    setAnswers({});
    setHead({});
    setRows([]);
    setDirections([]);
    setActiveBlock(0);
    setActiveQId(null);
    setExported(null);
  }, [lang]);

  // Refs for keyboard handler — avoids stale closures with empty-dep effect
  const activeQIdRef = useRef<string | null>(null);
  const answersRef = useRef<Record<string, Answer>>({});
  activeQIdRef.current = activeQId;
  answersRef.current = answers;

  // ── Effects ───────────────────────────────────────────────────────────────

  // Apply theme to document root and persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("pdk.theme", theme);
    } catch {
      /* private windows */
    }
  }, [theme]);

  // Sync lang to html element and persist
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === "de"
        ? "Platform Decision Kit — Triage & Discovery"
        : "Platform Decision Kit — triage & discovery";
    try {
      localStorage.setItem("pdk.lang", lang);
    } catch {
      /* private windows */
    }
  }, [lang]);

  // Persist answers, head, rows whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("pdk.gloss", gloss ? "1" : "0");
    } catch {
      /* private windows */
    }
  }, [gloss]);

  useEffect(() => {
    try {
      localStorage.setItem("pdk.answers", JSON.stringify(answers));
    } catch {
      /* private windows */
    }
  }, [answers]);

  useEffect(() => {
    try {
      localStorage.setItem("pdk.head", JSON.stringify(head));
    } catch {
      /* private windows */
    }
  }, [head]);

  useEffect(() => {
    try {
      localStorage.setItem("pdk.rows", JSON.stringify(rows));
    } catch {
      /* private windows */
    }
  }, [rows]);

  useEffect(() => {
    try {
      localStorage.setItem("pdk.directions", JSON.stringify(directions));
    } catch {
      /* private windows */
    }
  }, [directions]);

  // ── Core state helpers ────────────────────────────────────────────────────

  const get = (id: string): Answer => hydrate(answers[id]);

  const set = useCallback((id: string, patch: Partial<Answer>) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: normalise({ ...hydrate(prev[id]), ...patch }),
    }));
    setExported(null);
    setCopied(false);
  }, []);

  // ── Keyboard shortcut handler ─────────────────────────────────────────────
  // Bare keys 1-4 set basis, Q/W/E set verification.
  // Bail out if the event target is a text field (architect is typing).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const qid = activeQIdRef.current;
      if (!qid) return;

      const bIdx = ["1", "2", "3", "4"].indexOf(e.key);
      const vIdx = ["q", "w", "e"].indexOf(e.key.toLowerCase());

      if (bIdx !== -1) {
        e.preventDefault();
        const basis = BASES[bIdx];
        const cur = answersRef.current[qid];
        set(qid, { basis: cur?.basis === basis ? null : basis });
      } else if (vIdx !== -1) {
        const cur = answersRef.current[qid];
        if (cur?.basis === "unknown" && VERIFICATIONS[vIdx] !== "open") return;
        e.preventDefault();
        set(qid, { verification: VERIFICATIONS[vIdx] });
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [set]);

  // ── Derived data ──────────────────────────────────────────────────────────

  const visible = useMemo(
    () =>
      THEMES.map((th) => ({
        ...th,
        questions: th.questions.filter((q) => q.modes.includes(mode)),
      })).filter((th) => th.questions.length > 0),
    [mode],
  );

  const allQuestions = useMemo(() => visible.flatMap((th) => th.questions), [visible]);
  const answered = allQuestions.filter((q) => get(q.id).basis !== null).length;
  const register = allQuestions.filter((q) => isOpen(get(q.id)));
  const defects = allQuestions.filter((q) => missingSource(get(q.id)));
  const unattributed = allQuestions.filter((q) => untraceable(get(q.id)));

  // Clamp block index to valid range after mode change
  const safeBlock = Math.min(activeBlock, Math.max(0, visible.length - 1));
  const currentTheme = visible[safeBlock];

  // Per-block open-item counts for the nav rail dots
  const blockOpenCounts = useMemo(
    () =>
      visible.map((th) =>
        th.questions.filter((q) => {
          const a = answers[q.id];
          return a?.verification === "open" || a?.verification === "blocked";
        }).length,
      ),
    [visible, answers],
  );

  // Evidence grid summary: count answers by basis/verification pair
  const gridCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of allQuestions) {
      const a = answers[q.id];
      if (a?.basis) {
        const key = `${a.basis}/${a.verification}`;
        counts[key] = (counts[key] ?? 0) + 1;
      }
    }
    return counts;
  }, [allQuestions, answers]);

  const other: Lang = lang === "en" ? "de" : "en";
  const otherLabel = lang === "en" ? t(UI.translation, lang) : t(UI.canonical, lang);

  // ── Mode change (resets navigation and clears active question) ────────────

  const changeMode = (m: Mode) => {
    setMode(m);
    setActiveBlock(0);
    setActiveQId(null);
    try {
      localStorage.setItem("pdk.mode", m);
    } catch {
      /* private windows */
    }
  };

  // ── Markdown export ───────────────────────────────────────────────────────

  const runExport = () => {
    setExported(
      exportMarkdown({ lang, mode, themes: visible, answers, head, directions }),
    );
    setCopied(false);
  };

  // ── JSX ───────────────────────────────────────────────────────────────────

  /**
   * The help follows the card.
   *
   * Stepping to another block used to leave the panel showing the block you had left, which is
   * worse than showing nothing: it reads as an explanation of what is in front of you. A block
   * help retargets, and a question help becomes the new card's help, because the panel describes
   * what you are looking at and you are no longer looking at that question.
   */
  const lastBlock = useRef(safeBlock);
  useEffect(() => {
    if (lastBlock.current === safeBlock) return;
    lastBlock.current = safeBlock;
    setQHelp((prev) => (prev === null ? null : `block:${visible[safeBlock]?.id ?? ""}`));
  }, [safeBlock, visible]);

  /** The docked panel shows either one question or the whole card it sits on. */
  const dockedHelp = (() => {
    if (!qHelp) return undefined;
    if (qHelp.startsWith("block:")) {
      const id = Number(qHelp.slice(6));
      const th = visible.find((x) => x.id === id);
      return th ? blockHelp(th) : undefined;
    }
    const hit = visible.flatMap((th) => th.questions.map((q) => ({ th, q }))).find(({ q }) => q.id === qHelp);
    return hit ? questionHelp(hit.th, hit.q) : undefined;
  })();

  return (
    <div className={`app${dockedHelp && view === "intake" ? " app-docked" : ""}`}>
      {/* ── One bar ──────────────────────────────────────────────────────
          Three stacked bands (brand · mode+view · block rail) cost roughly 200px
          before a single question was visible. Brand, mode, view and the meters
          share one row now; the block rail moved into the block's own header,
          where it belongs — it navigates that card, not the app. */}
      <header className="appbar">
        <span className="brand-short">PDK</span>
        <span className="brand-version" title={t(UI.versionTitle, lang)}>
          {VERSION}
        </span>

        <ToggleButtonGroup
          size="sm"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[mode]}
          onSelectionChange={(keys) => {
            const next = [...keys][0];
            if (next === "triage" || next === "discovery") changeMode(next);
          }}
          aria-label="Mode"
        >
          <ToggleButton id="triage">{t(UI.triageMode, lang)}</ToggleButton>
          <ToggleButton id="discovery">{t(UI.discoveryMode, lang)}</ToggleButton>
        </ToggleButtonGroup>

        <Tabs
          className="view-tabs"
          selectedKey={view}
          onSelectionChange={(k) => setView(k as View)}
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label={t(UI.blockNav, lang)}>
              <Tabs.Tab id="intake">
                {t(UI.viewIntake, lang)}
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="register">
                {t(UI.viewRegister, lang)}
                {register.length > 0 && (
                  <Chip size="sm" color="warning" className="tab-count">
                    {register.length}
                  </Chip>
                )}
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="deck">
                {t(UI.viewDeck, lang)}
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>

        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          className={`help-btn${helpOpen ? " on" : ""}`}
          aria-label={t(UI.helpFor, lang)}
          aria-pressed={helpOpen}
          onPress={() => setHelpOpen((v) => !v)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.2 9.2a2.8 2.8 0 1 1 3.8 2.6c-.7.3-1 .9-1 1.6v.4" />
            <line x1="12" y1="17.6" x2="12.01" y2="17.6" />
          </svg>
        </Button>

        <div className="appbar-meters">
          <GridSummary lang={lang} counts={gridCounts} />
          <span className="appbar-stats">
            <b>{answered}</b>/{allQuestions.length} {t(UI.answered, lang)}
            {defects.length > 0 && (
              <span className="defect">
                · <b>{defects.length}</b> {t(UI.factWithoutSource, lang)}
              </span>
            )}
            {/* A softer count than the defect one, and separate from it on purpose: a fact
                can carry a source and still not be traceable, because a document without a
                date cannot be checked against the system a year from now. */}
            {unattributed.length > 0 && (
              <span className="weak">
                · <b>{unattributed.length}</b> {t(UI.untraceableCount, lang)}
              </span>
            )}
          </span>
        </div>

        {/* Export: eine Werkzeugaktion, die in die Werkzeugleiste gehört. Als breiter
            Primärknopf unter der Karte nahm sie Platz weg und behauptete eine Wichtigkeit,
            die sie nicht hat. */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          aria-label={t(UI.exportButton, lang)}
          onPress={runExport}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          aria-label={t(UI.glossToggle, lang)}
          aria-pressed={gloss}
          className={gloss ? "on" : undefined}
          onPress={() => setGloss((v) => !v)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 5h7M7.5 5v3c0 3-1.5 5.5-3.5 7" />
            <path d="M5 12c1.5 2 3.5 3.5 5.5 4" />
            <path d="M13 20l4-11 4 11" />
            <path d="M14.5 16h5" />
          </svg>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          aria-label={t(UI.themeToggle, lang)}
          onPress={() => setTheme((prev) => (prev === "paper" ? "ink" : "paper"))}
        >
          {theme === "paper" ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </Button>

        <ToggleButtonGroup
          size="sm"
          selectionMode="single"
          disallowEmptySelection
          selectedKeys={[lang]}
          onSelectionChange={(keys) => {
            const next = [...keys][0];
            if (next === "en" || next === "de") setLang(next);
          }}
          aria-label="Language"
        >
          <ToggleButton id="en">EN</ToggleButton>
          <ToggleButton id="de">DE</ToggleButton>
        </ToggleButtonGroup>
      </header>

      {/* ── Deck view ──────────────────────────────────────────────────── */}
      {/* Wide: a slide is landscape, and the intake's reading width is the wrong
          measure for it. */}
      {view === "deck" && (
        <div className="main main-wide">
          <Deck
            lang={lang}
            mode={mode}
            themes={visible}
            answers={answers}
            head={head}
            rows={rows}
            directions={directions}
          />
        </div>
      )}

      {/* ── Register view ──────────────────────────────────────────────── */}
      {view === "register" && (
        <div className="main">
          <RegisterView
            lang={lang}
            register={register}
            answers={answers}
            directions={directions}
            onDirections={setDirections}
          />
          <div className="actions" style={{ marginTop: "2rem" }}>
            <button onClick={runExport}>{t(UI.exportButton, lang)}</button>
            {exported && (
              <button
                className="ghost"
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(exported)
                    .then(() => setCopied(true), () => setCopied(false));
                }}
              >
                {copied ? t(UI.copied, lang) : t(UI.copyButton, lang)}
              </button>
            )}
          </div>
          {exported && <pre className="export">{exported}</pre>}
        </div>
      )}

      {/* ── Intake view ────────────────────────────────────────────────── */}
      {view === "intake" && currentTheme && (
        <div className="main main-intake">
          {/* The decision head stands above the blocks, in both modes.
              It used to sit inside block 2, which in triage is four cards deep: you could
              work the whole twenty minutes, see the situation clearly, and never learn who
              has to decide or by when. It is the frame the other answers are measured
              against, so it goes first and stays visible — folded to one line once the
              question, the owner and the deadline are all there. */}
          <DecisionHeadBlock lang={lang} head={head} onChange={setHead} />

          {/* Active block */}
          <section className="block-view">
            <div className="block-header">
              <div className="block-meta">
                {/* The card shows more than its questions: the rail, the lead, and on two of
                    the ten a structure of its own. This explains whatever is actually on it. */}
                <button
                  type="button"
                  className={`block-help${qHelp === `block:${currentTheme.id}` ? " on" : ""}`}
                  aria-label={t(UI.helpForBlock, lang)}
                  onClick={() =>
                    setQHelp(qHelp === `block:${currentTheme.id}` ? null : `block:${currentTheme.id}`)
                  }
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.2 9.2a2.8 2.8 0 1 1 3.8 2.6c-.7.3-1 .9-1 1.6v.4" />
                    <line x1="12" y1="17.6" x2="12.01" y2="17.6" />
                  </svg>
                </button>
                <span className="block-num">
                  {t(UI.block, lang)} {currentTheme.id} / {visible.length}
                </span>
                <h2 className="block-title">{pick(currentTheme.title, lang)}</h2>
                {gloss && (
                  <span className="block-other">
                    {pick(currentTheme.title, other)}, {otherLabel}
                  </span>
                )}
              </div>

              {/* The rail navigates this card, so it lives in this card's header. */}
              <div className="block-nav">
                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  isDisabled={safeBlock === 0}
                  aria-label={t(UI.prevBlock, lang)}
                  onPress={() => {
                    setActiveBlock(Math.max(0, safeBlock - 1));
                    setActiveQId(null);
                  }}
                >
                  &#8592;
                </Button>

                <nav className="block-rail" aria-label={t(UI.blockNav, lang)}>
                  {visible.map((th, i) => {
                    const openN = blockOpenCounts[i] ?? 0;
                    return (
                      <button
                        key={th.id}
                        type="button"
                        className={`rail-btn${i === safeBlock ? " on" : ""}`}
                        onClick={() => {
                          setActiveBlock(i);
                          setActiveQId(null);
                        }}
                        title={pick(th.title, lang)}
                        aria-label={`${t(UI.block, lang)} ${th.id}: ${pick(th.title, lang)}`}
                        aria-current={i === safeBlock ? "step" : undefined}
                      >
                        {th.id}
                        {openN > 0 && <span className="rail-dot" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </nav>

                <Button
                  variant="ghost"
                  size="sm"
                  isIconOnly
                  isDisabled={safeBlock === visible.length - 1}
                  aria-label={t(UI.nextBlock, lang)}
                  onPress={() => {
                    setActiveBlock(Math.min(visible.length - 1, safeBlock + 1));
                    setActiveQId(null);
                  }}
                >
                  &#8594;
                </Button>
              </div>
            </div>

            <p className="why">{pick(currentTheme.why, lang)}</p>

            {/* Questions for this block */}
            {currentTheme.questions.map((q) => (
              <QuestionBlock
                key={q.id}
                helpOn={qHelp === q.id}
                onHelp={setQHelp}
                q={q}
                lang={lang}
                other={other}
                otherLabel={otherLabel}
                gloss={gloss}
                answer={get(q.id)}
                isActive={activeQId === q.id}
                onActivate={() => setActiveQId(q.id)}
                onChange={(p) => set(q.id, p)}
              />
            ))}

            {/* Data inventory (theme 6, discovery mode only) */}
            {mode === "discovery" && currentTheme.dataInventory && (
              <DataInventoryBlock
                lang={lang}
                columns={currentTheme.dataInventory.columns}
                rows={rows}
                onChange={setRows}
              />
            )}

            {/* Red flags */}
            <details className="flags">
              <summary>{t(UI.redFlags, lang)}</summary>
              <ul>
                {currentTheme.redFlags.map((f) => (
                  <li key={f.en}>{pick(f, lang)}</li>
                ))}
              </ul>
            </details>

            {/* Discovery-only: stop conditions and hypotheses */}
            {mode === "discovery" && (
              <>
                <details className="flags stop">
                  <summary>{t(UI.stopConditions, lang)}</summary>
                  <ul>
                    {currentTheme.stopConditions.map((c) => (
                      <li key={c.en}>{pick(c, lang)}</li>
                    ))}
                  </ul>
                </details>

                {currentTheme.hypotheses.length > 0 && (
                  <details className="flags hypo">
                    <summary>
                      {t(UI.hypotheses, lang)}{" "}
                      <span className="marker">
                        — {t(UI.hypothesesEnglish, lang)}
                      </span>
                    </summary>
                    <p className="why">{t(UI.hypothesesNote, lang)}</p>
                    <ul>
                      {currentTheme.hypotheses.map((h) => (
                        <li key={h.name}>
                          <b>{h.name}</b>
                          <br />
                          <span className="marker">
                            {t(UI.scopeOfValidity, lang)}:
                          </span>{" "}
                          {h.scopeOfValidity}
                          <br />
                          <span className="marker">
                            {t(UI.falsifiableBy, lang)}:
                          </span>{" "}
                          {h.falsifiableBy}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </>
            )}
          </section>

          {/* Keyboard hint — shows which question is active for shortcuts */}
          {activeQId && (
            <p className="kb-hint">
              ⌨ {t(UI.keyboardHint, lang)} — {t(UI.activeFor, lang)}:{" "}
              <code>{activeQId}</code>
            </p>
          )}

          {/* The example belongs where it is useful: on an empty instrument, and nowhere
              after that. At the first answer the hint is gone; the entry stays reachable
              in the footer notice. */}
          {answered === 0 && (
            <div className="demo-hint">
              <p>{t(UI.loadDemoHint, lang)}</p>
              <Button variant="outline" size="sm" onPress={loadDemo}>
                {t(UI.loadDemo, lang)}
              </Button>
            </div>
          )}

          {/* Der Export sitzt jetzt als Icon in der Leiste; hier steht nur noch sein
              Ergebnis, und das auch nur, wenn es eines gibt. */}
          {exported && (
            <>
              <div className="actions">
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => {
                    navigator.clipboard
                      ?.writeText(exported)
                      .then(() => setCopied(true), () => setCopied(false));
                  }}
                >
                  {copied ? t(UI.copied, lang) : t(UI.copyButton, lang)}
                </Button>
              </div>
              <pre className="export">{exported}</pre>
            </>
          )}
        </div>
      )}

      {/* The trust notice matters and it does not need three lines every second of the day.
          Folded into an icon it stays one keystroke away and costs one line. The build stamp
          stays visible, because a screenshot should say which build produced it. */}
      <footer className="app-footer">
        <button
          type="button"
          className="footer-info"
          aria-expanded={info}
          aria-label={t(UI.infoToggle, lang)}
          title={t(UI.infoToggle, lang)}
          onClick={() => setInfo((v) => !v)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>

        <span className="footer-version">
          {t(UI.versionLabel, lang)} {VERSION}
        </span>

        {info && (
          <div className="footer-note">
            <p>
              <strong>{t(UI.trustLead, lang)}</strong> {t(UI.trustRest, lang)}
            </p>
            <p className="muted">{t(UI.footer, lang)}</p>
            <div className="footer-actions">
              <Button variant="outline" size="sm" onPress={loadDemo}>
                {t(UI.loadDemo, lang)}
              </Button>
              <Button variant="ghost" size="sm" onPress={clearAll}>
                {t(UI.clearAll, lang)}
              </Button>
            </div>
          </div>
        )}
      </footer>

      {helpOpen && (
        <HelpPanel help={HELP[view]} lang={lang} onClose={() => setHelpOpen(false)} />
      )}

      {/* Docked, not modal: the answer field stays live while the help is open, because
          reading why a question is asked and writing the answer to it is one activity. */}
      {dockedHelp && view === "intake" && (
        <HelpPanel docked help={dockedHelp} lang={lang} onClose={() => setQHelp(null)} />
      )}
    </div>
  );
}


// ── QuestionBlock ─────────────────────────────────────────────────────────────

function QuestionBlock({
  q,
  lang,
  helpOn,
  onHelp,
  other,
  otherLabel,
  gloss,
  answer,
  isActive,
  onActivate,
  onChange,
}: {
  q: Question;
  lang: Lang;
  helpOn: boolean;
  onHelp: (id: string | null) => void;
  other: Lang;
  otherLabel: string;
  gloss: boolean;
  answer: Answer;
  isActive: boolean;
  onActivate: () => void;
  onChange: (patch: Partial<Answer>) => void;
}) {
  const unknown = answer.basis === "unknown";
  const grow = useAutoGrow(answer.text);

  const growSource = useAutoGrow(answer.source);

  return (
    /* Two columns from `lg` up: the sentence on the left, the classification on the right.
       The board used to sit *under* the answer, so one question cost a screen and a half and
       fifty-five of them cost a day of scrolling. Side by side, a question is one glance —
       and the wide-desktop dead space the register view was criticised for is spent here. */
    <div
      className={`q${isActive ? " q-active" : ""}`}
      onFocus={onActivate}
      tabIndex={-1}
    >
      <div className="q-main">
        <div className="q-head">
          <span className="q-idline">
            <span className="qid">{q.id}</span>
            {/* The question the architect is looking at is the one they have a question
                about, so the answer sits on it rather than three clicks away. */}
            <button
              type="button"
              className={`q-help${helpOn ? " on" : ""}`}
              aria-label={t(UI.helpForQuestion, lang)}
              aria-pressed={helpOn}
              onClick={() => onHelp(helpOn ? null : q.id)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.2 9.2a2.8 2.8 0 1 1 3.8 2.6c-.7.3-1 .9-1 1.6v.4" />
                <line x1="12" y1="17.6" x2="12.01" y2="17.6" />
              </svg>
            </button>
          </span>
          <p className="qtext">{pick(q.text, lang)}</p>
          {gloss && (
            <p className="qde">
              {pick(q.text, other)}{" "}
              <Chip size="sm" className="marker">
                {otherLabel}
              </Chip>
            </p>
          )}
        </div>

        <TextArea
          ref={grow}
          className="q-answer"
          value={answer.text}
          disabled={unknown}
          aria-label={pick(q.text, lang)}
          placeholder={
            unknown
              ? t(UI.unknownPlaceholder, lang)
              : q.hint
                ? `${t(UI.forExample, lang)} ${pick(q.hint, lang)}`
                : t(UI.answerPlaceholder, lang)
          }
          onChange={(e) => onChange({ text: e.target.value })}
        />

        {/* Where it came from (INV-3: a fact needs a source).
            One free line used to carry the document, the person and the date together, and
            it could not tell them apart — so a reader could not either, and "speaker and
            date", which the agent specification asks for beside every statement, was not
            reliably there. Three named fields and the locator, which still grows: a source
            reference is often a quotation, and a one-line box that scrolls sideways hides
            the half that matters. */}
        {!unknown && (
          <fieldset className="attrib">
            <legend>{t(UI.attribution, lang)}</legend>
            <div className="attrib-row">
              <label className="attrib-field">
                <span>{t(UI.artifact, lang)}</span>
                <input
                  type="text"
                  value={answer.artifact}
                  placeholder={t(UI.artifactPlaceholder, lang)}
                  onChange={(e) => onChange({ artifact: e.target.value })}
                />
              </label>
              <label className="attrib-field">
                <span>{t(UI.speaker, lang)}</span>
                <input
                  type="text"
                  value={answer.speaker}
                  placeholder={t(UI.speakerPlaceholder, lang)}
                  onChange={(e) => onChange({ speaker: e.target.value })}
                />
              </label>
              <label className="attrib-field narrow">
                <span>{t(UI.sourceDate, lang)}</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={answer.sourceDate}
                  placeholder={t(UI.sourceDatePlaceholder, lang)}
                  onChange={(e) => onChange({ sourceDate: e.target.value })}
                />
              </label>
            </div>
            <div className="source-row">
              <span className="source-label">{t(UI.source, lang)}</span>
              <TextArea
                ref={growSource}
                className="source-field"
                rows={1}
                value={answer.source}
                aria-label={t(UI.source, lang)}
                placeholder={t(UI.sourcePlaceholder, lang)}
                onChange={(e) => onChange({ source: e.target.value })}
              />
            </div>
          </fieldset>
        )}

        {missingSource(answer) && (
          <p className="hint flag">{t(UI.missingSource, lang)}</p>
        )}
        {!missingSource(answer) && untraceable(answer) && (
          <p className="hint weak">{t(UI.untraceable, lang)}</p>
        )}
        {unknown && (
          <p className="hint">
            {t(UI.unknownHint, lang)}
            {q.noDefaults && ` ${t(UI.noDefaultsHint, lang)}`}
          </p>
        )}

        {/* What would close it. Shown only while the point is actually open — including for
            an unknown, which is forced open and is exactly the kind of item that otherwise
            leaves the room as a shrug. Four fields, because "open" on its own has never
            caused anybody to go and find out. */}
        {isOpen(answer) && (
          <fieldset className={`followup${unsteerable(answer) ? " thin" : ""}`}>
            <legend>{t(UI.followUp, lang)}</legend>
            <div className="attrib-row">
              <label className="attrib-field">
                <span>{t(UI.owner, lang)}</span>
                <input
                  type="text"
                  value={answer.owner}
                  placeholder={t(UI.ownerPlaceholder, lang)}
                  onChange={(e) => onChange({ owner: e.target.value })}
                />
              </label>
              <label className="attrib-field narrow">
                <span>{t(UI.due, lang)}</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={answer.due}
                  placeholder={t(UI.duePlaceholder, lang)}
                  onChange={(e) => onChange({ due: e.target.value })}
                />
              </label>
            </div>
            <div className="attrib-row">
              <label className="attrib-field">
                <span>{t(UI.evidenceNeeded, lang)}</span>
                <input
                  type="text"
                  value={answer.evidence}
                  placeholder={t(UI.evidenceNeededPlaceholder, lang)}
                  onChange={(e) => onChange({ evidence: e.target.value })}
                />
              </label>
              <label className="attrib-field">
                <span>{t(UI.blocker, lang)}</span>
                <input
                  type="text"
                  value={answer.blocker}
                  placeholder={t(UI.blockerPlaceholder, lang)}
                  onChange={(e) => onChange({ blocker: e.target.value })}
                />
              </label>
            </div>
            {unsteerable(answer) && <p className="hint weak">{t(UI.unsteerable, lang)}</p>}
          </fieldset>
        )}
      </div>

      {/* The evidence grid — the central interaction. Two axes, never one list. */}
      <aside className="q-aside">
        <span className="q-aside-title">{t(UI.classify, lang)}</span>
        <EvidenceGrid
          lang={lang}
          value={{ basis: answer.basis, verification: answer.verification }}
          onChange={onChange}
        />
      </aside>
    </div>
  );
}

// ── RegisterView ──────────────────────────────────────────────────────────────

/**
 * The to-verify register as a first-class view.
 * Designed to be turned toward the client: each item is large and readable from 1m.
 */
function RegisterView({
  lang,
  register,
  answers,
  directions,
  onDirections,
}: {
  lang: Lang;
  register: Question[];
  answers: Record<string, Answer>;
  directions: Direction[];
  onDirections: (d: Direction[]) => void;
}) {
  const openIds = register.map((q) => q.id);
  const unowned = register.filter((q) => unsteerable(hydrate(answers[q.id]))).length;

  return (
    <section className="register-view">
      <div className="register-header">
        <h2>{t(UI.registerTitle, lang)}</h2>
        <p className="register-payoff">{t(UI.registerPayoff, lang)}</p>
        {/* The count that makes the register steerable rather than merely honest. */}
        {unowned > 0 && (
          <p className="register-unowned">
            <b>{unowned}</b> {t(UI.unsteerableCount, lang)}
          </p>
        )}
      </div>

      {register.length === 0 ? (
        <p className="register-empty">{t(UI.registerEmpty, lang)}</p>
      ) : (
        <ul className="register-list">
          {register.map((q) => {
            const a = hydrate(answers[q.id]);
            const parts: [string, string][] = [
              [t(UI.owner, lang), a.owner],
              [t(UI.evidenceNeeded, lang), a.evidence],
              [t(UI.due, lang), a.due],
              [t(UI.blocker, lang), a.blocker],
            ];
            const filled = parts.filter(([, v]) => v.trim() !== "");
            return (
              <li key={q.id} className={`register-item v-${a.verification}`}>
                <div className="register-item-head">
                  <code className="register-qid">{q.id}</code>
                  <span className={`register-tag v-${a.verification}`}>
                    {t(UI.verificationLabels[a.verification], lang)}
                  </span>
                  {a.basis && (
                    <span className="register-tag" style={{ background: "var(--accent-soft)", color: "var(--accent-strong)" }}>
                      {t(UI.basisLabels[a.basis], lang)}
                    </span>
                  )}
                </div>
                <p className="register-qtext">{pick(q.text, lang)}</p>
                {a.text && (
                  <p className="register-answer">{a.text}</p>
                )}

                {/* The nacharbeit, on the screen the architect turns towards the client.
                    This is the whole point of the four fields: read from a metre away, an
                    item either has a name and a date on it or it visibly does not. */}
                {filled.length > 0 && (
                  <dl className="register-follow">
                    {filled.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value.trim()}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {/* Said whenever the item is not steerable, not only when the whole group is
                    empty. An item that names the proof it needs but nobody to fetch it and no
                    date to fetch it by looked complete here, which is the failure this whole
                    block exists to make visible. */}
                {unsteerable(a) && (
                  <p className="register-follow-missing">{t(UI.unsteerable, lang)}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <DirectionsBlock
        lang={lang}
        openIds={openIds}
        directions={directions}
        onChange={onDirections}
      />
    </section>
  );
}

// ── DirectionsBlock ───────────────────────────────────────────────────────────

/**
 * "Nicht entschiedene Richtungen" — the fourth slide, captured where it belongs.
 *
 * It sits under the register rather than in a theme block because a direction is defined by
 * what it waits for, and what it waits for is on this screen. The instrument writes none of
 * these: the architect types the sentence that was said in the room, and ticks the open
 * points it hangs on. A direction with no open point behind it reads as a recommendation,
 * which INV-1 forbids, so the block says so out loud instead of quietly rendering it.
 */
function DirectionsBlock({
  lang,
  openIds,
  directions,
  onChange,
}: {
  lang: Lang;
  openIds: string[];
  directions: Direction[];
  onChange: (d: Direction[]) => void;
}) {
  const patch = (i: number, next: Partial<Direction>) =>
    onChange(directions.map((d, k) => (k === i ? { ...d, ...next } : d)));

  const toggle = (i: number, id: string) => {
    const cur = directions[i].dependsOn;
    patch(i, {
      dependsOn: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    });
  };

  return (
    <section className="directions">
      <h3>{t(UI.directionsTitle, lang)}</h3>
      <p className="why">{t(UI.directionsNote, lang)}</p>

      {directions.length === 0 && <p className="muted">{t(UI.directionsEmpty, lang)}</p>}

      {directions.map((d, i) => (
        // eslint-disable-next-line react/no-array-index-key -- directions have no stable identity
        <div className="direction" key={i}>
          <div className="direction-head">
            <textarea
              className="direction-text"
              rows={2}
              value={d.text}
              aria-label={t(UI.directionsTitle, lang)}
              placeholder={t(UI.directionPlaceholder, lang)}
              onChange={(e) => patch(i, { text: e.target.value })}
            />
            <button
              className="tag"
              aria-label={t(UI.directionRemove, lang)}
              onClick={() => onChange(directions.filter((_, k) => k !== i))}
            >
              {t(UI.removeRow, lang)}
            </button>
          </div>

          <span className="direction-label">{t(UI.directionDependsPick, lang)}</span>
          {openIds.length === 0 ? (
            <p className="hint weak">{t(UI.registerEmpty, lang)}</p>
          ) : (
            <div className="direction-deps">
              {openIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`dep${d.dependsOn.includes(id) ? " on" : ""}`}
                  aria-pressed={d.dependsOn.includes(id)}
                  onClick={() => toggle(i, id)}
                >
                  {id}
                </button>
              ))}
            </div>
          )}

          {d.text.trim() !== "" && d.dependsOn.length === 0 && (
            <p className="hint flag">{t(UI.directionUnconditioned, lang)}</p>
          )}
        </div>
      ))}

      <button className="tag" onClick={() => onChange([...directions, { text: "", dependsOn: [] }])}>
        {t(UI.directionAdd, lang)}
      </button>
    </section>
  );
}

// ── DecisionHeadBlock ─────────────────────────────────────────────────────────

/**
 * The Entscheidungskopf (theme 2).
 * The frame everything else is measured against. Sits above the block's questions.
 */
/** The three that decide whether the frame is set at all: the question, the owner, the date. */
const HEAD_ESSENTIALS = ["decision_question", "decision_owner", "deadline"] as const;

function DecisionHeadBlock({
  lang,
  head,
  onChange,
}: {
  lang: Lang;
  head: DecisionHead;
  onChange: (h: DecisionHead) => void;
}) {
  const complete = HEAD_ESSENTIALS.every((k) => (head[k] ?? "").trim() !== "");
  // It follows completeness: open while the frame is not set, folded once it is. A manual
  // toggle wins until completeness changes again, so opening it to edit a filled head is not
  // undone under the cursor. Nobody has to remember to open it — the one case where it
  // matters is the case where it opens itself.
  const [open, setOpen] = useState(!complete);
  useEffect(() => {
    setOpen(!complete);
  }, [complete]);

  const summary = (key: string) => (head[key] ?? "").trim() || t(UI.decisionHeadEmptyField, lang);

  return (
    <section className={`head-block head-lead${complete ? " done" : " open-frame"}`}>
      <button
        type="button"
        className="head-block-bar"
        aria-expanded={open}
        aria-label={t(open ? UI.decisionHeadFold : UI.decisionHeadOpen, lang)}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="head-block-title">{t(UI.decisionHead, lang)}</span>
        {!open && (
          <span className="head-line">
            {summary("decision_question")}
            <span className="head-line-sep">·</span>
            {summary("decision_owner")}
            <span className="head-line-sep">·</span>
            {summary("deadline")}
          </span>
        )}
        {!complete && <span className="head-warn">{t(UI.decisionHeadIncomplete, lang)}</span>}
        <span className="head-chev" aria-hidden="true">
          {open ? "\u2227" : "\u2228"}
        </span>
      </button>

      {open && (
        <div className="head-block-body">
          <p className="why" style={{ marginTop: 0, marginBottom: "0.75rem" }}>
            {t(UI.decisionHeadNote, lang)}
          </p>
          {DECISION_HEAD_FIELDS.map((f) => (
            <div className="row" key={f.key}>
              <span className="label wide">{pick(f.label, lang)}</span>
              <input
                type="text"
                style={{ flex: "1 1 18rem" }}
                placeholder={`${t(UI.forExample, lang)} ${pick(f.hint, lang)}`}
                value={head[f.key] ?? ""}
                onChange={(e) => onChange({ ...head, [f.key]: e.target.value })}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── DataInventoryBlock ────────────────────────────────────────────────────────

/**
 * The mini data inventory (theme 6).
 * A table without process apparatus: domain, classification, owner, retention, erasure path.
 * A blank cell is a to-verify item.
 */
function DataInventoryBlock({
  lang,
  columns,
  rows,
  onChange,
}: {
  lang: Lang;
  columns: string[];
  rows: string[][];
  onChange: (r: string[][]) => void;
}) {
  const label = (c: string): string => {
    const known = UI.columnLabels as Record<string, { en: string; de: string }>;
    return known[c] ? pick(known[c], lang) : c;
  };

  return (
    <div className="inventory">
      <h3>{t(UI.dataInventory, lang)}</h3>
      <p className="why">{t(UI.dataInventoryNote, lang)}</p>
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c}>{label(c)}</th>
            ))}
            <th aria-label="actions" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            // eslint-disable-next-line react/no-array-index-key -- rows have no stable identity
            <tr key={ri}>
              {columns.map((c, ci) => (
                <td key={c}>
                  <input
                    type="text"
                    placeholder={
                      COLUMN_HINTS[c] ? `${t(UI.forExample, lang)} ${pick(COLUMN_HINTS[c], lang)}` : undefined
                    }
                    value={row[ci] ?? ""}
                    onChange={(e) => {
                      const next = rows.map((r) => [...r]);
                      next[ri][ci] = e.target.value;
                      onChange(next);
                    }}
                  />
                </td>
              ))}
              <td>
                <button className="tag" onClick={() => onChange(rows.filter((_, i) => i !== ri))}>
                  {t(UI.removeRow, lang)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="tag" onClick={() => onChange([...rows, columns.map(() => "")])}>
        {t(UI.addRow, lang)}
      </button>
    </div>
  );
}
