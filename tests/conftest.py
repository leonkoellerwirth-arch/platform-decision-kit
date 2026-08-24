"""Shared fixtures. Everything here is offline — this repo makes no model call, by invariant.

Real-model tests would be tagged `@pytest.mark.slow` and excluded from the gate and CI.
There are none: `tools/check.py` validates hand-authored reference outputs, never a live agent.
"""

from __future__ import annotations

from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parent.parent


@pytest.fixture(scope="session")
def repo() -> Path:
    return REPO


@pytest.fixture(scope="session")
def examples(repo: Path) -> list[Path]:
    return sorted(d for d in (repo / "examples").iterdir() if d.is_dir())
