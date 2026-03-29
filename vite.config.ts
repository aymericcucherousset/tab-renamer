import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: "src/background.ts",
        content: "src/content.ts"
      },
      output: {
        format: "esm",
        entryFileNames: "[name].js",
      }
    },
    outDir: "dist"
  }
});
