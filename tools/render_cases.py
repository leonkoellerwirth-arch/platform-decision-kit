"""Turn the hand-authored fixture intakes into cases the web instrument can load.

`examples/*/intake-filled.md` are the three counter-cases the kit is checked against —
complete, gappy, contradictory. They were written for `tools/check.py` and could only be
read as Markdown; the app knew one case, and a reader who wanted to see what a gappy pass
or a contradictory one looks like had to open a file.

This parses them into the shape `demo/case.json` already has, so the app can offer all four.
It is a projection and nothing more: no answer is re-tagged, no missing field is filled in,
and the parser fails loudly rather than guessing. `--check` re-renders into memory and diffs
against what is committed, the same mechanic `render_intake.py` uses, so a fixture and its
generated case cannot drift apart.

    python tools/render_cases.py all      # write demo/cases/*.json
    python tools/render_cases.py --check  # exit 1 if a committed case has drifted
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

import yaml

REPO = Path(__file__).resolve().parent.parent
EXAMPLES_DIR = REPO / "examples"
THEMES_DIR = REPO / "intake" / "themes"
OUT_DIR = REPO / "demo" / "cases"

# The fixture directory, the file it becomes, and the two lines the app shows beside it.
# Kept here rather than in a fourth file: three entries do not need a registry.
CASES: dict[str, dict[str, Any]] = {
    "01-vollstaendig": {
        "slug": "retailcore",
        "title": {"en": "RetailCore — complete", "de": "RetailCore — vollständig"},
        "note": {
            "en": "An order management platform where every question was answered and every "
            "answer had a source. The register is short on purpose: this is what a pass looks "
            "like when the room actually knows its platform.",
            "de": "Eine Auftragsplattform, bei der jede Frage beantwortet war und jede Antwort "
            "einen Beleg hatte. Das Register ist absichtlich kurz: so sieht ein Durchgang aus, "
            "wenn der Raum seine Plattform wirklich kennt.",
        },
    },
    "02-lueckenhaft": {
        "slug": "legacyhr",
        "title": {"en": "LegacyHR — gappy", "de": "LegacyHR — lückenhaft"},
        "note": {
            "en": "A twelve-year-old HR platform with a COBOL payroll module nobody understands. "
            "Sixteen answers are tagged unknown, and that is the finding — the register is the "
            "output, not a failure of the conversation.",
            "de": "Eine zwölf Jahre alte HR-Plattform mit einem COBOL-Lohnmodul, das niemand "
            "versteht. Sechzehn Antworten sind als unbekannt markiert, und das ist der Befund — "
            "das Register ist das Ergebnis, kein Scheitern des Gesprächs.",
        },
    },
    "03-widersprüchlich": {
        "slug": "paymenthub",
        "title": {"en": "PaymentHub — contradictory", "de": "PaymentHub — widersprüchlich"},
        "note": {
            "en": "A payment hub where two documented statements contradict each other on the "
            "deadline and on the consumer count. Both are recorded verbatim and neither is "
            "adopted. Nothing is averaged.",
            "de": "Ein Zahlungs-Hub, bei dem zwei dokumentierte Aussagen sich zur Frist und zur "
            "Konsumentenzahl widersprechen. Beide sind wörtlich erfasst, keine wird übernommen. "
            "Es wird nichts gemittelt.",
        },
    },
}

BASIS = {"fact": "fact", "statement": "statement", "assumption": "assumption", "unknown": "unknown"}
VERIFICATION = {"none": "none", "open": "open", "blocked": "blocked"}

HEAD_ROWS = {
    "decision question": "decision_question",
    "decision owner": "decision_owner",
    "in scope": "in_scope",
    "out of scope": "out_of_scope",
    "deadline": "deadline",
}

# The fields the answer shape gained after these fixtures were written. They are emitted
# empty, never guessed: an artefact does not acquire a date because one would look better,
# and an open point does not acquire an owner because the register would read tidier.
LATER_FIELDS = ("artifact", "speaker", "sourceDate", "owner", "evidence", "due", "blocker")

CHOSEN = re.compile(r"\(x\)\s*([A-Za-z]+)", re.IGNORECASE)


def known_qids() -> set[str]:
    ids: set[str] = set()
    for path in sorted(THEMES_DIR.glob("*.yaml")):
        theme = yaml.safe_load(path.read_text(encoding="utf-8"))
        ids.update(q["id"] for q in theme["questions"])
    return ids


def field(block: str, label: str) -> str:
    """One `**Label:**` line out of a question block, or "" if it is absent."""
    m = re.search(rf"^\*\*{re.escape(label)}:\*\*(.*)$", block, re.MULTILINE)
    return m.group(1).strip() if m else ""


def chosen(block: str, label: str, allowed: dict[str, str], qid: str) -> str | None:
    """The one ticked option on a `( ) A (x) B` line."""
    line = field(block, label)
    hits = [h.lower() for h in CHOSEN.findall(line)]
    if not hits:
        return None
    if len(hits) > 1:
        raise SystemExit(f"{qid}: more than one option ticked on {label}: {hits}")
    if hits[0] not in allowed:
        raise SystemExit(f"{qid}: unknown {label} value {hits[0]!r}")
    return allowed[hits[0]]


def parse_head(text: str) -> dict[str, str]:
    head: dict[str, str] = {}
    section = text.split("## Decision Head", 1)
    if len(section) < 2:
        return head
    for line in section[1].splitlines():
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) != 2:
            continue
        key = HEAD_ROWS.get(cells[0].lower())
        if key and cells[1] and set(cells[1]) != {"-"}:
            head[key] = cells[1]
    return head


def conflict_qids(directory: Path) -> set[str]:
    """The Q-IDs the fixture's own assertions call contradictory.

    Read from `assertions.yaml` rather than guessed from the prose, because that file is
    what `check.py` already holds the reference brief to. One statement of which questions
    carry a conflict, checked on the brief and rendered on the deck.
    """
    path = directory / "assertions.yaml"
    if not path.exists():
        return set()
    a = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    return {qid for pair in a.get("expected_conflict_pairs") or [] for qid in pair}


def parse_case(directory: Path, valid: set[str]) -> dict[str, Any]:
    meta = CASES[directory.name]
    text = (directory / "intake-filled.md").read_text(encoding="utf-8")
    conflicts = conflict_qids(directory)
    unseen = conflicts - valid
    if unseen:
        raise SystemExit(f"{directory.name}: conflict Q-IDs not in the question set: {unseen}")
    answers: dict[str, dict[str, Any]] = {}

    for block in re.split(r"^#### ", text, flags=re.MULTILINE)[1:]:
        qid = block.split(" ", 1)[0].strip()
        if qid not in valid:
            raise SystemExit(f"{directory.name}: {qid} is not a question in intake/themes/")
        basis = chosen(block, "Basis", BASIS, qid)
        verification = chosen(block, "Verification", VERIFICATION, qid) or "none"
        source = field(block, "Evidence / Source")
        # The blank form's own placeholder, left in place where a fixture answered nothing.
        if source.startswith("[") or source == "—":
            source = ""
        answers[qid] = {
            "text": field(block, "Answer"),
            "basis": basis,
            "source": source,
            **{k: "" for k in LATER_FIELDS},
            "verification": verification,
            "conflict": qid in conflicts,
        }

    if not answers:
        raise SystemExit(f"{directory.name}: no question blocks found")

    return {
        "_comment": (
            f"Generated by tools/render_cases.py from examples/{directory.name}/intake-filled.md. "
            "Do not edit by hand — the gate re-renders and diffs. The fixture is hand-authored "
            "and fictional; no real organisation, system or person is described."
        ),
        "id": meta["slug"],
        "title": meta["title"],
        "note": meta["note"],
        "mode": "discovery",
        "head": parse_head(text),
        # The fixtures carry no data-inventory annex and record no direction. Empty is the
        # honest rendering of that; a case does not gain either by being converted.
        "rows": [],
        "answers": answers,
        "directions": [],
    }


def render() -> dict[Path, str]:
    valid = known_qids()
    out: dict[Path, str] = {}
    for name in CASES:
        directory = EXAMPLES_DIR / name
        if not directory.is_dir():
            raise SystemExit(f"missing fixture directory: {directory}")
        case = parse_case(directory, valid)
        out[OUT_DIR / f"{case['id']}.json"] = json.dumps(case, ensure_ascii=False, indent=2) + "\n"
    return out


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("command", nargs="?", default="all", choices=["all"])
    parser.add_argument("--check", action="store_true", help="exit 1 on drift, write nothing")
    args = parser.parse_args(argv)

    rendered = render()
    if args.check:
        drift = 0
        for path, text in rendered.items():
            if not path.exists() or path.read_text(encoding="utf-8") != text:
                print(f"drift: {path.relative_to(REPO)} differs from its fixture")
                drift = 1
        return drift

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for path, text in rendered.items():
        path.write_text(text, encoding="utf-8")
        case = json.loads(text)
        answered = sum(1 for a in case["answers"].values() if a["basis"])
        open_n = sum(
            1 for a in case["answers"].values() if a["verification"] in ("open", "blocked")
        )
        conflicts = sum(1 for a in case["answers"].values() if a["conflict"])
        print(
            f"wrote {path.relative_to(REPO)} — {answered} answered, {open_n} open, "
            f"{conflicts} in conflict"
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
