import { defineTokens } from "@pandacss/dev"

export const colors = defineTokens.colors({
  "*font": {
    base: {
      light: { value: "rgba(255, 255, 255, .85)" },
      dark: { value: "rgba(0, 0, 0, .85)" },
    },
  },
  "*background": {
    base: { value: "hsl(212, 59%, 10%)" },
    navBar: { value: "hsl(211, 96%, 12%)" },
    paper: { value: "hsl(211,70%,16%)" },
    button: {
      base: { value: "{colors.*primary}" },
      active: { value: "hsl(215, 25%, 27%)" },
    },
  },
  "*border": {
    base: { value: "hsl(211, 52%, 31%)" },
  },
  "*primary": { value: "hsl(212, 81%, 36%)" },
  "*side": {
    one: {
      value: "hsl(231,44%,55%)",
    },
    two: {
      value: "hsl(1,83%,62%)",
    },
  },
  "*success": { value: "hsl(142,71%,29%)" },
  "*error": { value: "hsl(0,74%,42%)" },
  "*info": { value: "hsl(189,95%,42%)" },
  "*warning": { value: "hsl(25,95%,53%)" },
})
