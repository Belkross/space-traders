/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["./test/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: "./test/test-setup.ts",
    globals: true,
  },
  resolve: {
    alias: {
      "#component": path.resolve(__dirname, "./src/component/index.component"),
      "#constant": path.resolve(__dirname, "./src/constant"),
      "#context": path.resolve(__dirname, "./src/context"),
      "#helper": path.resolve(__dirname, "./src/helper"),
      "#repository": path.resolve(__dirname, "./src/repository"),
      "#service": path.resolve(__dirname, "./src/service"),
      "#store": path.resolve(__dirname, "./src/store"),
      "#styled-system": path.resolve(__dirname, "./src/styled-system"),
      "#type": path.resolve(__dirname, "./src/type"),
      "#use-case": path.resolve(__dirname, "./src/use-case/index.use-case"),
    },
  },
})
