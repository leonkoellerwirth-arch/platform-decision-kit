"""The assertions must bite. Each red test plants one violation and expects check.py to catch it.

A green-only test suite would prove nothing: an assertion engine that never fails is
indistinguishable from one that always passes.
"""

from __future__ import annotations

import shutil

import pytest
import yaml

import check
from qids import QID_PATTERN


def test_qid_pattern_matches_the_canonical_format():
    assert QID_PATTERN.findall("[Q1.1] and [Q10.6]") == ["[Q1.1]", "[Q10.6]"]


def test_qid_pattern_ignores_quarters_and_bare_ids():
    assert QID_PATTERN.findall("Q3 2026, Q10, [Q11.1], Q1.1") == []


def test_known_qids_cover_all_fifty_five_questions():
    ids = check.known_qids()
    assert len(ids) == 55
    assert "Q1.1" in ids and "Q10.6" in ids


def test_all_three_fixtures_are_green(examples):
    assert len(examples) == 3
    for d in examples:
        assert check.check_fixture(d) == [], f"{d.name} is not green"


def test_every_fixture_intake_is_valid(examples):
    for d in examples:
        assert check.check_intake(d / "intake-filled.md") == []


@pytest.fixture
def planted(tmp_path, examples):
    """Copy a fixture so a violation can be planted without touching the committed one."""

    def _plant(fixture_name: str, old: str, new: str):
        src = next(d for d in examples if d.name == fixture_name)
        dst = tmp_path / fixture_name
        shutil.copytree(src, dst)
        brief = dst / "reference-brief.md"
        text = brief.read_text(encoding="utf-8")
        assert old in text, f"planting precondition failed: {old!r} not in the brief"
        brief.write_text(text.replace(old, new, 1), encoding="utf-8")
        return dst

    return _plant


def test_red_missing_qid_reference(planted):
    d = planted(
        "01-vollstaendig",
        "- Die Auftragsverarbeitung hat sich in sechs Monaten von durchschnittlich 120ms"
        " auf 950ms verschlechtert [Q1.1] (Fakt · Monitoring-Dashboard, Export 2026-08-01).",
        "- Die Auftragsverarbeitung hat sich deutlich verschlechtert.",
    )
    failures = check.check_fixture(d)
    assert any("no Q-ID reference" in f for f in failures)


def test_red_forbidden_recommendation_language(planted):
    d = planted(
        "01-vollstaendig",
        "## Sign-Off",
        "## Sign-Off\n\nOption 2 wird empfohlen.\n",
    )
    failures = check.check_fixture(d)
    assert any("wird empfohlen" in f for f in failures)


def test_red_missing_required_string(planted):
    d = planted("01-vollstaendig", "weiter wie bisher", "Variante Null")
    failures = check.check_fixture(d)
    assert any("weiter wie bisher" in f for f in failures)


def test_red_missing_register_entry(planted):
    d = planted(
        "02-lueckenhaft",
        "| 1 | Verzweigungslogik des COBOL-Payroll-Moduls [Q4.3] |"
        " Code-Analyse oder ehemaliger Betreuer | offen |",
        "| 1 | Verzweigungslogik des Payroll-Moduls | Code-Analyse | offen |",
    )
    failures = check.check_fixture(d)
    assert any("Q4.3" in f and "not listed" in f for f in failures)


def test_red_conflict_pair_removed(planted):
    d = planted(
        "03-widersprüchlich",
        "### Konflikt B — Dauer des Dual-Write [Q8.3]",
        "### Konflikt B — Dauer des Dual-Write",
    )
    d_brief = d / "reference-brief.md"
    text = d_brief.read_text(encoding="utf-8")
    # Strip every remaining Q8.3 mention from the conflict section only.
    head, _, tail = text.partition("## Offene Punkte & Konflikte")
    section, sep, rest = tail.partition("## To-Verify-Register")
    rebuilt = head + "## Offene Punkte & Konflikte" + section.replace("[Q8.3]", "") + sep + rest
    d_brief.write_text(rebuilt, encoding="utf-8")
    failures = check.check_fixture(d)
    assert any("Q8.3" in f for f in failures)


def test_red_version_stamp_removed(planted):
    d = planted(
        "01-vollstaendig",
        "intake_version: v1.0 · prompt_version: — · model: hand-authored reference",
        "",
    )
    failures = check.check_fixture(d)
    assert any("version stamp" in f for f in failures)


def test_red_unknown_qid_in_intake(tmp_path, examples):
    """Q1.9 is syntactically a Q-ID but theme 1 defines only five questions."""
    src = next(d for d in examples if d.name == "01-vollstaendig") / "intake-filled.md"
    dst = tmp_path / "intake-filled.md"
    dst.write_text(src.read_text(encoding="utf-8") + "\nSiehe [Q1.9].\n", encoding="utf-8")
    failures = check.check_intake(dst)
    assert any("unknown Q-ID Q1.9" in f for f in failures)


def test_out_of_range_theme_is_not_a_qid_at_all(tmp_path, examples):
    """[Q12.9] never matches the canonical syntax — themes are bounded at 10 by the regex,
    so an out-of-range reference is invisible to the checker rather than reported."""
    src = next(d for d in examples if d.name == "01-vollstaendig") / "intake-filled.md"
    dst = tmp_path / "intake-filled.md"
    dst.write_text(src.read_text(encoding="utf-8") + "\nSiehe [Q12.9].\n", encoding="utf-8")
    assert check.check_intake(dst) == []


def test_red_broken_tag_mechanic_in_intake(tmp_path, examples):
    src = next(d for d in examples if d.name == "01-vollstaendig") / "intake-filled.md"
    dst = tmp_path / "intake-filled.md"
    text = src.read_text(encoding="utf-8")
    mechanic = "**Verification:** (x) None  ( ) Open  ( ) Blocked"
    text = text.replace(mechanic, "verification: none", 1)
    dst.write_text(text, encoding="utf-8")
    failures = check.check_intake(dst)
    assert any("no **Verification:** line" in f for f in failures)


def test_red_fact_without_evidence(tmp_path, examples):
    """INV-3: a fact needs a source reference, or it is not a fact."""
    src = next(d for d in examples if d.name == "01-vollstaendig") / "intake-filled.md"
    dst = tmp_path / "intake-filled.md"
    text = src.read_text(encoding="utf-8").replace(
        "**Evidence / Source:** Monitoring dashboard, exported 2026-08-01, owned by Ops team.",
        "**Evidence / Source:** ",
        1,
    )
    dst.write_text(text, encoding="utf-8")
    failures = check.check_intake(dst)
    assert any("Basis=Fact without an Evidence" in f for f in failures)


def test_assertions_files_are_wellformed(examples):
    for d in examples:
        a = yaml.safe_load((d / "assertions.yaml").read_text(encoding="utf-8"))
        assert a["fixture_id"] == d.name
        assert a["claim_bearing_sections"]
        assert a["forbidden_strings"]
        assert a["version_stamp"]["model_value"] == "hand-authored reference"
