import { Type } from "@sinclair/typebox"

export const factionSymbolSchema = Type.Union([
  Type.Literal("COSMIC"),
  Type.Literal("VOID"),
  Type.Literal("GALACTIC"),
  Type.Literal("QUANTUM"),
  Type.Literal("DOMINION"),
  Type.Literal("ASTRO"),
  Type.Literal("CORSAIRS"),
  Type.Literal("OBSIDIAN"),
  Type.Literal("AEGIS"),
  Type.Literal("UNITED"),
  Type.Literal("SOLITARY"),
  Type.Literal("COBALT"),
  Type.Literal("OMEGA"),
  Type.Literal("ECHO"),
  Type.Literal("LORDS"),
  Type.Literal("CULT"),
  Type.Literal("ANCIENTS"),
  Type.Literal("SHADOW"),
  Type.Literal("ETHEREAL"),
])

export const contractSchema = Type.Object({
  id: Type.String({ minLength: 1 }),
  factionSymbol: factionSymbolSchema,
  type: Type.Union([Type.Literal("PROCUREMENT"), Type.Literal("TRANSPORT"), Type.Literal("SHUTTLE")]),
  terms: Type.Object({
    deadline: Type.String(),
    payment: Type.Object({
      onAccepted: Type.Number(),
      onFulfilled: Type.Number(),
    }),
    deliver: Type.Array(
      Type.Object({
        tradeSymbol: Type.String(),
        destinationSymbol: Type.String(),
        unitsRequired: Type.Number(),
        unitsFulfilled: Type.Number(),
      })
    ),
  }),
  accepted: Type.Boolean(),
  fulfilled: Type.Boolean(),
  expiration: Type.String(),
  deadlineToAccept: Type.String(),
})

export const agentSchema = Type.Object({
  accountId: Type.Optional(Type.String()),
  symbol: Type.String(),
  headquarters: Type.String(),
  credits: Type.Integer({ minimum: -9007199254740991, maximum: 9007199254740991 }),
  startingFaction: factionSymbolSchema,
  shipCount: Type.Integer(),
})