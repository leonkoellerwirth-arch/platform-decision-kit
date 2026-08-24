"""Offline verification of filled intakes and of the hand-authored reference briefs.

No model runs here and nothing leaves the machine. The three fixtures under `examples/`
are reference outputs a human wrote; `assertions.yaml` beside each one states machine-readably
what the brief must show, what must never appear, and which Q-IDs must stay open. That is what
"fixtures: 3/3 green" means — the rules bite against fixed text, deterministically.

    python tools/check.py intake examples/01-vollstaendig/intake-filled.md
    python tools/check.py fixtures
    python tools/check.py all
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from typing import Any

import yaml

from qids import QID_PATTERN, SECTION_KONFLIKTE, SECTION_TO_VERIFY

REPO = Path(__file__).resolve().parent.parent
THEMES_DIR = REPO / "intake" / "themes"
EXAMPLES_DIR = REPO / "examples"

CONFLICT_SECTIONS = (SECTION_KONFLIKTE, "## Konflikte")
BASIS_RE = re.compile(r"^\*\*Basis:\*\*", re.MULTILINE)
VERIFICATION_RE = re.compile(r"^\*\*Verification:\*\*", re.MULTILINE)


def known_qids() -> set[str]:
    ids = set()
    for path in sorted(THEMES_DIR.glob("*.yaml")):
        theme = yaml.safe_load(path.read_text(encoding="utf-8"))
        ids.update(q["id"] for q in theme["questions"])
    return ids


def split_sections(text: str) -> dict[str, list[tuple[int, str]]]:
    """Map each `## heading` to its body lines, carrying 1-based line numbers along."""
    sections: dict[str, list[tuple[int, str]]] = {}
    current: str | None = None
    in_code = False
    for lineno, line in enumerate(text.splitlines(), start=1):
        if line.startswith("```"):
            in_code = not in_code
        if not in_code and line.startswith("## "):
            current = line.rstrip()
            sections[current] = []
            continue
        if current is not None:
            sections[current].append((lineno, line))
    return sections


def section_text(sections: dict[str, list[tuple[int, str]]], heading: str) -> str:
    return "\n".join(line for _, line in sections.get(heading, []))


def check_claim_coverage(sections, headings: list[str], failures: list[str]) -> None:
    """Every claim-bearing bullet must point back at the question that produced it."""
    for heading in headings:
        if heading not in sections:
            failures.append(f"missing claim-bearing section: {heading}")
            continue
        in_code = False
        for lineno, line in sections[heading]:
            stripped = line.strip()
            if stripped.startswith("```"):
                in_code = not in_code
                continue
            if in_code or not stripped or stripped.startswith("#"):
                continue
            if not stripped.startswith(("-", "*", "|")):
                continue
            if stripped.startswith("|") and set(stripped) <= set("|- :"):
                continue
            if not QID_PATTERN.search(stripped):
                failures.append(f"{heading} line {lineno}: no Q-ID reference — {stripped[:70]}")


def check_register(sections, expected: list[str], failures: list[str]) -> None:
    body = section_text(sections, SECTION_TO_VERIFY)
    if not body and expected:
        failures.append(f"missing section: {SECTION_TO_VERIFY}")
        return
    for qid in expected:
        if qid not in body:
            failures.append(f"{SECTION_TO_VERIFY}: expected open item {qid} not listed")


def check_conflicts(sections, pairs: list[list[str]], failures: list[str]) -> None:
    if not pairs:
        return
    body = ""
    for heading in CONFLICT_SECTIONS:
        if heading in sections:
            body = section_text(sections, heading)
            break
    if not body:
        failures.append(f"missing conflict section (one of: {', '.join(CONFLICT_SECTIONS)})")
        return
    for pair in pairs:
        for qid in pair:
            if qid not in body:
                failures.append(f"conflict pair {pair}: {qid} not present in the conflict section")


def check_forbidden(text: str, forbidden: list[str], failures: list[str]) -> None:
    """A sentinel hit means the brief invented, recommended, or resolved something."""
    for needle in forbidden:
        for lineno, line in enumerate(text.splitlines(), start=1):
            if needle in line:
                failures.append(f"forbidden string {needle!r} at line {lineno}")


def check_required(
    text: str, sections, required: list[dict[str, str]], failures: list[str]
) -> None:
    for item in required:
        needle, where = item["string"], item.get("section", "any")
        haystack = text if where == "any" else section_text(sections, where)
        if where != "any" and where not in sections:
            failures.append(f"required string {needle!r}: section {where} is missing")
            continue
        if needle not in haystack:
            failures.append(f"required string {needle!r} not found in {where}")


def check_version_stamp(text: str, stamp: dict[str, Any], failures: list[str]) -> None:
    if not stamp:
        return
    for field in stamp.get("required_fields", []):
        if field not in text:
            failures.append(f"version stamp: field {field!r} missing")
    value = stamp.get("model_value")
    if value and value not in text:
        failures.append(f"version stamp: model value {value!r} missing")


def check_fixture(directory: Path) -> list[str]:
    failures: list[str] = []
    assertions_path = directory / "assertions.yaml"
    if not assertions_path.exists():
        return [f"{directory.name}: assertions.yaml missing"]
    a = yaml.safe_load(assertions_path.read_text(encoding="utf-8"))
    brief_path = directory / a.get("reference_brief", "reference-brief.md")
    if not brief_path.exists():
        return [f"{directory.name}: {brief_path.name} missing"]

    text = brief_path.read_text(encoding="utf-8")
    sections = split_sections(text)
    check_claim_coverage(sections, a.get("claim_bearing_sections", []), failures)
    check_register(sections, a.get("expected_in_register", []), failures)
    check_conflicts(sections, a.get("expected_conflict_pairs", []), failures)
    check_forbidden(text, a.get("forbidden_strings", []), failures)
    check_required(text, sections, a.get("required_strings", []), failures)
    check_version_stamp(text, a.get("version_stamp", {}), failures)
    return [f"{directory.name}: {f}" for f in failures]


def check_intake(path: Path) -> list[str]:
    """A filled intake is valid when its Q-IDs are real and the tag mechanic survived editing."""
    failures: list[str] = []
    text = path.read_text(encoding="utf-8")
    valid = known_qids()

    for qid in {m.strip("[]") for m in QID_PATTERN.findall(text)}:
        if qid not in valid:
            failures.append(f"unknown Q-ID {qid} — not defined in intake/themes/")

    blocks = re.split(r"^#### ", text, flags=re.MULTILINE)[1:]
    for block in blocks:
        qid = block.split(" ", 1)[0].strip()
        if not BASIS_RE.search(block):
            failures.append(f"{qid}: two-stage mechanic incomplete — no **Basis:** line")
        if not VERIFICATION_RE.search(block):
            failures.append(f"{qid}: two-stage mechanic incomplete — no **Verification:** line")
        if re.search(r"^\*\*Basis:\*\*.*\(x\)\s*Fact", block, re.MULTILINE | re.IGNORECASE):
            evidence = re.search(r"^\*\*Evidence / Source:\*\*(.*)$", block, re.MULTILINE)
            if not evidence or not evidence.group(1).strip().strip("[]_ "):
                failures.append(f"{qid}: Basis=Fact without an Evidence / Source entry")
    return [f"{path.name}: {f}" for f in failures]


def report(failures: list[str], label: str) -> int:
    if failures:
        print(f"{label}: FAIL")
        for f in failures:
            print(f"  - {f}")
        return 1
    print(f"{label}: OK")
    return 0


def run_fixtures() -> int:
    dirs = sorted(d for d in EXAMPLES_DIR.iterdir() if d.is_dir())
    green, failures = 0, []
    for d in dirs:
        f = check_fixture(d)
        if f:
            failures.extend(f)
        else:
            green += 1
    for f in failures:
        print(f"  - {f}")
    print(f"fixtures: {green}/{len(dirs)} green")
    return 0 if green == len(dirs) == 3 else 1


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="command", required=True)
    p_intake = sub.add_parser("intake", help="validate one filled intake file")
    p_intake.add_argument("file", type=Path)
    sub.add_parser("fixtures", help="run the three fixture assertion sets")
    sub.add_parser("all", help="intake check on every fixture intake, then the assertions")
    args = parser.parse_args(argv)

    if args.command == "intake":
        return report(check_intake(args.file), f"intake {args.file}")
    if args.command == "fixtures":
        return run_fixtures()

    failures = []
    for intake in sorted(EXAMPLES_DIR.glob("*/intake-filled.md")):
        failures.extend(check_intake(intake))
    rc = report(failures, "intakes")
    return max(rc, run_fixtures())


if __name__ == "__main__":
    sys.exit(main())
