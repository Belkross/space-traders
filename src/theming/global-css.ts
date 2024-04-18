import { defineGlobalStyles } from "@pandacss/dev"

export const globalCss = defineGlobalStyles({
  //to override default browser style
  "*": {
    padding: 0,
    margin: 0,

    boxSizing: "border-box",
    borderStyle: "solid",
    borderColor: "*border.base",
    borderWidth: 0,
  },

  "dialog, button, input[type=text]": {
    borderRadius: "*base",
    boxShadow: "*base",
    padding: "*base",
  },

  html: {
    backgroundColor: "*background.base",
    //font
    color: "*font.base.light",
    fontFamily: "roboto, sans-serif",
    fontSize: "16.5px",
    fontWeight: "400",
    lineHeight: "22px",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },

  button: {
    height: "50px",
    minWidth: "45px",
    backgroundColor: "*background.button.base",
    borderWidth: "*base",

    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: "*tiny",
    alignItems: "center",
    fontSize: "1em",
    color: "*font.base.light",

    "&:hover": {
      backgroundColor: "inherit",
      borderColor: "*background.button.base",
    },

    "&:active": {
      backgroundColor: "*background.button.active",
    },
  },

  "input[type=text]": {
    height: "50px",
    backgroundColor: "inherit",
    borderWidth: "1px",
    borderColor: "grey",
    margin: "*base",
    color: "*font.base.light",
    fontSize: "1em",
    outline: "none",
    "&:hover": {
      borderColor: "*primary",
    },
    "&:focus": {
      borderColor: "*primary",
    },
  },
})
