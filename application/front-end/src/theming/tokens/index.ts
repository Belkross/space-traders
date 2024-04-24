import { defineTokens, defineSemanticTokens } from "@pandacss/dev"
import { colors } from "./colors"
import { borders, borderWidths, radii } from "./borders"
import { fontSizes, fontWeights } from "./fonts"
import { spacing } from "./spacing"
import { shadows } from "./shadows"
import { zIndex } from "./z-index"
import { sizes } from "./sizes"

export const tokens = defineTokens({
  colors,
  borders,
  borderWidths,
  fontWeights,
  fontSizes,
  spacing,
  radii,
  sizes,
  shadows,
  zIndex,
})

export const semanticTokens = defineSemanticTokens({
  colors: {
    team: {
      one: { value: "red" },
    },
  },
})
