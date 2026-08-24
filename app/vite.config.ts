import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base: the bundle is uploaded by hand under /systemarchitecture, and a relative
// base means it works from that path without a rebuild — and from file:// as well.
export default defineConfig({
  base: "./",
  plugins: [react()],
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
