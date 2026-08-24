import { useEffect, useMemo, useState } from "react";
import { t, UI } from "./i18n";
import {
  pick,
  THEMES,
  type Basis,
  type Lang,
  type Mode,
  type Question,
  type Verification,
} from "./themes";

interface Answer {
  text: string;
  basis: Basis | null;
  source: string;
  verification: Verification;
}

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
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
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

      {mode === "triage" && (
        <p className="trust">
          <strong>{t(UI.triageNoteLead, lang)}</strong> {t(UI.triageNoteRest, lang)}
        </p>
      )}

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
