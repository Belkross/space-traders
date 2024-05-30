import { Static, Type } from "@sinclair/typebox"

export type Ship = {
  symbol: string
  owner: string
  role: string
}

export type ShipType = Static<typeof shipTypeSchema>

export const shipTypeSchema = Type.Union([
  Type.Literal("SHIP_PROBE"),
  Type.Literal("SHIP_MINING_DRONE"),
  Type.Literal("SHIP_SIPHON_DRONE"),
  Type.Literal("SHIP_INTERCEPTOR"),
  Type.Literal("SHIP_LIGHT_HAULER"),
  Type.Literal("SHIP_COMMAND_FRIGATE"),
  Type.Literal("SHIP_EXPLORER"),
  Type.Literal("SHIP_HEAVY_FREIGHTER"),
  Type.Literal("SHIP_LIGHT_SHUTTLE"),
  Type.Literal("SHIP_ORE_HOUND"),
  Type.Literal("SHIP_REFINING_FREIGHTER"),
  Type.Literal("SHIP_SURVEYOR"),
])
