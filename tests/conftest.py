"""Shared fixtures. Heavy deps (models/LLMs) are faked here so tests run fully offline.

Real-model tests are tagged `@pytest.mark.slow` and excluded from the gate and CI.
"""

from __future__ import annotations

from collections.abc import Callable

import pytest


class ScriptedBackend:
    """A fake LLM/model backend that routes by prompt marker and returns canned output.

    Replace the routing with your real prompt markers as the service grows.
    """

    def __init__(self, replies: dict[str, str] | None = None) -> None:
        self._replies = replies or {}

    def __call__(self, prompt: str) -> str:
        for marker, reply in self._replies.items():
            if marker in prompt:
                return reply
        return "OK"


@pytest.fixture
def backend() -> Callable[[str], str]:
    return ScriptedBackend({"greet": "hello"})
