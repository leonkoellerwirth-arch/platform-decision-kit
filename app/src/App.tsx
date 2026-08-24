import { useEffect, useMemo, useState } from "react";
import { Deck } from "./Deck";
import { t, UI } from "./i18n";
import {
  DECISION_HEAD_FIELDS,
  pick,
  THEMES,
  type Answer,
  type Basis,
  type DecisionHead,
  type Lang,
  type Mode,
  type Question,
  type Verification,
} from "./themes";

const EMPTY: Answer = { text: "", basis: null, source: "", verification: "none" };
const BASES: Basis[] = ["fact", "statement", "assumption", "unknown"];
const VERIFICATIONS: Verification[] = ["none", "open", "blocked"];

/**
 * The two dimensions never collapse (BIBLE INV-2): the basis says what kind of knowledge this
 * is, the verification says what work is outstanding on it. They are set independently, and a
 * statement with an open verification stays a statement.
 *
 * Two mechanics are enforced here rather than merely asked for:
 *   - a "fact" without a source reference is not a fact (INV-3);
 *   - "unknown" drops the free text and forces the verification to open (INV-4). On the blocks
 *     marked noDefaults it is the only honest answer when nobody in the room has a source.
 */
function normalise(a: Answer): Answer {
  if (a.basis === "unknown") return { ...a, text: "", source: "", verification: "open" };
  return a;
}

const isOpen = (a: Answer) => a.verification === "open" || a.verification === "blocked";
const missingSource = (a: Answer) => a.basis === "fact" && a.source.trim() === "";

