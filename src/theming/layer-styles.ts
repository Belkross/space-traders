import { defineLayerStyles } from "@pandacss/dev"

/**
 * text color
 * background color
 * border width + color
 * box shadow
 * opacity
 */

export const layerStyles = defineLayerStyles({
	navBar: {
		description: "navigation bar",
		value: {
			backgroundColor: "background.navBar",
		},
	},
})
