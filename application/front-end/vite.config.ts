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
      "#component": path.resolve(__dirname, "./src/component"),
      "#constant": path.resolve(__dirname, "./src/constant"),
      "#context": path.resolve(__dirname, "./src/context"),
      "#helper": path.resolve(__dirname, "./src/helper"),
      "#service": path.resolve(__dirname, "./src/service"),
      "#store": path.resolve(__dirname, "./src/store"),
      "#styled-system": path.resolve(__dirname, "./src/styled-system"),
      "#type": path.resolve(__dirname, "./src/type"),
    },
  },
})
