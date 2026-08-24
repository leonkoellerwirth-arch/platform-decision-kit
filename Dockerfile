# The reference environment for this repository's deterministic checks.
#
# The gate is the release condition ("fixtures: 3/3 green"), so it has to produce the same
# verdict on any machine — not only on the one that happens to have the right Python, ruff and
# shellcheck installed. This image is that machine.
#
# Deliberately NOT a runtime image: nothing in this repository is a service. The container runs
# the checks and exits. The web instrument (Phase 2) runs from the plain node image in
# docker-compose.yml; it has no Dockerfile of its own because it has no build-time dependency
# worth pinning here.
FROM python:3.11-slim AS tools

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# git — scripts/gate.sh walks the tracked file list and greps the history.
# shellcheck — without it the gate silently *skips* the shell surface, which is the one check
# most likely to rot unnoticed. In here it is always enforced.
RUN apt-get update \
 && apt-get install -y --no-install-recommends git shellcheck \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /kit

# Dependencies first: a document-only change must not reinstall anything.
COPY pyproject.toml ./
RUN pip install --no-cache-dir ".[dev]"

# The repository is bind-mounted at /kit and carries the host user's ownership; without this,
# git refuses to read it ("dubious ownership") and every git-based check would fail as if the
# repository were broken.
RUN git config --global --add safe.directory /kit

CMD ["bash", "scripts/gate.sh"]
