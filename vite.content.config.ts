import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    lib: {
      entry: "src/content.ts",
      formats: ["iife"],
      name: "ContentScript"
    },
    outDir: "dist",
    emptyOutDir: false
  }
});
