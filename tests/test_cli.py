"""The CLI runs and greets — the seed test that keeps the gate green from commit #1."""

from __future__ import annotations

from click.testing import CliRunner

from platform_decision_kit.cli import main


def test_hello_default() -> None:
    result = CliRunner().invoke(main, ["hello"])
    assert result.exit_code == 0
    assert "paved road" in result.output


def test_hello_named() -> None:
    result = CliRunner().invoke(main, ["hello", "--name", "Leon"])
    assert result.exit_code == 0
    assert "Leon" in result.output


def test_backend_fixture(backend) -> None:
    assert backend("please greet the user") == "hello"
    assert backend("anything else") == "OK"
