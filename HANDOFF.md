# HANDOFF — platform-decision-kit

Session handoffs, **newest entry first**. Written by `/session-stop` (via
`scripts/session-snapshot.sh`). Read the top entry at `/session-start`.

## 2026-08-24 — Session 5 (second pass on the board — UNCOMMITTED)

_HEAD 0c674a0 · working tree DIRTY on purpose · gate PASS (15) · fixtures 3/3 · 27 tests_

- **Stack:** Tailwind v4 (`tailwindcss` + `@tailwindcss/vite`) adopted, matching
  `rag-approval-blueprint/app` — Band 2 of the same series. That unlocks the house utility
  bridge, which DESIGNSYSTEM.md lists as un-promoted precisely because it needs Tailwind v4:
  `app/src/styles/ui.css` is now ported from Band 2 (origin noted in its header) and carries
  `lk-card` / `lk-panel` / `lk-input` / `lk-btn` and the signature surfaces. New entry point
  `app/src/index.css`.
- **HeroUI v3.2.4 adopted**, on Leon's explicit reaffirmation ("ich möchte HeroUI mit TailWind
  das ist wichtig fürs Design und Das Gefühl") after a first pass had declined it. The
  objection that was raised is obsolete for v3: it is built on react-aria-components, needs no
  Provider and no framer-motion, and requires exactly the Tailwind v4 + React 19 this app runs.
  The palette objection is answered by `app/src/styles/heroui-bridge.css`: HeroUI derives
  almost its whole surface by `color-mix` from a small set of semantic tokens, and five of
  those (`--surface`, `--muted`, `--accent`, `--warning`→`--warn`, `--danger`) are already the
  house's own names. The bridge sets the rest from `theme.css` in all three scopes
  (`:root`, `paper`, `ink`) — unlayered, so it beats HeroUI's `@layer base` defaults without
  depending on import order. Verified in the browser: `--accent` `#3a78b0` / `#5aa0db`,
  `--warning` `#b06f1f` / `#d8a23e`, `--focus` brass in both, and a HeroUI primary button
  computes to house blue with the correct foreground in paper *and* ink.
  Two bridge decisions worth keeping: `--accent-foreground: var(--surface)` is DESIGNSYSTEM.md's
  own documented answer to text-on-accent, and `--default` maps to `--bg`, not `--surface-2` —
  mint is the house's *secondary accent* and carries meaning; as the ground under every neutral
  control it turned the whole bar green.
  **Preflight comes in with `@heroui/styles`.** It sits in `@layer base`; `styles.css` is
  unlayered and therefore untouched. Checked by eye across all three views, not only by cascade
  argument.
- **The evidence grid, second pass** (`EvidenceGrid.tsx` + the grid section of `styles.css`),
  fixing the two weak points named in Session 4 plus two more:
  1. Row tints are gone. A filled grey row reads "disabled" in every convention there is —
     the opposite of "work outstanding". Verification colour now lives on the row head's edge
     bar (quiet · brass · signal) and, inside the board, only on the chosen cell.
  2. The column glyph is drawn once, in its head. Twelve repetitions of four shapes said
     nothing. A cell is a quiet target: a hairline dot, the glyph at 45% on hover as a preview
     of the pick, solid once chosen.
  3. INV-4 is *drawn*: the two forbidden cells of the unknown column are struck through and
     recessed, so "the rule forbids this" no longer looks like "this row is passive".
     `aria-disabled` rather than `disabled`, so the rule can explain itself on hover.
  4. The pair reads back in words under the board ("Aussage · offen") with a reset.
- **Bug gefunden und behoben: ein Reload leerte die ganze Erhebung.** Der Zustand wurde in
  einem Mount-Effekt aus `localStorage` geladen, während die Persist-Effekte schon beim ersten
  Render feuerten und den *leeren* Anfangszustand über das Gespeicherte schrieben. In der
  Produktion überlebten die Daten nur durch Timing — der nächste Render schrieb sie zurück;
  unter StrictMode (Dev, Doppel-Mount) las der zweite Mount das `{}`, das der erste gerade
  persistiert hatte, und das Formular war leer. `answers`, `head`, `rows` und `mode` werden
  jetzt per Lazy-Initialiser gelesen, der Mount-Effekt ist weg. Nachgeprüft: nach zwei Reloads
  weiter `55/55 beantwortet`, `pdk.answers` unverändert 10.633 Zeichen, Deck rendert 7 Folien.
  Gefunden wurde er nur, weil der E2E-Stand in einen frischen Browser geladen wurde — im
  Skript-Lauf selbst lag alles im React-State und fiel nicht auf.
