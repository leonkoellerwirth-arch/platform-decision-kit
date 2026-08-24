"""The generated forms must stay a faithful projection of the canonical theme source."""

from __future__ import annotations

import pytest

import render_intake as ri
from qids import GENERATED_BANNER


@pytest.fixture(scope="module")
def themes():
    return ri.load_themes()


def test_all_ten_themes_load(themes):
    assert [t["theme_id"] for t in themes] == list(range(1, 11))


def test_triage_holds_exactly_ten_questions(themes):
    triage = [q for t in themes for q in t["questions"] if "triage" in q["mode"]]
    assert len(triage) == 10, "the triage set is one core question per theme block"
    assert len({q["id"].split(".")[0] for q in triage}) == 10, "one per theme, not two from one"


def test_every_theme_id_appears_in_the_discovery_form(themes):
    rendered = ri.render_discovery(themes)
    for t in themes:
        assert f"## Theme {t['theme_id']} — {t['title']['en']}" in rendered


def test_discovery_renders_every_question(themes):
    rendered = ri.render_discovery(themes)
    for t in themes:
        for q in t["questions"]:
            assert f"#### {q['id']} — " in rendered


def test_triage_form_omits_discovery_only_questions(themes):
    rendered = ri.render_triage(themes)
    for t in themes:
        for q in t["questions"]:
            present = f"#### {q['id']} — " in rendered
            assert present is ("triage" in q["mode"]), f"{q['id']} is in the wrong form"


def test_no_defaults_questions_carry_the_note(themes):
    rendered = ri.render_discovery(themes)
    blocks = rendered.split("#### ")[1:]
    for block in blocks:
        qid = block.split(" ", 1)[0]
        flagged = any(q["no_defaults"] for t in themes for q in t["questions"] if q["id"] == qid)
        has_note = "This field has no defaults" in block
        assert has_note is flagged, f"{qid}: no_defaults note does not match the source flag"


def test_both_forms_carry_the_generated_banner(themes):
    assert ri.render_triage(themes).startswith(GENERATED_BANNER)
    assert ri.render_discovery(themes).startswith(GENERATED_BANNER)


def test_both_languages_are_present_for_every_question(themes):
    rendered = ri.render_discovery(themes)
    for t in themes:
        for q in t["questions"]:
            assert q["text"]["en"] in rendered
            assert f"*[DE] {q['text']['de']}*" in rendered


def test_hypotheses_never_render_as_questions(themes):
    """INV-6: a pattern disguised as a question is a defect."""
    rendered = ri.render_discovery(themes)
    for t in themes:
        for h in t.get("hypotheses", []):
            assert f"#### {h['name']}" not in rendered


def test_committed_files_match_the_source(themes):
    assert ri.check(themes) == 0, "committed intake files have drifted — run render_intake.py all"


def test_drift_is_detected(themes, tmp_path, monkeypatch):
    """The drift check is the mechanism the gate relies on; prove it actually bites."""
    stale = tmp_path / "00-triage.md"
    stale.write_text("stale content", encoding="utf-8")
    monkeypatch.setitem(ri.TARGETS, "triage", (stale, ri.render_triage))
    assert ri.check(themes) == 1
