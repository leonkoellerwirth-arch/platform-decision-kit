# Commit & branch convention

**Conventional Commits.** One concern per commit, documenting *what* and *why*. Never a sweep
commit that mixes unrelated changes.

```
<type>(<optional scope>): <imperative summary>

<optional body: why, not just what>
```

Types: `feat` `fix` `docs` `test` `refactor` `chore` `ci` `perf` `build`.
Domain repos may add scoped prefixes (e.g. `kapitel(03):`, `bibel:`) — declare them in `BIBLE.md`.

- **Breaking changes** → note in the body (`BREAKING CHANGE:`) and record in `CHANGELOG.md`.
- **Branches** off `main`; never commit directly to `main` on shared repos.
- The gate (`scripts/gate.sh` / `npm run verify:ci`) is green before every commit that closes work.
- Push before ending a session — `scripts/secure.sh` must print `SECURE: all saved`.
