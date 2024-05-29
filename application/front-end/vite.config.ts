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
      "#component": path.resolve(__dirname, "./src/component/index.component.ts"),
      "#constant": path.resolve(__dirname, "./src/constant.ts"),
      "#context": path.resolve(__dirname, "./src/context.ts"),
      "#helper": path.resolve(__dirname, "./src/helper/index.helper.ts"),
      "#repository": path.resolve(__dirname, "./src/repository/index.repository.ts"),
      "#service": path.resolve(__dirname, "./src/service/index.service.ts"),
      "#store": path.resolve(__dirname, "./src/store/index.store.ts"),
      "#styled-system": path.resolve(__dirname, "./src/styled-system"),
      "#type": path.resolve(__dirname, "./src/type/index.type.ts"),
      "#use-case": path.resolve(__dirname, "./src/use-case.ts"),
    },
  },
})
