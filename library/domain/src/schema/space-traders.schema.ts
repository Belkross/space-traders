import { Type, Static } from "@sinclair/typebox"
import { agentSchema, contractSchema } from "./space-traders-common.schema.js"

export type GetServerStateDTO = Static<typeof getServerStatusSchema>
export type GetMyAgentDTO = Static<typeof getMyAgentSchema>
export type SpaceTradersErrorDTO = Static<typeof spaceTradersApiErrorSchema>
export type PostAgentDTO = Static<typeof postAgentSchema>
export type GetMyContractsDTO = Static<typeof getMyContractsSchema>
export type PostContractAcceptationDTO = Static<typeof postContractAcceptationSchema>

export const postContractAcceptationSchema = Type.Object({
  data: Type.Object({
    agent: agentSchema,
    contract: contractSchema,
  }),
})

export const getMyContractsSchema = Type.Object({
  data: Type.Array(contractSchema),
})

export const spaceTradersApiErrorSchema = Type.Object({
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
