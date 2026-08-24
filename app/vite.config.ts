import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base: the bundle is uploaded by hand under /systemarchitecture, and a relative
// base means it works from that path without a rebuild — and from file:// as well.
export default defineConfig({
  base: "./",
  plugins: [react()],
  server: { port: 5281, strictPort: true },
  preview: { port: 5282, strictPort: true },
  build: {
    // No modulepreload polyfill: it emits a fetch() of the app's own chunks. Harmless, but
    // this instrument claims "no network call" and that claim has to survive a grep over dist/.
    modulePreload: { polyfill: false },
  },
});
