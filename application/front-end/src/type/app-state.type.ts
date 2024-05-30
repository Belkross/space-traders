import { Contract, Ship, Waypoint } from "@library/domain"

export type AppState = {
  page: Page
  accountId: string
  username: string
  faction: string
  headquarters: string
  credits: number
  shipCount: number
  contracts: Array<Contract>
  ships: Array<Ship>
  shipsyards: Array<Waypoint>
}

export type Page = "home" | "game"