/** The interface language, remembered per browser — a convenience, never a record. */
function initialLang(): Lang {
  try {
    const stored = localStorage.getItem("pdk.lang");
    if (stored === "en" || stored === "de") return stored;
  } catch {
    /* private windows and blocked site data throw on access — the default is fine. */
  }
  return navigator.language?.toLowerCase().startsWith("de") ? "de" : "en";
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [mode, setMode] = useState<Mode>("triage");
  const [view, setView] = useState<"intake" | "deck">("intake");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  // The Entscheidungskopf and the mini data inventory are the two annexes the briefing puts
  // beside the questions: theme 2 carries the frame, theme 6 the data layer. Both are intake
  // slots, not derived values — an empty cell stays empty.
  const [head, setHead] = useState<DecisionHead>({});
  const [rows, setRows] = useState<string[][]>([]);
  const [exported, setExported] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "de" ? "Platform Decision Kit — Triage & Discovery" : "Platform Decision Kit — triage & discovery";
    try {
      localStorage.setItem("pdk.lang", lang);
    } catch {
      /* nothing to do: the switch still works for this session. */
    }
  }, [lang]);

  const get = (id: string): Answer => answers[id] ?? EMPTY;
  const set = (id: string, patch: Partial<Answer>) => {
    setAnswers((prev) => ({ ...prev, [id]: normalise({ ...(prev[id] ?? EMPTY), ...patch }) }));
    setExported(null);
    setCopied(false);
  };

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

  /** The other language, shown beneath each question and labelled as what it is. */
  const other: Lang = lang === "en" ? "de" : "en";
  const otherLabel = lang === "en" ? t(UI.translation, lang) : t(UI.canonical, lang);

  const exportMarkdown = () => {
    const modeName = mode === "triage" ? "Triage" : "Discovery";
    const lines: string[] = [
      `# ${t(UI.exportTitle, lang)} — ${modeName}`,
      "",
      `> ${t(UI.exportNote, lang)}`,
      `> ${t(UI.exportLangNote, lang)}`,
      "",
    ];
    for (const th of visible) {
      lines.push(`## ${th.id}. ${pick(th.title, lang)}`, "");
      for (const q of th.questions) {
        const a = get(q.id);
        lines.push(
          `### ${q.id}  ${pick(q.text, lang)}`,
          `${t(UI.exportAnswer, lang)}: ${a.text.trim() || "—"}`,
          `${t(UI.exportBasis, lang)}: ${a.basis ? t(UI.basisLabels[a.basis], lang) : "—"}`,
          `${t(UI.exportSource, lang)}: ${a.source.trim() || "—"}`,
          `${t(UI.exportVerification, lang)}: ${t(UI.verificationLabels[a.verification], lang)}`,
          "",
        );
      }
    }
    lines.push(`## ${t(UI.registerTitle, lang)}`, "");
    if (register.length === 0) {
      lines.push(t(UI.exportRegisterEmpty, lang));
    } else {
      for (const q of register) {
        lines.push(
          `- [${q.id}] ${pick(q.text, lang)} — ${t(UI.exportVerification, lang)}: ${t(
            UI.verificationLabels[get(q.id).verification],
            lang,
          )}`,
        );
      }
    }
    lines.push("");
    setExported(lines.join("\n"));
    setCopied(false);
  };

  return (
    <div className="wrap">
      <div className="langbar">
        <div className="modes" role="group" aria-label="Language">
          <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
            English
          </button>
          <button aria-pressed={lang === "de"} onClick={() => setLang("de")}>
            Deutsch
          </button>
        </div>
      </div>

      <header>
        <h1>{t(UI.title, lang)}</h1>
        <p className="claim">{t(UI.claim, lang)}</p>
      </header>

      <p className="trust">
        <strong>{t(UI.trustLead, lang)}</strong> {t(UI.trustRest, lang)}
      </p>

      <p className="langnote">{t(UI.langNote, lang)}</p>

      <div className="bar">
        <div className="modes" role="group" aria-label="Mode">
          <button aria-pressed={mode === "triage"} onClick={() => setMode("triage")}>
            {t(UI.triageMode, lang)}
          </button>
          <button aria-pressed={mode === "discovery"} onClick={() => setMode("discovery")}>
            {t(UI.discoveryMode, lang)}
          </button>
        </div>
        <div className="modes" role="group" aria-label="View">
          <button aria-pressed={view === "intake"} onClick={() => setView("intake")}>
            {t(UI.viewIntake, lang)}
          </button>
          <button aria-pressed={view === "deck"} onClick={() => setView("deck")}>
            {t(UI.viewDeck, lang)}
          </button>
        </div>
        <div className="counts">
          <b>{answered}</b>/{allQuestions.length} {t(UI.answered, lang)} · <b>{register.length}</b>{" "}
          {t(UI.openInRegister, lang)}
          {defects.length > 0 && (
            <>
              {" · "}
              <b style={{ color: "var(--flag)" }}>{defects.length}</b>{" "}
              {t(UI.factWithoutSource, lang)}
            </>
          )}
        </div>
      </div>

      <p className="trust">
        <strong>{t(mode === "triage" ? UI.triageNoteLead : UI.discoveryNoteLead, lang)}</strong>{" "}
        {t(mode === "triage" ? UI.triageNoteRest : UI.discoveryNoteRest, lang)}
      </p>

      {view === "deck" ? (
        <Deck
          lang={lang}
          mode={mode}
          themes={visible}
          answers={answers}
          head={head}
          rows={rows}
        />
      ) : (
        <>
      <DecisionHeadBlock lang={lang} head={head} onChange={setHead} />

      {visible.map((th) => (
        <section className="block" key={th.id}>
          <span className="num">
            {t(UI.block, lang)} {th.id}
          </span>
          <h2>{pick(th.title, lang)}</h2>
          <span className="de">
            {pick(th.title, other)} — {otherLabel}
          </span>
          <p className="why">{pick(th.why, lang)}</p>

          {th.questions.map((q) => (
            <QuestionBlock
              key={q.id}
              q={q}
              lang={lang}
              other={other}
              otherLabel={otherLabel}
              answer={get(q.id)}
              onChange={(p) => set(q.id, p)}
            />
          ))}

          <details className="flags">
            <summary>{t(UI.redFlags, lang)}</summary>
            <ul>
              {th.redFlags.map((f) => (
                <li key={f.en}>{pick(f, lang)}</li>
              ))}
            </ul>
          </details>

          {mode === "discovery" && (
            <>
              <details className="flags stop">
                <summary>{t(UI.stopConditions, lang)}</summary>
                <ul>
                  {th.stopConditions.map((c) => (
                    <li key={c.en}>{pick(c, lang)}</li>
                  ))}
                </ul>
              </details>

              {th.hypotheses.length > 0 && (
                <details className="flags hypo">
                  <summary>
                    {t(UI.hypotheses, lang)}{" "}
                    <span className="marker">— {t(UI.hypothesesEnglish, lang)}</span>
                  </summary>
                  <p className="why">{t(UI.hypothesesNote, lang)}</p>
                  <ul>
                    {th.hypotheses.map((h) => (
                      <li key={h.name}>
                        <b>{h.name}</b>
                        <br />
                        <span className="marker">{t(UI.scopeOfValidity, lang)}:</span>{" "}
                        {h.scopeOfValidity}
                        <br />
                        <span className="marker">{t(UI.falsifiableBy, lang)}:</span>{" "}
                        {h.falsifiableBy}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </>
          )}

          {mode === "discovery" && th.dataInventory && (
            <DataInventoryBlock
              lang={lang}
              columns={th.dataInventory.columns}
              rows={rows}
              onChange={setRows}
            />
          )}
        </section>
      ))}

      <section className="register">
        <h2>{t(UI.registerTitle, lang)}</h2>
        {register.length === 0 ? (
          <p className="empty">{t(UI.registerEmpty, lang)}</p>
        ) : (
          <ul>
            {register.map((q) => (
              <li key={q.id}>
                <code>{q.id}</code> — {pick(q.text, lang)}{" "}
                <em>({t(UI.verificationLabels[get(q.id).verification], lang)})</em>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="actions">
        <button onClick={exportMarkdown}>{t(UI.exportButton, lang)}</button>
        {exported && (
          <button
            className="ghost"
            onClick={() => {
              navigator.clipboard?.writeText(exported).then(
                () => setCopied(true),
                () => setCopied(false),
              );
            }}
          >
            {copied ? t(UI.copied, lang) : t(UI.copyButton, lang)}
          </button>
        )}
      </div>

      {exported && <pre className="export">{exported}</pre>}
        </>
      )}

      <footer>
        {t(UI.footer, lang)}
        <br />
        {t(UI.wip, lang)}
      </footer>
    </div>
  );
}

function QuestionBlock({
  q,
  lang,
  other,
  otherLabel,
  answer,
  onChange,
}: {
  q: Question;
  lang: Lang;
  other: Lang;
  otherLabel: string;
  answer: Answer;
  onChange: (patch: Partial<Answer>) => void;
}) {
  const unknown = answer.basis === "unknown";
  return (
    <div className="q">
      <span className="qid">{q.id}</span>
      <p className="qtext">{pick(q.text, lang)}</p>
      <p className="qde">
        {pick(q.text, other)} <span className="marker">— {otherLabel}</span>
      </p>

      <textarea
        value={answer.text}
        disabled={unknown}
        placeholder={
          unknown ? t(UI.unknownPlaceholder, lang) : t(UI.answerPlaceholder, lang)
        }
        onChange={(e) => onChange({ text: e.target.value })}
      />

      <div className="row">
        <span className="label">{t(UI.basis, lang)}</span>
        {BASES.map((b) => (
          <button
            key={b}
            className="tag"
            aria-pressed={answer.basis === b}
            onClick={() => onChange({ basis: answer.basis === b ? null : b })}
          >
            {t(UI.basisLabels[b], lang)}
          </button>
        ))}
      </div>

      {!unknown && (
        <div className="row">
          <span className="label">{t(UI.source, lang)}</span>
          <input
            type="text"
            style={{ flex: "1 1 16rem" }}
            value={answer.source}
            placeholder={t(UI.sourcePlaceholder, lang)}
            onChange={(e) => onChange({ source: e.target.value })}
          />
        </div>
      )}

      <div className="row">
        <span className="label">{t(UI.verification, lang)}</span>
        {VERIFICATIONS.map((v) => (
          <button
            key={v}
            className="tag"
            aria-pressed={answer.verification === v}
            disabled={unknown && v !== "open"}
            onClick={() => onChange({ verification: v })}
          >
            {t(UI.verificationLabels[v], lang)}
          </button>
        ))}
      </div>

      {missingSource(answer) && <p className="hint flag">{t(UI.missingSource, lang)}</p>}
      {unknown && (
        <p className="hint">
          {t(UI.unknownHint, lang)}
          {q.noDefaults && ` ${t(UI.noDefaultsHint, lang)}`}
        </p>
      )}
    </div>
  );
}

/**
 * The Entscheidungskopf (theme 2). It sits above the blocks because it is the frame everything
 * else is measured against: a block that contradicts the decision question is a finding, and you
 * can only see that contradiction if the frame is written down first.
 */
function DecisionHeadBlock({
  lang,
  head,
  onChange,
}: {
  lang: Lang;
  head: DecisionHead;
  onChange: (h: DecisionHead) => void;
}) {
  return (
    <section className="block head">
      <span className="num">{t(UI.decisionHead, lang)}</span>
      <p className="why">{t(UI.decisionHeadNote, lang)}</p>
      {DECISION_HEAD_FIELDS.map((f) => (
        <div className="row" key={f.key}>
          <span className="label wide">{pick(f.label, lang)}</span>
          <input
            type="text"
            style={{ flex: "1 1 18rem" }}
            value={head[f.key] ?? ""}
            onChange={(e) => onChange({ ...head, [f.key]: e.target.value })}
          />
        </div>
      ))}
    </section>
  );
}

/**
 * The mini data inventory (theme 6). A table, deliberately without a process apparatus around
 * it: domain, classification, owner, retention, erasure path. A blank cell is a to-verify item.
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
                <button
                  className="tag"
                  onClick={() => onChange(rows.filter((_, i) => i !== ri))}
                >
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
