---
name: context
description: 'Measure the REAL context usage of the running Claude Code session (from the usage tokens in the session transcript) and advise when restarting with fresh context beats pushing on. Warns at 60%, urgent at 80%. Zero AI, zero tokens. Trigger: "context", "context fill", "how full is the context", "session usage", "should I restart", "new session", "am I at the context limit", "how much room left", "Kontext", "wie voll ist der Kontext".'
allowed-tools: Bash, Read
---

# context

Run `./scripts/context.sh` and show the output.

**What the script measures (it does not estimate):** Claude Code writes the true token counts
(`usage`) of every message into the session transcript. The most recent `usage` line carries
`input_tokens + cache_creation_input_tokens + cache_read_input_tokens` = the complete prompt of the
last turn = the current context occupancy. The script reads exactly that number and puts it in
relation to the window (default 1,000,000 = Opus 4.8 · 1M).

**Then classify, briefly and honestly:**

- **🟢 under 60%** — keep working, plenty of room. No reason to restart.
- **🟡 60–80%** — good moment to **finish the current unit of work**, then start a fresh session
  (`/session-stop` → new session with `/session-start`). Don't break off mid-task.
- **🔴 over 80%** — context at the limit; the model works more precisely with fresh context. Save
  **now** (`/session-stop`) and continue in a new session.

**Timing:** the best switch is at a **natural seam** — after a committed unit of work, not mid
gate-chain or mid-refactor. If 🟡/🔴 coincides with open work: finish and commit that unit first,
then switch.

**Invent nothing** — use only the script's number and the thresholds. If the script finds no usage
data (fresh session), say so and give the all-clear.

Thresholds and window are overridable via env (`CONTEXT_WARN`, `CONTEXT_CRIT`, `CONTEXT_WINDOW`)
if the model has a different window.

## Optional: warn automatically

Wire the quiet hook mode into `.claude/settings.json` — it prints only at/above the warn threshold:

```json
{ "hooks": { "Stop": [ { "hooks": [ { "type": "command",
  "command": "cd \"$CLAUDE_PROJECT_DIR\" && ./scripts/context.sh --hook 2>/dev/null || true" } ] } ] } }
```
