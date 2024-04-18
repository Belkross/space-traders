import { defineTokens } from "@pandacss/dev"

export const spacing = defineTokens.spacing({
  "*base-1": { value: "4px" },
  "*base": { value: "8px" }, //La base est établie comme l’espace minimum entre deux éléments pour qu’ils ne se gènent pas les uns les autres
  "*base+1": { value: "16px" },
  "*base+2": { value: "24px" },
  "*base+3": { value: "32px" },
  "*base+4": { value: "40px" },
})
