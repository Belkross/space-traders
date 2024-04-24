import { defineTokens } from "@pandacss/dev"

export const borders = defineTokens.borders({})

export const borderWidths = defineTokens.borderWidths({
  "*base": { value: "1px" },
  "*container": { value: "3px" },
})

export const radii = defineTokens.radii({
  "*base": { value: "3px" },
})
