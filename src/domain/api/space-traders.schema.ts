import { Type, Static } from "@sinclair/typebox"

export type GetMyProfileDTO = Static<typeof getMyProfileSchema>

export const getMyProfileSchema = Type.Object({
  data: Type.Object({
    accountId: Type.String(),
    symbol: Type.String(),
    headquarters: Type.String(),
    startingFaction: Type.String(),
    credits: Type.Number(),
    shipCount: Type.Number(),
  }),
})
