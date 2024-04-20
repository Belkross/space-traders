import { Type, Static } from "@sinclair/typebox"

export type GetServerStatusDTO = Static<typeof getServerStatusSchema>
export type GetMyProfileDTO = Static<typeof getMyProfileSchema>

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
})

export const getMyProfileSchema = Type.Object({
  data: Type.Object({
    accountId: Type.String(),
    symbol: Type.String(),
    headquarters: Type.String(),
    startingFaction: Type.String(),
    credits: Type.Number(),
    shipCount: Type.Number(),
    leaderboards: Type.Object({
      mostCredits: Type.Array(Type.Object({ agentSymbol: Type.String(), credits: Type.Number() })),
      mostSubmittedCharts: Type.Array(Type.Object({ agentSymbol: Type.String(), chartCount: Type.Number() })),
    }),
  }),
})
