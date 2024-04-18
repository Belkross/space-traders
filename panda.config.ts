import { defineConfig } from "@pandacss/dev"
import { tokens, semanticTokens, breakpoints, globalCss, textStyles } from "./src/theming"

export default defineConfig({
  preflight: false,
  globalCss,
  theme: {
    extend: {
      tokens,
      semanticTokens,
      breakpoints,
      textStyles,
    },
  },

  strictTokens: false,
  jsxFramework: "react",

  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "./src/styled-system",
})
