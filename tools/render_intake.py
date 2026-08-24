"""Render the intake forms and the web-app export from the canonical theme source.

`intake/themes/*.yaml` is the single source of truth. The two Markdown forms and the
JSON export are generated from it, never edited by hand — `--check` re-renders into
memory and diffs against what is committed, so the gate catches any drift.

    python tools/render_intake.py all        # write all three outputs
    python tools/render_intake.py triage     # intake/00-triage.md
    python tools/render_intake.py discovery  # intake/01-discovery.md
    python tools/render_intake.py json       # intake/themes.json
    python tools/render_intake.py --check    # exit 1 if a committed file has drifted
"""

from __future__ import annotations

import argparse
import difflib
import json
import sys
from pathlib import Path
from typing import Any

import yaml

from qids import GENERATED_BANNER

REPO = Path(__file__).resolve().parent.parent
THEMES_DIR = REPO / "intake" / "themes"
TRIAGE_OUT = REPO / "intake" / "00-triage.md"
DISCOVERY_OUT = REPO / "intake" / "01-discovery.md"
JSON_OUT = REPO / "intake" / "themes.json"

NO_DEFAULTS_NOTE = (
    "> **NOTE:** This field has no defaults. If the information is not available,\n"
    '> mark Basis as "Unknown" and Verification as "Open". Do not estimate or assume.\n'
)

DECISION_HEAD = """## Decision Head (from Theme 2)

| Field | Answer |
|---|---|
| Decision question | |
| Decision owner | |
| In scope | |
| Out of scope | |
| Deadline | |

---
"""

TO_VERIFY_TABLE = """## To-Verify Register

| # | Item | Source needed | Status |
|---|---|---|---|
| | | | |

---
"""


def load_themes() -> list[dict[str, Any]]:
    """Load every theme file in numeric order and fail loudly on a gap or a duplicate."""
    paths = sorted(THEMES_DIR.glob("*.yaml"))
    themes = [yaml.safe_load(p.read_text(encoding="utf-8")) for p in paths]
    themes.sort(key=lambda t: t["theme_id"])
    ids = [t["theme_id"] for t in themes]
    if ids != list(range(1, 11)):
        raise SystemExit(f"theme_id set is {ids}, expected 1..10 — check intake/themes/")
    return themes


def question_block(q: dict[str, Any], *, with_note: bool) -> str:
    """The two-stage answer mechanic: what was said, and on what basis it was said."""
    lines = [
        f"#### {q['id']} — {q['text']['en']}",
        "",
        f"*[DE] {q['text']['de']}*",
        "",
        "**Answer:** [free text]",
        "",
        "**Basis:** ( ) Fact  ( ) Statement  ( ) Assumption  ( ) Unknown",
        "",
        '**Evidence / Source:** [link, document ID, or "Name · Date"]',
        "*(Required when Basis = Fact. Leave blank when Basis = Unknown.)*",
        "",
    ]
    if with_note and q.get("no_defaults"):
        lines += [NO_DEFAULTS_NOTE, ""]
    lines += [
        "**Verification:** ( ) None  ( ) Open  ( ) Blocked",
        '*(Automatically enters the To-Verify register when marked "Open".)*',
        "",
        "---",
        "",
    ]
    return "\n".join(lines)


def bullets(items: list[str]) -> str:
    return "\n".join(f"> - {i}" for i in items) if items else "> - (none defined)"


def hypothesis_bullets(hs: list[dict[str, Any]]) -> str:
    out = []
    for h in hs:
        scope = " ".join(str(h.get("scope_of_validity", "")).split())
        falsifiable = " ".join(str(h.get("falsifiable_by", "")).split())
        out.append(f"> - *{h['name']}* — scope: {scope} Falsifiable by: {falsifiable}")
    return "\n".join(out) if out else "> - (none defined)"


def render_triage(themes: list[dict[str, Any]]) -> str:
    parts = [
        GENERATED_BANNER,
        "# Platform Decision Kit — TRIAGE FORM",
        "",
        "> This form is a CONVERSATION NOTE, not an authoritative source.",
        "> TRIAGE mode: 20 minutes, one conversation partner.",
        "> Output: situation picture + open points + red flags. NO recommendation right.",
        ">",
        "> A full recommendation requires DISCOVERY mode (intake/01-discovery.md)",
        '> with verification of all "to-verify" items.',
        "",
        "**Date:** _______  **Context:** _______  **Interviewer:** _______",
        "",
        "---",
        "",
        DECISION_HEAD,
        "",
    ]
    for theme in themes:
        for q in theme["questions"]:
            if "triage" in q["mode"]:
                parts.append(question_block(q, with_note=False))
    parts += [
        TO_VERIFY_TABLE,
        "",
        "## Red Flags observed",
        "",
        "(Free text — record any red flag from the theme definitions)",
        "",
        "---",
        "",
        '> TRIAGE RESULT: situation picture only. All "to-verify" items must be resolved',
        "> before any direction can be formulated.",
        "",
    ]
    return "\n".join(parts)


