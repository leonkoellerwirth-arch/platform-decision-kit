import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));

// The build stamps its own identity. Two questions come up in every review of a browser-only
// instrument — "which version is this?" and "is this the build you sent me?" — and neither is
// answerable from a folder of static files. The commit is short and optional: a working tree
// without git, or one built from an export, simply carries the version alone.
function commit(): string {
  try {
    const sha = execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    const dirty =
      execSync("git status --porcelain", { stdio: ["ignore", "pipe", "ignore"] })
        .toString()
        .trim().length > 0;
    return dirty ? `${sha}+` : sha;
  } catch {
    return "";
  }
}

// Relative base: the bundle is uploaded by hand under /systemarchitecture, and a relative
// base means it works from that path without a rebuild — and from file:// as well.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_COMMIT__: JSON.stringify(commit()),
  },
  // The question set is imported from ../intake/themes.json — the same canonical source the
  // Markdown forms are rendered from (INV-5, no drift). It sits outside the app root, so the
  // dev server needs explicit permission to read it. In a build it is inlined into the bundle,
  // which is what keeps the "no network call" claim true.
  server: { port: 5281, strictPort: true, fs: { allow: [".."] } },
  preview: { port: 5282, strictPort: true },
  build: {
    // No modulepreload polyfill: it emits a fetch() of the app's own chunks. Harmless, but
    // this instrument claims "no network call" and that claim has to survive a grep over dist/.
    modulePreload: { polyfill: false },
  },
});
