import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: resolve(
            "node_modules",
            "@esri",
            "calcite-components",
            "dist",
            "calcite",
            "assets"
          ),
          dest: ".",
        },
      ],
    }),
  ],
});
