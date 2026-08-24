// The evidence grid — the instrument's one idea, made operable.
//
// INV-2 says the two dimensions never collapse: *basis* is what kind of knowledge this is,
// *verification* is what work is still outstanding on it. Two rows of buttons said the opposite —
// they read as one long list of options. A grid says what is true: four kinds of knowledge
// across, three states of outstanding work down, and an answer lands in exactly one cell.
//
// Click a cell to set both axes. Click a column head to set only the basis, a row head to set
// only the verification. The independence is the interaction, not a footnote under it.
//
// Two channels, one per axis, so the pair can never be read as a single ranking:
//   basis        → form   (filled · hollow · hatched · dotted)   — a kind, not a grade
//   verification → colour (quiet · open · blocked)               — outstanding work
// A statement is not a lesser fact, and an honest "unknown" is the most useful answer in the
// room. Colour is spent only on the axis that carries work.
//
// Second pass (2026-08-24). Four things the first board got wrong:
//   1. It tinted whole rows. A filled grey row reads "disabled" in every convention there is —
//      the opposite of "work outstanding". Colour now lives on the row head's edge marker, and
//      inside the board only on the one chosen cell.
//   2. It repeated the column glyph twelve times, which says nothing: the glyph belongs to the
//      column, so it is drawn once in the head. A cell is a quiet target that shows the glyph on
//      hover (a preview of the pick) and solid when chosen.
//   3. The blocked cells of the unknown column were greyed — the same grey as the row tint, so
//      "the rule forbids this" and "this row is passive" looked identical. The rule is drawn now:
//      a struck cell, recessed, with the strike the old comment already promised (INV-4).
//   4. It stated no result. The pair is now read back in words under the board.

import { Chip, Tooltip } from "@heroui/react";

import { t, UI } from "./i18n";
import type { Basis, Lang, Verification } from "./themes";

const BASES: Basis[] = ["fact", "statement", "assumption", "unknown"];
const VERIFICATIONS: Verification[] = ["none", "open", "blocked"];

/** Keyboard hints, shown on the heads. Basis 1–4 across, verification Q/W/E down. */
const BASIS_KEYS = ["1", "2", "3", "4"];
const VERIFICATION_KEYS = ["Q", "W", "E"];

export interface GridValue {
  basis: Basis | null;
  verification: Verification;
}

/** An unknown answer carries no outstanding choice: it is open, and only open. */
export const cellDisabled = (b: Basis, v: Verification): boolean =>
  b === "unknown" && v !== "open";

export function EvidenceGrid({
  lang,
  value,
  onChange,
}: {
  lang: Lang;
  value: GridValue;
  onChange: (v: Partial<GridValue>) => void;
}) {
  return (
    <div className="eg" role="group" aria-label={t(UI.evidenceGrid, lang)}>
      <div className="eg-board">
        {/* The corner names both axes and points along each one, so the board is
            readable without the legend that used to sit under it. */}
        <div className="eg-corner">
          <span className="eg-axis eg-axis-x">
            {t(UI.basis, lang)} <i aria-hidden="true">→</i>
          </span>
          <span className="eg-axis eg-axis-y">
            {t(UI.verification, lang)} <i aria-hidden="true">↓</i>
          </span>
        </div>

        {BASES.map((b, i) => (
          <button
            key={b}
            type="button"
            className={`eg-col${value.basis === b ? " on" : ""}`}
            aria-pressed={value.basis === b}
            onClick={() => onChange({ basis: value.basis === b ? null : b })}
          >
            <span className={`mark m-${b}`} aria-hidden="true" />
            <span className="eg-col-label">{t(UI.basisLabels[b], lang)}</span>
            <kbd>{BASIS_KEYS[i]}</kbd>
          </button>
        ))}

        {VERIFICATIONS.map((v, r) => (
          <Row key={v} v={v} r={r} lang={lang} value={value} onChange={onChange} />
        ))}
      </div>

      <Readout lang={lang} value={value} onChange={onChange} />
    </div>
  );
}

/**
 * The pair, in words. A board is fast to operate and slow to read back; a sentence is the
 * reverse. Both are cheap, so the panel carries both — and the sentence is what a second
 * person leaning over the screen actually reads.
 */
