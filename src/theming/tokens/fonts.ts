import { defineTokens } from "@pandacss/dev"

export const fontSizes = defineTokens.fontSizes({})

export const fontWeights = defineTokens.fontWeights({
	"*base": { value: 400 },
	"*bold": { value: 700 },
})
