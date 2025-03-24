import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        background: resolve(__dirname, "src/background.js"),
        content: resolve(__dirname, "src/content.js")
      },
      output: {
        entryFileNames: "[name].js",
        inlineDynamicImports: false, 
      }
    }
  }
});
