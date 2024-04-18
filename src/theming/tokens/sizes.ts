import { defineTokens } from "@pandacss/dev"

export const sizes = defineTokens.sizes({
  "*board": {
    paperMaxWidth: { value: "500px" },
    paperMaxHeight: { value: "660px" },
    appBarHeight: { value: "75px" },
  },
})
