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
      "#helper": path.resolve(__dirname, "./src/helper"),
      "#service": path.resolve(__dirname, "./src/service"),
      "#styled-system": path.resolve(__dirname, "./src/styled-system"),
    },
  },
})
