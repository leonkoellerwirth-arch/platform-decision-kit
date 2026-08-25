"""The fixtures become loadable cases without being reinterpreted on the way."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "tools"))

import render_cases  # noqa: E402


@pytest.fixture(scope="module")
def rendered() -> dict[str, dict]:
    return {p.stem: json.loads(t) for p, t in render_cases.render().items()}


def test_every_fixture_becomes_a_case(rendered):
    assert set(rendered) == {"retailcore", "legacyhr", "paymenthub"}


def test_committed_cases_match_their_fixtures():
    """The same mechanic INV-5 uses on the forms: generated, diffed, never hand-edited."""
    assert render_cases.main(["all", "--check"]) == 0


def test_a_case_carries_every_answer_the_fixture_filled(rendered):
    for case in rendered.values():
        assert len(case["answers"]) == 55
        assert all(a["basis"] for a in case["answers"].values())


def test_the_later_fields_arrive_empty_not_guessed(rendered):
    """An open point does not acquire an owner because the register would read tidier."""
    for case in rendered.values():
        for a in case["answers"].values():
            for field in render_cases.LATER_FIELDS:
                assert a[field] == "", field


def test_only_the_contradictory_fixture_carries_conflicts(rendered):
    marked = {
        name: sorted(q for q, a in c["answers"].items() if a["conflict"])
        for name, c in rendered.items()
    }
    assert marked["paymenthub"] == ["Q2.5", "Q8.3"]
    assert marked["retailcore"] == []
    assert marked["legacyhr"] == []


def test_the_conflict_marks_come_from_the_assertions_not_from_the_prose():
    """One statement of which questions contradict, shared with check.py."""
    d = render_cases.EXAMPLES_DIR / "03-widersprüchlich"
    assert render_cases.conflict_qids(d) == {"Q2.5", "Q8.3"}


def test_the_decision_head_survives_the_table(rendered):
    head = rendered["retailcore"]["head"]
    assert set(head) == {
        "decision_question",
        "decision_owner",
        "in_scope",
        "out_of_scope",
        "deadline",
    }
    assert head["decision_question"].endswith("?")


def test_no_case_invents_a_direction_or_an_inventory(rendered):
    """The fixtures record neither. Converting one does not create either."""
    for case in rendered.values():
        assert case["directions"] == []
        assert case["rows"] == []


def test_a_double_tick_is_an_error_not_a_guess():
    block = "Q9.9 — x\n\n**Basis:** (x) Fact  (x) Statement\n"
    with pytest.raises(SystemExit, match="more than one option"):
        render_cases.chosen(block, "Basis", render_cases.BASIS, "Q9.9")
