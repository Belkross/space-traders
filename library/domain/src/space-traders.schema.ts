import { Type, Static } from "@sinclair/typebox"

export type GetServerStateDTO = Static<typeof getServerStatusSchema>
export type GetMyAgentDTO = Static<typeof getMyAgentSchema>
export type SpaceTradersErrorDTO = Static<typeof SpaceTradersApiErrorSchema>
export type PostAgentDTO = Static<typeof postAgentSchema>
export type GetMyContractsDTO = Static<typeof GetMyContractsSchema>
export type PostContractAcceptationDTO = Static<typeof postContractAcceptationSchema>

const factionSymbolSchema = Type.Union([
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

const contractSchema = Type.Object({
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

const agentSchema = Type.Object({
  accountId: Type.Optional(Type.String()),
  symbol: Type.String(),
  headquarters: Type.String(),
  credits: Type.Integer({ minimum: -9007199254740991, maximum: 9007199254740991 }),
  startingFaction: factionSymbolSchema,
  shipCount: Type.Integer(),
})

export const postContractAcceptationSchema = Type.Object({
  data: Type.Object({
    agent: agentSchema,
    contract: contractSchema,
  }),
})

export const GetMyContractsSchema = Type.Object({
  data: Type.Array(
    Type.Object({
      id: Type.String(),
      factionSymbol: Type.String(),
      type: Type.String(),
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
  ),
  meta: Type.Object({
    total: Type.Number(),
    page: Type.Number(),
    limit: Type.Number(),
  }),
})

export const SpaceTradersApiErrorSchema = Type.Object({
  error: Type.Object({
    code: Type.Number(),
    message: Type.String(),
  }),
})

export const getServerStatusSchema = Type.Object({
  status: Type.String(),
  version: Type.String(),
  resetDate: Type.String(),
  description: Type.String(),
  stats: Type.Object({
    agents: Type.Number(),
    ships: Type.Number(),
    systems: Type.Number(),
    waypoints: Type.Number(),
  }),
  serverResets: Type.Object({
    next: Type.String(),
    frequency: Type.String(),
  }),
  announcements: Type.Array(Type.Object({ title: Type.String(), body: Type.String() })),
  links: Type.Array(Type.Object({ name: Type.String(), url: Type.String() })),
  leaderboards: Type.Object({
    mostCredits: Type.Array(Type.Object({ agentSymbol: Type.String(), credits: Type.Number() })),
    mostSubmittedCharts: Type.Array(Type.Object({ agentSymbol: Type.String(), chartCount: Type.Number() })),
  }),
})

export const getMyAgentSchema = Type.Object({
  data: Type.Object({
    accountId: Type.String(),
    symbol: Type.String(),
    headquarters: Type.String(),
    startingFaction: Type.String(),
    credits: Type.Number(),
    shipCount: Type.Number(),
  }),
})

export const postAgentSchema = Type.Object({
  data: Type.Object({
    agent: Type.Object({
      accountId: Type.String(),
      symbol: Type.String(),
      headquarters: Type.String(),
      credits: Type.Number(),
      startingFaction: Type.String(),
      shipCount: Type.Number(),
    }),
    contract: Type.Object({
      id: Type.String(),
      factionSymbol: Type.String(),
      type: Type.String(),
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
    }),
    faction: Type.Object({
      symbol: Type.String(),
      name: Type.String(),
      description: Type.String(),
      headquarters: Type.String(),
      traits: Type.Array(
        Type.Object({
          symbol: Type.String(),
          name: Type.String(),
          description: Type.String(),
        })
      ),
      isRecruiting: Type.Boolean(),
    }),
    token: Type.String(),
  }),
})
