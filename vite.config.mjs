/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueDevTools from "vite-plugin-vue-devtools";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VueDevTools(), eslintPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules/**", "e2e/**", "src/__test__/**"],
    //setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ["text", "html"],
      exclude: [
        "node_modules/",
        //'src/setupTests.ts',
      ],
    },
  },
  build: {
    lib: {
      entry: "src/main.ts",
      name: "HourclockPie",
      fileName: "hourclockpie",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