function Readout({
  lang,
  value,
  onChange,
}: {
  lang: Lang;
  value: GridValue;
  onChange: (v: Partial<GridValue>) => void;
}) {
  if (!value.basis) {
    return <p className="eg-readout empty">{t(UI.notClassified, lang)}</p>;
  }
  const tone =
    value.verification === "blocked"
      ? "danger"
      : value.verification === "open"
        ? "warning"
        : "accent";
  return (
    <p className={`eg-readout v-${value.verification}`}>
      <Chip color={tone} size="sm" className="eg-readout-chip">
        <span className={`mark m-${value.basis}`} aria-hidden="true" />
        <span className="eg-readout-basis">{t(UI.basisLabels[value.basis], lang)}</span>
        <span className="eg-readout-sep" aria-hidden="true">·</span>
        <span className="eg-readout-verif">
          {t(UI.verificationLabels[value.verification], lang)}
        </span>
      </Chip>
      <button
        type="button"
        className="eg-clear"
        onClick={() => onChange({ basis: null, verification: "none" })}
      >
        {t(UI.clearCell, lang)}
      </button>
    </p>
  );
}

function Row({
  v,
  r,
  lang,
  value,
  onChange,
}: {
  v: Verification;
  r: number;
  lang: Lang;
  value: GridValue;
  onChange: (v: Partial<GridValue>) => void;
}) {
  return (
    <>
      <button
        type="button"
        className={`eg-row v-${v}${value.verification === v ? " on" : ""}`}
        aria-pressed={value.verification === v}
        onClick={() => onChange({ verification: v })}
      >
        <span className="eg-row-bar" aria-hidden="true" />
        <span className="eg-row-label">{t(UI.verificationLabels[v], lang)}</span>
        <kbd>{VERIFICATION_KEYS[r]}</kbd>
      </button>

      {BASES.map((b) => {
        const off = cellDisabled(b, v);
        const on = value.basis === b && value.verification === v;
        const cell = (
          <button
            key={b}
            type="button"
            className={`eg-cell v-${v}${on ? " on" : ""}${off ? " off" : ""}`}
            // aria-disabled, not disabled: a disabled button fires no pointer event, and the
            // struck cells are exactly the ones a user wants explained on hover.
            aria-disabled={off}
            tabIndex={off ? -1 : undefined}
            aria-pressed={on}
            aria-label={`${t(UI.basisLabels[b], lang)} · ${t(UI.verificationLabels[v], lang)}`}
            onClick={() => !off && onChange({ basis: b, verification: v })}
          >
            <span className={`mark m-${b}`} aria-hidden="true" />
          </button>
        );
        // A struck cell is the one place the board has a rule to explain, so it is
        // the one place that earns an overlay instead of a title attribute.
        return off ? (
          <Tooltip key={b} delay={300}>
            <Tooltip.Trigger>{cell}</Tooltip.Trigger>
            <Tooltip.Content>{t(UI.ruleUnknown, lang)}</Tooltip.Content>
          </Tooltip>
        ) : (
          cell
        );
      })}
    </>
  );
}

/**
 * The same grid at a glance, filled with everything answered so far. It is the shape of the
 * conversation: a column-heavy left edge means a well-evidenced discussion, a lit bottom-right
 * means a lot of honest blanks. Neither is a score — it is a picture of what kind of room it was.
 */
export function GridSummary({
  lang,
  counts,
}: {
  lang: Lang;
  counts: Record<string, number>;
}) {
  const max = Math.max(1, ...Object.values(counts));
  return (
    <div className="gridmini" aria-label={t(UI.evidenceGrid, lang)}>
      {VERIFICATIONS.map((v) =>
        BASES.map((b) => {
          const n = counts[`${b}/${v}`] ?? 0;
          const off = cellDisabled(b, v);
          return (
            <span
              key={`${b}-${v}`}
              className={`dot v-${v}${off ? " off" : ""}`}
              title={`${t(UI.basisLabels[b], lang)} · ${t(UI.verificationLabels[v], lang)}: ${n}`}
            >
              {n > 0 && (
                <i
                  className={`m-${b}`}
                  style={{ transform: `scale(${0.4 + 0.6 * (n / max)})` }}
                />
              )}
            </span>
          );
        }),
      )}
    </div>
  );
}