- **Fable-5-Review des Decks** liegt in `.planning/DECK-REVIEW.md` (425 Zeilen, Befund je
  Folie, dramaturgische Linie, visuelles System, „die eine Sache", und ausdrücklich was sie
  *nicht* vorschlägt). **`.planning/` ist NICHT git-ignoriert** — anders als
  `ARCHITECTURE-SPEC.md`. Wenn die Review interner Entwurf bleiben soll, gehört sie in
  `.gitignore`; das ist Leons Entscheidung und noch offen.
- **Umgesetzt: semantische Kartenüberschriften und der Sign-off nach vorn.** Fast jede Karte
  war mit ihrer Frage-ID überschrieben — „Q9.5". Der Auditor braucht die ID, der Vorstandsraum
  findet daran keinen Anker. Die IDs bleiben **inline im Antworttext** (`[Q9.5]`), wo die
  Rückverfolgung stattfindet; nur die Überschrift wird vom Fundort zum Namen: Erfolgsdefinition,
  Wer urteilt, Im Scope, Außerhalb des Scope, Rückweg, Irreversibilitäts-Bewertung,
  Plattformverantwortung, Schlüsselpersonen, Informelle Veto-Kette. Neun neue i18n-Paare,
  keine Logik-, keine Spezifikationsänderung, kein Invariantenrisiko. Der Sign-off — der
  rechtlich wichtigste Satz — stand kursiv-grau *nach* 39 Tabellenzeilen und führt jetzt
  Folie 7 an, in `--accent-soft` gerahmt, aufrecht, 1rem. **Wortlaut unverändert**, der Gate
  prüft ihn wörtlich.
- **Aus der Review noch offen:** Folie 4 nach den zehn Intake-Themen gruppieren (39 Zeilen →
  10 Blöcke, 4–6 h) — Fable hält es für INV-7-konform, weil es das Themenschema aus
  `themes.json` benutzt und keine eigene Taxonomie; das ist die Kante der Invariante und
  braucht Leons Entscheid. Ebenso offen: Q2.5 auf Folie 2 ergänzen, farbige Basis-Tag-Pills,
  `blocked`-Rand auf Karten, „Mini-Dateninventar: 4" entfernen.
- **Der Präsentationsreiter IST die Präsentation.** Erste Fassung war ein Stapel zum
  Scrollen, auf die Lesebreite der Erhebung (900px) begrenzt — zweimal die falsche Form:
  eine Folie ist quer, ein Deck ist geblättert, und eine Spalte hochkantiger Karten ist
  keines von beidem. Der Reiter zeigt jetzt **eine 16:9-Folie über die volle Breite**,
  Pfeiltasten zum Blättern, Punkte zum Springen; „Präsentieren" bittet nur noch um Vollbild.
  Kein Modus zum Entdecken, nichts zu scrollen. `.main-wide` nimmt exakt die Resthöhe und
  schneidet ab statt zu wachsen. Das Seitenverhältnis kommt aus Container-Query-Einheiten
  (`width: min(100cqw, 100cqh * 16 / 9)`) statt aus Viewport-Rechnerei — nachgemessen 1,78
  bei 1680×1050, 1440×900 und 1280×800, Seite scrollt in keinem Fall.
- **Präsentationsmodus gebaut — das Deck verhält sich jetzt wie PowerPoint.** Knopf
  „Präsentieren" im Deck-Reiter: feste 16:9-Bühne, eine Folie, ← → / Leertaste / Bild auf-ab /
  Pos1 / Ende, `F` für Vollbild (Fullscreen-API), `Esc` beendet, Punkte-Navigation und
  Folienzähler. Die Tastenbelegung ist nur aktiv, solange präsentiert wird, damit sie die
  1–4 / Q-W-E des Formulars nicht verdeckt. Die Folie ist eine **feste Leinwand von
  1280 × 720**, die als Ganzes skaliert wird — die erste Fassung maß den Inhalt, skalierte
  ihn und veränderte damit das, was sie gerade gemessen hatte; sie landete auf jeder Folie
  am Schrumpfboden. Der Stapel bleibt darunter montiert, weil der Druck den Stapel druckt.
