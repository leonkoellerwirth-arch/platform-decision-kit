// Rebuild the published worked example from `demo/case.json`.
//
// The two Markdown files under `demo/` are the app's own export, and for one release they
// were produced by a script beside the repository that re-derived the same document from
// the same data — a second implementation, with its own labels, its own idea of which
// fields exist, and no gate to catch the drift. It drifted: the published example lost the
// sources on all thirty-three of its facts and the instrument flagged them as defects on
// the very case meant to show a careful pass.
//
// So this runs the app's `exportMarkdown`, bundled out of `src/` by esbuild — the same
// function the button calls, over the same case file the button loads. Nothing is restated
// here except the file names.
//
//     npm run demo:build              writes the two files
//     npm run demo:build -- --check   exits 1 if what is committed has drifted
//
// The deck PDF beside them is the browser's print dialogue and is not built here; it is
// refreshed by hand from the deck view.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const HERE = dirname(fileURLToPath(import.meta.url));
const APP = resolve(HERE, "..");
const REPO = resolve(APP, "..");

// Vite's own SSR loader rather than a second toolchain: it resolves the TypeScript and the
// `intake/themes.json` import exactly as the browser build does, so what runs here is the
// module the app ships and not a re-compilation of it.
const server = await createServer({
  root: APP,
  configFile: false,
  appType: "custom",
  logLevel: "warn",
  server: { middlewareMode: true, hmr: false, watch: null },
});
const { exportMarkdown } = await server.ssrLoadModule("/src/export.ts");

// THEMES is re-derived here rather than imported, because `themes.ts` pulls in nothing else
// and the shape is the generated JSON's own. Mode filtering is the app's rule: a question
// belongs to the export when the mode asks it.
const source = JSON.parse(readFileSync(resolve(REPO, "intake/themes.json"), "utf-8"));
const kase = JSON.parse(readFileSync(resolve(REPO, "demo/case.json"), "utf-8"));

const flat = (s) => s.replace(/\s+/g, " ").trim();
const themes = source.themes
  .map((t) => ({
    id: t.theme_id,
    title: t.title,
    questions: t.questions
      .filter((q) => q.mode.includes(kase.mode))
      .map((q) => ({ id: q.id, text: q.text })),
  }))
  .filter((t) => t.questions.length > 0);

const check = process.argv.includes("--check");
let drift = 0;

for (const lang of ["en", "de"]) {
  const path = resolve(REPO, `demo/intake-filled.${lang}.md`);
  const text =
    exportMarkdown({
      lang,
      mode: kase.mode,
      themes,
      answers: kase.answers,
      head: kase.head,
      directions: kase.directions ?? [],
    }) + "\n";

  if (check) {
    const committed = readFileSync(path, "utf-8");
    if (committed !== text) {
      console.error(`drift: demo/intake-filled.${lang}.md differs from demo/case.json`);
      drift = 1;
    }
  } else {
    writeFileSync(path, text, "utf-8");
    console.log(`wrote demo/intake-filled.${lang}.md (${text.split("\n").length} lines)`);
  }
}

// A published example that flags defects on itself is worse than no example. This is the
// assertion that failure earned: every fact in the case carries something that says where
// it came from.
const unsourced = Object.entries(kase.answers).filter(
  ([, a]) =>
    a.basis === "fact" &&
    ![a.source, a.artifact, a.speaker, a.sourceDate].some((v) => (v ?? "").trim() !== ""),
);
if (unsourced.length) {
  console.error(`fact without a source: ${unsourced.map(([q]) => q).join(", ")}`);
  drift = 1;
}

const open = Object.values(kase.answers).filter((a) =>
  ["open", "blocked"].includes(a.verification),
);
const owned = open.filter((a) => (a.owner ?? "").trim() && (a.due ?? "").trim());
console.log(
  `case: ${Object.keys(kase.answers).length} answers · ${open.length} open · ` +
    `${owned.length} with an owner and a date · ${(kase.directions ?? []).length} directions`,
);

await server.close();
process.exit(drift);
