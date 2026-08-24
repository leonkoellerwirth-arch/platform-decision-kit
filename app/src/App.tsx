import { useMemo, useState } from "react";
import { THEMES, type Basis, type Mode, type Question, type Verification } from "./themes";

interface Answer {
  text: string;
  basis: Basis | null;
  source: string;
  verification: Verification;
}

const EMPTY: Answer = { text: "", basis: null, source: "", verification: "none" };

const BASIS_LABEL: Record<Basis, string> = {
  fact: "fact",
  statement: "statement",
  assumption: "assumption",
  unknown: "unknown",
};
const VERIFICATION_LABEL: Record<Verification, string> = {
  none: "none",
  open: "open",
  blocked: "blocked",
};

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

function isOpen(a: Answer): boolean {
  return a.verification === "open" || a.verification === "blocked";
}

function missingSource(a: Answer): boolean {
  return a.basis === "fact" && a.source.trim() === "";
}

export default function App() {
  const [mode, setMode] = useState<Mode>("triage");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [exported, setExported] = useState<string | null>(null);

  const get = (id: string): Answer => answers[id] ?? EMPTY;
  const set = (id: string, patch: Partial<Answer>) => {
    setAnswers((prev) => ({ ...prev, [id]: normalise({ ...(prev[id] ?? EMPTY), ...patch }) }));
    setExported(null);
  };

  const visible = useMemo(
    () =>
      THEMES.map((t) => ({ ...t, questions: t.questions.filter((q) => q.modes.includes(mode)) }))
        .filter((t) => t.questions.length > 0),
    [mode],
  );

  const allQuestions = useMemo(() => visible.flatMap((t) => t.questions), [visible]);
  const answered = allQuestions.filter((q) => {
    const a = get(q.id);
    return a.basis !== null;
  }).length;
  const register = allQuestions.filter((q) => isOpen(get(q.id)));
  const defects = allQuestions.filter((q) => missingSource(get(q.id)));

  const exportMarkdown = () => {
    const lines: string[] = [];
    lines.push(`# Intake — ${mode === "triage" ? "Triage" : "Discovery"}`);
    lines.push("");
    lines.push("> Conversation note, not an authoritative source. A statement with an open");
    lines.push("> verification stays a statement — it never becomes a fact by being written down.");
    lines.push("");
    for (const t of visible) {
      lines.push(`## ${t.id}. ${t.en}`);
      lines.push("");
      for (const q of t.questions) {
        const a = get(q.id);
        lines.push(`### ${q.id}  ${q.en}`);
        lines.push(`Answer: ${a.text.trim() || "—"}`);
        lines.push(`Basis: ${a.basis ?? "—"}`);
        lines.push(`Source: ${a.source.trim() || "—"}`);
        lines.push(`Verification: ${a.verification}`);
        lines.push("");
      }
    }
    lines.push("## To-verify register");
    lines.push("");
    if (register.length === 0) {
      lines.push("_No open point recorded. On a first pass that is a finding, not a result._");
    } else {
      for (const q of register) {
        lines.push(`- [${q.id}] ${q.en} — verification: ${get(q.id).verification}`);
      }
    }
    lines.push("");
    setExported(lines.join("\n"));
  };

  return (
    <div className="wrap">
      <header>
        <h1>
          Platform Decision Kit — a system architect&rsquo;s triage &amp; discovery instrument for
          brownfield platforms
        </h1>
        <p className="claim">
          A conversation yields claims, not evidence. This instrument captures a platform situation
          in structured hypotheses — tagged fact / statement / assumption / to&#8209;verify. It
          produces no recommendation. That boundary is the product.
        </p>
      </header>

      <p className="trust">
        <strong>Everything you type stays in this browser.</strong> There is no backend, no
        account, and nothing is sent anywhere — the page does not make a single network call after
        it has loaded. Export writes a Markdown file you keep.
      </p>

      <div className="bar">
        <div className="modes" role="group" aria-label="Mode">
          <button aria-pressed={mode === "triage"} onClick={() => setMode("triage")}>
            Triage · 20 min
          </button>
          <button aria-pressed={mode === "discovery"} onClick={() => setMode("discovery")}>
            Discovery · 90+ min
          </button>
        </div>
        <div className="counts">
          <b>{answered}</b>/{allQuestions.length} answered · <b>{register.length}</b> open in the
          register
          {defects.length > 0 && (
            <>
              {" "}
              · <b style={{ color: "var(--flag)" }}>{defects.length}</b> fact without a source
            </>
          )}
        </div>
      </div>

      {mode === "triage" && (
        <p className="trust">
          Triage has <strong>no right of recommendation</strong>. Its output is a situation picture,
          open points, and red flags — nothing that reads as a direction.
        </p>
      )}

      {visible.map((t) => (
        <section className="block" key={t.id}>
          <span className="num">Block {t.id}</span>
          <h2>{t.en}</h2>
          <span className="de">{t.de} — translation</span>
          <p className="why">{t.why}</p>

          {t.questions.map((q) => (
            <QuestionBlock key={q.id} q={q} answer={get(q.id)} onChange={(p) => set(q.id, p)} />
          ))}
        </section>
      ))}

      <section className="register">
        <h2>To-verify register</h2>
        {register.length === 0 ? (
          <p className="empty">
            Nothing open yet. On a first pass through a brownfield platform, an empty register is a
            finding about the conversation — not a result about the platform.
          </p>
        ) : (
          <ul>
            {register.map((q) => (
              <li key={q.id}>
                <code>{q.id}</code> — {q.en} <em>({get(q.id).verification})</em>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="actions">
        <button onClick={exportMarkdown}>Export as Markdown</button>
        {exported && (
          <button className="ghost" onClick={() => navigator.clipboard?.writeText(exported)}>
            Copy to clipboard
          </button>
        )}
      </div>

      {exported && <pre className="export">{exported}</pre>}

      <footer>
        Band 3 of the series, after the governance toolkit and the approval blueprint. The thread:
        verification instead of trust — here applied to the architect&rsquo;s own work.
        <br />
        Work in progress: the questions below are the triage subset. The full discovery set is
        generated from <code>intake/themes/</code> once that canonical source lands.
      </footer>
    </div>
  );
}

function QuestionBlock({
  q,
  answer,
  onChange,
}: {
  q: Question;
  answer: Answer;
  onChange: (patch: Partial<Answer>) => void;
}) {
  const unknown = answer.basis === "unknown";
  return (
    <div className="q">
      <span className="qid">{q.id}</span>
      <p className="qtext">{q.en}</p>
      <p className="qde">{q.de}</p>

      <textarea
        value={answer.text}
        disabled={unknown}
        placeholder={unknown ? "Unknown — deliberately left empty." : "What was observed?"}
        onChange={(e) => onChange({ text: e.target.value })}
      />

      <div className="row">
        <span className="label">Basis</span>
        {(Object.keys(BASIS_LABEL) as Basis[]).map((b) => (
          <button
            key={b}
            className="tag"
            aria-pressed={answer.basis === b}
            onClick={() => onChange({ basis: answer.basis === b ? null : b })}
          >
            {BASIS_LABEL[b]}
          </button>
        ))}
      </div>

      {!unknown && (
        <div className="row">
          <span className="label">Source</span>
          <input
            type="text"
            style={{ flex: "1 1 16rem" }}
            value={answer.source}
            placeholder="Link, document ID, or &quot;name · date&quot;"
            onChange={(e) => onChange({ source: e.target.value })}
          />
        </div>
      )}

      <div className="row">
        <span className="label">Verification</span>
        {(Object.keys(VERIFICATION_LABEL) as Verification[]).map((v) => (
          <button
            key={v}
            className="tag"
            aria-pressed={answer.verification === v}
            disabled={unknown && v !== "open"}
            onClick={() => onChange({ verification: v })}
          >
            {VERIFICATION_LABEL[v]}
          </button>
        ))}
      </div>

      {missingSource(answer) && (
        <p className="hint flag">
          A fact needs a source reference. Without one this is a statement, not a fact.
        </p>
      )}
      {unknown && (
        <p className="hint">
          Unknown — verification set to open, and it stays open.
          {q.noDefaults && " This block takes no defaults: do not fill this from experience."}
        </p>
      )}
    </div>
  );
}