- **README für das öffentliche Repo neu geschrieben**, durch den Humanizer gezogen (Wikipedia
  „Signs of AI writing"): keine Gedankenstriche außer in der bindenden deutschen Zusage, keine
  Verkaufssprache („in der agentischen Ära" raus), keine fetten Mini-Überschriften, keine
  Dreiergruppen um der Form willen. Die bindende Vertraulichkeitszeile steht wörtlich; der Gate
  prüft sie mit `grep -qF` und ist grün. **Ein Sachfehler war drin:** „It has two views" — die
  App hat drei (Intake, Register, Präsentation). Neu beschrieben sind außerdem das Beleggitter,
  der Präsentationsmodus, die nachprüfbare Offline-Eigenschaft (der dist-grep steht als Rezept
  im README) und der Versionsstempel. Klon-URL:
  `https://github.com/leonkoellerwirth-arch/platform-decision-kit.git`.
  **Kein Remote gesetzt, nichts gepusht** — das ist Leons Entscheidung, wie Schritt 11.
- **Die Fußzeile klappt weg.** Drei Zeilen Vertrauenstext standen dauerhaft unter jeder Ansicht.
  Jetzt: ein Info-Icon plus der Build-Stempel, **43px** statt ~110px; ein Klick klappt den Text
  auf (138px) und wieder zu. Der Stempel bleibt sichtbar, damit ein Screenshot sagt, welcher
  Build ihn erzeugt hat. Das Antwortfeld in Triage wächst dadurch auf **424px**.
- **Die Erhebung füllt jetzt das Fenster.** Unter der Karte standen in Triage 385px Nichts —
  ein Triage-Block hat genau eine Frage, und die Karte hörte auf, bevor das Fenster es tat.
  `.main-intake` ist eine Flex-Spalte, die Karte `flex: 1`, und den Zugewinn bekommt nicht die
  Polsterung, sondern **das Antwortfeld**. Der Haken war `align-items: start` auf dem
  Fragenraster: ohne `align-items: stretch` auf der letzten Frage blieb die Schreibspalte so
  hoch wie ihr Inhalt und die zusätzliche Höhe kam nie unten an. Das Gitter behält
  `align-self: start`. Nachgemessen bei 1680×1050: Antwortfeld **377px** (vorher 160),
  Lücke Karte→Fuß **40px** (vorher 385), Seite scrollt nicht. Bei 1400px Höhe wächst das Feld
  auf 683px mit. In Discovery ist nichts zu verteilen — sieben Fragen je Block überschreiten
  das Fenster ohnehin, die Regeln tun dort nichts.
- **Platz nutzen statt quetschen (Leons Runde).** Gemessen vorher bei 1680×1050: `.main` auf
  900px gedeckelt → Textspalte **428px**; Antwortfeld 72px hoch bei 113px Inhalt → eigener
  Scrollbalken, Sätze mittendrin abgeschnitten; Beleg/Quelle ein Einzeiler, der seitwärts
  scrollte; **471px freies Fenster** darunter; und ein breiter Primärknopf „Als Markdown
  exportieren" unter der Karte. Nachher: `.main` **1400px**, Textspalte **886px**, Gitter
  **368px**; Antwort- **und** Belegfeld wachsen mit ihrem Inhalt (`useAutoGrow`,
  `resize: none`, `overflow: hidden`) — **kein Feld scrollt mehr in sich selbst**, in Triage
  wie Discovery nachgemessen. Das Lesemaß sitzt jetzt auf dem Fragetext (`max-width: 62ch`),
  nicht mehr auf der Seite. Senkrecht: die Antwort startet mit 8,5rem Schreibfläche, die
  Gitterzellen auf 3,3rem. Der Export ist ein Icon in der Werkzeugleiste — eine Werkzeugaktion
  gehört dorthin und nicht als Primärknopf unter das Formular; das Kopieren-Feld erscheint
  weiterhin, aber erst wenn es ein Ergebnis gibt.
- **Die Erhebung war zu eng gebaut — auch das hat Leon gesehen.** Gemessen bei 1680×1050:
  `.main` auf 900px gedeckelt, davon 336px Beleggitter, sodass für den Satz **428px** blieben;
  das Antwortfeld 72px hoch bei 113px Inhalt, also ein eigener Scrollbalken, der Sätze
  mittendrin abschnitt — bei **471px freiem Fenster** darunter. Drei Änderungen: `.main` auf
  1240px (die Textspalte geht auf **761px**), das Lesemaß wandert vom Seitenrahmen auf den
  Fragetext selbst (`.qtext { max-width: 62ch }`), und das Antwortfeld wächst mit seinem
  Inhalt (`useAutoGrow`, `resize: none`, `overflow: hidden`). Nachgemessen in Triage und
  Discovery: **kein Feld scrollt mehr in sich selbst**. Der breitere `.main` kommt auch dem
  Register zugute, dessen Totraum auf breitem Desktop seit Session 4 offen stand.
- **Bug, den Leon gefunden hat: der Druck gab nur die sichtbare Folie aus.** Der
  Präsentationsreiter passt sich am Bildschirm in die Restviewporthöhe ein und schneidet ab
  (`.main-wide { flex: 1 1 0; overflow: hidden }`) — richtig für einen Vortrag, falsch für ein
  Blatt: das Papier erbte die 1050px-Box, der 8114px hohe Stapel wurde abgeschnitten, und aus
  sieben Folien wurde **eine** PDF-Seite. Der Druckblock hebt die Bildschirmgeometrie jetzt
  ausdrücklich auf (`.app`, `.main-wide`, `.deck` wieder auf `display: block`, `height: auto`,
  `overflow: visible`). Nachgemessen: 14 Seiten aus der App **und** aus der Einzeldatei,
  alle sieben Folien enthalten. Merksatz für das nächste Mal: Druck fließt, nur Bildschirme
  haben einen Viewport — jede `overflow: hidden`-Höhe im Bildschirmlayout muss im Druckblock
  zurückgenommen werden.
- **Druck: eine Seite = eine Folie.** `@page { size: 1280px 720px }` — die Seite *ist* die
  Folie, damit braucht der Druck keine Umbruchhinweise mehr. Aus 18 A4-Seiten mit drei
  gestrandeten Überschriften sind 14 Folienseiten geworden; fünf der sieben Folien passen
  exakt, die zwei Listenfolien (nicht entschiedene Richtungen, offene Punkte) laufen über.
  Bewusst **kein** `overflow: hidden` im Druck: eine Folie mit zu viel Inhalt darf auf ein
  zweites Blatt laufen, aber niemals ihren Schwanz verlieren.
- **Druck-Layout des Decks korrigiert, aber nicht fertig.** `.slide` ist am Bildschirm ein
  Flex-Container mit `overflow: hidden` — beides verhindert Paginierung: Chromium ignoriert
  `break-*` in Flex-Containern, und eine abgeschnittene Box fragmentiert gar nicht. Im Druck
  ist die Folie jetzt ein normaler Block mit sichtbarem Overflow, Karten brechen nicht mehr
  mitten durch, und die Folio-Marke bleibt bei ihrer Folie. Offen: sieben Folien ergeben
  18 A4-Seiten, und drei Überschriften landen allein auf einer Seite, weil ihr Inhalt höher
  ist als eine Seite. Eine saubere Lösung braucht ein echtes Seitenlayout (feste Folienhöhe,
  skalierter Inhalt) — das ist die „vollständig gestaltete Präsentation", die HANDOFF Session 3
  ausdrücklich nach v0.1.0 verschoben hat.
- **The build stamps its own identity.** `vite.config.ts` defines `__APP_VERSION__` (from
  `package.json`) and `__APP_COMMIT__` (`git rev-parse --short HEAD`, with a trailing `+` when
  the working tree is dirty, and `""` when git is unavailable). It renders as a quiet monospace
  chip next to `PDK` in the bar and again in the footer — right now `v0.1.0 · 0c674a0+`, whose
  `+` is the honest signal that this is the uncommitted review build. Needed `@types/node` and
  `"types": ["vite/client", "node"]` in `tsconfig.json`. Two questions come up in every review of
  a browser-only instrument — "which version is this?" and "is this the build you sent me?" —
  and a folder of static files answers neither.
- **One bar instead of three bands.** Brand, mode, view, meters and both toggles share a single
  sticky row; the block rail moved into the block card's own header, between the arrows —
  it navigates that card, not the app. The first question now starts at **218px** instead of
  ~560px on a 1440px screen (834px tablet: 270px). Measured, not estimated.
- **Where HeroUI is actually used:** the mode and language segments (`ToggleButtonGroup`), the
  view switcher (`Tabs` with its sliding indicator — note `Tabs.Indicator` belongs *inside each
  `Tabs.Tab`*, not in the list; in the list it throws `<SharedElement> must be rendered inside a
  <SharedElementTransition>` and takes the whole tree down), the theme and arrow buttons
  (`Button isIconOnly`), the answer and source fields (`TextArea`, `TextField`+`Input`), the
  register/readout/marker chips (`Chip`), and a `Tooltip` on the struck cells — the one place
  the board has a rule to explain, which a `title` attribute could not do on a disabled button.
  The grid cells themselves stay bespoke `<button>`s: HeroUI's `.button` base is
  `h-10 rounded-3xl px-4 whitespace-nowrap`, which is the opposite of a square flush cell.
- **The question card is two columns from 62rem up:** the sentence left, the board right. A
  question was costing about a screen and a half; fifty-five of them cost a day of scrolling.
  Stacked below that breakpoint, board capped at 34rem. `pointer: coarse` hides the 1–4/Q/W/E
  hints and lifts the cells to 3rem — the iPad is where this is used.
- **No raw colour left in `styles.css`:** `grep '#[0-9a-fA-F]\{3,6\}'` and the rgba literals
  both return nothing. The register tags and the mini-map used hard-coded copies of
  `--brass`/`--signal` that did not follow the theme into `ink`; they are `color-mix` over
  tokens now. `theme.css` is the only file with hex, as the design system requires.
- **Verified, not reported:** `GATE: PASS` (15 checks, budget ceiling included). `npm run build`
  green. A grep over `dist/` for `fetch(`/`XMLHttpRequest`/`EventSource`/`WebSocket`/
  `sendBeacon` returns nothing — INV-10 holds with Tailwind *and* HeroUI in the bundle. The only
  external hosts anywhere in `dist/` are `react.dev` (an error message), `tailwindcss.com` (a
  licence banner) and `www.w3.org` (the SVG namespace). Bundle cost of HeroUI: JS 264kB → 454kB
  raw (84kB → 142kB gzip), CSS 31kB → 442kB raw (7kB → 45kB gzip). For a browser-only instrument
  that is loaded once, that is a trade, not a defect — but it is Leon's call whether to trim to
  per-component style imports. (`dist/*.css` does contain the string
  `https://tailwindcss.com`: it is the MIT licence banner comment, not a request.) Screenshots
  taken in paper *and* ink, DE *and* EN, 1440px desktop and 834px tablet portrait, on a
  seven-question Discovery block; no console or page errors.
- **Still open:** Step 11 — tag `v0.1.0` + GitHub release. Outward-facing, needs an explicit go.
  Briefing deadline: 2026-08-25 evening. The register view's dead space on wide desktop is
  untouched — `.main` is still capped at 900px, and widening it affects the deck too.
- **Next:** Leon's verdict on the board, then the release.
- **Continuity warnings:** dev server `cd app && npm run dev` (port 5281, strict), `--host` for
  iPad. The question set lives outside the app root, hence `server.fs.allow: ['..']`.

## 2026-08-24 — Session 4 (the app redesign — UNCOMMITTED)

_HEAD 0c674a0 · working tree DIRTY on purpose · gate PASS_

- **Read `~/dev/base/standards/extra/DESIGNSYSTEM.md` before touching the UI.** Its first line is
  "Vor jedem UI-Bau zuerst hierher schauen. Nichts neu erfinden." This session ignored that,
  invented a palette, and had to undo it. `app/src/styles/theme.css` is now a verbatim copy of
  the house tokens; do not edit it locally.
- **Uncommitted in the working tree** (`app/src/App.tsx`, `styles.css`, `i18n.ts`,
  `EvidenceGrid.tsx`, `styles/theme.css`): the redesign. Not committed because Leon wanted to
  look at it first — that review had not happened when the session ended.
  - one theme block at a time with a 1–10 stepper, instead of a 55-row scroll
  - the two tag axes as a 4×3 matrix (cell sets both, column/row head sets one). INV-4 is drawn,
    not just enforced: the unknown column is selectable only in the "open" row — verified live.
  - the to-verify register as its own view with a counter
  - `paper` / `ink` themes from the house tokens
- **Known weak points, already named to Leon and not yet fixed:**
  1. The register view has a lot of dead space on wide desktop.
  2. The matrix's verification rows are grey; they should carry amber (open) / red (blocked) so
     they read as "work outstanding" rather than "disabled".
- **Still open:** Step 11 — tag v0.1.0 + GitHub release. Outward-facing, needs an explicit go.
- **Next:** get Leon's verdict on the redesign, fix the two points above, then decide the release.
- **Continuity warnings:** dev server is `cd app && npm run dev -- --port 5291 --strictPort`;
  add `--host` for iPad. The dev server needs `server.fs.allow: ['..']` because the question set
  lives outside the app root.

## 2026-08-24 — Session 3 (one source · discovery · the deck)

_HEAD 455aec9 · gate PASS · fixtures: 3/3 green · 27 tests_

- **Done — the three open app items:**
  1. `app/src/themes.ts` is now a loader over `intake/themes.json`, not a second copy.
     Verified: the bundle carries the question text and no `fetch(`.
  2. Discovery mode is real — all 55 questions, plus Entscheidungskopf, mini data inventory,
     stop conditions, and hypotheses (English, explicitly marked).
  3. Presentation view: the seven-slide skeleton (Output B) projected verbatim from the form,
     with a print stylesheet for PDF. Layout vocabulary after Presenton (Apache-2.0); its
     runtime (backend + LLM) deliberately stays out, per INV-10.
- **Source change:** `red_flags` and `stop_conditions` are bilingual now. Deviates from
  ARCHITECTURE-SPEC §3.2 on purpose; recorded in BIBLE.
- **Still open:**
  1. **Step 11 — tag v0.1.0 + GitHub release.** Outward-facing, needs an explicit go.
     Briefing deadline: 2026-08-25 evening.
  2. The deck is a *skeleton*, by design: structure and evidence, no narration. If a fully
     designed deck is wanted, that is a separate decision — and the honest place for it is
     after v0.1.0.
  3. `app/` has no test suite; `verify:ci` is typecheck + build only. The Python side carries
     the 27 tests.
- **Next:** decide the release.
- **Continuity warnings:** `./start.sh --app --host` for the web instrument. The dev server
  needs `server.fs.allow: ['..']` because the question set lives outside the app root.

## 2026-08-24 — Session 2 (the instrument itself)

_HEAD faab537 · gate PASS · fixtures: 3/3 green · 27 tests_

- **Done:** Spec steps 2–10. `intake/themes/` (10 themes, 55 questions, bilingual),
  `tools/render_intake.py` (+ drift check), `tools/check.py` (offline), three fixtures with
  hand-authored reference briefs and assertions, `pipeline/presentation-agent.md`, README with
  the confidentiality wording verbatim, ADR 0001, 27 tests, five repo-specific gate checks.
- **Recovered:** `ARCHITECTURE-SPEC.md` (1868 lines) existed only in a dead session's scratchpad.
  It is now in the repo root and git-ignored (internal blueprint, not a public artifact).
- **Open — carried over, not yet started:**
  1. **Presenton.** The last request of session 1 never reached the agent (terminal closed while
     it sat in the queue): no Markdown as the final output, a finished presentation inside the
     app instead, using https://github.com/presenton/presenton for the deck design.
  2. **App reads `themes.ts`, not `intake/themes.json`.** ARCHITECTURE-SPEC §11.2 wants the app
     fed from the generated JSON. Today the two are consistent by hand, which is exactly the
     drift INV-5 exists to prevent — wire it before v0.1.0.
  3. Discovery mode in the app (triage mode only so far).
  4. Step 11: tag v0.1.0 + GitHub release. Not done — outward-facing, needs a go.
- **Next:** decide 1 and 2 above, then release.
- **Continuity warnings:** run `./start.sh --app --host` for the web instrument; Docker path is
  the reference gate.

## 2026-08-24 — Session 0 (scaffold)

_HEAD — · commits-ahead — · gate PASS · secure: pending first push_

- **Done:** Repo scaffolded from `base` (python-service template).
- **Decided:** Adopt the paved road — backbone gate, session skills, canonical agent config.
- **Open:** Fill in the first real feature scope in `BIBLE.md`.
- **Next:** `./setup.sh` (or `npm ci`), run `./scripts/gate.sh`, first commit + push.
- **Continuity warnings:** none yet.