def render_discovery(themes: list[dict[str, Any]]) -> str:
    parts = [
        GENERATED_BANNER,
        "# Platform Decision Kit — DISCOVERY FORM",
        "",
        "> This form is a CONVERSATION NOTE, not an authoritative source.",
        "> DISCOVERY mode: 90+ minutes, all 10 themes, full question set.",
        "> Output: situation picture + hypotheses + to-verify register. NO recommendation right.",
        ">",
        "> A recommendation requires separate analysis after all to-verify items are resolved.",
        "",
        "**Date:** _______  **Context:** _______  **Interviewer:** _______"
        "  **Partner(s):** _______",
        "",
        "---",
        "",
        DECISION_HEAD,
        "",
    ]
    for theme in themes:
        why = " ".join(theme["why"]["en"].split())
        parts += [
            f"## Theme {theme['theme_id']} — {theme['title']['en']} / {theme['title']['de']}",
            "",
            f"> **Why this block:** {why}",
            "",
            "> **Red flags:**",
            bullets(theme.get("red_flags", [])),
            "",
            "> **Stop conditions:**",
            bullets(theme.get("stop_conditions", [])),
            "",
            "> **Patterns & hypotheses — not questions:**",
            hypothesis_bullets(theme.get("hypotheses", [])),
            "",
        ]
        if theme.get("data_inventory_annex"):
            cols = theme["data_inventory_annex"]["columns"]
            header = " | ".join(c.replace("_", " ").title() for c in cols)
            parts += [
                "**Mini data inventory** — one row per data domain:",
                "",
                f"| {header} |",
                "|" + "---|" * len(cols),
                "|" + " |" * len(cols),
                "",
            ]
        for q in theme["questions"]:
            parts.append(question_block(q, with_note=True))
        parts += ["---", ""]
    parts += [
        TO_VERIFY_TABLE,
        "",
        '> DISCOVERY NOTE: situation picture only. All "to-verify" items must be resolved',
        "> and a separate analysis performed before any direction can be formulated.",
        "",
    ]
    return "\n".join(parts)


def render_json(themes: list[dict[str, Any]]) -> str:
    return json.dumps({"themes": themes}, ensure_ascii=False, indent=2, sort_keys=False) + "\n"


TARGETS = {
    "triage": (TRIAGE_OUT, render_triage),
    "discovery": (DISCOVERY_OUT, render_discovery),
    "json": (JSON_OUT, render_json),
}


def rel(path: Path) -> str:
    """Repo-relative for readability, absolute when the path lives outside the repo."""
    try:
        return str(path.relative_to(REPO))
    except ValueError:
        return str(path)


def check(themes: list[dict[str, Any]]) -> int:
    """Character-exact diff of every committed output against a fresh render."""
    drifted = 0
    for name, (path, render) in TARGETS.items():
        expected = render(themes)
        actual = path.read_text(encoding="utf-8") if path.exists() else ""
        if actual != expected:
            drifted += 1
            print(f"DRIFT: {rel(path)} differs from the canonical source ({name})")
            diff = difflib.unified_diff(
                actual.splitlines(),
                expected.splitlines(),
                fromfile="committed",
                tofile="rendered",
                lineterm="",
                n=1,
            )
            for line in list(diff)[:20]:
                print(f"  {line}")
    if drifted:
        print(
            f"\nrender_intake --check: {drifted} file(s) drifted."
            " Run: python tools/render_intake.py all"
        )
        return 1
    print("render_intake --check: no drift")
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("target", nargs="?", choices=[*TARGETS, "all"], default="all")
    parser.add_argument(
        "--check", action="store_true", help="fail if a committed output has drifted"
    )
    args = parser.parse_args(argv)

    themes = load_themes()
    if args.check:
        return check(themes)

    names = list(TARGETS) if args.target == "all" else [args.target]
    for name in names:
        path, render = TARGETS[name]
        path.write_text(render(themes), encoding="utf-8")
        print(f"wrote {rel(path)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
