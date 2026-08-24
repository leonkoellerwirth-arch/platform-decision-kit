"""Command-line entry point for platform-decision-kit."""

from __future__ import annotations

import click
from rich.console import Console

from . import __version__

console = Console()


@click.group()
@click.version_option(__version__)
def main() -> None:
    """A minimal, fully-local Python service on the paved road."""


@main.command()
@click.option("--name", default="world", help="Who to greet.")
def hello(name: str) -> None:
    """A first command, so the CLI runs green from commit #1."""
    console.print(f"hello, {name} — platform-decision-kit is on the paved road.")


if __name__ == "__main__":
    main()
